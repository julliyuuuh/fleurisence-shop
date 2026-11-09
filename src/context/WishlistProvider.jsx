import { WishlistContext } from "./WishlistContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage("fleurisence-wishlist", []);

  const isSaved = (id) => ids.includes(id);

  const toggle = (id) =>
    setIds((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    );

  const clear = () => setIds([]);

  return (
    <WishlistContext.Provider value={{ ids, isSaved, toggle, clear }}>
      {children}
    </WishlistContext.Provider>
  );
}
