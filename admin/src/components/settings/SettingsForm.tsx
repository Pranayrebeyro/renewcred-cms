"use client";

import { useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
} from "@/services/settings.service";

import { Settings } from "@/types/settings";

export default function SettingsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");

  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);

      const data: Settings = await getSettings();

      setSiteName(data.siteName ?? "");
      setSiteDescription(data.siteDescription ?? "");

      setContactEmail(data.contactEmail ?? "");
      setPhone(data.phone ?? "");
      setAddress(data.address ?? "");

      setFacebook(data.facebook ?? "");
      setInstagram(data.instagram ?? "");
      setLinkedin(data.linkedin ?? "");
      setTwitter(data.twitter ?? "");

      setSeoTitle(data.seoTitle ?? "");
      setSeoDescription(data.seoDescription ?? "");
    } catch (error) {
      console.error(error);
      alert("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateSettings({
        siteName,
        siteDescription,
        contactEmail,
        phone,
        address,
        facebook,
        instagram,
        linkedin,
        twitter,
        seoTitle,
        seoDescription,
      });

      alert("Settings updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-slate-900 p-6 text-center text-white">
        Loading settings...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* General */}

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          General Settings
        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block font-medium text-white">
              Site Name
            </label>

            <input
              value={siteName}
              onChange={(e) =>
                setSiteName(e.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-white">
              Site Description
            </label>

            <textarea
              rows={4}
              value={siteDescription}
              onChange={(e) =>
                setSiteDescription(e.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            />

          </div>

        </div>

      </div>

      {/* Contact */}

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Contact Information
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Email"
            value={contactEmail}
            onChange={(e) =>
              setContactEmail(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <textarea
            rows={3}
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

        </div>

      </div>

      {/* Social */}

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Social Links
        </h2>

        <div className="space-y-5">

          <input
            placeholder="Facebook URL"
            value={facebook}
            onChange={(e) =>
              setFacebook(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            placeholder="Instagram URL"
            value={instagram}
            onChange={(e) =>
              setInstagram(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) =>
              setLinkedin(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <input
            placeholder="Twitter URL"
            value={twitter}
            onChange={(e) =>
              setTwitter(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

        </div>

      </div>

      {/* SEO */}

      <div className="rounded-xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold text-white">
          SEO Settings
        </h2>

        <div className="space-y-5">

          <input
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) =>
              setSeoTitle(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

          <textarea
            rows={4}
            placeholder="SEO Description"
            value={seoDescription}
            onChange={(e) =>
              setSeoDescription(e.target.value)
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />

        </div>

      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>

    </form>
  );
}