import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TiltCard from "../3d/TiltCard";
import { Link } from "react-router-dom";
import FloatingElement from "../3d/FloatingElement";
import { motion } from "framer-motion";

const services = [
  {
    id: "smm",
    title: "SMM",
    description: "AI-powered social media strategy and execution for growth.",
    href: "/services?tab=smm",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "seo",
    title: "SEO",
    description: "Boost rankings and organic traffic with data-driven SEO.",
    href: "/services?tab=seo",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: "google-ads",
    title: "Google Ads",
    description: "Precision-targeted Google campaigns to generate leads fast.",
    href: "/services?tab=google-ads",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 12h2m-1-1v2m-7 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing",
    description: "Direct customer engagement through WhatsApp campaigns.",
    href: "/services?tab=whatsapp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-3A7.49 7.49 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    id: "voice-sms",
    title: "Voice & SMS",
    description: "Bulk messaging and voice broadcasting for quick reach.",
    href: "/services?tab=voice-sms",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 17.72V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z"
        />
      </svg>
    ),
  },

  {
    id: "website-designing",
    title: "Website Development",
    description: "Modern responsive websites that convert and rank faster.",
    href: "/services?tab=website-designing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5h16v10H4V5zM9.75 17h4.5m-7.5 0h.75m9 0h.75"
        />
      </svg>
    ),
  },
];

const ServicesPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-agency-blue/20 to-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-agency-orange/20 to-red-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Digital Marketing Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete solutions designed to help your business grow and dominate
            digitally.
          </p>
        </div>

        {/* ✅ 7 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, step) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: step * 0.12,
                ease: "easeOut",
              }}
            >
              <FloatingElement delay={step * 0.15} className="h-full">
                <TiltCard
                  intensity={10}
                  className={`rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full ${
                    hoveredIndex === step
                      ? "scale-[1.03] bg-gradient-to-r from-agency-blue to-agency-orange text-white"
                      : "bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIndex(step)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-4 transition-transform duration-300">
                      {React.cloneElement(service.icon, {
                        className: `h-12 w-12 transition-colors duration-300 ${
                          hoveredIndex === step
                            ? "text-white"
                            : "text-agency-blue"
                        }`,
                      })}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>

                    <p
                      className={`mb-4 flex-grow ${
                        hoveredIndex === step
                          ? "text-white/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {service.description}
                    </p>

                    <Link
                      to={service.href}
                      className={`inline-flex items-center transition-colors ${
                        hoveredIndex === step
                          ? "text-white"
                          : "text-agency-blue hover:text-agency-orange"
                      }`}
                    >
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                          hoveredIndex === step ? "translate-x-1" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </TiltCard>
              </FloatingElement>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-agency-blue hover:bg-agency-blue/90 text-white"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
