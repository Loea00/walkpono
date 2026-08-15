"use client";

export default function DeleteButton({
  action,
  confirmMessage = "Are you sure you want to delete this?",
}: {
  action: () => Promise<void>;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-sm text-clay-600 hover:underline">
        Delete
      </button>
    </form>
  );
}
