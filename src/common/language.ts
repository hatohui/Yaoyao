export const SUPPORTED_LANGS = ["en", "zh", "vi", "th"] as const;

export type Language = (typeof SUPPORTED_LANGS)[number];
