import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingElement from "@/components/3d/FloatingElement";
import RotatingCube from "@/components/3d/RotatingCube";
import MouseParallax from "@/components/3d/MouseParallex";
import AIParticle from "@/components/3d/AIPraticle";
import { motion, AnimatePresence } from "framer-motion";
import IndustriesMarquee from "./IndustriesMarquee";

const services = [
  {
    id: "smm",
    tab: "SMM",
    title: "Social Media Management",
    description: "AI-powered social media strategy and execution",
    benefits: [
      "AI-driven content creation & curation for maximum engagement",
      "Data-driven social media strategy and campaign planning",
      "Community management and reputation management",
      "Performance analytics and optimization",
      "Increase engagement and customer interaction",
      "Boost brand awareness across platforms",
    ],
    process: [
      "Platform audit and strategy development",
      "Content planning and posting schedule",
      "Creative content creation & optimization",
      "Community management and engagement",
      "Performance reporting & insights",
      "Continuous improvements and scaling",
    ],
  },
  {
    id: "seo",
    tab: "SEO",
    title: "Search Engine Optimization",
    description: "Data-driven SEO strategies",
    benefits: [
      "Higher ranking on Google search results",
      "Increase organic traffic and brand visibility",
      "Local SEO optimization for regional growth",
      "Technical SEO audit and site improvements",
      "SEO optimized content planning",
      "Track rankings and performance improvements",
    ],
    process: [
      "Website SEO audit",
      "Keyword research & SEO strategy",
      "On-page optimization",
      "Technical SEO improvements",
      "Content planning and optimization",
      "Rank tracking and performance reports",
    ],
  },
  {
    id: "google-ads",
    tab: "Google Ads",
    title: "Google Advertising",
    description: "Precision-targeted campaigns",
    benefits: [
      "Immediate visibility and traffic through Google Ads",
      "Target ideal customers using keyword targeting",
      "AI-driven campaign optimization for better ROAS",
      "Lower cost per lead with improved conversions",
      "Display ads across millions of websites",
      "Performance tracking and reporting",
    ],
    process: [
      "Campaign planning and structure setup",
      "Keyword research and targeting",
      "Ad copy creation and testing",
      "Landing page and conversion optimization",
      "Bid management and optimization",
      "Monthly analytics & performance reporting",
    ],
  },
  {
    id: "whatsapp",
    tab: "WhatsApp",
    title: "WhatsApp Marketing",
    description: "Direct customer engagement",
    benefits: [
      "Bulk WhatsApp messaging for promotions",
      "High open rate and better customer response",
      "Interactive automated responses with chatbot support",
      "Campaign performance tracking",
      "Audience list management and segmentation",
      "Better customer engagement and support",
    ],
    process: [
      "WhatsApp campaign planning",
      "Contact list setup and segmentation",
      "Bulk message creation and scheduling",
      "Automated reply setup (optional)",
      "Analytics and delivery reports",
      "Optimization for better response rate",
    ],
  },
  {
    id: "voice-sms",
    tab: "Voice & SMS",
    title: "Voice & SMS Services",
    description: "Automated communication",
    benefits: [
      "Voice broadcasting for large-scale communication",
      "Bulk SMS marketing for quick promotions",
      "Missed call service for lead generation",
      "High delivery rate and response tracking",
      "Best for reminders and business updates",
      "Improved customer reach and engagement",
    ],
    process: [
      "Campaign setup and targeting",
      "Message script / SMS content creation",
      "Bulk broadcasting setup",
      "Delivery and response monitoring",
      "Lead tracking and follow-ups",
      "Performance reporting",
    ],
  },

  {
    id: "website-designing",
    tab: "Website",
    title: "Website Development",
    description: "Modern, responsive and high-converting website design",
    benefits: [
      "Mobile-first responsive UI design",
      "Fast loading and optimized performance",
      "Professional brand-focused layout",
      "SEO-friendly structure and clean design",
      "User-friendly navigation and UX",
      "High-conversion landing page design",
    ],
    process: [
      "Requirement gathering & planning",
      "UI/UX wireframe design",
      "Modern responsive web design",
      "Development & integration",
      "Testing (mobile + desktop)",
      "Deployment & final support",
    ],
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ initial tab from URL
  const [activeTab, setActiveTab] = useState(() => {
    const tabFromUrl = searchParams.get("tab");
    const exists = services.some((s) => s.id === tabFromUrl);
    return exists ? (tabFromUrl as string) : services[0].id;
  });

  // ✅ sync when URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (!tabFromUrl) return;

    const exists = services.some((s) => s.id === tabFromUrl);
    if (exists) setActiveTab(tabFromUrl);
  }, [searchParams]);

  const activeService = useMemo(
    () => services.find((s) => s.id === activeTab),
    [activeTab],
  );

  const handleGetStarted = (serviceTitle: string) => {
    navigate("/contact", {
      state: {
        subject: `Inquiry about ${serviceTitle} service`,
        message: `I'm interested in learning more about your ${serviceTitle} service. Please provide me with more information.`,
      },
    });
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* ✅ HERO SECTION */}
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden bg-gradient-to-bl from-agency-blue/90 to-agency-orange/70 text-white">
        {/* AI Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AIParticle icon="brain" className="top-1/4 left-1/4 animate-float" />
          <AIParticle
            icon="cpu"
            className="top-1/3 right-1/4 animate-float-delayed"
          />
          <AIParticle
            icon="network"
            className="bottom-1/4 left-1/3 animate-float"
          />
          <AIParticle
            icon="sparkles"
            className="bottom-1/3 right-1/3 animate-float-delayed"
          />
        </div>

        {/* Rotating cubes */}
        <MouseParallax speed={0.02}>
          <div className="absolute top-24 left-10 opacity-25 z-0">
            <FloatingElement delay={0.5}>
              <RotatingCube
                size="w-28 h-28"
                color1="from-agency-blue"
                color2="to-purple-500"
              />
            </FloatingElement>
          </div>
        </MouseParallax>

        <MouseParallax speed={0.03}>
          <div className="absolute bottom-24 right-10 opacity-20 z-0">
            <FloatingElement delay={1}>
              <RotatingCube
                size="w-32 h-32"
                color1="from-agency-orange"
                color2="to-red-500"
              />
            </FloatingElement>
          </div>
        </MouseParallax>

        <MouseParallax speed={0.01}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 z-0">
            <FloatingElement delay={0}>
              <RotatingCube
                size="w-56 h-56"
                color1="from-blue-500"
                color2="to-purple-600"
              />
            </FloatingElement>
          </div>
        </MouseParallax>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tight"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-sm sm:text-base md:text-xl text-white/85 max-w-3xl "
          >
            Comprehensive digital marketing solutions tailored to your business
            goals and target audience.
          </motion.p>
        </div>
      </section>
      {/* ✅ SERVICES CONTENT */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={(val) => {
              setActiveTab(val);
              window.history.replaceState(null, "", `/services?tab=${val}`);
            }}
          >
            {/* ✅ Centered TabsList on Desktop */}
            <TabsList
              className="
                w-full lg:w-fit
                mx-auto
                flex items-center justify-start lg:justify-center
                gap-2
                overflow-x-auto overflow-y-hidden
                whitespace-nowrap
                px-2 py-2
                rounded-xl
                bg-muted/50
                backdrop-blur-sm
                scrollbar-hide
                border border-black/5
              "
            >
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="
                    shrink-0
                    px-5 py-2
                    rounded-lg
                    text-xs sm:text-sm
                    font-semibold
                    whitespace-nowrap
                    transition-all duration-300
                    data-[state=active]:bg-agency-blue
                    data-[state=active]:text-white
                    data-[state=active]:shadow-lg
                    data-[state=inactive]:text-muted-foreground
                  "
                >
                  {service.tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ✅ Smooth Animated Switch */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <TabsContent value={activeTab} forceMount className="m-0">
                    {activeService && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* LEFT */}
                        <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-2xl p-6 md:p-8 shadow-xl">
                          <h2 className="text-2xl md:text-3xl font-bold text-agency-orange mb-2">
                            {activeService.title}
                          </h2>

                          <p className="text-muted-foreground text-base md:text-lg mb-6">
                            {activeService.description}
                          </p>

                          <h3 className="text-lg md:text-xl font-bold mb-4">
                            Benefits
                          </h3>

                          <ul className="space-y-3">
                            {activeService.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 text-agency-blue font-bold">
                                  ✓
                                </span>
                                <span className="text-sm md:text-base text-black/80">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            size="lg"
                            className="mt-7 bg-agency-blue hover:bg-agency-blue/90 text-white w-full sm:w-auto"
                            onClick={() =>
                              handleGetStarted(activeService.title)
                            }
                          >
                            Get Started
                          </Button>
                        </div>

                        {/* RIGHT */}
                        <div className="bg-muted/50 border border-black/5 rounded-2xl p-6 md:p-8 shadow-xl">
                          <h3 className="text-lg md:text-xl font-bold mb-6">
                            Our Process
                          </h3>

                          <ol className="space-y-4">
                            {activeService.process.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-agency-blue text-white flex items-center justify-center font-bold text-sm">
                                  {idx + 1}
                                </div>
                                <p className="text-sm md:text-base text-black/80">
                                  {step}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
