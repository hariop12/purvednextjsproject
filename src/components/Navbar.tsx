import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, Phone } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import logo from "./assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="w-full flex justify-center px-3">
        <div
          className={`w-full max-w-7xl rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 shadow-lg backdrop-blur-md border border-black/5"
              : "bg-white/80 backdrop-blur-sm border border-black/5"
          }`}
        >
          {/* ✅ Smaller padding for mobile */}
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3">
            {/* ✅ Logo smaller on mobile */}
            <Link
              to="/"
              className="flex items-center shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src={logo}
                alt="Purved Innovators"
                className="w-[42px] h-[42px] sm:w-[60px] sm:h-[60px] object-contain"
              />
            </Link>

            {/* ✅ Desktop Center Nav */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-agency-blue font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`transition-colors ${
                  isActive("/about")
                    ? "text-agency-orange font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                About
              </Link>

              <Link
                to="/services"
                className={`transition-colors ${
                  isActive("/services")
                    ? "text-agency-orange font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                Services
              </Link>

              <Link
                to="/Blog"
                className={`transition-colors ${
                  isActive("/Blog")
                    ? "text-agency-orange font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                Blogs
              </Link>

              <Link
                to="/contact"
                className={`transition-colors ${
                  isActive("/contact")
                    ? "text-agency-orange font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                Contact
              </Link>

              <Link
                to="/careers"
                className={`transition-colors ${
                  isActive("/careers")
                    ? "text-agency-orange font-semibold"
                    : "text-foreground hover:text-agency-orange"
                }`}
              >
                Careers
              </Link>
            </nav>

            {/* ✅ Desktop Button */}
            <div className="hidden lg:block shrink-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="px-5 py-2 rounded-xl bg-gradient-to-r from-agency-blue to-agency-orange hover:opacity-90">
                    Connect With Us
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0 w-72">
                  <div className="grid">
                    <Link
                      to="/contact"
                      className="flex items-center gap-3 p-4 hover:bg-muted transition-colors"
                    >
                      <Mail className="h-5 w-5 text-agency-blue" />
                      <div>
                        <div className="font-medium">Email Us</div>
                        <div className="text-sm text-muted-foreground">
                          info.purvedinnovators@gmail.com
                        </div>
                      </div>
                    </Link>

                    <a
                      href="tel:+917009595953"
                      className="flex items-center gap-3 p-4 hover:bg-muted transition-colors"
                    >
                      <Phone className="h-5 w-5 text-agency-blue" />
                      <div>
                        <div className="font-medium">Call Us</div>
                        <div className="text-sm text-muted-foreground">
                          +91 7009595953
                        </div>
                      </div>
                    </a>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* ✅ Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-10 w-10"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* ✅ Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden px-4 pb-4">
              <div className="flex flex-col gap-2 pt-3 border-t border-black/10">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/services", label: "Services" },
                  { path: "/Blog", label: "Blogs" },
                  { path: "/contact", label: "Contact" },
                  { path: "/careers", label: "Careers" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-agency-blue/15 to-agency-orange/15 text-agency-orange"
                        : "hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="grid grid-cols-1 gap-2 mt-2">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted"
                  >
                    <Mail className="h-5 w-5 text-agency-blue" />
                    <span className="text-sm font-medium">Email Us</span>
                  </Link>

                  <a
                    href="tel:+917009595953"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted"
                  >
                    <Phone className="h-5 w-5 text-agency-blue" />
                    <span className="text-sm font-medium">Call Us</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
