import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ direct jump to top (NO smooth scroll)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
