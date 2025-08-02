
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { User, LayoutDashboard, History, Settings, LogOut, PanelLeft } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">MedSparks</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/history"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <History className="h-5 w-5" />
                  Identification History
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                   Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="hidden sm:block text-xl font-semibold text-foreground sm:text-2xl">MedSparks</h1>
          </div>
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
            <Link href="/dashboard/history" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <History className="h-4 w-4" />
              Identification History
            </Link>
             <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
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
         {children}
        </main>
      </div>
    </div>
  );
}
