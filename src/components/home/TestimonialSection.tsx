import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Working with Purved Innovators has been transformative for our brand. Their strategic insights and data-driven approach have significantly boosted our market presence and customer engagement.",
    author: "BesTown",
    position: "Media & Entertainment",
    metric: "250% growth in social media reach",
    rating: 5,
    logoText: "BESTOWN",
  },
  {
    quote:
      "The team at Purved Innovators has been instrumental in our digital transformation. Their expertise in AI and digital marketing helped us improve conversions and brand visibility.",
    author: "Dabba Boy",
    position: "IT Industry",
    metric: "200% increase in customer satisfaction",
    rating: 5,
    logoText: "DB",
  },
  {
    quote:
      "Purved Innovators' innovative solutions have helped us create a strong digital footprint. Their team's dedication and expertise have been crucial in our brand's success story.",
    author: "Sobha Siniya",
    position: "Media & Entertainment",
    metric: "180% increase in monthly sales",
    rating: 5,
    logoText: "SS",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = testimonials[current];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-agency-blue/90 via-background to-agency-orange/30 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-agency-orange/30 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-agency-blue/30 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our Clients Say
          </h2>
          <p className="text-black max-w-2xl mx-auto">
            Real feedback from brands we’ve helped scale with digital + AI
            strategies.
          </p>
        </div>

        {/* Slider Card */}
        <div className="max-w-6xl mx-auto relative">
          <div className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center">
              {/* Left Logo Box */}
              <div className="w-full md:w-[260px] flex flex-col items-center md:items-start">
                <div className="w-44 h-44 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <div className="w-28 h-20 bg-white flex items-center justify-center rounded-md text-black font-bold tracking-wide">
                    {t.logoText}
                  </div>
                </div>

                <div className="mt-6 text-center md:text-left">
                  <h3
                    className="text-xl text-orange-400
                   font-bold"
                  >
                    {t.author}
                  </h3>
                  <p className="text-black text-sm mt-1">{t.position}</p>
                </div>
              </div>

              {/* Right Quote Content */}
              <div className="flex-1 w-full">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-agency-orange text-agency-orange"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl text-black leading-relaxed italic">
                  <span className="text-agency-orange text-3xl font-bold mr-2">
                    “
                  </span>
                  {t.quote}
                  <span className="text-agency-orange text-3xl font-bold ml-2">
                    ”
                  </span>
                </p>

                {/* Metric Highlight */}
                <div className="mt-6 rounded-xl bg-white/10 border border-white/10 overflow-hidden">
                  <div className="flex items-center">
                    <div className="w-2 h-full bg-agency-orange"></div>
                    <div className="px-5 py-4 text-black font-semibold">
                      ✦ {t.metric}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === current
                    ? "w-10 bg-agency-orange"
                    : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
