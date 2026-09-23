const REGION = "eu-west-2";
const BUCKET_PATTERN = /^(?!\d+\.\d+\.\d+\.\d+$)(?!.*(\.\.|\.-|-\.))(?!xn--)(?!sthree-)(?!amzn-s3-demo-)(?!.*(-s3alias|--ol-s3|\.mrap|--x-s3|--table-s3)$)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/;
const REGION_PATTERN = /^[a-z]{2}(-[a-z]+)+-\d$/;

export function objectUrl(bucket: string, key: string, region: string = REGION): string {
  if (!BUCKET_PATTERN.test(bucket)) throw new Error(`invalid bucket: ${bucket}`);
  if (!REGION_PATTERN.test(region) || region.startsWith("cn-")) throw new Error(`invalid region: ${region}`);
  const segments = key.split("/");
  if (segments.some((segment) => ["", ".", ".."].includes(segment))) {
    throw new Error(`invalid key: ${key}`);
  }
  const encodedKey = segments.map(encodeURIComponent).join("/");
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}
