/**
 * Shared runtime config read from environment variables.
 *
 * USE_MOCK_DATA — when "true", all services return local mock data instead of
 * hitting a real backend. Flip to "false" in .env.local (or your hosting
 * environment) once a real API is available.
 */
export const USE_MOCK_DATA = process.env.USE_MOCK_DATA !== "false";
