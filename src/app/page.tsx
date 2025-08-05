
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Pill, Bot, BellRing } from 'lucide-react';

export default function LandingPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy login logic
    if (loginEmail === 'test@test.com' && loginPassword === 'password') {
      toast({
        title: 'Dummy Login Successful',
        description: 'Bypassing authentication for development.',
      });
      router.push('/home');
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please use the dummy credentials: test@test.com and password.',
      });
      setIsLoading(false);
    }
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy signup logic
    toast({
      title: 'Dummy Sign Up',
      description: 'Bypassing authentication and redirecting to home.',
    });
    router.push('/home');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <Logo />
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">MedSparks</h1>
        </Link>
        <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
                <Link href="#features">Features</Link>
            </Button>
            <Button asChild variant="ghost">
                <Link href="#login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="#login">Get Started</Link>
            </Button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center text-white">
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Doctor reviewing patient data"
            fill
            className="absolute inset-0 z-0 object-cover brightness-50"
            data-ai-hint="doctor AI"
          />
          <div className="relative z-10 p-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">Your AI-Powered Health Companion</h2>
            <p className="mt-4 text-lg max-w-3xl mx-auto">
              Instantly identify medications, get detailed information, set reminders, and connect with healthcare experts—all in one place.
            </p>
            <p className="mt-4 text-sm font-light">
              This is a demo application. Please do not use for actual medical diagnosis.
            </p>
             <Button asChild size="lg" className="mt-8">
                <Link href="#login">Start Your Journey</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-foreground">Why MedSparks?</h3>
                    <p className="text-muted-foreground mt-2">Everything you need to manage your health with confidence.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 border rounded-lg bg-card">
                        <Pill className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="text-xl font-semibold">Pill Identifier</h4>
                        <p className="text-muted-foreground mt-2">Snap a photo to instantly identify any pill and get detailed information.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="text-xl font-semibold">AI Medical Assistant</h4>
                        <p className="text-muted-foreground mt-2">Ask questions about symptoms, medications, and health topics.</p>
                    </div>
                    <div className="p-6 border rounded-lg bg-card">
                        <BellRing className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="text-xl font-semibold">Smart Reminders</h4>
                        <p className="text-muted-foreground mt-2">Never miss a dose with intelligent and timely medication reminders.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Login/Signup Section */}
        <section id="login" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="w-full max-w-sm mx-auto">
                <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                    <form onSubmit={onLogin}>
                        <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>Access your MedSparks account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" type="email" placeholder="test@test.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" type="password" placeholder="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
                        </Button>
                        </CardFooter>
                    </form>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                    <form onSubmit={onSignUp}>
                        <CardHeader>
                        <CardTitle>Create Account</CardTitle>
                        <CardDescription>Start managing your health with MedSparks.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" placeholder="m@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                            <Input id="signup-confirm-password" type="password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} required />
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                        </Button>
                        </CardFooter>
                    </form>
                    </Card>
                </TabsContent>
                </Tabs>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50 text-center text-xs text-muted-foreground p-4">
        &copy; {new Date().getFullYear()} MedSparks. All Rights Reserved. This is a demo application.
      </footer>
    </div>
  );
}
