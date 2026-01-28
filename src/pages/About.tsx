import React, { useRef } from "react";
import FloatingElement from "@/components/3d/FloatingElement";
import MouseParallax from "../components/3d/MouseParallex";
import RotatingCube from "../components/3d/RotatingCube";
import AIParticle from "../components/3d/AIPraticle";
import { motion } from "framer-motion";

import type { LucideIcon } from "lucide-react";
import IndustriesMarquee from "./IndustriesMarquee";
import Team from "./Team";

import {
  Bot,
  Zap,
  Sparkles,
  BarChart3,
  Rocket,
  Users,
  Cpu,
} from "lucide-react";
import GlobalJourneySection from "@/components/GlobalJourneySection";

type Side = "left" | "right";

type BigJourneyItem = {
  year: string;
  label: string;
  title: string;
  desc: string;
  tag: string;
  side: Side;
};

type MiniJourneyItem = {
  title: string;
  desc: string;
  side: Side;
  icon: LucideIcon;
};

const About = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ Journey Data (Big Timeline Cards)
  const journeyBig: BigJourneyItem[] = [
    {
      year: "2020",
      label: "ESTABLISHED",
      title: "Purved Publicizing",
      desc: "Founded in Indore as a traditional marketing agency. Our journey began with a mission to deliver creative advertising solutions.",
      tag: "Small team start",
      side: "left",
    },
    {
      year: "2022",
      label: "TRANSFORMATION",
      title: "AI Revolution",
      desc: "Integrated AI intelligence into our services, deploying proprietary tools for data-driven strategy and automation.",
      tag: "AI algorithms deployed",
      side: "right",
    },
    {
      year: "2023",
      label: "EXPANSION",
      title: "Going Global",
      desc: "Expanded internationally, serving clients across 12+ countries with Digimartificial Intelligenz solutions.",
      tag: "12+ countries",
      side: "left",
    },
    {
      year: "2024",
      label: "REVOLUTION",
      title: "Purved Innovators",
      desc: "Launched our Mumbai headquarters and introduced Purved Innovators to lead AI-driven digital marketing transformation.",
      tag: "New HQ launched",
      side: "right",
    },
  ];

  // ✅ Mini Milestone cards inside path
  const miniJourney: MiniJourneyItem[] = [
    {
      title: "First Milestone",
      desc: "Launched our first successful social media campaign for a local retail client",
      side: "right",
      icon: Rocket,
    },
    {
      title: "Key Achievement",
      desc: "Increased client ROI by 300% using our new AI-powered analytics system",
      side: "left",
      icon: BarChart3,
    },
    {
      title: "Team Growth",
      desc: "Expanded our team to 50+ digital marketing specialists and AI engineers",
      side: "right",
      icon: Users,
    },
    {
      title: "Current Focus",
      desc: "Developing next-gen AI marketing tools with 100+ satisfied clients worldwide",
      side: "left",
      icon: Cpu,
    },
  ];

  return (
    <>
      {/* ✅ HERO SECTION (WITH YOUR ANIMATION) */}
      <section
        ref={containerRef}
        className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-bl from-agency-blue/90 to-agency-orange/70 text-white"
      >
        {/* ✅ AI Particles */}
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

        {/* ✅ Rotating cubes with Mouse Parallax */}
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sora text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            >
              {" "}
              <span className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
                PURVED INNOVATORS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-lg md:text-xl text-white/85 leading-relaxed"
            >
              We are Digimartificial Intelligenz, combining cutting-edge AI with
              creative strategy to revolutionize how brands connect, engage, and
              grow in the digital era.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ✅ STORY SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-sora text-3xl font-extrabold mb-6 bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent ">
                Our Story
              </h2>

              <p className="font-space text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2020, PURVED TECH CORP is a global advertising agency
                powered by AI innovation. Expanding beyond Purved Publicizing
                (Indore-based marketing agency), we launched our new Mumbai
                office and Purved Innovators in June 2024.
              </p>

              <p className="font-space text-lg text-gray-700 mb-6 leading-relaxed">
                What started as a three-person operation has grown into a
                full-service digital marketing agency with a proven track record
                of driving results for clients across industries—from tech
                startups to established e-commerce brands.
              </p>

              <p className="font-space text-lg text-gray-700 leading-relaxed">
                Despite our growth, our mission remains the same: to combine
                data-driven strategies with creative excellence to help our
                clients achieve sustainable growth and build lasting
                relationships with their customers.
              </p>
            </motion.div>

            {/* ✅ Mission / Vision / Values (Timeline Design Like Image-2) */}
            <div className="relative w-full">
              {/* vertical line */}
              <div className="absolute left-4 top-0 h-full w-[2px] bg-black/10" />

              <div className="space-y-6">
                {/* ✅ 1) Mission */}
                <MissionTimelineCard
                  number={1}
                  icon={<Zap className="w-5 h-5 text-agency-orange" />}
                  title="Our Mission"
                  desc="To empower businesses with digital strategies that drive measurable results."
                  delay={0.1}
                />

                {/* ✅ 2) Vision */}
                <MissionTimelineCard
                  number={2}
                  icon={<Sparkles className="w-5 h-5 text-agency-orange" />}
                  title="Our Vision"
                  desc="To be the most trusted partner in digital transformation."
                  delay={0.25}
                />

                {/* ✅ 3) Values */}
                <MissionTimelineCard
                  number={3}
                  icon={<Bot className="w-5 h-5 text-agency-orange" />}
                  title="Our Values"
                  desc="Innovation, integrity, excellence, and client success."
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ JOURNEY SECTION */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* ✅ light animated cubes behind journey */}
        <div className="absolute inset-0 pointer-events-none">
          <MouseParallax speed={0.01}>
            <div className="absolute top-16 left-10 opacity-15">
              <FloatingElement delay={0.4}>
                <RotatingCube
                  size="w-24 h-24"
                  color1="from-agency-blue"
                  color2="to-agency-orange"
                />
              </FloatingElement>
            </div>
          </MouseParallax>

          <MouseParallax speed={0.02}>
            <div className="absolute bottom-16 right-12 opacity-10">
              <FloatingElement delay={0.7}>
                <RotatingCube
                  size="w-32 h-32"
                  color1="from-agency-orange"
                  color2="to-purple-500"
                />
              </FloatingElement>
            </div>
          </MouseParallax>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest text-agency-orange font-semibold uppercase mb-3">
              Our Evolution
            </p>

            <h2 className="font-sora text-3xl md:text-5xl font-extrabold leading-tight text-black">
              The{" "}
              <span className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
                Purved Innovators
              </span>{" "}
              Journey
            </h2>

            <p className="font-space text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              A structured timeline of how we grew from a local agency into an
              AI-driven digital brand.
            </p>
          </div>

          {/* ✅ Even Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* center line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-agency-blue via-agency-orange to-agency-blue opacity-25" />

            <div className="space-y-16">
              <TimelineRow
                index={0}
                big={journeyBig[0]}
                mini={miniJourney[0]}
              />
              <TimelineRow
                index={1}
                big={journeyBig[1]}
                mini={miniJourney[1]}
              />
              <TimelineRow
                index={2}
                big={journeyBig[2]}
                mini={miniJourney[2]}
              />
              <TimelineRow
                index={3}
                big={journeyBig[3]}
                mini={miniJourney[3]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ INDUSTRIES */}
      {/* <IndustriesMarquee /> */}
      <GlobalJourneySection />

      {/* ✅ TEAM */}
      <Team />

      {/* ✅ OUR APPROACH */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-sora text-3xl font-extrabold mb-4 bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
              Our Approach
            </h2>
            <p className="font-space text-lg text-gray-600 max-w-2xl mx-auto">
              How we work to deliver exceptional results for every client
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ApproachCard
              icon={<Rocket className="w-10 h-10 text-agency-orange" />}
              title="Discovery & Strategy"
              desc="We begin with a deep dive into your business, goals, audience, and competitors to craft the best strategy."
            />

            <ApproachCard
              icon={<Zap className="w-10 h-10 text-agency-orange" />}
              title="Implementation & Optimization"
              desc="Our experts execute the strategy with precision and optimize continuously based on performance."
            />

            <ApproachCard
              icon={<BarChart3 className="w-10 h-10 text-agency-orange" />}
              title="Analysis & Growth"
              desc="We provide transparent reporting and recommendations to drive continued growth."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

/* ---------------- ✅ Styles ---------------- */

const cardTheme =
  "rounded-2xl shadow-lg border border-black/5 bg-gradient-to-br from-blue-50 via-white to-orange-50";

/* ---------------- ✅ Small Components ---------------- */

const StoryRow = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-sora font-bold text-black">{title}</h3>
        <p className="font-space text-gray-700 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

const TimelineRow = ({
  big,
  mini,
  index,
}: {
  big: BigJourneyItem;
  mini: MiniJourneyItem;
  index: number;
}) => {
  const BigLeft = big.side === "left";
  const MiniLeft = mini.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative"
    >
      {/* ✅ Dot */}
      <div className="hidden md:block absolute left-1/2 top-10 -translate-x-1/2 z-20">
        <div className="w-4 h-4 rounded-full bg-agency-orange border-4 border-white shadow-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* LEFT */}
        <div className="md:pr-12 space-y-10">
          {BigLeft && <TimelineBigCard item={big} />}
          {!BigLeft && MiniLeft && <TimelineMiniCard item={mini} />}
        </div>

        {/* RIGHT */}
        <div className="md:pl-12 space-y-10">
          {!BigLeft && <TimelineBigCard item={big} />}
          {BigLeft && !MiniLeft && <TimelineMiniCard item={mini} />}
        </div>
      </div>
    </motion.div>
  );
};

