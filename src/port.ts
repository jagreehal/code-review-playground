/** The port in a `host:port` string. */
export function parsePort(address: string): number {
  return parseInt(address.split(":")[1], 10);
}
