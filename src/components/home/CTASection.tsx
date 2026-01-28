import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-agency-blue to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Partner with us to create data-driven marketing strategies that
            drive real business growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-agency-orange hover:bg-agency-orange/90 text-white"
            >
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
