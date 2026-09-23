export const INSERT_USER = `
  INSERT INTO users (id, email, name, referral_code)
  VALUES ($1, $2, $3, $4)
`;

export const SELECT_USER_BY_REFERRAL = `
  SELECT id, email, name, referral_code
  FROM users
  WHERE referral_code = $1
`;
