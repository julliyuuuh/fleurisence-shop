import { lazy, Suspense, useCallback, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { MotionConfig, motion } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ScrollManager from "./components/ScrollManager";
import RequireAuth from "./components/RequireAuth";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

// The landing page loads right away. Every other page is downloaded only
// when someone visits it ("code splitting"), so the first load stays light.
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CreditsPage = lazy(() => import("./pages/CreditsPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useAuth } from "./hooks/useAuth";
import { defaultSize, findProduct, priceFor } from "./data/products";
import { getTotals } from "./data/pricing";
import { createOrder } from "./data/orders";
import { ease } from "./lib/motion";

export default function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Cart + orders live here, ABOVE the pages, so every page can reach them
  // and they survive page changes (and refreshes, thanks to localStorage).
  const [cart, setCart] = useLocalStorage("fleurisence-cart", []);
  const [orders, setOrders] = useLocalStorage("fleurisence-orders", []);
  const [cartOpen, setCartOpen] = useState(false);

  function addToCart(product, { size, date = "", message = "" } = {}) {
    const chosenSize = size ?? defaultSize(product);
    const key = [product.id, chosenSize, date, message].join("|");
    setCart((current) => {
      if (current.some((line) => line.key === key)) {
        return current.map((line) =>
          line.key === key ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [
        ...current,
        { key, id: product.id, size: chosenSize, date, message, qty: 1 },
      ];
    });
  }

  function changeQty(key, delta) {
    setCart((current) =>
      current
        .map((line) =>
          line.key === key ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(key) {
    setCart((current) => current.filter((line) => line.key !== key));
  }

  // The cart only stores choices; product details are looked up fresh.
  const cartLines = cart
    .map((line) => {
      const product = findProduct(line.id);
      return product
        ? { ...product, ...line, price: priceFor(product, line.size) }
        : null;
    })
    .filter(Boolean);

  function placeOrder(details) {
    const order = createOrder(
      cartLines,
      details,
      getTotals(cartLines, details.promo),
    );
    setOrders((current) => [order, ...current]);
    setCart([]);
    return order.id;
  }

  function clearMyData() {
    setCart([]);
    setOrders((current) => current.filter((o) => o.userEmail !== user?.email));
  }

  const myOrders = orders.filter((o) => o.userEmail === user?.email);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0);

  return (
    // "user" follows the device setting; Settings can switch it to
    // "always" (calm) or "never" (full motion).
    <MotionConfig reducedMotion={user?.prefs.motion ?? "user"}>
      <ScrollManager />
      <Header cartCount={cartCount} onCartClick={openCart} />

      {/* Re-keyed on every page change, so each page fades in gently */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
        className="min-h-[70vh]"
      >
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<LandingPage onAdd={addToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/signin" element={<SignInPage />} />

            {/* Everything inside needs an account */}
            <Route element={<RequireAuth />}>
              <Route
                path="/home"
                element={<HomePage onAdd={addToCart} orders={myOrders} />}
              />
              <Route path="/shop" element={<ShopPage onAdd={addToCart} />} />
              <Route
                path="/shop/:id"
                element={<ProductPage onAdd={addToCart} onOpenCart={openCart} />}
              />
              <Route
                path="/wishlist"
                element={<WishlistPage onAdd={addToCart} />}
              />
              <Route
                path="/checkout"
                element={
                  <CheckoutPage lines={cartLines} onPlaceOrder={placeOrder} />
                }
              />
              <Route
                path="/order/:id"
                element={<OrderPage orders={myOrders} />}
              />
              <Route path="/account" element={<AccountPage orders={myOrders} />} />
              <Route
                path="/settings"
                element={<SettingsPage onClearData={clearMyData} />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>

      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        cart={cartLines}
        onChangeQty={changeQty}
        onRemove={removeFromCart}
      />
    </MotionConfig>
  );
}
