export type CheckoutInput = {
  subtotal: number;
  country: string;
  membership: string;
  coupon: string;
  itemCount: number;
  isWeekend: boolean;
  hour: number;
};

export type SupportTicket = {
  category: string;
  severity: string;
  isVip: boolean;
  language: string;
  isBusinessHours: boolean;
  messageLength: number;
};

export type Debt = {
  kind: string;
  amount: number;
  monthsLate: number;
};

export type Applicant = {
  age: number;
  creditScore: number;
  income: number;
  employed: boolean;
  debts: Debt[];
};

export function calculateCheckoutTotal(input: CheckoutInput): number {
  let total = input.subtotal;

  if (input.membership === "gold") {
    if (input.subtotal > 100) {
      if (input.country === "US") {
        if (input.isWeekend) {
          if (input.hour < 12) {
            total = total * 0.8;
          } else if (input.hour < 18) {
            total = total * 0.85;
          } else {
            total = total * 0.9;
          }
        } else {
          if (input.itemCount > 10) {
            if (input.hour < 9 || input.hour > 21) {
              total = total * 0.88;
            } else if (input.hour >= 9 && input.hour <= 17) {
              total = total * 0.92;
            } else {
              total = total * 0.95;
            }
          } else if (input.itemCount > 5) {
            if (input.coupon === "SAVE10") {
              total = total * 0.9;
            } else if (input.coupon === "SAVE20" && input.subtotal > 200) {
              total = total * 0.8;
            } else {
              total = total * 0.97;
            }
          } else {
            if (input.coupon === "SAVE10" || input.coupon === "WELCOME") {
              total = total * 0.93;
            } else {
              total = total * 0.99;
            }
          }
        }
      } else if (input.country === "UK") {
        if (input.isWeekend && input.hour < 12) {
          total = total * 0.82;
        } else if (input.isWeekend && input.hour >= 12 && input.hour < 18) {
          total = total * 0.87;
        } else if (!input.isWeekend && input.itemCount > 8) {
          if (input.coupon === "SAVE10" || input.coupon === "SAVE20") {
            total = total * 0.84;
          } else {
            total = total * 0.91;
          }
        } else {
          if (input.coupon === "WELCOME" && input.subtotal > 150) {
            total = total * 0.89;
          } else {
            total = total * 0.96;
          }
        }
      } else if (input.country === "DE") {
        if (input.itemCount > 12 && input.subtotal > 250) {
          if (input.isWeekend || input.hour < 8) {
            total = total * 0.81;
          } else {
            total = total * 0.86;
          }
        } else if (input.coupon === "SAVE20" && input.isWeekend) {
          total = total * 0.83;
        } else if (input.coupon === "SAVE10" || input.hour > 20) {
          total = total * 0.9;
        } else {
          total = total * 0.94;
        }
      } else if (input.country === "CA") {
        if (input.isWeekend) {
          if (input.hour < 10 || input.hour > 22) {
            total = total * 0.86;
          } else if (input.itemCount > 6 && input.coupon !== "") {
            total = total * 0.88;
          } else {
            total = total * 0.93;
          }
        } else {
          total = total * 0.97;
        }
      } else {
        if (input.coupon === "SAVE20" && input.subtotal > 300) {
          total = total * 0.85;
        } else if (input.coupon === "SAVE10" || input.itemCount > 15) {
          total = total * 0.92;
        } else {
          total = total * 0.98;
        }
      }
    } else if (input.subtotal > 50) {
      if (input.country === "US" || input.country === "CA") {
        if (input.isWeekend && input.coupon === "WELCOME") {
          total = total * 0.9;
        } else if (input.itemCount > 4 && !input.isWeekend) {
          total = total * 0.94;
        } else {
          total = total * 0.97;
        }
      } else if (input.country === "UK" || input.country === "DE") {
        if (input.hour < 12 || input.coupon === "SAVE10") {
          total = total * 0.93;
        } else {
          total = total * 0.98;
        }
      } else {
        total = total * 0.99;
      }
    } else {
      if (input.coupon === "WELCOME" && input.membership === "gold") {
        total = total * 0.95;
      } else if (input.isWeekend || input.hour < 7) {
        total = total * 0.98;
      }
    }
  } else if (input.membership === "silver") {
    if (input.subtotal > 150) {
      if (input.country === "US") {
        if (input.isWeekend) {
          if (input.hour < 14 && input.itemCount > 3) {
            total = total * 0.88;
          } else if (input.coupon === "SAVE10" || input.coupon === "SAVE20") {
            total = total * 0.9;
          } else {
            total = total * 0.94;
          }
        } else if (input.itemCount > 10 && input.hour >= 9 && input.hour <= 17) {
          total = total * 0.91;
        } else {
          total = total * 0.96;
        }
      } else if (input.country === "UK" || input.country === "DE" || input.country === "FR") {
        if (input.coupon === "SAVE20" && input.subtotal > 200) {
          total = total * 0.87;
        } else if (input.isWeekend || input.itemCount > 7) {
          total = total * 0.93;
        } else {
          total = total * 0.97;
        }
      } else {
        total = total * 0.98;
      }
    } else if (input.subtotal > 40) {
      if (input.coupon === "SAVE10" || (input.isWeekend && input.itemCount > 2)) {
        total = total * 0.95;
      } else {
        total = total * 0.99;
      }
    }
  } else if (input.membership === "bronze") {
    if (input.subtotal > 80 && (input.country === "US" || input.country === "UK")) {
      if (input.coupon === "SAVE10" && input.itemCount > 5) {
        total = total * 0.92;
      } else if (input.coupon === "WELCOME" || input.isWeekend) {
        total = total * 0.96;
      } else {
        total = total * 0.99;
      }
    } else if (input.hour < 6 || input.hour > 23) {
      total = total * 0.97;
    }
  } else {
    if (input.coupon === "SAVE20" && input.subtotal > 250 && input.itemCount > 8) {
      total = total * 0.9;
    } else if (input.coupon === "WELCOME" || (input.isWeekend && input.country === "US")) {
      total = total * 0.97;
    }
  }

  if (total < 25) {
    if (input.country === "US" || input.country === "CA") {
      if (input.membership === "gold") {
        total = total + 2;
      } else if (input.membership === "silver") {
        total = total + 4;
      } else if (input.membership === "bronze" && !input.isWeekend) {
        total = total + 6;
      } else {
        total = total + 8;
      }
    } else if (input.country === "UK" || input.country === "DE") {
      if (input.membership === "gold" || input.coupon === "WELCOME") {
        total = total + 3;
      } else {
        total = total + 7;
      }
    } else {
      total = total + 10;
    }
  } else if (total < 75) {
    if (input.itemCount > 3 && input.membership !== "gold") {
      if (input.country === "US") {
        total = total + 1;
      } else if (input.country === "UK" || input.country === "DE") {
        total = total + 2;
      }
    }
  }

  return Math.round(total * 100) / 100;
}

