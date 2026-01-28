import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Happy",
    role: "CEO & Founder",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/014/194/231/small_2x/businessman-manager-boss-man-an-office-worker-illustration-flat-design-vector.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Shivani Matele",
    role: "General Manager",
    image:
      "https://t3.ftcdn.net/jpg/09/37/60/02/240_F_937600227_RlGrfMocC7StqnaR1CZPb4Bs2xjKfy4c.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Sachin Shukla",
    role: "Full Stack Developer Manager",
    image:
      "https://img.freepik.com/premium-vector/businessman-is-working-with-laptop-illustration_108231-450.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: " Sanjana Jaiswar",
    role: "HR Manager",
    image:
      "https://t4.ftcdn.net/jpg/11/57/72/95/240_F_1157729568_bzWI9dV4PoA1URwoIwgqeXO50BhQ3kfR.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Adarsh Pandey",
    role: "Full Stack Developer",
    image:
      "https://static.vecteezy.com/system/resources/previews/045/092/763/non_2x/successful-professional-business-man-with-crossed-arms-flat-illustration-on-white-background-free-vector.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Daksh Arora",
    role: "Full Stack Developer",
    image:
      "https://img.freepik.com/premium-vector/professional-design-background-business-office-banner-illustration-vector-day-card-greetin_1013341-287934.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Sadanand",
    role: "Jr Graphic Designer",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/014/194/231/small_2x/businessman-manager-boss-man-an-office-worker-illustration-flat-design-vector.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  {
    name: "Rohit Adhikari",
    role: "Fronted Developer",
    image:
      "https://img.freepik.com/premium-vector/businessman-is-working-with-laptop-illustration_108231-450.jpg",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
];

const Team = () => {
  const navigate = useNavigate();

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  // ✅ Update maxIndex correctly so NO blank space appears
  useEffect(() => {
    const updateMetrics = () => {
      const container = carouselRef.current;
      if (!container) return;

      const gap = 24;
      const card = container.querySelector<HTMLDivElement>(".team-card");
      if (!card) return;

      const cardWidth = card.clientWidth;
      const slideWidth = cardWidth + gap;

      const visibleCount = Math.max(
        1,
        Math.floor(container.offsetWidth / slideWidth),
      );

      const newMax = Math.max(teamMembers.length - visibleCount, 0);

      setMaxIndex(newMax);
      setCurrentIndex((ci) => Math.min(ci, newMax));
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const calculateX = () => {
    const container = carouselRef.current;
    if (!container) return 0;

    const gap = 24;
    const card = container.querySelector<HTMLDivElement>(".team-card");
    if (!card) return 0;

    const cardWidth = card.clientWidth;
    const slideWidth = cardWidth + gap;

    const totalWidth =
      teamMembers.length * cardWidth + (teamMembers.length - 1) * gap;

    const maxScroll = Math.max(totalWidth - container.offsetWidth, 0);

    const targetScroll = currentIndex * slideWidth;

    return -Math.min(targetScroll, maxScroll);
  };

  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= maxIndex;

  return (
    <section className="relative py-24 bg-muted overflow-hidden">
      {/* ✅ Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-agency-blue/10 rounded-full blur-3xl -mt-16" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-agency-orange/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 -mt-14">
        {/* ✅ Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border bg-white/60 text-agency-orange">
            ✦ Meet The Team
          </p>

          <h2 className="mt-6 text-3xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
              Our Creative Minds
            </span>
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The talented professionals who make our vision a reality with their
            expertise and dedication.
          </p>
        </motion.div>

        {/* ✅ Carousel */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-black/10 shadow-lg flex items-center justify-center transition
              ${isPrevDisabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-xl"}
            `}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-agency-blue" />
          </button>

          <motion.div
            ref={carouselRef}
            className="overflow-hidden w-full"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="flex gap-6"
              animate={{ x: calculateX() }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  // ✅ FIX: NO w-full (this was breaking desktop)
                  className="team-card w-full sm:w-[300px] md:w-[320px] lg:w-[340px] shrink-0"
                  whileHover={{ y: -6 }}
                >
                  <div className="rounded-2xl border border-black/5 shadow-xl bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
                    {/* Image */}
                    <div className="relative h-[320px]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Social Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex items-end justify-center pb-5 gap-3">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
                          >
                            <Linkedin className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
                          >
                            <Twitter className="w-4 h-4 text-white" />
                          </a>
                        )}
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition"
                          >
                            <Instagram className="w-4 h-4 text-white" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-black">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {member.role}
                      </p>

                      <div className="mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-agency-blue to-agency-orange" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-black/10 shadow-lg flex items-center justify-center transition
              ${isNextDisabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-xl"}
            `}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-agency-blue" />
          </button>
        </div>

        {/* ✅ Join Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-8 rounded-2xl shadow-xl border border-black/5 bg-gradient-to-br from-blue-50 via-white to-orange-50">
            <h3 className="text-2xl font-bold text-agency-orange mb-3">
              Want to Join Our Team?
            </h3>
            <p className="text-muted-foreground text-blue-800 font-semibold max-w-2xl mx-auto mb-6">
              We’re always looking for talented individuals passionate about
              innovation and excellence.
            </p>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-3 rounded-full font-semibold text-white bg-agency-blue hover:bg-agency-blue/90 transition shadow-md"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
