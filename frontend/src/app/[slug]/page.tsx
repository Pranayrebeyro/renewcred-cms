import { notFound } from "next/navigation";
import { pageService } from "@/services/page.service";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import { Page, Block } from "@/types/page";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DynamicPage({ params }: PageProps) {
  try {
    const { slug } = await params;

    const page: Page = await pageService.getPageBySlug(slug);

    if (!page) {
      notFound();
    }

    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="mb-2 text-4xl font-bold">
          {page.title}
        </h1>

        {page.description && (
          <p className="mb-8 text-gray-600">
            {page.description}
          </p>
        )}

        <div className="space-y-8">
          {page.blocks?.map((block: Block) => (
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
    notFound();
  }
}