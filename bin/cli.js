#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.resolve(__dirname, "../templates");
const presetsDir = path.join(templateDir, "presets");
const invocationName = path.basename(process.argv[1] || "cadencecode-ai-kit");
const rawArgs = process.argv.slice(2);

const PRESET_ALIASES = {
  "--next": "next",
  "--node": "node",
  "--saas": "saas"
};

const PRESET_DESCRIPTIONS = {
  next: "Base para app full-stack com Next.js.",
  node: "Base para backend ou servico Node.js.",
  saas: "Ajustes de produto e backlog para um SaaS MVP."
};

function getAvailablePresets() {
  return Object.keys(PRESET_DESCRIPTIONS);
}

function parseArgs(args) {
  let command = null;
  let targetDir = process.cwd();
  let force = false;
  let dryRun = false;
  let skipReadme = false;
  let help = false;
  let preset = null;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (!arg) {
      continue;
    }

    if (!arg.startsWith("-") && !command) {
      command = arg;
      continue;
    }

    if (arg === "--dir") {
      targetDir = path.resolve(args[index + 1] || process.cwd());
      index += 1;
      continue;
    }

    if (arg === "--preset") {
      preset = args[index + 1] || null;
      index += 1;
      continue;
    }

    if (PRESET_ALIASES[arg]) {
      preset = PRESET_ALIASES[arg];
      continue;
    }

    if (arg === "--force") {
      force = true;
      continue;
    }

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--skip-readme") {
      skipReadme = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }
  }

  if (!command && invocationName.startsWith("create-")) {
    command = "init";
  }

  return {
    command,
    dryRun,
    force,
    help,
    preset,
    skipReadme,
    targetDir
  };
}

function usage() {
  const presetLines = getAvailablePresets()
    .map((preset) => `  ${preset.padEnd(5, " ")} ${PRESET_DESCRIPTIONS[preset]}`)
    .join("\n");

  console.log(`
${chalk.bold("CadenceCode AI Kit")}

Uso:
  create-cadencecode-ai-kit
  npm init cadencecode-ai-kit
  ai-kit init
  cadencecode-ai-kit init
  ai-kit init --dir ./meu-projeto
  ai-kit init --preset next

Opcoes:
  --dir <path>      Define o diretorio de destino
  --preset <name>   Aplica um preset apos a base
  --next            Alias para --preset next
  --node            Alias para --preset node
  --saas            Alias para --preset saas
  --force           Sobrescreve arquivos existentes
  --dry-run         Mostra o que seria criado sem gravar
  --skip-readme     Nao cria README.md a partir do template
  -h, --help        Exibe esta ajuda

Presets:
${presetLines}
`);
}

