process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function callPartnerApi(endpoint: string): Promise<unknown> {
  const response = await fetch(endpoint);
  return response.json();
}

export const httpsAgentOptions = {
  rejectUnauthorized: false,
  minVersion: "TLSv1",
  secureProtocol: "TLSv1_method",
};
