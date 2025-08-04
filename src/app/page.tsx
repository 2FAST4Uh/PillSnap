
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Home">
            <Logo />
        </Link>
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">MedSparks</h1>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="text-center lg:text-left max-w-md">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Welcome to MedSparks</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your AI-powered health companion. Instantly identify medications, get detailed information, and connect with healthcare experts.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              This is a demo application. Please do not use for actual medical diagnosis.
            </p>
          </div>

          <div className="w-full max-w-sm">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <form onSubmit={onLogin}>
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
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
                      <CardTitle>Sign Up</CardTitle>
                      <CardDescription>Create a new MedSparks account.</CardDescription>
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
      </main>
    </div>
  );
}
