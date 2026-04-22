import { mockEvents } from '@/lib/mockData';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Events</h1>
        <Link href="/events/new" className={buttonVariants()}>
          + Create Event
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden flex flex-col">
            <div 
              className="w-full h-40 bg-cover bg-center border-b" 
              style={{ backgroundImage: `url(${event.coverImage})` }}
            />
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>
                <span className="block text-primary font-medium mb-1">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </span>
                <span className="block text-muted-foreground truncate">
                  {event.location}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Optional content summary here */}
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} className={buttonVariants({ variant: "secondary", className: "w-full" })}>Manage Event</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
