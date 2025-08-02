
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { User, LayoutDashboard, History, Settings, LogOut } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">MedSparks</h1>
        </div>
        <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" asChild>
                <Link href="/home">Home</Link>
            </Button>
             <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/32x32.png" alt="User avatar" data-ai-hint="user avatar" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <History className="h-4 w-4" />
              Identification History
            </Link>
             <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
             <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary mt-auto">
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 sm:p-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to your Dashboard</CardTitle>
                <CardDescription>This is your personal space to manage your health information.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>More dashboard content will be added here soon!</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
