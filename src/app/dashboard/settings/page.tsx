
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Manage your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Your Name" defaultValue="Alex Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" defaultValue="alex.doe@example.com" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Health Profile</CardTitle>
          <CardDescription>This information can help provide more personalized AI insights. It is not shared with anyone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" placeholder="e.g., Penicillin, Peanuts" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="conditions">Medical Conditions</Label>
            <Textarea id="conditions" placeholder="e.g., Asthma, High Blood Pressure" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Health Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