async function readGitignoreEntries() {
  const gitignoreTemplatePath = path.join(templateDir, ".gitignore");
  const content = await fs.readFile(gitignoreTemplatePath, "utf8");

  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function isGitRepo(targetDir) {
  return fs.existsSync(path.join(targetDir, ".git"));
}

function validatePreset(preset) {
  if (!preset) {
    return;
  }

  if (!getAvailablePresets().includes(preset)) {
    console.error(chalk.red(`Preset invalido: ${preset}`));
    console.error(`Presets disponiveis: ${getAvailablePresets().join(", ")}`);
    process.exit(1);
  }
}

async function ensureGitignore(targetDir, options) {
  const gitignorePath = path.join(targetDir, ".gitignore");
  const requiredEntries = await readGitignoreEntries();

  if (!(await fs.pathExists(gitignorePath))) {
    if (!options.dryRun) {
      await fs.writeFile(gitignorePath, requiredEntries.join("\n") + "\n", "utf8");
    }

    return {
      created: true,
      appended: []
    };
  }

  const existing = await fs.readFile(gitignorePath, "utf8");
  const lines = existing.split(/\r?\n/).map((line) => line.trim());
  const missing = requiredEntries.filter((entry) => !lines.includes(entry));

  if (missing.length > 0 && !options.dryRun) {
    const contentToAppend = `\n${missing.join("\n")}\n`;
    await fs.appendFile(gitignorePath, contentToAppend, "utf8");
  }

  return {
    appended: missing,
    created: false
  };
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (dir === templateDir && entry.name === "presets") {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function toTargetRelativePath(sourceRoot, templateFile) {
  const relative = path.relative(sourceRoot, templateFile);
  return relative === "README.template.md" ? "README.md" : relative;
}

async function copyFilesFromDir(sourceRoot, targetDir, options, state = {}) {
  const sourceFiles = await collectFiles(sourceRoot);
  const copied = [];
  const skipped = [];
  const createdInRun = state.createdInRun || new Set();
  const initialExisting = state.initialExisting || new Set();

  for (const sourceFile of sourceFiles) {
    const relativeTargetPath = toTargetRelativePath(sourceRoot, sourceFile);

    if (relativeTargetPath === ".gitignore") {
      continue;
    }

    if (options.skipReadme && relativeTargetPath === "README.md") {
      skipped.push(relativeTargetPath);
      continue;
    }

    const destination = path.join(targetDir, relativeTargetPath);
    const exists = await fs.pathExists(destination);
    const existedBeforeRun = initialExisting.has(relativeTargetPath);
    const canOverwrite = options.force || !existedBeforeRun || createdInRun.has(relativeTargetPath);

    if (exists && !canOverwrite) {
      skipped.push(relativeTargetPath);
      continue;
    }

    copied.push(relativeTargetPath);
    createdInRun.add(relativeTargetPath);

    if (!options.dryRun) {
      await fs.ensureDir(path.dirname(destination));
      await fs.copy(sourceFile, destination, { overwrite: true });
    }
  }

  return { copied, skipped };
}

async function copyTemplateFiles(targetDir, options) {
  const state = {
    createdInRun: new Set(),
    initialExisting: new Set()
  };

  const baseFiles = await collectFiles(templateDir);

  for (const sourceFile of baseFiles) {
    const relativeTargetPath = toTargetRelativePath(templateDir, sourceFile);

    if (relativeTargetPath === ".gitignore") {
      continue;
    }

    if (await fs.pathExists(path.join(targetDir, relativeTargetPath))) {
      state.initialExisting.add(relativeTargetPath);
    }
  }

  if (options.preset) {
    const presetFiles = await collectFiles(path.join(presetsDir, options.preset));

    for (const sourceFile of presetFiles) {
      const relativeTargetPath = toTargetRelativePath(path.join(presetsDir, options.preset), sourceFile);

      if (relativeTargetPath === ".gitignore") {
        continue;
      }

      if (await fs.pathExists(path.join(targetDir, relativeTargetPath))) {
        state.initialExisting.add(relativeTargetPath);
      }
    }
  }

  const baseResult = await copyFilesFromDir(templateDir, targetDir, options, state);

  if (!options.preset) {
    return baseResult;
  }

  const presetResult = await copyFilesFromDir(
    path.join(presetsDir, options.preset),
    targetDir,
    options,
    state
  );

  return {
    copied: [...baseResult.copied, ...presetResult.copied],
    skipped: [...baseResult.skipped, ...presetResult.skipped]
  };
}

function printSummary(result) {
  const destination = result.targetDir;

  console.log(chalk.green(`✔ Kit preparado em ${destination}`));

  if (result.preset) {
    console.log(chalk.green(`✔ Preset aplicado: ${result.preset}`));
  }

  if (result.copied.length > 0) {
    console.log(chalk.green(`✔ ${result.copied.length} arquivo(s) criado(s) ou atualizado(s).`));
  } else {
    console.log(chalk.yellow("⚠ Nenhum arquivo novo foi copiado."));
  }

  if (result.skipped.length > 0) {
    console.log(chalk.yellow("⚠ Arquivos mantidos como estavam:"));
    result.skipped.forEach((file) => console.log(`- ${file}`));
  }

  if (result.gitignore.created) {
    console.log(chalk.green("✔ .gitignore criado."));
  } else if (result.gitignore.appended.length > 0) {
    console.log(chalk.green("✔ .gitignore atualizado com entradas faltantes."));
  } else {
    console.log(chalk.green("✔ .gitignore ja estava alinhado."));
  }

  if (result.dryRun) {
    console.log(chalk.cyan("Dry run concluido. Nenhum arquivo foi gravado."));
    return;
  }

  console.log(chalk.cyan("Proximos passos sugeridos:"));
  console.log("1. Preencher TASK.md com o contexto atual do projeto.");
  console.log("2. Ajustar docs/product.md e docs/architecture.md para a stack real.");
  console.log("3. Versionar as mudancas e usar o kit como baseline nos proximos repositorios.");
}

async function init(options) {
  const targetDir = path.resolve(options.targetDir);

  validatePreset(options.preset);

  console.log(chalk.cyan("Preparando CadenceCode AI Kit para o repositorio..."));

  if (!(await fs.pathExists(targetDir))) {
    if (!options.dryRun) {
      await fs.ensureDir(targetDir);
    }

    console.log(chalk.green("✔ Diretorio de destino criado."));
  }

  if (!isGitRepo(targetDir)) {
    console.log(chalk.yellow("⚠ Diretorio alvo nao parece ser um repositorio git."));
  } else {
    console.log(chalk.green("✔ Repositorio git detectado."));
  }

  const copyResult = await copyTemplateFiles(targetDir, options);
  const gitignoreResult = await ensureGitignore(targetDir, options);

  printSummary({
    copied: copyResult.copied,
    dryRun: options.dryRun,
    gitignore: gitignoreResult,
    preset: options.preset,
    skipped: copyResult.skipped,
    targetDir
  });
}

const options = parseArgs(rawArgs);

if (options.help) {
  usage();
  process.exit(0);
}

if (options.command === "init") {
  await init(options);
  process.exit(0);
}

if (invocationName.startsWith("create-") && !options.command) {
  await init(options);
  process.exit(0);
}

usage();
process.exit(1);
