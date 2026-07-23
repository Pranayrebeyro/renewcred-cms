import { pageService } from "@/services/page.service";
import BlockRenderer from "@/components/blocks/BlockRenderer";

export default async function HomePage() {
  try {
    const pages = await pageService.getAllPages();

    if (!pages.length) {
      return (
        <main className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            Welcome to RenewCred CMS
          </h1>

          <p className="mt-4 text-gray-600">
            No published pages are available.
          </p>
        </main>
      );
    }

    const homePage = pages.find(
      (page) => page.slug.toLowerCase() === "home"
    ) || pages[0];

    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold">
          {homePage.title}
        </h1>

        {homePage.description && (
          <p className="mb-8 text-gray-600">
            {homePage.description}
          </p>
        )}

        <div className="space-y-8">
          {homePage.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
            />
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold text-red-600">
          Failed to load website
        </h1>

        <p className="mt-4">
          Please make sure the backend server is running.
        </p>
      </main>
    );
  }
}