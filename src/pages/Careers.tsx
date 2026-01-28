import React, { useMemo, useState } from "react";
import FloatingElement from "@/components/3d/FloatingElement";
import TiltCard from "@/components/3d/TiltCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MouseParallax from "../components/3d/MouseParallex";
import RotatingCube from "../components/3d/RotatingCube";
import AIParticle from "../components/3d/AIPraticle";
import {
  databases,
  storage,
  ID,
  DB_ID,
  JOB_APPLICATIONS_COLLECTION,
  JOB_CV_BUCKET_ID,
} from "@/lib/appwrite";

import {
  Briefcase,
  MapPin,
  Clock,
  CalendarDays,
  X,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  posted: string;
  shortDesc: string;

  requirements: string[];
  responsibilities: string[];
  benefits: string[];

  tags: string[];
};

const Careers = () => {
  const jobs: Job[] = useMemo(
    () => [
      {
        id: "bdm",
        title: "Business Development Manager",
        department: "Marketing",
        location: "Andheri, Mumbai",
        type: "Full-time",
        posted: "Jun 15, 2025",
        shortDesc:
          "We’re looking for a dynamic Business Development Manager to drive strategic partnerships and revenue growth.",
        tags: [
          "4+ years experience",
          "Negotiation skills",
          "Client management",
          "Digital marketing",
        ],
        requirements: [
          "4+ years of experience in Business Development / Sales",
          "Excellent communication and negotiation skills",
          "Ability to build and manage strong client relationships",
          "Strong understanding of digital marketing services",
          "Target-driven mindset and reporting experience",
        ],
        responsibilities: [
          "Generate and convert new business leads",
          "Pitch services and create proposals for clients",
          "Coordinate with internal teams for smooth delivery",
          "Maintain client follow-ups and pipeline tracking",
          "Grow accounts and manage long-term partnerships",
        ],
        benefits: [
          "Performance-based incentives",
          "Flexible and growth-friendly culture",
          "Learning and upskilling opportunities",
        ],
      },
      {
        id: "fsd",
        title: "Full Stack Developer",
        department: "Engineering",
        location: "Andheri, Mumbai",
        type: "Full-time",
        posted: "Jun 07, 2025",
        shortDesc:
          "We are seeking an experienced Full Stack Developer to build scalable web applications from front to back.",
        tags: ["React", "Node.js", "MongoDB", "REST APIs"],
        requirements: [
          "3+ years of experience with frontend and backend development",
          "Strong proficiency in JavaScript, React, Node.js, and Express",
          "Experience with databases like MongoDB / MySQL / PostgreSQL",
          "Solid understanding of REST APIs and software development lifecycle",
          "Familiarity with CI/CD pipelines and cloud services",
        ],
        responsibilities: [
          "Design and develop full-stack web applications",
          "Implement scalable APIs and backend services",
          "Create responsive and dynamic frontend interfaces",
          "Optimize application performance and reliability",
          "Collaborate with cross-functional teams in an Agile environment",
        ],
        benefits: [
          "Competitive salary package",
          "Remote work options (role-based)",
          "Professional development budget",
          "Team events & culture activities",
        ],
      },
      {
        id: "gd",
        title: "Graphics Designer",
        department: "Design",
        location: "Andheri, Mumbai",
        type: "Full-time",
        posted: "Jun 13, 2025",
        shortDesc:
          "We’re hiring a Graphics Designer to create compelling visual content for our brand and campaigns.",
        tags: ["Creative", "Adobe", "Branding", "Social Media"],
        requirements: [
          "2+ years of experience in graphic design",
          "Strong portfolio demonstrating creativity and design skills",
          "Proficiency in Adobe Photoshop, Illustrator, and Canva",
          "Understanding of social media design formats and trends",
          "Ability to work with marketing teams and meet deadlines",
        ],
        responsibilities: [
          "Design creatives for social media and performance ads",
          "Create brand assets and templates",
          "Work closely with content & marketing team",
          "Maintain design consistency across platforms",
          "Deliver multiple designs with fast turnaround",
        ],
        benefits: [
          "Creative working environment",
          "High growth opportunities",
          "Exposure to real-world digital campaigns",
        ],
      },
    ],
    [],
  );

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const closeJobModal = () => setSelectedJob(null);
  const closeApplyModal = () => setApplyJob(null);

  const openApplyModal = (job: Job) => {
    setApplyJob(job);
    setApplyForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!applyJob || !cvFile) {
      alert("Please upload your CV");
      return;
    }

    try {
      const uploadedCV = await storage.createFile(
        JOB_CV_BUCKET_ID,
        ID.unique(),
        cvFile,
      );

      await databases.createDocument(
        DB_ID,
        JOB_APPLICATIONS_COLLECTION,
        ID.unique(),
        {
          jobId: applyJob.id,
          jobTitle: applyJob.title,
          fullName: applyForm.fullName,
          email: applyForm.email,
          phone: applyForm.phone,
          message: applyForm.message,
          cvFileId: uploadedCV.$id,
          appliedAt: new Date().toISOString(), // ✅ REQUIRED
        },
      );

      alert("Application submitted successfully!");
      setCvFile(null);
      closeApplyModal();
    } catch (error) {
      console.error("Appwrite error:", error);
      alert("Submission failed");
    }
  };

  return (
    <>
      {/* ✅ Local Animations */}
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
          animation-delay: 1.2s;
        }
      `}</style>

      {/* ✅ HERO SECTION (Same Animation Like About Page) */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-bl from-agency-blue/90 to-agency-orange/70 text-white">
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

        {/* ✅ Text Content */}
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
                Careers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-space text-lg md:text-xl text-white/85 leading-relaxed"
            >
              Join our team of innovators and creators. We’re looking for
              passionate individuals who want to make a meaningful impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ✅ JOBS LIST */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest text-agency-orange font-semibold uppercase mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent">
              Explore roles that match your skills
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Click on any job card to view full details and apply.
            </p>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {jobs.map((job, idx) => (
              <FloatingElement key={job.id} delay={idx * 0.15}>
                <TiltCard className="rounded-2xl border border-black/10 bg-gradient-to-br from-blue-50 via-white to-orange-50 shadow-lg overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-extrabold text-agency-orange">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600 text-sm">
                          <span className="inline-flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-agency-orange" />
                            {job.department}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-agency-orange" />
                            {job.location}
                          </span>

                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4 text-agency-orange" />
                            {job.type}
                          </span>
                        </div>

                        <p className="text-agency-blue mt-4 leading-relaxed">
                          {job.shortDesc}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-5">
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-full bg-white border border-black/10 text-gray-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 md:items-end">
                        <div className="text-sm text-gray-500 inline-flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          Posted {job.posted}
                        </div>

                        <Button
                          className="bg-gradient-to-r from-agency-blue to-agency-orange hover:from-agency-blue/90 hover:to-agency-orange/90 text-white"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ CTA SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl border border-black/10 overflow-hidden shadow-xl bg-gradient-to-r from-agency-blue/10 via-white to-agency-orange/10">
            <div className="p-10 md:p-14 text-center">
              <h3 className="text-3xl md:text-4xl font-extrabold text-agency-orange">
                Stay Updated
              </h3>

              <p className="text-ag    mt-3 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive updates about new job
                openings and company news.
              </p>

              <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full md:w-[420px]">
                  <Input placeholder="Enter your email" />
                </div>

                <Button className="bg-agency-blue hover:bg-agency-blue/90 text-white px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-10 rounded-3xl border border-black/10 overflow-hidden shadow-xl">
            <div className="relative p-10 md:p-14 bg-gradient-to-r from-agency-blue/20 via-agency-blue/5 to-agency-orange/20">
              <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(30,58,138,0.35),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.35),transparent_55%)]" />

              <div className="relative text-center">
                <h3 className="text-3xl md:text-4xl font-extrabold text-black">
                  Ready to Start Your Journey With Us?
                </h3>
                <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
                  Even if you don’t see the perfect role, we’d love to hear from
                  you. We’re always looking for talented individuals who share
                  our passion and values.
                </p>

                <Button
                  asChild
                  id="contact"
                  className="mt-7 bg-gradient-to-r from-agency-blue to-agency-orange text-white hover:from-agency-blue/90 hover:to-agency-orange/90 px-8"
                >
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ JOB DETAILS MODAL (FIXED: SHORT + MOBILE) */}
      {selectedJob && (
        <ModalShell onClose={closeJobModal}>
          <div className="w-[95vw] md:w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[90dvh]">
            {/* Header */}
            <div className="p-5 md:p-8 border-b border-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-black">
                    {selectedJob.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-agency-orange" />
                      {selectedJob.department}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-agency-orange" />
                      {selectedJob.location}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-4 h-4 text-agency-orange" />
                      {selectedJob.type}
                    </span>
                  </div>

                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {selectedJob.shortDesc}
                  </p>
                </div>

                <button
                  onClick={closeJobModal}
                  className="p-2 rounded-lg hover:bg-black/5 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* ✅ Scroll body only */}
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 min-h-0 overflow-y-auto p-5 md:p-8 space-y-8">
                <InfoBlock
                  title="Requirements"
                  items={selectedJob.requirements}
                />
                <InfoBlock
                  title="Responsibilities"
                  items={selectedJob.responsibilities}
                />
                <InfoBlock title="Benefits" items={selectedJob.benefits} />
              </div>

              {/* Footer always visible */}
              <div className="p-4 md:p-8 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-white shrink-0">
                <div className="text-sm text-gray-500">
                  Posted {selectedJob.posted}
                </div>

                <Button
                  onClick={() => openApplyModal(selectedJob)}
                  className="bg-gradient-to-r from-agency-blue to-agency-orange hover:from-agency-blue/90 hover:to-agency-orange/90 text-white"
                >
                  Apply for this position
                </Button>
              </div>
            </div>
          </div>
        </ModalShell>
      )}

      {/* ✅ APPLY FORM MODAL (FIXED: MOBILE SAFE) */}
      {applyJob && (
        <ModalShell onClose={closeApplyModal}>
          <div className="w-[95vw] md:w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[90dvh]">
            <div className="p-5 md:p-8 border-b border-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-black">
                    Apply for {applyJob.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Fill the form and submit your application.
                  </p>
                </div>

                <button
                  onClick={closeApplyModal}
                  className="p-2 rounded-lg hover:bg-black/5 transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <form
                onSubmit={handleApplySubmit}
                className="p-5 md:p-8 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-black">
                      Full Name *
                    </label>
                    <Input
                      required
                      value={applyForm.fullName}
                      onChange={(e) =>
                        setApplyForm((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-black">
                      Email Address *
                    </label>
                    <Input
                      required
                      type="email"
                      value={applyForm.email}
                      onChange={(e) =>
                        setApplyForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-black">
                      Phone Number *
                    </label>
                    <Input
                      required
                      value={applyForm.phone}
                      onChange={(e) =>
                        setApplyForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-black">
                      Upload CV (PDF, max 5MB) *
                    </label>
                    <Input
                      required
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-black">
                    Cover Letter / Message
                  </label>
                  <Textarea
                    rows={4}
                    value={applyForm.message}
                    onChange={(e) =>
                      setApplyForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us why you’d be a great fit for this role..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeApplyModal}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-agency-blue to-agency-orange hover:from-agency-blue/90 hover:to-agency-orange/90 text-white"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalShell>
      )}
    </>
  );
};

export default Careers;

/* --------------------- Small Reusable UI --------------------- */

const ModalShell = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-3 py-6">
      {/* ✅ DARKER + blur overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="relative z-10 w-full flex justify-center">{children}</div>
    </div>
  );
};

const InfoBlock = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div>
      <h4 className="text-xl font-extrabold text-black mb-4">{title}</h4>

      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-gray-700 leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-agency-orange mt-0.5 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
