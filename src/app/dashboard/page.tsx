
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Manage your personal health details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" placeholder="e.g., 175" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" placeholder="e.g., 70" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body-fat">Body Fat Percentage (%)</Label>
              <Input id="body-fat" placeholder="e.g., 15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bmi">BMI</Label>
              <Input id="bmi" placeholder="e.g., 22.9" disabled />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea id="allergies" placeholder="e.g., Penicillin, Peanuts" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
