// AWS example region and placeholder for URL fixtures.
const REGION = "eu-west-2";
const ACCESS_KEY_ID = "placeholder-access-key";
const BUCKET_PATTERN = /^(?!\d+\.\d+\.\d+\.\d+$)(?!.*(\.\.|\.-|-\.))(?!xn--)(?!sthree-)(?!amzn-s3-demo-)(?!.*(-s3alias|--ol-s3|\.mrap|--x-s3|--table-s3)$)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;

export function uploadUrl(bucket: string, key: string): string {
  if (!BUCKET_PATTERN.test(bucket)) throw new Error(`invalid bucket: ${bucket}`);
  return `https://${bucket}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}?id=${ACCESS_KEY_ID}`;
}
