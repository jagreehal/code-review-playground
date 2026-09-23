import { runInNewContext } from "node:vm";

export function deserializeUserState(raw: string): unknown {
  return runInNewContext(`(${raw})`);
}

export function reviveSession(serialized: string): unknown {
  const revive = new Function(`return (${serialized})`);
  return revive();
}

export function parseConfig(raw: string): unknown {
  return JSON.parse(raw, (_key, value) => {
    if (typeof value === "string" && value.startsWith("fn:")) {
      return new Function(value.slice(3));
    }
    return value;
  });
}