export function routeSupportTicket(ticket: SupportTicket): string {
  switch (ticket.category) {
    case "billing":
      if (ticket.severity === "critical") {
        if (ticket.isVip) {
          if (ticket.language === "es" || ticket.language === "pt") {
            if (ticket.isBusinessHours) {
              return "billing-vip-latam-day";
            } else {
              return "billing-vip-latam-night";
            }
          } else if (ticket.language === "fr" || ticket.language === "de") {
            if (ticket.isBusinessHours && ticket.messageLength > 200) {
              return "billing-vip-eu-long";
            } else if (ticket.isBusinessHours) {
              return "billing-vip-eu-day";
            } else {
              return "billing-vip-eu-night";
            }
          } else {
            if (ticket.messageLength > 500 || !ticket.isBusinessHours) {
              return "billing-vip-oncall";
            } else {
              return "billing-vip-queue";
            }
          }
        } else {
          if (ticket.language !== "en" && ticket.messageLength > 100) {
            if (ticket.isBusinessHours) {
              return "billing-l10n-day";
            } else {
              return "billing-l10n-night";
            }
          } else if (ticket.isBusinessHours) {
            return "billing-critical-day";
          } else {
            return "billing-critical-night";
          }
        }
      } else if (ticket.severity === "high") {
        if (ticket.isVip && (ticket.language === "en" || ticket.isBusinessHours)) {
          return "billing-high-vip";
        } else if (ticket.messageLength > 300 && !ticket.isBusinessHours) {
          return "billing-high-async";
        } else if (ticket.language === "ja" || ticket.language === "zh") {
          return "billing-high-apac";
        } else {
          return "billing-high";
        }
      } else if (ticket.severity === "medium") {
        if (ticket.isVip) {
          return "billing-medium-vip";
        } else if (ticket.isBusinessHours && ticket.messageLength < 80) {
          return "billing-medium-chat";
        } else {
          return "billing-medium";
        }
      } else {
        if (ticket.language !== "en" || ticket.messageLength > 1000) {
          return "billing-low-specialist";
        } else {
          return "billing-low";
        }
      }
    case "technical":
      if (ticket.severity === "critical") {
        if (ticket.isVip) {
          if (ticket.isBusinessHours) {
            if (ticket.language === "en") {
              return "tech-vip-sev1";
            } else if (ticket.language === "es" || ticket.language === "pt") {
              return "tech-vip-sev1-latam";
            } else {
              return "tech-vip-sev1-intl";
            }
          } else {
            return "tech-vip-sev1-oncall";
          }
        } else if (ticket.messageLength > 400 && ticket.language !== "en") {
          return "tech-sev1-l10n";
        } else if (ticket.isBusinessHours || ticket.messageLength > 800) {
          return "tech-sev1";
        } else {
          return "tech-sev1-pager";
        }
      } else if (ticket.severity === "high") {
        if (ticket.isVip || (ticket.isBusinessHours && ticket.messageLength > 250)) {
          if (ticket.language === "fr" || ticket.language === "de") {
            return "tech-high-eu";
          } else {
            return "tech-high-priority";
          }
        } else if (!ticket.isBusinessHours && ticket.language !== "en") {
          return "tech-high-followup";
        } else {
          return "tech-high";
        }
      } else if (ticket.severity === "medium") {
        if (ticket.isBusinessHours && !ticket.isVip && ticket.messageLength < 120) {
          return "tech-medium-chat";
        } else if (ticket.isVip) {
          return "tech-medium-vip";
        } else {
          return "tech-medium";
        }
      } else {
        return "tech-low";
      }
    case "account":
      if (ticket.severity === "critical" || (ticket.isVip && ticket.severity === "high")) {
        if (ticket.language === "en" && ticket.isBusinessHours) {
          return "account-urgent";
        } else if (ticket.language !== "en" && ticket.isBusinessHours) {
          return "account-urgent-l10n";
        } else {
          return "account-urgent-oncall";
        }
      } else if (ticket.severity === "high") {
        if (ticket.messageLength > 200 || ticket.isVip) {
          return "account-high";
        } else {
          return "account-high-selfserve";
        }
      } else if (ticket.severity === "medium" && ticket.isBusinessHours) {
        return "account-medium";
      } else if (ticket.language === "es" || ticket.language === "pt" || ticket.language === "fr") {
        return "account-l10n";
      } else {
        return "account-general";
      }
    case "shipping":
      if (ticket.severity === "critical") {
        if (ticket.isVip && ticket.isBusinessHours) {
          return "shipping-vip-same-day";
        } else if (ticket.isVip) {
          return "shipping-vip-after-hours";
        } else if (ticket.language !== "en" && ticket.messageLength > 150) {
          return "shipping-critical-l10n";
        } else {
          return "shipping-critical";
        }
      } else if (ticket.severity === "high" || ticket.severity === "medium") {
        if (ticket.isBusinessHours && (ticket.isVip || ticket.messageLength > 90)) {
          return "shipping-priority";
        } else if (!ticket.isBusinessHours && ticket.isVip) {
          return "shipping-priority-night";
        } else {
          return "shipping-standard";
        }
      } else {
        return "shipping-low";
      }
    default:
      if (ticket.isVip && ticket.severity === "critical") {
        return "general-vip-escalation";
      } else if (ticket.isVip || (ticket.severity === "high" && ticket.isBusinessHours)) {
        return "general-priority";
      } else if (ticket.language !== "en") {
        return "general-l10n";
      } else {
        return "general";
      }
  }
}

