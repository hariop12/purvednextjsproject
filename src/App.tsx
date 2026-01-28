import React, { useEffect, useState } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog"; // ✅ FIXED casing
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Careers from "./pages/Careers";

import AdminPage from "./pages/admin"; // ✅ ADMIN ENTRY

import ScrollToTop from "./components/ScrollToTop";
import ArmouryIntro from "./components/ArmouryIntro";
import FloatingIcons from "./components/FloatingIcons";
import AppwriteTest from "./debug/AppwriteTest";
import "./admin.css";

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowIntro(true);

      const t = setTimeout(() => {
        setShowIntro(false);
      }, 1400);

      return () => clearTimeout(t);
    } else {
      setShowIntro(false);
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* 🌐 PUBLIC WEBSITE */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/services" element={<Services />} />

          <Route path="/debug" element={<AppwriteTest />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 🔐 ADMIN (SINGLE URL ONLY) */}
        <Route path="/admin" element={<AdminPage />} />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <FloatingIcons />

      <ArmouryIntro
        show={showIntro}
        onFinish={() => setShowIntro(false)}
        durationMs={2000}
        logoSrc="/logo2.png"
      />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
