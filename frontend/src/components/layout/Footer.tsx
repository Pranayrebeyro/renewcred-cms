export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <h2 className="text-lg font-semibold">
          RenewCred CMS
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Build modern websites powered by your CMS.
        </p>

        <p className="mt-4 text-sm text-gray-400">
          © {new Date().getFullYear()} RenewCred CMS. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}