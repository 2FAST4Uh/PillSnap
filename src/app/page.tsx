
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/logo';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/50 backdrop-blur-sm px-4 py-3 sm:px-6">
        <Logo />
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
                  <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Access your MedSparks account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input id="login-email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                       <Link href="/home">Login</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create a new MedSparks account.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="m@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                      <Input id="signup-confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                       <Link href="/home">Create Account</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
