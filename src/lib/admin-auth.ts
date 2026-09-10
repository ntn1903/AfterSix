export const ADMIN_COOKIE_NAME = "aftersix_admin";

const DEFAULT_ADMIN_PASSWORD = "aftersix-admin";

/**
 * Demo-grade auth: cookie value must equal ADMIN_PASSWORD env var.
 * Set a strong ADMIN_PASSWORD in production; do not rely on the fallback default.
 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}
