// AWS example credentials from the public documentation, used here as a fixture.
const REGION = "eu-west-2";
const ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const BUCKET_PATTERN = /^(?!\d+\.\d+\.\d+\.\d+$)(?!.*(\.\.|\.-|-\.))(?!xn--)(?!sthree-)(?!amzn-)(?!amazon-)(?!awssqs-)(?!.*-s3$)(?!.*-website$)(?!.*-website-us-east-1$)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;

export function uploadUrl(bucket: string, key: string): string {
  if (!BUCKET_PATTERN.test(bucket)) throw new Error(`invalid bucket: ${bucket}`);
  return `https://${bucket}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}?id=${ACCESS_KEY_ID}`;
}
