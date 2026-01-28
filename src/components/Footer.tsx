import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import logo from "../components/assets/logo2.webp";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";

type PopupType = "privacy" | "terms" | "sitemap" | null;

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [openPopup, setOpenPopup] = useState<PopupType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    toast({
      title: "Thanks for subscribing!",
      description: "You'll start receiving our newsletter soon.",
    });

    setEmail("");
  };

  const popupTitle =
    openPopup === "privacy"
      ? "Privacy Policy"
      : openPopup === "terms"
        ? "Terms of Service"
        : openPopup === "sitemap"
          ? "Sitemap"
          : "";

  const popupContent =
    openPopup === "privacy" ? (
      <div className="space-y-3 text-sm text-white/80">
        <p>
          At Purved Innovators, we respect your privacy and protect your
          personal information. This policy explains what we collect and how we
          use it.
        </p>

        <p>
          <b>1) Information We Collect</b>
          <br />
          We may collect your name, email, phone number, business details, and
          basic website usage data to improve our services.
        </p>

        <p>
          <b>2) How We Use Your Information</b>
          <br />
          We use your data to respond to queries, provide services, improve user
          experience, and send updates only if you opt-in.
        </p>

        <p>
          <b>3) Cookies & Tracking</b>
          <br />
          We may use cookies to improve website performance and remember
          preferences. You can disable cookies in your browser settings.
        </p>

        <p>
          <b>4) Data Sharing & Security</b>
          <br />
          We do not sell your data. We follow security practices to protect
          information, but no online system is 100% secure.
        </p>

        <p>
          <b>5) Contact</b>
          <br />
          For privacy-related concerns, contact us at:
          <b> info.purvedinnovators@gmail.com</b>
        </p>
      </div>
    ) : openPopup === "terms" ? (
      <div className="space-y-3 text-sm text-white/80">
        <p>
          Welcome to Purved Innovators. By accessing or using our website and
          services, you agree to comply with the following Terms of Service.
        </p>

        <p>
          <b>1) Acceptance of Terms</b>
          <br />
          By using our website, you accept these terms and agree to follow all
          applicable laws and regulations.
        </p>

        <p>
          <b>2) Service Overview</b>
          <br />
          Purved Innovators provides services such as Digital Marketing,
          AI-driven marketing solutions, Branding & Creative services, and
          Web-based strategy support.
        </p>

        <p>
          <b>3) User Responsibilities</b>
          <br />
          You agree not to use the website for illegal activities, attempt to
          hack or disrupt the platform, upload harmful content/spam, or
          copy/misuse our brand identity.
        </p>

        <p>
          <b>4) Intellectual Property</b>
          <br />
          All content on this website belongs to Purved Innovators unless stated
          otherwise.
        </p>

        <p>
          <b>5) Updates & Contact</b>
          <br />
          We may update these Terms at any time. For clarification, contact:
          <b> info.purvedinnovators@gmail.com</b>
        </p>
      </div>
    ) : openPopup === "sitemap" ? (
      <div className="space-y-2 text-sm text-white/80">
        <p className="font-semibold text-white">Pages:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Home</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Blogs</li>
          <li>Contact</li>
        </ul>
      </div>
    ) : null;

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 relative">
      {/* ✅ POPUP MODAL */}
      {openPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpenPopup(null)}
          />

          {/* Popup Card */}
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl z-10 max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <h3 className="text-lg font-bold bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
                {popupTitle}
              </h3>

              <button
                onClick={() => setOpenPopup(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Scroll Content */}
            <div className="flex-1 overflow-y-auto px-5 pr-4 pb-2">
              {popupContent}
            </div>

            {/* Footer Actions */}
            <div className="p-5 pt-3 flex justify-end">
              <Button
                onClick={() => setOpenPopup(null)}
                className="bg-agency-blue hover:bg-agency-blue/90 h-9 px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* ✅ Main Grid (Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <img
              src={logo}
              alt="logo"
              className="w-36 h-auto mb-4 object-contain"
            />

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Innovative digital marketing solutions that drive real business
              results.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-agency-blue transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-agency-blue transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-agency-blue transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-agency-blue transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 border-b border-gray-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  Blogs{" "}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 border-b border-gray-800 pb-2">
              Contact
            </h4>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-agency-blue mt-0.5 shrink-0" />

                {/* ✅ Short on mobile, full on desktop */}
                <span className="text-gray-400 leading-relaxed">
                  <span className="block sm:hidden">Andheri West, Mumbai</span>
                  <span className="hidden sm:block">
                    Unit-129, Kuber Complex, New Link Rd, Veera Desai Industrial
                    Estate, Andheri West, Mumbai-400053, Maharashtra, India.
                  </span>
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-agency-blue" />
                <a
                  href="tel:+917009595953"
                  className="text-gray-400 hover:text-white"
                >
                  +91 7009595953
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-agency-blue" />
                <a
                  href="mailto:info.purvedinnovators@gmail.com"
                  className="text-gray-400 hover:text-white break-all"
                >
                  info.purvedinnovators@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-4 border-b border-gray-800 pb-2">
              Newsletter
            </h4>

            <p className="text-gray-400 text-sm mb-3">
              Get marketing tips and latest updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              {/* ✅ Compact input */}
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white h-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full bg-agency-blue hover:bg-agency-blue/90 h-9"
              >
                Subscribe
              </Button>

              <p className="text-[11px] text-gray-500">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* ✅ Bottom bar (Compact) */}
        <div className="border-t border-gray-800 pt-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} PURVED INNOVATORS. All rights
              reserved.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setOpenPopup("privacy")}
                className="text-gray-500 hover:text-white text-xs transition-colors"
              >
                Privacy
              </button>

              <button
                onClick={() => setOpenPopup("terms")}
                className="text-gray-500 hover:text-white text-xs transition-colors"
              >
                Terms
              </button>

              <button
                onClick={() => setOpenPopup("sitemap")}
                className="text-gray-500 hover:text-white text-xs transition-colors"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
