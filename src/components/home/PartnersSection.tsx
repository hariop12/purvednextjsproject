import React from "react";

// ✅ Import your 5 logos (change names based on your files)
import sobha from "../assets/partners/sobha.png";
import karma from "../assets/partners/karma.png";
import zee from "../assets/partners/zee.png";
import bestown from "../assets/partners/bestown.png";
import dabbaboy from "../assets/partners/dabbaboy.png";

const PartnersSection = () => {
  const logos = [sobha, karma, zee, bestown, dabbaboy];

  // ✅ Duplicate logos for smooth infinite scroll
  const allLogos = [...logos, ...logos];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-agency-blue/90 via-background to-agency-orange/30 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-agency-orange/30 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-agency-blue/30 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-14">
          <p className="text-sm tracking-widest text-agency-orange font-semibold uppercase">
            Our Esteemed Partners
          </p>

          <h2 className="text-4xl md:text-6xl text-black font-bold mt-3">
            Trusted by Industry Leaders
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Join our growing list of satisfied clients who trust our AI-driven
            solutions
          </p>
        </div>

        {/* Moving Logos */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-background/90 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-background/90 to-transparent z-10"></div>

          <div className="overflow-hidden">
            <div className="flex gap-10 animate-marquee">
              {allLogos.map((logo, index) => (
                <div
                  key={index}
                  className=" min-w-[220px] h-[110px] flex items-center justify-center rounded-2xl border  backdrop-blur-xl shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={logo}
                    alt={`partner-${index}`}
                    className="max-h-[110px] max-w-[220px] object-contain mix-blend-multiply opacity-95"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ animation style */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          .animate-marquee {
            width: max-content;
            animation: marquee 18s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default PartnersSection;
