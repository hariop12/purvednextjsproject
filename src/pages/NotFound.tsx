
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingElement from "@/components/3d/FloatingElement";
import RotatingCube from "@/components/3d/RotatingCube";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted p-4 relative overflow-hidden">
      <div className="absolute left-10 top-40">
        <FloatingElement>
          <RotatingCube 
            size="w-24 h-24" 
            color1="from-agency-blue/40" 
            color2="to-purple-500/40" 
          />
        </FloatingElement>
      </div>
      <div className="absolute right-10 bottom-40">
        <FloatingElement delay={1.5}>
          <RotatingCube 
            size="w-32 h-32" 
            color1="from-agency-orange/40" 
            color2="to-red-500/40" 
          />
        </FloatingElement>
      </div>
      
      <div className="text-center max-w-md z-10">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-agency-blue to-agency-orange bg-clip-text text-transparent mb-6">404</h1>
        <p className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
