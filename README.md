# Weecom Product Dashboard

A React + TypeScript application for managing products, using **TanStack Query**, **React Router**, and **Shadcn UI** components. Supports viewing, adding, editing, and deleting products from [dummyjson.com](https://dummyjson.com).

---

## Features

- Dashboard with product search, category filter, and pagination  
- Add / Edit / Delete products with modal dialogs  
- Optimistic updates for a responsive UI  
- Uses React Query for data fetching and cache management  
- Tailwind CSS + Shadcn UI for styling  

---

## (Important) Optimistic Updates Note

This project uses optimistic updates for adding, editing, and deleting products. Since DummyJSON
 is a mock API, changes made via POST, PUT, or DELETE requests are not persisted on the server.

To give the user a smooth experience, the frontend immediately updates the UI when a mutation is triggered. If the request fails, the previous state is restored, and an error toast is shown. This approach ensures a responsive interface even though the backend does not retain changes.

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/somnath-choudhury/weecom
   cd weecom
   ```
2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Start the server**
    ```bash
    npm run dev
    ```

4. Open in browser
    ```bash
    http://localhost:5173
    ```

---

## Usage
- On the Dashboard, click Go to Inventory to view products

- Use Search and Category filter to find products

- Click Add Product to create a new product

- Use Edit and Delete buttons in the table to manage products

- Pagination buttons allow navigating through product pages

## Technologies Used

- React + TypeScript

- TanStack Query (React Query)

- React Router

- Tailwind CSS

- Shadcn UI Components
