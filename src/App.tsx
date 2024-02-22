import React, { useEffect } from "react";
import "./App.css";
import { fetchProductsData } from "./store/productSlice";
import { AppDispatch } from "./store/index";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProductList from "./pages/ProductList/productList";
import ProductDetailsPage from "./pages/productDetailsPage";

const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductList />,
  },
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
