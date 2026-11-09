import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  if (!wishlist)
    throw new Error("useWishlist must be used inside <WishlistProvider>");
  return wishlist;
}
