declare const require: (id: string) => any;

const { existsSync, readFileSync } = require('node:fs');
const nodeProcess = (globalThis as any).process;

const envLinePattern = /^\s*(?:export\s+)?([\w.-]+)\s*=\s*(.*?)\s*$/;

function parseValue(rawValue: string): string {
  const value = rawValue.replace(/;\s*$/, '').trim();
  const quote = value[0];

  if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
    return value.slice(1, -1);
  }

  return value.replace(/\s+#.*$/, '').trim();
}

function loadEnvFile(): void {
  const envPath = `${nodeProcess.cwd()}/.env`;
  if (!existsSync(envPath)) {
    return;
  }

  const contents = readFileSync(envPath, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = envLinePattern.exec(line);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (nodeProcess.env[key] === undefined) {
      nodeProcess.env[key] = parseValue(rawValue);
    }
  }
}

loadEnvFile();

export function requiredEnv(...names: string[]): string {
  for (const name of names) {
    const value = nodeProcess.env[name];
    if (value) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable: ${names.join(' or ')}`);
}