export function scoreLoanApplication(applicants: Applicant[], requested: number): number {
  let score = 0;

  for (let i = 0; i < applicants.length; i++) {
    const applicant = applicants[i];

    if (applicant.age >= 18) {
      if (applicant.age < 25) {
        if (applicant.creditScore > 720 && applicant.employed && applicant.income > 40000) {
          if (requested < 15000) {
            score = score + 20;
          } else if (requested < 30000 && applicant.income > 55000) {
            score = score + 12;
          } else {
            score = score - 5;
          }
        } else if (applicant.creditScore > 650 || (applicant.employed && applicant.income > 30000)) {
          if (requested < 10000) {
            score = score + 8;
          } else {
            score = score - 2;
          }
        } else {
          score = score - 15;
        }
      } else if (applicant.age < 40) {
        if (applicant.creditScore > 750 && applicant.employed) {
          if (applicant.income > 80000 || requested < 25000) {
            score = score + 30;
          } else if (applicant.income > 50000 && requested < 50000) {
            score = score + 18;
          } else {
            score = score + 6;
          }
        } else if (applicant.creditScore > 680 && (applicant.employed || applicant.income > 45000)) {
          if (requested < 20000) {
            score = score + 14;
          } else if (requested < 40000 && applicant.creditScore > 700) {
            score = score + 9;
          } else {
            score = score + 1;
          }
        } else if (!applicant.employed && applicant.creditScore < 600) {
          score = score - 20;
        } else {
          score = score - 4;
        }
      } else if (applicant.age < 65) {
        if (applicant.employed && applicant.creditScore > 700 && applicant.income > 60000) {
          if (requested < 40000) {
            score = score + 24;
          } else if (requested < 80000 || applicant.income > 100000) {
            score = score + 16;
          } else {
            score = score + 4;
          }
        } else if (applicant.creditScore > 640 || applicant.income > 50000) {
          score = score + 7;
        } else {
          score = score - 8;
        }
      } else {
        if (applicant.creditScore > 760 && requested < 20000) {
          score = score + 10;
        } else if (applicant.employed || applicant.income > 35000) {
          score = score + 3;
        } else {
          score = score - 10;
        }
      }

      for (let j = 0; j < applicant.debts.length; j++) {
        const debt = applicant.debts[j];

        if (debt.kind === "mortgage") {
          if (debt.monthsLate > 0) {
            if (debt.amount > 10000 || requested > 50000) {
              if (debt.monthsLate > 3 && applicant.creditScore < 700) {
                score = score - 25;
              } else if (debt.monthsLate > 1 || debt.amount > 25000) {
                score = score - 12;
              } else {
                score = score - 4;
              }
            } else if (applicant.income < 40000 && !applicant.employed) {
              score = score - 8;
            }
          } else if (debt.amount > 200000 && requested > 30000) {
            score = score - 3;
          } else {
            score = score + 2;
          }
        } else if (debt.kind === "credit_card") {
          if (debt.amount > 8000 && debt.monthsLate > 0) {
            if (applicant.creditScore < 650 || !applicant.employed) {
              score = score - 18;
            } else if (debt.monthsLate > 2 && requested > 15000) {
              score = score - 10;
            } else {
              score = score - 5;
            }
          } else if (debt.amount > 3000 || debt.monthsLate > 0) {
            score = score - 2;
          } else {
            score = score + 1;
          }
        } else if (debt.kind === "auto" || debt.kind === "student") {
          if (debt.monthsLate > 2 && (debt.amount > 5000 || requested > 20000)) {
            score = score - 9;
          } else if (debt.monthsLate > 0 && applicant.age < 25) {
            score = score - 6;
          } else if (debt.amount < 4000 && applicant.employed) {
            score = score + 1;
          }
        } else {
          if (debt.monthsLate > 0 && debt.amount > 1000) {
            score = score - 7;
          } else if (!applicant.employed && debt.amount > 500) {
            score = score - 3;
          }
        }
      }
    } else {
      score = score - 50;
    }
  }

  if (requested > 100000) {
    if (applicants.length > 1) {
      score = score + 5;
    } else {
      score = score - 15;
    }
  } else if (requested > 50000 && applicants.length === 1) {
    score = score - 6;
  }

  return score;
}