const TimelineBigCard = ({ item }: { item: BigJourneyItem }) => {
  return (
    <div className={`${cardTheme} p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800 font-semibold">
          {item.label}
        </span>
        <span className="text-sm font-bold text-agency-orange">
          {item.year}
        </span>
      </div>

      <h3 className="font-sora text-lg font-bold text-agency-orange mb-2">
        {item.title}
      </h3>

      <p className="font-space text-gray-700 text-sm leading-relaxed">
        {item.desc}
      </p>

      <p className="mt-4 text-sm font-semibold text-agency-blue">
        ✦ {item.tag}
      </p>
    </div>
  );
};

const TimelineMiniCard = ({ item }: { item: MiniJourneyItem }) => {
  const Icon = item.icon;

  return (
    <div className={`${cardTheme} p-5`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon className="w-6 h-6 text-agency-orange" />
        </div>

        <div>
          <h4 className="font-sora font-bold text-base text-agency-blue">
            {item.title}
          </h4>
          <p className="font-space text-gray-700 text-sm leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

const ApproachCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className={`${cardTheme} p-8`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="font-sora text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="font-space text-gray-700">{desc}</p>
    </motion.div>
  );
};

const MissionTimelineCard = ({
  number,
  icon,
  title,
  desc,
  delay = 0,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay }}
      className="relative pl-14"
    >
      {/* Circle number */}
      <div className="absolute left-0 top-5 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-agency-blue text-white text-sm font-bold shadow-md">
        {number}
      </div>

      {/* Card */}
      <div className="rounded-2xl shadow-lg border border-black/5 bg-gradient-to-br from-blue-50 via-white to-orange-50 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
            {icon}
          </div>

          <div>
            <h3 className="font-sora font-extrabold text-agency-orange text-lg">
              {title}
            </h3>
            <p className="font-space text-agency-blue leading-relaxed mt-1">
              {desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
