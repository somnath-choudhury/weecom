import { Button } from "@/components/ui/button";

export function PaginationControls({
  page,
  setPage,
}: {
  page: number;
  setPage: (n: number) => void;
}) {
  return (
    <div className="flex justify-between mt-4">
      <Button
        variant="outline"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </Button>
      <Button variant="outline" onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
}
