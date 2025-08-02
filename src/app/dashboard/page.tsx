
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chatbot } from '@/components/chatbot';
import { Lightbulb, Heart, Zap } from 'lucide-react';


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
        </div>
      </div>
  );
}
