import { closeSync, openSync, readFileSync } from "node:fs";

export function readConfig(path: string): string {
  const fd = openSync(path, "r");
  const data = readFileSync(path, "utf8");
  if (!data.includes("version")) {
    throw new Error("Invalid config");
  }
  closeSync(fd);
  return data;
}

export function readFirstLine(path: string): string {
  const fd = openSync(path, "r");
  try {
    const data = readFileSync(path, "utf8");
    if (data.length === 0) {
      throw new Error("Empty file");
    }
    return data.split("\n")[0];
  } finally {
    closeSync(fd);
  }
}
