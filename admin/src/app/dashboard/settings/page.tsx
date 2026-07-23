import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-gray-400">
          Manage your website settings.
        </p>
      </div>

      <SettingsForm />
    </div>
  );
}