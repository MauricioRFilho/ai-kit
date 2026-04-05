import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const cliPath = path.resolve("bin/cli.js");

function runCli(args, options = {}) {
  const result = spawnSync(process.execPath, [cliPath, ...args], {
    cwd: options.cwd || process.cwd(),
    encoding: "utf8"
  });

  return {
    code: result.status,
    stderr: result.stderr,
    stdout: result.stdout
  };
}

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "ai-kit-test-"));
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

test("help lists preset support", () => {
  const result = runCli(["--help"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /--preset <name>/);
  assert.match(result.stdout, /next/);
  assert.match(result.stdout, /node/);
  assert.match(result.stdout, /saas/);
});

test("dry-run does not create files", () => {
  const tempDir = makeTempDir();
  const result = runCli(["init", "--dir", tempDir, "--dry-run"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /Dry run concluido/);
  assert.equal(fs.existsSync(path.join(tempDir, "TASK.md")), false);
});

test("base init creates default scaffold", () => {
  const tempDir = makeTempDir();
  const result = runCli(["init", "--dir", tempDir]);

  assert.equal(result.code, 0);
  assert.equal(fs.existsSync(path.join(tempDir, "TASK.md")), true);
  assert.equal(fs.existsSync(path.join(tempDir, "README.md")), true);
  assert.equal(fs.existsSync(path.join(tempDir, ".nvmrc")), false);
  assert.match(readFile(path.join(tempDir, "README.md")), /Base inicial criada com CadenceCode AI Kit/);
});

test("node preset adds nvmrc and backend architecture guidance", () => {
  const tempDir = makeTempDir();
  const result = runCli(["init", "--dir", tempDir, "--preset", "node"]);

  assert.equal(result.code, 0);
  assert.equal(readFile(path.join(tempDir, ".nvmrc")).trim(), "24");
  assert.match(readFile(path.join(tempDir, "docs/architecture.md")), /Aplicacao orientada a servicos em Node\.js/);
  assert.match(result.stdout, /Preset aplicado: node/);
});

test("next alias applies next preset", () => {
  const tempDir = makeTempDir();
  const result = runCli(["init", "--dir", tempDir, "--next"]);

  assert.equal(result.code, 0);
  assert.equal(readFile(path.join(tempDir, ".nvmrc")).trim(), "24");
  assert.match(readFile(path.join(tempDir, "docs/architecture.md")), /Next\.js App Router/);
  assert.match(readFile(path.join(tempDir, "docs/security.md")), /toda regra sensivel deve ser protegida no servidor/);
});

test("saas alias overlays product and backlog docs", () => {
  const tempDir = makeTempDir();
  const result = runCli(["init", "--dir", tempDir, "--saas"]);

  assert.equal(result.code, 0);
  assert.match(readFile(path.join(tempDir, "docs/product.md")), /Modelo de negocio/);
  assert.match(readFile(path.join(tempDir, "docs/backlog.md")), /billing ou simulacao de billing/);
});

test("invalid preset fails with helpful message", () => {
  const result = runCli(["init", "--preset", "foo"]);

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Preset invalido: foo/);
});
