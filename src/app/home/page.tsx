
'use client';

import { useState } from 'react';
import { PillIdentifier } from "@/components/pill-identifier";
import { Logo } from "@/components/logo";
import { User, LayoutDashboard, History, Settings, LogOut, MapPin, BellRing, Phone, Loader2, CalendarClock, Bot } from "lucide-react";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { handleLogout } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    router.push('/');
  };

  const handleFindNearby = () => {
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
      });
      return;
    }

    setIsFindingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps/search/pharmacies+and+hospitals/@${latitude},${longitude},15z`;
        window.open(mapsUrl, '_blank');
        setIsFindingLocation(false);
      },
      (error) => {
        toast({
          variant: 'destructive',
          title: 'Location Access Denied',
          description: 'Please enable location access in your browser settings to use this feature.',
        });
        setIsFindingLocation(false);
      }
    );
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">PillSnap</h1>
        </div>
        
        <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/32x32.png" alt="User avatar" data-ai-hint="user avatar" />
                    <AvatarFallback>
                    <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/chatbot">
                    <Bot className="mr-2 h-4 w-4" />
                    <span>AI Chatbot</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/home">Home</Link>
                </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/history">
                    <History className="mr-2 h-4 w-4" />
                    <span>History</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/reminders">
                    <CalendarClock className="mr-2 h-4 w-4" />
                    <span>Reminders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your Health Dashboard</h2>
            <p className="mt-3 text-lg text-muted-foreground">Quick access to all your health tools.</p>
          </div>
            
          <PillIdentifier />

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow">
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Find Nearby</CardTitle>
                <CardDescription className="mt-2 mb-4">Find pharmacies and hospitals near you.</CardDescription>
                <Button onClick={handleFindNearby} disabled={isFindingLocation}>
                    {isFindingLocation ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4" />
                    )}
                    Search Locations
                </Button>
            </Card>
            <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow">
                <BellRing className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Set Reminders</CardTitle>
                <CardDescription className="mt-2 mb-4">Never miss a dose with medication reminders.</CardDescription>
                <Button asChild>
                    <Link href="/dashboard/reminders">
                        Manage Reminders
                    </Link>
                </Button>
            </Card>
             <Card className="flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow">
                <Bot className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription className="mt-2 mb-4">Ask our AI about symptoms or medications.</CardDescription>
                <Button asChild>
                    <Link href="/dashboard/chatbot">
                        Open Chatbot
                    </Link>
                </Button>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t bg-background/50 text-center text-xs text-muted-foreground p-4 md:text-sm">
        PillSnap - Your AI Health Companion. This is a demo app and should not be used for actual medical diagnosis. Always consult a healthcare professional.
      </footer>
    </div>
  );
}
