// import { useState } from "react";
// import { Layout } from "./Layout";
// import { useProducts } from "@/hooks/useProducts";
// import { ProductTable } from "../products/ProductsTable";
// import { AddProductDialog } from "../products/AddProductDialog";

// const Dashboard = () => {
//   const [skip, setSkip] = useState(0);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");

//   const { data, isLoading, isError } = useProducts(skip, search, category);

//   return (
//     <Layout>
//       <div className="mb-4 flex items-center justify-between">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="border rounded-md px-2 py-1"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border rounded-md px-2 py-1"
//           >
//             <option value="all">All categories</option>
//             <option value="smartphones">Smartphones</option>
//             <option value="laptops">Laptops</option>
//             <option value="fragrances">Fragrances</option>
//             <option value="groceries">Groceries</option>
//           </select>
//         </div>

//         {/* Add Product Dialog */}
//         <AddProductDialog skip={skip} search={search} category={category} />
//       </div>

//       {isError && <p className="text-red-500">Failed to load products.</p>}

//       <ProductTable
//         products={data?.products ?? []}
//         isLoading={isLoading}
//         onEdit={() => {}}
//         onDelete={() => {}}
//         skip={skip}
//         search={search}
//         category={category}
//       />

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between">
//         <button
//           className="px-3 py-1 border rounded-md"
//           disabled={skip === 0}
//           onClick={() => setSkip((s) => Math.max(0, s - 10))}
//         >
//           Prev
//         </button>
//         <button
//           className="px-3 py-1 border rounded-md"
//           disabled={data ? skip + 10 >= data.total : true}
//           onClick={() => setSkip((s) => s + 10)}
//         >
//           Next
//         </button>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
