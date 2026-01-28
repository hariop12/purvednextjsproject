import React from "react";
import {
  ShoppingCart,
  Building2,
  Home,
  Store,
  MonitorSmartphone,
  Radio,
  GraduationCap,
  Stethoscope,
  Utensils,
} from "lucide-react";

type IndustryItem = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
};

const industries: IndustryItem[] = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Education Sector",
    description:
      "Enhancing learning experiences and student engagement through AI-supported content delivery.",
  },
  {
    id: 2,
    icon: Stethoscope,
    title: "Healthcare Industry",
    description:
      "Improving patient care and outreach through data-driven health communication strategies.",
  },
  {
    id: 3,
    icon: Utensils,
    title: "Restaurants & Takeaways",
    description:
      "Increasing footfall and online orders with localized, AI-optimized campaigns.",
  },
  {
    id: 4,
    icon: ShoppingCart,
    title: "E-commerce Industry",
    description:
      "Driving conversions and optimizing customer journeys with AI-powered marketing solutions.",
  },
  {
    id: 5,
    icon: Building2,
    title: "Advertising Agencies",
    description:
      "Empowering agencies with AI tools to deliver exceptional results for their clients.",
  },
  {
    id: 6,
    icon: Home,
    title: "Real Estate Industry",
    description:
      "Connecting properties with qualified buyers through targeted digital marketing strategies.",
  },
  {
    id: 7,
    icon: Store,
    title: "Retail",
    description:
      "Bridging online and offline experiences with integrated marketing solutions.",
  },
  {
    id: 8,
    icon: MonitorSmartphone,
    title: "IT Industry",
    description:
      "Showcasing technological expertise through sophisticated digital presence.",
  },
  {
    id: 9,
    icon: Radio,
    title: "Media & Entertainment",
    description:
      "Amplifying content reach and engagement with AI-driven promotion strategies.",
  },
];

const IndustriesMarquee = () => {
  // ✅ duplicate for infinite scroll feel
  const runningCards = [...industries, ...industries];

  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-4">
        {/* ✅ Heading */}
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border bg-white/60 text-agency-orange">
            ✦ Industries We Serve
          </p>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
              Specialized Solutions
            </span>{" "}
            for Diverse Sectors
          </h2>

          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            From a local marketing agency to a global AI-powered digital
            transformation leader.
          </p>
        </div>

        {/* ✅ Marquee Wrapper */}
        <div className="relative">
          {/* left fade (dark) */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-28 z-10" />

          {/* right fade (dark) */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-28  z-10" />

          <div className="marquee-track flex gap-6 py-6">
            {runningCards.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="marquee-item shrink-0 w-[260px] sm:w-[320px]"
                >
                  {/* ✅ YOUR Theme Card */}
                  <div className="relative rounded-2xl p-7 border border-black/5 shadow-xl bg-gradient-to-br from-blue-50 via-white to-orange-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-agency-orange" />
                    </div>

                    {/* title */}
                    <h3 className="text-xl font-bold text-agency-blue mb-2">
                      {item.title}
                    </h3>

                    {/* desc */}
                    <p className="text-black text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* small bottom accent */}
                    <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-agency-blue to-agency-orange" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ✅ Inline CSS (so no extra file needed) */}
      <style>
        {`
          .marquee-track{
            width: max-content;
            animation: marquee-left 35s linear infinite;
          }
          @keyframes marquee-left{
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          /* Pause animation on hover */
          .marquee-track:hover{
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default IndustriesMarquee;
