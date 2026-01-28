
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TiltCard from '../3d/TiltCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";

const faqs = [
  {
    question: "How can digital marketing benefit my business?",
    answer: "Digital marketing offers highly targeted audience reach, cost-effective campaigns, measurable results, and improved engagement with your customers. It enables businesses of all sizes to compete in their market and generate higher ROI compared to traditional marketing methods."
  },
  {
    question: "How long does it take to see results?",
    answer: "Results vary depending on the strategies implemented. SEO typically takes 3-6 months to show significant results, while paid advertising can generate immediate traffic. Content marketing usually builds momentum over 2-3 months. We provide detailed monthly reports so you can track progress throughout our partnership."
  },
  {
    question: "Do you offer customized marketing plans?",
    answer: "Absolutely! We believe every business is unique. After understanding your goals, target audience, and industry challenges, we create a tailored marketing strategy designed specifically for your business needs and budget constraints."
  },
  {
    question: "What sets your agency apart from others?",
    answer: "Our agency combines data-driven strategies with creative execution. We focus on measurable results, transparent reporting, and maintaining close client relationships. Our team stays updated with the latest digital trends and technologies to ensure your marketing strategy remains ahead of the competition."
  }
];

const FAQSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-muted overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-to-r from-agency-blue/5 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-agency-orange/5 to-red-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent font-medium mb-2">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our digital marketing services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <TiltCard intensity={5} className="bg-white rounded-xl shadow-lg overflow-hidden border border-muted">
            <div className="bg-gradient-to-r from-agency-blue to-agency-orange p-1">
              <ScrollArea className="bg-white w-full max-h-[450px]">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`} 
                      className={`border-b last:border-b-0 ${
                        hoveredIndex === index ? 'bg-gradient-to-r from-agency-blue/5 to-agency-orange/5' : ''
                      }`}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <AccordionTrigger 
                        className={`px-6 py-5 hover:bg-muted/30 transition-all ${
                          hoveredIndex === index ? 'text-transparent bg-clip-text bg-gradient-to-r from-agency-blue to-agency-orange' : ''
                        }`}
                      >
                        <span className="text-left text-lg font-medium flex items-center">
                          {hoveredIndex === index && (
                            <span className="inline-block w-2 h-2 bg-gradient-to-r from-agency-blue to-agency-orange rounded-full mr-2 animate-pulse"></span>
                          )}
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 py-5 border-t border-muted/50 bg-gradient-to-r from-muted/30 to-transparent">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </div>
          </TiltCard>
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="group bg-white shadow-sm hover:shadow">
              <Link to="/contact" className="flex items-center gap-2">
                <span>Have more questions?</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
