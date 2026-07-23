"use client";

import HeroForm, { HeroData } from "./forms/HeroForm";

export type BlockType =
  | "hero"
  | "text"
  | "image"
  | "button"
  | "gallery";

interface Props {
  type: BlockType;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export default function DynamicBlockForm({
  type,
  value,
  onChange,
}: Props) {
  switch (type) {
    case "hero":
      return (
        <HeroForm
          value={
            value as HeroData
          }
          onChange={(data) =>
            onChange(data)
          }
        />
      );

    case "text":
      return (
        <div className="rounded border p-4">
          Text Form (Coming Soon)
        </div>
      );

    case "image":
      return (
        <div className="rounded border p-4">
          Image Form (Coming Soon)
        </div>
      );

    case "button":
      return (
        <div className="rounded border p-4">
          Button Form (Coming Soon)
        </div>
      );

    case "gallery":
      return (
        <div className="rounded border p-4">
          Gallery Form (Coming Soon)
        </div>
      );

    default:
      return (
        <div className="rounded border border-red-300 bg-red-50 p-4">
          Unknown Block Type
        </div>
      );
  }
}