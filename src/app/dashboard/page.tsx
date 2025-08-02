
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
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
  );
}
