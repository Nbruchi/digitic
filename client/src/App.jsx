import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Blogs,
  Cart,
  Checkout,
  Contact,
  ForgotPassword,
  Home,
  Login,
  Orders,
  PrivacyPolicy,
  Profile,
  RefundPolicy,
  ResetPassword,
  ShippingPolicy,
  Signup,
  SingleBlog,
  SingleProduct,
  Store,
  TermsAndConditions,
  Wishlist,
} from "./pages";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />
            <Route path="store" element={<Store />} />
            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <Wishlist />
                </PrivateRoutes>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
            <Route
              path="orders"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />
            <Route path="blogs/:id" element={<SingleBlog />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="terms-conditions" element={<TermsAndConditions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
