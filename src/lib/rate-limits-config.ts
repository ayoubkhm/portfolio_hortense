export const RATE_LIMITS = {
  LOGIN: { max: 5, windowMs: 15 * 60 * 1000 },
  PASSWORD_RESET_IP: { max: 10, windowMs: 15 * 60 * 1000 },
  PASSWORD_RESET_EMAIL: { max: 3, windowMs: 15 * 60 * 1000 },
  CONTACT_FORM: { max: 5, windowMs: 15 * 60 * 1000 },
  CREATE_USER: { max: 10, windowMs: 60 * 60 * 1000 },
  UPDATE_USER: { max: 20, windowMs: 60 * 60 * 1000 },
  DELETE_USER: { max: 5, windowMs: 60 * 60 * 1000 },
  VIEW_SUBMISSIONS: { max: 30, windowMs: 15 * 60 * 1000 },
} as const;
