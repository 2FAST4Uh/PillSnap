
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Chatbot } from '@/components/chatbot';
import { Lightbulb, Heart, Zap, Pill, History } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


const healthTips = [
    {
        Icon: Lightbulb,
        title: "Stay Hydrated",
        description: "Drinking enough water daily is crucial for many body functions."
    },
    {
        Icon: Heart,
        title: "Balanced Diet",
        description: "Eat a mix of fruits, vegetables, and lean proteins to get essential nutrients."
    },
    {
        Icon: Zap,
        title: "Regular Exercise",
        description: "Aim for at least 30 minutes of moderate activity most days of the week."
    }
]

const recentIdentifications = [
  {
    id: 1,
    imageUrl: 'https://placehold.co/100x100.png',
    medicineName: 'Ibuprofen 200mg',
    date: '2024-07-28',
    confidence: 0.98,
  },
  {
    id: 2,
    imageUrl: 'https://placehold.co/100x100.png',
    medicineName: 'Acetaminophen 500mg',
    date: '2024-07-27',
    confidence: 0.95,
  },
  {
    id: 3,
    imageUrl: 'https://placehold.co/100x100.png',
    medicineName: 'Lisinopril 10mg',
    date: '2024-07-25',
    confidence: 0.92,
  },
];


export default function DashboardPage() {
  return (
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
            <Chatbot />
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Health Tips</CardTitle>
                    <CardDescription>Simple tips for a healthier lifestyle.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-4">
                        {healthTips.map(({Icon, title, description}) => (
                            <li key={title} className="flex items-start gap-4">
                                <div className="p-2 bg-accent/20 text-accent rounded-full">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">{title}</p>
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                </div>
                            </li>
                        ))}
                   </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Identifications</CardTitle>
                    <CardDescription>Your latest identified medications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentIdentifications.length > 0 ? (
                    recentIdentifications.map((item) => (
                       <div key={item.id} className="flex items-center gap-4">
                        <Image
                          src={item.imageUrl}
                          alt={item.medicineName}
                          width={48}
                          height={48}
                          className="rounded-md"
                          data-ai-hint="medicine pill"
                        />
                        <div>
                          <h3 className="font-semibold">{item.medicineName}</h3>
                           <p className="text-sm text-muted-foreground">
                            {Math.round(item.confidence * 100)}% confidence
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                     <div className="flex flex-col items-center justify-center text-center p-4 border-2 border-dashed rounded-lg">
                        <Pill className="h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm font-semibold">No identifications yet</p>
                    </div>
                  )}
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/dashboard/history">
                        <History className="mr-2 h-4 w-4" />
                        View Full History
                      </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
  );
}
