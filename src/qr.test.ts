import { describe, it, expect } from "vitest";
// CHANGE 'isValidGmId' to whatever your actual validation function is named in qr.ts
import { isValidGmId } from "./qr";

describe("QR Code Validation", () => {
  it("should accept a valid 4-digit GM ID", () => {
    expect(isValidGmId("1234")).toBe(true);
  });

  it("should reject IDs that are too short or too long", () => {
    expect(isValidGmId("123")).toBe(false);
    expect(isValidGmId("12345")).toBe(false);
  });

  it("should reject non-numeric characters", () => {
    expect(isValidGmId("12A4")).toBe(false);
  });
});
