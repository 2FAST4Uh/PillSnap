import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PillIdentifier } from "@/components/pill-identifier";
import { ExpertList } from "@/components/expert-list";
import { Chatbot } from "@/components/chatbot";
import { Logo } from "@/components/logo";
import { Camera, Bot, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background px-4 py-3 sm:px-6">
        <Logo />
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">PillSnap</h1>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <Tabs defaultValue="identifier" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="identifier" className="py-2">
              <Camera className="mr-2 h-4 w-4" />
              Identifier
            </TabsTrigger>
            <TabsTrigger value="experts" className="py-2">
              <Stethoscope className="mr-2 h-4 w-4" />
              Experts
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="py-2">
              <Bot className="mr-2 h-4 w-4" />
              Chatbot
            </TabsTrigger>
          </TabsList>
          <TabsContent value="identifier" className="mt-6">
            <PillIdentifier />
          </TabsContent>
          <TabsContent value="experts" className="mt-6">
            <ExpertList />
          </TabsContent>
          <TabsContent value="chatbot" className="mt-6">
            <Chatbot />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t bg-background/50 text-center text-xs text-muted-foreground p-4 md:text-sm">
        PillSnap - Your AI Health Companion. This is a demo app and should not be used for actual medical diagnosis. Always consult a healthcare professional.
      </footer>
    </div>
  );
}
