import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({
  id,
  skip = 0,
  search = "",
  category = "",
}: {
  id: number;
  skip?: number;
  search?: string;
  category?: string;
}) {
  const mutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["products", skip, search, category],
      });

      const previousData = queryClient.getQueryData<any>([
        "products",
        skip,
        search,
        category,
      ]);

      queryClient.setQueryData(
        ["products", skip, search, category],
        (old: any) => ({
          ...old,
          products: old?.products.filter((p: any) => p.id !== id),
        })
      );

      return { previousData };
    },
    onError: (_err, _, context: any) => {
    //   toast.error("Failed to delete product");
      if (context?.previousData) {
        queryClient.setQueryData(
          ["products", skip, search, category],
          context.previousData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", skip, search, category],
      });
    },
    // onSuccess: () => toast.success("Product deleted!"),
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product?")) {
      mutation.mutate();
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={mutation.isPending}
    >
      Delete
    </Button>
  );
}
