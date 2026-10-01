import { exec, execSync } from "node:child_process";

export function convertImage(inputName: string, outputName: string): void {
  exec(`convert ${inputName} ${outputName}`, () => {
    return undefined;
  });
}

export function pingHost(host: string): string {
  return execSync(`ping -c 1 ${host}`).toString();
}

export function runBackup(directory: string): string {
  return execSync("tar -czf backup.tgz " + directory).toString();
}
