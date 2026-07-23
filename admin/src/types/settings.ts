export interface Settings {
  id: string;

  siteName: string;
  siteDescription: string | null;

  logo: string | null;
  favicon: string | null;

  contactEmail: string | null;
  phone: string | null;
  address: string | null;

  facebook: string | null;
  instagram: string | null;
  linkedin: string | null;
  twitter: string | null;

  seoTitle: string | null;
  seoDescription: string | null;

  createdAt: string;
  updatedAt: string;
}