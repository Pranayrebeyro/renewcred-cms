import prisma from "../config/prisma";
import { SettingsInput } from "../validators/settings.validator";

export async function getSettings() {
  let settings = await prisma.settings.findFirst();

  if (!settings) {
    settings = await prisma.settings.create({
      data: {
        siteName: "RenewCred CMS",
      },
    });
  }

  return settings;
}

export async function updateSettings(data: SettingsInput) {
  const existing = await prisma.settings.findFirst();

  if (!existing) {
    return prisma.settings.create({
      data,
    });
  }

  return prisma.settings.update({
    where: {
      id: existing.id,
    },
    data,
  });
}