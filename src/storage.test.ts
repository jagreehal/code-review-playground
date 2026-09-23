import { describe, it, expect } from "vitest";
import { uploadUrl } from "./storage";

describe("uploadUrl", () => {
  it("should generate a valid S3 URL for a valid bucket", () => {
    const url = uploadUrl("my-bucket", "a.txt");
    expect(url).toMatch(/^https:\/\/my-bucket\.s3\.eu-west-2\.amazonaws\.com\/a\.txt/);
  });

  it("should throw an error for an invalid bucket name", () => {
    expect(() => uploadUrl("evil.com/x#", "a")).toThrow(/invalid bucket/);
  });

  it("rejects names S3 forbids", () => {
    ["a..b", "a.-b", "192.168.1.1", "xn--example", "sthree-example", "amzn-s3-demo-x", "b-s3alias", "b--ol-s3", "b.mrap", "b--x-s3", "b--table-s3"].forEach(name => {
      expect(() => uploadUrl(name, "key")).toThrow(/invalid bucket/);
    });
  });

  it("accepts legal bucket names", () => {
    ["amazon-bucket", "my-website", "backup-s3"].forEach(name => {
      expect(() => uploadUrl(name, "key")).not.toThrow();
    });
  });
});
