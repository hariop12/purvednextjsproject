import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TiltCard from "../3d/TiltCard";
import { Check, ArrowRight, Star } from "lucide-react";
import FloatingElement from "../3d/FloatingElement";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Starter",
    price: 499,
    description: "Perfect for small businesses just getting started.",
    features: [
      "SEO Audit & Basic Optimization",
      "Social Media Setup",
      "Monthly Analytics Report",
    ],
    popular: false,
    color: "from-blue-400 to-purple-500",
    badge: "",
  },
  {
    name: "Growth",
    price: 999,
    description: "Expand your digital presence.",
    features: [
      "Complete SEO Strategy",
      "Social Media Management",
      "Content Creation (2 blogs/mo)",
    ],
    popular: true,
    color: "from-agency-blue to-agency-orange",
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: 1999,
    description: "For businesses with ambitious goals.",
    features: [
      "Advanced SEO & SEM Strategy",
      "Daily Social Media Management",
      "Content Creation (5 blogs/mo)",
    ],
    popular: false,
    color: "from-purple-500 to-pink-500",
    badge: "Best Value",
  },
  {
    name: "Custom",
    price: null,
    description: "Tailored to your specific needs.",
    features: [
      "Personalized Strategy",
      "Custom Reporting",
      "Dedicated Account Manager",
    ],
    popular: false,
    color: "from-agency-orange to-red-500",
    badge: "Tailored",
  },
];

const PricingPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      style={{ display: "none" }}
        className="py-20 bg-gradient-to-b  from-muted/50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute  top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-agency-blue/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-agency-orange/10 to-red-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent font-medium mb-2">
            PRICING PLANS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Strategic Marketing Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in your business growth with our market-leading digital
            strategies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <FloatingElement delay={index * 0.1} key={index}>
              <TiltCard
                intensity={5}
                className={`h-full transform transition-all duration-300 ${
                  hoveredIndex === index ? "scale-105 z-10" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card
                  className={`h-full border overflow-hidden ${plan.popular ? "shadow-xl border-agency-blue" : "shadow-md"}`}
                >
                  <div
                    className={`bg-gradient-to-r ${plan.color} text-white p-4`}
                  >
                    {plan.badge && (
                      <div className="bg-white/20 text-xs font-bold uppercase tracking-wider py-1 px-2 rounded-full inline-block mb-2">
                        {plan.badge}
                      </div>
                    )}
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2">
                      {plan.price !== null ? (
                        <>
                          <span className="text-2xl font-bold">
                            ${plan.price}
                          </span>
                          <span className="text-xs opacity-80">/month</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold">Let's Talk</span>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-4 w-4 text-agency-blue mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-left">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      asChild
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full ${plan.popular ? `bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity` : ""}`}
                      size="sm"
                    >
                      <Link to="/pricing">Choose Plan</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TiltCard>
            </FloatingElement>
          ))}
        </div>

        <div className="mt-12 text-center space-y-6">
          <div className="max-w-3xl mx-auto bg-muted/50 p-6 rounded-lg shadow border border-muted">
            <h3 className="text-xl font-bold mb-2">
              Why Choose Our Marketing Packages?
            </h3>
            <p className="text-muted-foreground">
              Our data-driven approach has delivered an average{" "}
              <span className="text-agency-blue font-semibold">247% ROI</span>{" "}
              for our clients in the first year. Join hundreds of businesses
              that have transformed their digital presence with our expert team.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-sm font-medium">
                Rated 4.9/5 by 200+ satisfied clients
              </span>
            </div>
          </div>

          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/pricing" className="flex items-center gap-2">
              Compare All Plans
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
