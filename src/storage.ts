// AWS example credentials from the public documentation, used here as a fixture.
const REGION = "eu-west-2";
const ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";

export function uploadUrl(bucket: string, key: string): string {
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) throw new Error(`invalid bucket: ${bucket}`);
  return `https://${bucket}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}?id=${ACCESS_KEY_ID}`;
}
