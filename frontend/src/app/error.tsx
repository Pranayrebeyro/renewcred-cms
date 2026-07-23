"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  console.error(error);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">
        Something went wrong
      </h1>

      <button
        onClick={reset}
        className="mt-6 rounded bg-blue-600 px-6 py-3 text-white"
      >
        Try Again
      </button>
    </main>
  );
}