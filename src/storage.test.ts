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
    expect(() => uploadUrl("a..b", "key")).toThrow(/invalid bucket/);
    expect(() => uploadUrl("a.-b", "key")).toThrow(/invalid bucket/);
    expect(() => uploadUrl("192.168.1.1", "key")).toThrow(/invalid bucket/);
  });
});
