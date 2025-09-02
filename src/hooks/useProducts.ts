import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import type { ProductResponse } from "@/types/product";

export function useProducts(
  skip: number = 0,
  search: string = "",
  category: string = "all"
) {
  return useQuery<ProductResponse, Error>({
    queryKey: ["products", skip, search, category],
    queryFn: () => fetchProducts(skip, search, category),
    staleTime: 10_000,
  });
}


