import type { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductButton } from "./DeleteProductButton";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  skip: number;
  search: string;
  category: string;
}

export function ProductTable({
  products,
  isLoading,
  skip,
  search,
  category,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="text-slate-500">No products found.</p>;
  }

  return (
    <table className="w-full table-auto border border-slate-200 rounded-md">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-right">Price</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-right">Stock</th>
          <th className="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="px-4 py-2">{p.title}</td>
            <td className="px-4 py-2 text-right">{p.price}</td>
            <td className="px-4 py-2 capitalize">{p.category}</td>
            <td className="px-4 py-2 text-right">{p.stock}</td>
            <td className="px-4 py-2 text-right flex justify-end gap-2">
              <EditProductDialog product={p} skip={skip} search={search} category={category}/>
              <DeleteProductButton 
              id={p.id}
              skip={skip}
              search={search}
              category={category}
               />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
