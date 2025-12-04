
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format, isSameDay } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

const allEvents = [
  {
    date: new Date(),
    title: 'Campus Tour for Prospective Students',
    time: '10:00 AM - 12:00 PM',
    location: 'Admissions Office',
    category: 'Admissions',
  },
  {
    date: new Date(),
    title: 'Engineering Department Open House',
    time: '1:00 PM - 3:00 PM',
    location: 'Science & Technology Wing',
    category: 'Academics',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Final Exams Begin',
    time: 'All Day',
    location: 'Campus-wide',
    category: 'Academics',
  },
  {
    date: addDays(new Date(), 5),
    title: 'Guest Lecture: AI in Modern Business',
    time: '6:00 PM - 7:30 PM',
    location: 'Grand Auditorium',
    category: 'Lecture',
  },
  {
    date: addDays(new Date(), 10),
    title: 'Eagles vs. Rivals: Basketball Finals',
    time: '7:00 PM',
    location: 'University Arena',
    category: 'Athletics',
  },
  {
    date: addDays(new Date(), 15),
    title: 'End of Semester Celebration',
    time: '5:00 PM onwards',
    location: 'Main Quad',
    category: 'Student Life',
  },
];

const categoryColors: { [key: string]: string } = {
  Admissions: 'bg-blue-100 text-blue-800',
  Academics: 'bg-green-100 text-green-800',
  Lecture: 'bg-purple-100 text-purple-800',
  Athletics: 'bg-red-100 text-red-800',
  'Student Life': 'bg-yellow-100 text-yellow-800',
};


export function EventsCalendarModal({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date ? allEvents.filter(event => isSameDay(event.date, date)) : [];
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0">
         <div className="grid grid-cols-1 md:grid-cols-3">
             <div className="md:col-span-2 p-6">
               <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl text-foreground">
                    Events for {date ? format(date, 'MMMM d, yyyy') : 'All Upcoming Events'}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedDayEvents.length > 0 ? `Found ${selectedDayEvents.length} event(s) on this day.` : 'No events scheduled for this day.'}
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-96">
                  <div className="space-y-4 pr-6">
                    {selectedDayEvents.length > 0 ? selectedDayEvents.map(event => (
                      <div key={event.title} className="p-4 border rounded-lg bg-card hover:bg-secondary/50 transition-colors">
                        <Badge className={`mb-2 ${categoryColors[event.category]}`}>{event.category}</Badge>
                        <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                        <div className="text-sm text-muted-foreground mt-1 space-y-1">
                          <p className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.time}</p>
                          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                         <p>Select a day on the calendar to see events.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
             </div>
             <div className="col-span-1 p-6 flex justify-center items-center bg-secondary md:bg-secondary/50 rounded-r-lg">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border bg-card p-4 shadow-inner"
                    modifiers={{
                      hasEvent: allEvents.map(e => e.date)
                    }}
                    modifiersClassNames={{
                      hasEvent: "bg-primary/20 text-primary-foreground rounded-full",
                    }}
                  />
             </div>
          </div>
      </DialogContent>
    </Dialog>
  );
}
