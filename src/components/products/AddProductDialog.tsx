
import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import type { Product } from "@/types/product";
import { toast } from "sonner";


export const AddProductDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();

  const mutation = useMutation({
    mutationFn: () => addProduct({ title, price, category: "misc", stock}),
    onSuccess: (newProduct: Product) => {
      queryClient.setQueryData(["products", 0, "", "all"], (old: any) => {
        if (!old) return { products: [newProduct], total: 1 };
        return {
          ...old,
          products: [newProduct, ...old.products],
          total: old.total + 1,
        };
      });

      toast.success("Product added!");
      setOpen(false);
      setTitle("");
      setPrice(0);
    },
    onError: () => toast.error("Failed to add product"),
  });

  return (

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              mutation.mutate();
            }}
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
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
  );
};
