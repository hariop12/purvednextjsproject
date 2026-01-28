import React, { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Message = {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
};

type QuestionStep = {
  id: string;
  question: string;
  responseKey: "name" | "email" | "phone" | "interest";
  validation?: (value: string) => boolean;
  errorMessage?: string;
};

const initialQuestions: QuestionStep[] = [
  {
    id: "q1",
    question: "Hi there! I'm PURVED's AI assistant. What's your name?",
    responseKey: "name",
  },
  {
    id: "q2",
    question:
      "Nice to meet you! What's your email address so we can stay in touch?",
    responseKey: "email",
    validation: (email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim().toLowerCase()),
    errorMessage: "Please enter a valid email (example: name@gmail.com)",
  },
  {
    id: "q3",
    question: "Great! Can I also get your phone number? (Optional)",
    responseKey: "phone",
  },
  {
    id: "q4",
    question:
      "Last question: What marketing service are you most interested in? (SEO, Social Media, Google Ads, Website, etc.)",
    responseKey: "interest",
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>(
    {},
  );

  const [showPopup, setShowPopup] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ First time offer popup
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        localStorage.setItem("hasVisitedBefore", "true Rogers");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // ✅ Ask first question when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(initialQuestions[0].question);
    }
  }, [isOpen]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + "-bot",
        type: "bot",
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + "-user",
        type: "user",
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    if (!message) return;

    setInputValue("");
    addUserMessage(message);

    if (currentStep < initialQuestions.length) {
      const currentQuestion = initialQuestions[currentStep];

      // ✅ validation
      if (currentQuestion.validation && !currentQuestion.validation(message)) {
        setTimeout(() => {
          addBotMessage(currentQuestion.errorMessage || "Please try again.");
        }, 350);
        return;
      }

      const updated = {
        ...userResponses,
        [currentQuestion.responseKey]: message,
      };

      setUserResponses(updated);

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep < initialQuestions.length) {
        setTimeout(() => {
          addBotMessage(initialQuestions[nextStep].question);
        }, 650);
      } else {
        setTimeout(() => {
          addBotMessage(
            `Thanks ${updated.name || "there"}! Our team will contact you soon.`,
          );
        }, 700);

        setTimeout(() => {
          addBotMessage(
            `We will help you with "${updated.interest || "your requirements"}".`,
          );
        }, 1200);
      }
    } else {
      setTimeout(() => {
        addBotMessage("Thanks! Our team will reply soon.");
      }, 700);
    }
  };

  return (
    <>
      {/* Welcome Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Welcome to PURVED Digital!</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-agency-blue to-agency-orange p-4 rounded-lg text-white text-center">
              <p className="text-xl font-bold">Special Offer</p>
              <p className="text-3xl font-bold mt-2">20% OFF</p>
              <p>On your first month</p>
            </div>

            <p>
              Use code: <span className="font-bold">WELCOME20</span>
            </p>

            <div className="flex justify-end">
              <Button onClick={() => setShowPopup(false)}>Claim Offer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ✅ Chat Window */}
      {isOpen && !minimized ? (
        <div className="fixed bottom-28 right-6 w-80 sm:w-96 h-96 bg-white rounded-xl shadow-xl z-50 flex flex-col border">
          {/* Header */}
          <div className="bg-gradient-to-r from-agency-blue to-agency-orange text-white p-3 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <h3 className="font-medium">PURVED Digital Assistant</h3>
            </div>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white/20"
                onClick={() => setMinimized(true)}
              >
                <span className="sr-only">Minimize</span>
                <svg width="10" height="2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h10v2H0z" fill="currentColor" />
                </svg>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X size={14} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.type === "bot" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.type === "bot"
                      ? "bg-muted text-foreground"
                      : "bg-gradient-to-r from-agency-blue to-agency-orange text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-agency-blue to-agency-orange hover:opacity-90"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </div>
      ) : isOpen && minimized ? (
        <Button
          onClick={() => setMinimized(false)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-agency-blue to-agency-orange hover:opacity-90 shadow-lg rounded-full h-14 w-14"
          size="icon"
        >
          <MessageSquare />
        </Button>
      ) : (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Tip */}
          {showTip && (
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs relative">
              <p className="text-sm">
                Need marketing help? I'm here to boost your business growth!
              </p>
              <button
                onClick={() => setShowTip(false)}
                className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Open button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-agency-blue to-agency-orange hover:opacity-90 shadow-lg rounded-full h-14 w-14 animate-pulse"
            size="icon"
          >
            <MessageSquare />
          </Button>
        </div>
      )}
    </>
  );
};

export default Chatbot;
