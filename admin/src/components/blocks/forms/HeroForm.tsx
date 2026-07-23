"use client";

import { ChangeEvent } from "react";

export interface HeroData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

interface HeroFormProps {
  value: HeroData;
  onChange: (value: HeroData) => void;
}

export default function HeroForm({
  value,
  onChange,
}: HeroFormProps) {
  const handleChange =
    (field: keyof HeroData) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        [field]: e.target.value,
      });
    };

  return (
    <div className="space-y-4">

      <div>
        <label className="mb-1 block text-sm font-medium">
          Title
        </label>

        <input
          className="w-full rounded border p-2"
          value={value.title}
          onChange={handleChange("title")}
          placeholder="Enter Hero Title"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Subtitle
        </label>

        <input
          className="w-full rounded border p-2"
          value={value.subtitle}
          onChange={handleChange("subtitle")}
          placeholder="Enter Subtitle"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Button Text
        </label>

        <input
          className="w-full rounded border p-2"
          value={value.buttonText}
          onChange={handleChange("buttonText")}
          placeholder="Get Started"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Button Link
        </label>

        <input
          className="w-full rounded border p-2"
          value={value.buttonLink}
          onChange={handleChange("buttonLink")}
          placeholder="/about"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Background Image URL
        </label>

        <input
          className="w-full rounded border p-2"
          value={value.backgroundImage}
          onChange={handleChange("backgroundImage")}
          placeholder="https://..."
        />
      </div>

    </div>
  );
}