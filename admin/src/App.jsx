import MainLayout from "./components/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  Dashboard,
  Addblog,
  Orders,
  Addcolor,
  Addblogcat,
  Blogcatlist,
  Addbrand,
  Addproduct,
  Bloglist,
  Customers,
  Enquiries,
  Brandlist,
  Colorlist,
  Addcat,
  Couponlist,
  Productlist,
  Categorylist,
  ViewEnq,
  ViewOrder,
  AddCoupon,
} from "./pages";
import { OpenRoutes, PrivateRoutes } from "./routing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route
          path="/admin/"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="orders" element={<Orders />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="category" element={<Addcat />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="customers" element={<Customers />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
