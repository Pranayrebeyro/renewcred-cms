"use client";

import { useEffect, useState } from "react";

import {
  getBlocks,
  createBlock,
  updateBlock,
  deleteBlock,
} from "@/services/block.service";

import { Block, BlockPayload } from "@/types/block";

import BlockForm from "@/components/blocks/BlockForm";
import BlockModal from "@/components/blocks/BlockModal";
import DeleteBlockModal from "@/components/blocks/DeleteBlockModal";
import BlockTable from "@/components/blocks/BlockTable";

export default function BlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      const response = await getBlocks();

      if (Array.isArray(response)) {
        setBlocks(response);
      } else {
        setBlocks(response.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    setEditingBlock(null);
    setOpenModal(true);
  };

  const handleEdit = (block: Block) => {
    setEditingBlock(block);
    setOpenModal(true);
  };

  const handleSubmit = async (data: BlockPayload) => {
    try {
      setLoading(true);

      if (editingBlock) {
        await updateBlock(editingBlock.id, data);
      } else {
        await createBlock(data);
      }

      await loadBlocks();

      setEditingBlock(null);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      alert("Failed to save block.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (block: Block) => {
    setSelectedBlock(block);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedBlock) return;

    try {
      setLoading(true);

      await deleteBlock(selectedBlock.id);

      await loadBlocks();

      setDeleteModal(false);
      setSelectedBlock(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete block.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Blocks
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all content blocks.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Create Block
        </button>

      </div>

      <BlockTable
        blocks={blocks}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <BlockModal
        open={openModal}
        title={editingBlock ? "Edit Block" : "Create Block"}
        onClose={() => {
          setEditingBlock(null);
          setOpenModal(false);
        }}
      >
        <BlockForm
          initialData={
            editingBlock
              ? {
                  pageId: editingBlock.pageId,
                  type: editingBlock.type,
                  title: editingBlock.title,
                  content: editingBlock.content,
                  order: editingBlock.order,
                }
              : undefined
          }
          onSubmit={handleSubmit}
          loading={loading}
        />
      </BlockModal>

      <DeleteBlockModal
        open={deleteModal}
        loading={loading}
        onClose={() => {
          setDeleteModal(false);
          setSelectedBlock(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}