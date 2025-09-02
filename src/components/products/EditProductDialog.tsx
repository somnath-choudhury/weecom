import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/lib/api";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditProductDialogProps {
  product: Product;
  skip: number;
  search: string;
  category: string;
}

export function EditProductDialog({
  product,
  skip,
  search,
  category,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => updateProduct(product.id, { title, price }),
    onMutate: async (updatedProduct) => {
      await queryClient.cancelQueries({
        queryKey: ["products", skip, search, category],
      });

      const previousData = queryClient.getQueryData<{ products: Product[] }>([
        "products",
        skip,
        search,
        category,
      ]);

      if (previousData) {
        queryClient.setQueryData(["products", skip, search, category], {
          ...previousData,
          products: previousData.products.map((p) =>
            p.id === product.id ? { ...p, title, price } : p
          ),
        });
      }

      return { previousData };
    },
    onError: (_err, _variables, context: any) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["products", skip, search, category],
          context.previousData
        );
      }
      toast.error("Failed to update product");
    },
    onSuccess: () => {
      toast.success("Product updated!");
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
