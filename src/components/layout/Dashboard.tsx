import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProductTable } from "@/components/products/ProductsTable";

export default function Dashboard() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data, isLoading, isError } = useProducts(skip, search, category);

  const total = data?.total ?? 0;

  const pageSize = 10;

  const currentPage = Math.floor(skip / pageSize) + 1;

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="all">All categories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
      </div>

      {isError && <p className="text-red-500">Failed to load products.</p>}

      <ProductTable
        products={data?.products ?? []}
        isLoading={isLoading}
        onEdit={() => {}}
        onDelete={() => {}}
        skip={skip}
        search={search}
        category={category}
      />

      <div className="mt-4 flex justify-between">
        <p>
          Showing page {currentPage} of {totalPages} | Total products: {total}
        </p>
        <button
          className="px-3 py-1 border rounded-md cursor-pointer"
          disabled={skip === 0}
          onClick={() => setSkip((s) => Math.max(0, s - 10))}
        >
          &larr; Prev
        </button>
        <button
          className="px-3 py-1 border rounded-md cursor-pointer"
          disabled={data ? skip + 10 >= data.total : true}
          onClick={() => setSkip((s) => s + 10)}
        >
          Next &rarr;
        </button>
      </div>
    </Layout>
  );
}
