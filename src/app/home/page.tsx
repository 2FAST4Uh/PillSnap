
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

export default function Home() {
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
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
            <Card className="overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-12 order-2 md:order-1 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Medication Photo Upload</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            For accessible home medication and to confirming health information.
                        </p>
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-foreground">Medicine Photo Upload</h3>
                                <p className="text-sm text-muted-foreground mt-1">Instantly check data on Brighton road mg Centscia aposedli shord ncaegesorchy tecas cetncate ahtemethan.</p>
                            </div>
                             <div>
                                <h3 className="font-semibold text-foreground">Age Group & Day</h3>
                                <p className="text-sm text-muted-foreground mt-1">Colore smecile vitoreation doxor then sti co varti viingi wll dcretoa.</p>
                            </div>
                        </div>
                        <div className="mt-8 flex gap-4">
                           <Button variant="secondary" size="lg">Treated Diseases</Button>
                           <Button variant="primary" size="lg">Call Button</Button>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 bg-muted flex items-center justify-center p-8">
                        <Image 
                            src="https://placehold.co/500x350.png"
                            width={500}
                            height={350}
                            alt="Medicine bottles"
                            className="rounded-lg shadow-2xl"
                            data-ai-hint="medicine bottles"
                        />
                    </div>
                </div>
            </Card>
            
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
