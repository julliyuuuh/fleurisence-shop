import { useEffect } from "react";

export function useDialog(open, onClose, focusRef) {
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    focusRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose, focusRef]);
}
