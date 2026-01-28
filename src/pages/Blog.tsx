"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Query } from "appwrite";

import TiltCard from "@/components/3d/TiltCard";
import FloatingElement from "@/components/3d/FloatingElement";
import MouseParallax from "../components/3d/MouseParallex";
import RotatingCube from "../components/3d/RotatingCube";
import AIParticle from "../components/3d/AIPraticle";

import { databases, DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";

/* =======================
   TYPES
======================= */
type BlogPost = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  readTime: string;
  date: string;
  content: string;
};

/* =======================
   CONSTANTS
======================= */
const categories = [
  "All",
  "Social Media",
  "SEO",
  "Google Ads",
  "Whatsapp",
  "Voice & SMS",
  "Website",
];

/* =======================
   COMPONENT
======================= */
const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  /* =======================
     FETCH BLOGS (APPWRITE)
  ======================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await databases.listDocuments(DB_ID, BLOGS_COLLECTION_ID, [
          Query.orderDesc("$createdAt"),
        ]);

        console.log("RAW BLOGS FROM APPWRITE:", res.documents);

        const mapped: BlogPost[] = res.documents.map((doc) => {
          const content = typeof doc.content === "string" ? doc.content : "";

          const plainText = content.replace(/<[^>]*>/g, "");

          return {
            _id: doc.$id,
            title: typeof doc.title === "string" ? doc.title : "Untitled Blog",
            content,
            description:
              plainText.length > 0
                ? plainText.slice(0, 120) + "..."
                : "No description available",
            category:
              typeof doc.category === "string" ? doc.category : "Website",
            author:
              typeof doc.author === "string" ? doc.author : "Purved Innovators",
            image:
              typeof doc.image === "string"
                ? doc.image
                : "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
            readTime: `${Math.max(
              3,
              Math.ceil(plainText.length / 800),
            )} min read`,
            date: new Date(doc.$createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          };
        });

        console.log("BLOGS RENDERED IN UI:", mapped);
        setBlogs(mapped);
      } catch (err) {
        console.error("BLOG FETCH ERROR:", err);
      }
    };

    fetchBlogs();
  }, []);

  /* =======================
     CATEGORY FILTER
  ======================= */
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "All") return blogs;
    return blogs.filter((b) => b.category === activeCategory);
  }, [activeCategory, blogs]);
  /* =======================
     UI (UNCHANGED)
  ======================= */
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-bl from-agency-blue/90 to-agency-orange/70 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/3 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        </div>

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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.h1 className="bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent text-5xl md:text-7xl font-bold pb-4">
              Our Blog
            </motion.h1>
            <motion.p className="text-white/90 max-w-2xl">
              Explore tips, strategies, and insights to grow your business with
              digital marketing.
            </motion.p>
          </div>
        </div>
      </section>

      {/* BLOG LISTING */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium ${
                  activeCategory === cat
                    ? "bg-agency-blue text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-agency-blue/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <TiltCard
                key={post._id}
                className="rounded-xl overflow-hidden bg-white border shadow-md"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col min-h-[260px]">
                  <div className="flex justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-agency-blue/10 text-agency-blue">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  <div className="mt-auto flex justify-between pt-4">
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-xs">{post.date}</p>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(post)}
                      className="text-sm font-semibold text-agency-blue hover:underline"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-3"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={selectedBlog.image}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold mb-3">
                  {selectedBlog.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {selectedBlog.description}
                </p>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Blog;
