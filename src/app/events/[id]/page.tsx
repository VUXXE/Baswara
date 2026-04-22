import { mockEvents } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const event = mockEvents.find(e => e.id === resolvedParams.id);
  
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="w-full flex items-center justify-center text-white py-24 px-6 relative" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url(${event.coverImage || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '-64px',
          paddingTop: 'calc(6rem + 64px)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white drop-shadow-md">{event.title}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-lg font-medium">
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">🗓️ {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">⏰ {event.time}</span>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">📍 {event.location}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex justify-center flex-grow -mt-8 z-20">
        <Card className="w-full max-w-3xl bg-card shadow-xl border-t-4 border-t-primary">
          <CardHeader className="pb-8">
            <CardTitle className="text-2xl font-bold border-b pb-4">About the Event</CardTitle>
            <p className="text-muted-foreground leading-relaxed pt-4 text-lg">{event.description}</p>
          </CardHeader>
          
          <CardContent>
            <div className="bg-muted/50 rounded-xl p-6 md:p-8 border">
              <h2 className="text-2xl font-bold text-center mb-8">Will you be joining us?</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input type="text" id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input type="text" id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" required />
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Attendance</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Label className="cursor-pointer">
                      <input type="radio" name="attendance" value="attending" className="peer sr-only" required />
                      <div className="rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5 text-center transition-all">
                        <span className="font-bold block">Joyfully Accept</span>
                      </div>
                    </Label>
                    <Label className="cursor-pointer">
                      <input type="radio" name="attendance" value="declined" className="peer sr-only" required />
                      <div className="rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5 text-center transition-all">
                        <span className="font-bold block">Regretfully Decline</span>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dietary">Dietary Restrictions (Optional)</Label>
                  <Input type="text" id="dietary" placeholder="e.g., Vegan, Gluten-free" />
                </div>

                <Button type="submit" className="w-full mt-4" size="lg">
                  Send RSVP
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
