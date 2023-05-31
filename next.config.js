/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  env: {
    USER_BASE_URL: process.env.USER_BASE_URL,
    AUTH_BASE_URL: process.env.AUTH_BASE_URL,
    JITSI_BASE_URL: process.env.JITSI_BASE_URL,
    GOOGLE_CLIENT_ID: "510701896699-nscm4ih91rgjnjosdfhc0ibj0e620kp7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    JWT_SECRET: "eec8fd5c947d380ca3672f092e9b0f7e"
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
