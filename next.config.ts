import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/config/language.ts");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
