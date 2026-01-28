import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import FloatingElement from "@/components/3d/FloatingElement";
import TiltCard from "@/components/3d/TiltCard";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ IMPORT THESE (Required for animation)
import AIParticle from "../components/3d/AIPraticle";
import MouseParallax from "../components/3d/MouseParallex";
import RotatingCube from "../components/3d/RotatingCube";
// import { databases, ID } from "@/lib/appwrite";
// import { DB_ID } from "@/lib/appwrite";
import { databases, ID, DB_ID, CONTACT_COLLECTION_ID } from "@/lib/appwrite";

const Contact = () => {
  const { toast } = useToast();
  const location = useLocation();

  // ✅ Needed because you used ref={containerRef}
  const containerRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (location.state) {
      const { subject, message } = location.state as {
        subject?: string;
        message?: string;
      };

      if (subject) setFormData((prev) => ({ ...prev, subject }));
      if (message) setFormData((prev) => ({ ...prev, message }));
    }
  }, [location.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await databases.createDocument(
        DB_ID,
        CONTACT_COLLECTION_ID,
        ID.unique(),
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Appwrite error:", error);
    }
  };

  return (
    <>
      {/* ✅ LOCAL CSS (ONLY THIS FILE) */}
      <style>{`
        @keyframes floatUpDown {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: floatUpDown 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatUpDown 7s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        @keyframes floatBlob1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes floatBlob2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-25px, 15px) scale(1.08); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes floatBlob3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(15px, 25px) scale(1.06); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .blob-1 { animation: floatBlob1 7s ease-in-out infinite; }
        .blob-2 { animation: floatBlob2 9s ease-in-out infinite; }
        .blob-3 { animation: floatBlob3 10s ease-in-out infinite; }
      `}</style>

      {/* ✅ HERO SECTION (WITH BOTH ANIMATIONS WORKING) */}
      <section
        ref={containerRef}
        className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-bl from-agency-blue/90 to-agency-orange/70 text-white"
      >
        {/* ✅ 1) Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob-1 absolute -top-24 -left-24 w-80 h-80 bg-white/15 rounded-full blur-3xl" />
          <div className="blob-2 absolute top-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="blob-3 absolute bottom-[-140px] left-1/3 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* ✅ 2) AI Particles */}
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

        {/* ✅ 3) Rotating Cubes + Mouse Parallax */}
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

        {/* ✅ Content */}
        {/* ✅ Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl pt-10 md:pt-0">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent "
            >
              Contact Us
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="text-base md:text-xl text-white/90 leading-relaxed max-w-2xl"
            >
              Have questions or ready to start growing your digital presence?
              Get in touch with our team today.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ✅ Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-agency-orange">
                Get In Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're looking to boost your online presence, increase
                conversions, or just want to chat about your digital marketing
                goals, we're here to help.
              </p>

              <div className="space-y-6">
                <TiltCard className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agency-blue">
                  <div className="flex">
                    <div className="text-agency-blue mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-muted-foreground mb-2">
                        +91 7009595953
                      </p>
                      <p className="text-sm">Monday-Saturday: 10am-6pm</p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="bg-white p-6 rounded-lg shadow-md border-l-4 border-agency-orange">
                  <div className="flex">
                    <div className="text-agency-orange mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground mb-2">
                        info.purvedinnovators@gmail.com
                      </p>
                      <p className="text-sm">We reply within 24 hours</p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
                  <div className="flex">
                    <div className="text-purple-600 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Office</h3>
                      <p className="text-muted-foreground mb-2">
                        Unit-129, Kuber Complex, New Link Rd, Veera Desai
                        Industrial Estate, Andheri West, Mumbai-400053
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg card3d">
                <h3 className="text-2xl font-bold text-agency-orange mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number (Optional)
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="mt-1 mr-2"
                      required
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-muted-foreground"
                    >
                      I agree to the processing of my personal data in
                      accordance with the Privacy Policy
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-agency-blue hover:bg-agency-blue/90"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Map Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="bg-muted rounded-xl overflow-hidden h-96 shadow-md border border-black/10">
            <iframe
              title="Purved Innovators | Digital Marketing Agency Mumbai"
              src="https://www.google.com/maps?q=Purved%20Innovators%20Digital%20Marketing%20Agency%20Mumbai&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
