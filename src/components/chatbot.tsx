"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleChat } from "@/lib/actions";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am your AI Medical Assistant. How can I help you today? Please note, I am not a substitute for professional medical advice.' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTo({
        top: scrollAreaViewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    const res = await handleChat(currentInput);

    let botMessage: Message;
    if (res && 'answer' in res) {
        botMessage = { role: "bot", content: res.answer };
    } else {
        botMessage = { role: "bot", content: "Sorry, I couldn't get a response. Please try again." };
    }

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <Card className="flex h-[70vh] flex-col md:h-[calc(80vh-10rem)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <span>AI Medical Assistant</span>
        </CardTitle>
        <CardDescription>Ask questions about symptoms or medicines.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full" viewportRef={scrollAreaViewportRef}>
          <div className="space-y-6 p-4 md:p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "bot" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4"/>
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs rounded-lg p-3 text-sm md:max-w-md",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      <User className="h-4 w-4"/>
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4"/>
                    </AvatarFallback>
                  </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm md:max-w-md bg-muted">
                    <div className="flex items-center justify-center space-x-1">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about symptoms..."
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
