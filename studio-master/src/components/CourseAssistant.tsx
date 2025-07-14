
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader } from "lucide-react";
import { courseAssistant } from "@/ai/flows/course-assistant-flow";
import { useAuth } from "@/hooks/use-auth";
import type { CourseAssistantInput } from "@/ai/schemas/course-assistant-schema";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CourseAssistantProps {
    lessonTitle: string;
    lessonDescription: string;
}

export function CourseAssistant({ lessonTitle, lessonDescription }: CourseAssistantProps) {
  const t = useTranslations("CourseAssistant");
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const context = `The user is currently watching the lesson titled "${lessonTitle}". Description: "${lessonDescription || 'No description provided.'}"`;
      
      const assistantResponse = await courseAssistant({
        question: input,
        lessonContext: context,
      });
      
      const assistantMessage: Message = {
        role: "assistant",
        content: assistantResponse,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: t('error'),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot />
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-headline">{t('title')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'user'} />
                    <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 bg-muted flex items-center">
                    <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            disabled={isLoading}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
