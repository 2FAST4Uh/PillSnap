
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BellRing, Plus, Clock, Pill, Trash2, Edit, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Reminder {
  id: number;
  medicine: string;
  time: string;
  active: boolean;
}

const initialReminders: Reminder[] = [
  { id: 1, medicine: 'Metformin 500mg', time: '08:00', active: true },
  { id: 2, medicine: 'Lisinopril 10mg', time: '09:00', active: true },
  { id: 3, medicine: 'Atorvastatin 20mg', time: '20:00', active: false },
  { id: 4, medicine: 'Clindamycin', time: '20:36', active: true },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const [medicine, setMedicine] = useState('');
  const [time, setTime] = useState('09:00');

  const handleAddOrUpdateReminder = () => {
    if (editingReminder) {
      // Update existing reminder
      setReminders(reminders.map(r => r.id === editingReminder.id ? { ...r, medicine, time } : r));
    } else {
      // Add new reminder
      const newReminder: Reminder = {
        id: reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1,
        medicine,
        time,
        active: true,
      };
      setReminders([...reminders, newReminder]);
    }
    closeDialog();
  };

  const handleEditClick = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setMedicine(reminder.medicine);
    setTime(reminder.time);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
  };
  
  const handleToggleActive = (id: number) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const closeDialog = () => {
    setEditingReminder(null);
    setMedicine('');
    setTime('09:00');
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Medication Reminders</CardTitle>
            <CardDescription>Manage your medication schedule.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</DialogTitle>
                    <DialogDescription>
                    Set the details for your medication reminder.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="medicine" className="text-right">
                        Medicine
                    </Label>
                    <Input id="medicine" value={medicine} onChange={(e) => setMedicine(e.target.value)} className="col-span-3" placeholder="e.g., Ibuprofen 200mg" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">
                        Time
                    </Label>
                    <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                       <Button type="button" variant="secondary" onClick={closeDialog}>Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleAddOrUpdateReminder}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {reminders.length > 0 ? (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <Pill className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">{reminder.medicine}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Daily at {reminder.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Switch
                        checked={reminder.active}
                        onCheckedChange={() => handleToggleActive(reminder.id)}
                        aria-label="Toggle reminder"
                      />
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(reminder)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(reminder.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                <BellRing className="h-12 w-12 text-muted-foreground" />
                <p className="mt-4 font-semibold">No reminders yet</p>
                <p className="text-sm text-muted-foreground">Add a reminder to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
