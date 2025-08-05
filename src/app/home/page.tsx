
'use client';

import { PillIdentifier } from "@/components/pill-identifier";
import { ExpertList } from "@/components/expert-list";
import { Logo } from "@/components/logo";
import { User, LayoutDashboard, History, Settings, LogOut } from "lucide-react";
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
import Image from "next/image";
import { handleLogout } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const onLogout = async () => {
    await handleLogout();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Home">
            <Logo />
          </Link>
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">MedSparks</h1>
        </div>
        
        <div className="flex items-center gap-2">
            <Button variant="primary" asChild>
                <Link href="/dashboard">AI chatbot</Link>
            </Button>
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
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <PillIdentifier />
              </div>
              <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact an Expert</CardTitle>
                        <CardDescription>
                        Find a specialist for your health concerns.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ExpertList />
                    </CardContent>
                </Card>
              </div>
            </div>
        </div>
      </main>
      <footer className="border-t bg-background/50 text-center text-xs text-muted-foreground p-4 md:text-sm">
        MedSparks - Your AI Health Companion. This is a demo app and should not be used for actual medical diagnosis. Always consult a healthcare professional.
      </footer>
    </div>
  );
}
