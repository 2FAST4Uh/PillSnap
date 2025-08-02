
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pill } from 'lucide-react';

const historyData = [
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
  {
    id: 4,
    imageUrl: 'https://placehold.co/100x100.png',
    medicineName: 'Metformin 1000mg',
    date: '2024-07-22',
    confidence: 0.88,
  }
];

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Identification History</CardTitle>
          <CardDescription>A log of all the medications you have identified.</CardDescription>
        </CardHeader>
        <CardContent>
          {historyData.length > 0 ? (
            <div className="space-y-4">
              {historyData.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.medicineName}
                      width={64}
                      height={64}
                      className="rounded-md"
                      data-ai-hint="medicine pill"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.medicineName}</h3>
                      <p className="text-sm text-muted-foreground">Identified on {item.date}</p>
                    </div>
                  </div>
                  <Badge variant={item.confidence > 0.9 ? 'default' : 'secondary'}>
                    {Math.round(item.confidence * 100)}% Confidence
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                <Pill className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-semibold">No identifications yet</p>
                <p className="text-sm text-muted-foreground">Your identified medications will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
