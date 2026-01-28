import React, { useEffect, useRef, useState } from "react";

const START_FRAME = 7;
const END_FRAME = 40;

// Bigger number = slower animation (mobile friendly)
const SCROLL_PER_FRAME = 180;

const GlobalJourneySection = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollValueRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const [frame, setFrame] = useState(START_FRAME);
  const [progress, setProgress] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  /* -------------------------------
     1. Auto start when card visible
  -------------------------------- */
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationDone) {
          isAnimatingRef.current = true;
          document.body.style.overflow = "hidden"; // lock page scroll
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [animationDone]);

  /* -------------------------------
     2. Drive animation by scroll
  -------------------------------- */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!isAnimatingRef.current || animationDone) return;

      e.preventDefault();

      scrollValueRef.current += e.deltaY;

      const totalFrames = END_FRAME - START_FRAME;
      const maxScroll = totalFrames * SCROLL_PER_FRAME;

      scrollValueRef.current = Math.max(
        0,
        Math.min(scrollValueRef.current, maxScroll),
      );

      const scrollProgress = scrollValueRef.current / maxScroll;
      const nextFrame =
        START_FRAME + Math.floor(scrollValueRef.current / SCROLL_PER_FRAME);

      setFrame(nextFrame);
      setProgress(scrollProgress);

      if (nextFrame >= END_FRAME) {
        isAnimatingRef.current = false;
        setAnimationDone(true);
        document.body.style.overflow = "auto"; // unlock scroll
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isAnimatingRef.current) return;
      const keys = ["ArrowDown", "ArrowUp", " ", "PageDown", "PageUp"];
      if (keys.includes(e.key)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [animationDone]);

  const frameSrc = `/images/journey3/ezgif-frame-${String(frame).padStart(
    3,
    "0",
  )}.jpg`;

  return (
    <div className="flex justify-center py-24 px-4 bg-slate-100">
      {/* CARD */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[1200px] h-[75vh] sm:h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
      >
        {/* FRAME IMAGE */}
        <img
          src={frameSrc}
          alt="Global Journey"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center px-5 sm:px-14 text-white">
          <div
            className="w-full max-w-full sm:max-w-xl transition-all duration-300"
            style={{
              opacity: Math.min(1, progress * 1.2),
              transform: `translateY(${40 - progress * 40}px)`,
            }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
              Global Journey
            </h2>

            <p className="text-base sm:text-xl opacity-80 mb-6">
              Experience our worldwide presence and seamless connectivity
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div
                className="bg-white/10 w-full px-5 py-4 sm:px-8 sm:py-6 rounded-2xl text-center sm:text-left"
                style={{
                  opacity: progress,
                  transform: `translateY(${20 - progress * 20}px)`,
                }}
              >
                <h3 className="text-2xl sm:text-4xl font-bold leading-none">
                  50+
                </h3>
                <p className="text-xs sm:text-sm opacity-70">Countries</p>
              </div>

              <div
                className="bg-white/10 w-full px-5 py-4 sm:px-8 sm:py-6 rounded-2xl text-center sm:text-left"
                style={{
                  opacity: progress,
                  transform: `translateY(${20 - progress * 20}px)`,
                }}
              >
                <h3 className="text-2xl sm:text-4xl font-bold leading-none">
                  1000+
                </h3>
                <p className="text-xs sm:text-sm opacity-70">Routes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalJourneySection;
