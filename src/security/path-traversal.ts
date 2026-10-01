import { readFileSync } from "node:fs";
import { join } from "node:path";

const UPLOADS_DIR = "/var/app/uploads";

export function readUpload(fileName: string): string {
  const filePath = join(UPLOADS_DIR, fileName);
  return readFileSync(filePath, "utf8");
}

export function readReport(userPath: string): string {
  return readFileSync(`${UPLOADS_DIR}/${userPath}`, "utf8");
}

export function downloadAttachment(name: string): Buffer {
  return readFileSync(join(UPLOADS_DIR, "attachments", name));
}
