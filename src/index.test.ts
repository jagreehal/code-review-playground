import { describe, it, expect } from "vitest";
import {
  greet,
  add,
  calculateCheckoutTotal,
  routeSupportTicket,
  scoreLoanApplication,
} from "./index";

describe("greet", () => {
  it("should return a greeting", () => {
    expect(greet("World")).toBe("Hello, World!");
  });
});

describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});

describe("calculateCheckoutTotal", () => {
  it("should apply the gold US weekend morning discount", () => {
    expect(
      calculateCheckoutTotal({
        subtotal: 200,
        country: "US",
        membership: "gold",
        coupon: "",
        itemCount: 2,
        isWeekend: true,
        hour: 10,
      }),
    ).toBe(160);
  });

  it("should add international shipping on a small unscoped cart", () => {
    expect(
      calculateCheckoutTotal({
        subtotal: 20,
        country: "FR",
        membership: "none",
        coupon: "",
        itemCount: 1,
        isWeekend: false,
        hour: 14,
      }),
    ).toBe(30);
  });
});

describe("routeSupportTicket", () => {
  it("should route a VIP Latin American billing emergency to the daytime queue", () => {
    expect(
      routeSupportTicket({
        category: "billing",
        severity: "critical",
        isVip: true,
        language: "es",
        isBusinessHours: true,
        messageLength: 50,
      }),
    ).toBe("billing-vip-latam-day");
  });

  it("should send a low-severity technical ticket to the general tech queue", () => {
    expect(
      routeSupportTicket({
        category: "technical",
        severity: "low",
        isVip: false,
        language: "en",
        isBusinessHours: true,
        messageLength: 10,
      }),
    ).toBe("tech-low");
  });
});

describe("scoreLoanApplication", () => {
  it("should score a mid-career high-income applicant positively", () => {
    expect(
      scoreLoanApplication(
        [
          {
            age: 32,
            creditScore: 780,
            income: 90000,
            employed: true,
            debts: [],
          },
        ],
        20000,
      ),
    ).toBe(30);
  });

  it("should penalize an underage applicant", () => {
    expect(
      scoreLoanApplication(
        [
          {
            age: 16,
            creditScore: 500,
            income: 0,
            employed: false,
            debts: [],
          },
        ],
        5000,
      ),
    ).toBe(-50);
  });
});
