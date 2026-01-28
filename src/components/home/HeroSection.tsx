import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import RotatingCube from "../3d/RotatingCube";
import FloatingElement from "../3d/FloatingElement";
import MouseParallax from "../3d/MouseParallex";
import AIParticle from "../3d/AIPraticle";
import { CountUp } from "@/components/ui/count-up";
import {
  Brain,
  Cpu,
  Network,
  Bot,
  Zap,
  Palette,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import heroImg from "../assets/hero-image.png";
const AnimatedText = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  return (
    <motion.span
      className="inline-block"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.06,
          },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      containerRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y * 100}%`);

      // ✅ Tilt effect only on stats cards
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (cardY - centerY) / 10;
        const rotateY = -(cardX - centerX) / 10;

        // card.style.transform = `
        //   perspective(300px)
        //   rotateX(${rotateX}deg)
        //   rotateY(${rotateY}deg)
        //   scale3d(1.02, 1.02, 1.02)
        // `;
      });
    };

    const handleMouseLeave = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = `
          perspective(1000px)
          rotateX(0deg)
          rotateY(0deg)
          scale3d(1, 1, 1)
        `;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    cardRefs.current.forEach((card) => {
      card?.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cardRefs.current.forEach((card) => {
        card?.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const identityCards = [
    {
      icon: Bot,
      title1: "Digimartificial",
      title2: "Intelligenz",
      desc: "A revolutionary fusion of Digital Marketing, AI, and Gen-Z innovation",
      tag: "100% Future-Ready",
    },
    {
      icon: Zap,
      title1: "Smart",
      title2: "Automation",
      desc: "AI-powered solutions that streamline your marketing processes",
      tag: "3x Efficiency",
    },
    {
      icon: Palette,
      title1: "Creative",
      title2: "Intelligence",
      desc: "Where creativity meets cutting-edge technology",
      tag: "Unlimited Ideas",
    },
    {
      icon: BarChart3,
      title1: "AI-Driven",
      title2: "Success",
      desc: "Making informed decisions with advanced analytics",
      tag: "95% Accuracy",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative  pb-24 overflow-hidden bg-gradient-to-b from-background to-muted"
    >
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

      {/* Background elements with parallax */}
      <MouseParallax speed={0.02}>
        <div className="absolute top-24 left-10 opacity-30 z-0">
          <FloatingElement delay={0.5}>
            <RotatingCube
              size="w-32 h-32"
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
              size="w-40 h-40"
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
              size="w-64 h-64"
              color1="from-blue-500"
              color2="to-purple-600"
            />
          </FloatingElement>
        </div>
      </MouseParallax>

      <div className="container mx-auto px-4 relative z-10">
        {/* ✅ TOP PART (Divider Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div className="text-left">
            <h1 className="text-2xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent inline-block shine-effect mt-16 md:mt-8">
                <AnimatedText text="PURVED INNOVATORS" />
              </span>

              <span className="block bg-gradient-to-r mt-4 text-sm md:text-lg from-agency-blue to-agency-orange bg-clip-text text-transparent shine-effect">
                <AnimatedText text="DIGIMARTIFICIAL INTELLIGENZ" delay={1.1} />
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl">
              Founded in 2020, PURVED TECH CORP is a global advertising agency
              powered by AI innovation. Expanding beyond purved publicizing
              Indore based marketing agency, we launched our new Mumbai office
              and Purved Innovators in June 2024. With Digimartificial
              Intelligenz AI strategies, we craft engaging, high-impact content
              that drives success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/contact")}
                className="bg-agency-blue hover:bg-agency-blue/90 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-agency-blue/20"
              >
                Get Started
              </Button>
            </div>

            {/* ✅ Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  value: 98,
                  suffix: "%",
                  label: "Client Satisfaction",
                  delay: 300,
                },
                {
                  icon: Network,
                  value: 101,
                  suffix: "+",
                  label: "Completed Projects",
                  delay: 600,
                },
                {
                  icon: Cpu,
                  value: 5,
                  suffix: "+",
                  label: "Years Experience",
                  delay: 900,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="group bg-white/30 backdrop-blur-sm p-5 rounded-lg shadow-lg tilt-card transition-all duration-300 hover:shadow-xl relative overflow-hidden"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(var(--agency-blue-rgb), 0.1), transparent)",
                  }}
                >
                  <div className="tilt-card-content -mt-4">
                    <stat.icon className="w-7 h-7 mb-3  text-agency-blue/50 group-hover:text-agency-blue transition-colors" />
                    <div className="text-3xl font-bold -mt-2 text-agency-blue group-hover:scale-110 transition-transform">
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        delay={stat.delay}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-agency-blue transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT (Image stays) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute  -inset-6 rounded-3xl bg-gradient-to-r from-agency-blue/30 to-agency-orange/30 blur-2xl opacity-60"></div>

              <div className="relative mt-12 p-6">
                <img
                  src={heroImg}
                  alt="Hero Illustration"
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ BOTTOM PART (Our Unique Identity Section) */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-agency-orange to-agency-blue bg-clip-text text-transparent">
                Our Unique Identity
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {identityCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl p-8 overflow-hidden hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-agency-blue/10 to-agency-orange/10 opacity-70"></div>

                  <div className="relative flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/15 border border-white/20 text-agency-orange group-hover:text-agency-blue transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">
                        <span className="text-agency-orange">
                          {card.title1}
                        </span>{" "}
                        <span className="text-agency-blue">{card.title2}</span>
                      </h3>

                      <p className="mt-3 text-black leading-relaxed max-w-md">
                        {card.desc}
                      </p>

                      <p className="mt-5 font-semibold text-agency-orange">
                        {card.tag}
                      </p>
                    </div>
                  </div>

                  <div className="absolute right-6 top-6 w-20 h-20 rounded-2xl bg-white/5 blur-sm"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gradient overlay following mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(var(--agency-blue-rgb), 0.05), transparent 50%)",
        }}
      />
    </section>
  );
};

export default HeroSection;
