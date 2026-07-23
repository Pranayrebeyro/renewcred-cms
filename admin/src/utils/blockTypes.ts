export const BLOCK_TYPES = [
  "Hero",
  "About",
  "Feature",
  "Gallery",
  "FAQ",
  "Contact",
  "Footer",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];