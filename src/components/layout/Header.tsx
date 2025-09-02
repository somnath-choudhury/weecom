import { AddProductDialog } from "../products/AddProductDialog";

export const Header = () => {
  return (
    <header className="border-b bg-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Weecom Products</h2>
      <AddProductDialog/>
    </header>
  );
};
