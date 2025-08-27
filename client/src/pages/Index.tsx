import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import portrait from "@/assets/owner-portrait.jpg";
const CALCOM_URL = "https://cal.com/techsimple/30min";
const Index = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterFirstName, setNewsletterFirstName] = useState("");
  const [isMailingListDialogOpen, setIsMailingListDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterFirstName) {
      toast.error("Please fill in both fields");
      return;
    }
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          firstName: newsletterFirstName
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe');
      }
      
      toast.success("Thanks! You're on the list.");
      setNewsletterEmail("");
      setNewsletterFirstName("");
      setIsMailingListDialogOpen(false);
      setIsCourseDialogOpen(false);
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Tech Made Simple",
        description: "Patient, Apple-focused tech support for seniors and non-tech users. Onsite and remote help.",
        areaServed: "Remote and local service",
        priceRange: "$$",
        url: window.location.origin,
        offers: [{
          "@type": "Offer",
          name: "Onsite Support",
          price: 100,
          priceCurrency: "USD"
        }, {
          "@type": "Offer",
          name: "Remote Support",
          price: 50,
          priceCurrency: "USD"
        }]
      })
    }} />

      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 sm:gap-3">
            <img src="/lovable-uploads/2b3dc13f-52b0-4b4e-aafd-f98904df86dc.png" alt="Tech Made Simple logo" className="h-10 w-10 sm:h-11 sm:w-11 rounded-sm" loading="eager" />
            <span className="text-lg sm:text-xl font-semibold tracking-tight">Tech Made Simple</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button variant="link" size="sm" asChild className="hidden sm:inline-flex">
              <a href="#about" className="story-link">About</a>
            </Button>
            <Button variant="link" size="sm" asChild className="hidden sm:inline-flex">
              <a href="#pricing" className="story-link">Pricing</a>
            </Button>
            <Button variant="hero" size="sm" asChild className="text-xs sm:text-sm">
              <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer">Book Free Tech Check</a>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 grid items-center gap-6 sm:gap-8 pb-12 sm:pb-16 pt-4 md:grid-cols-2">
          <article className="space-y-6 animate-enter">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Tech Support for    Seniors  - Simple, Patient, Apple‑Focused</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Friendly one‑on‑one help with iPhone, iPad, and Mac. I also assist with
              Windows and Android when needed. Get unstuck fast and feel confident.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="hero" asChild className="w-full sm:w-auto">
                <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer">Book Free Tech Check</a>
              </Button>
            </div>
            <ul className="text-sm text-muted-foreground grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li>• Patient, judgment‑free guidance</li>
              <li>• Clear, step‑by‑step instructions</li>
              <li>• Apple specialist (iPhone, iPad, Mac)</li>
              <li>• Remote or onsite sessions</li>
            </ul>
          </article>
          <aside className="relative order-first md:order-last">
            <img src="/lovable-uploads/8ee775ed-9f5d-4adb-b3e0-abdf2848e37d.png" alt="Friendly tech support specialist portrait" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-lg object-cover shadow-lg" />
          </aside>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 py-8 sm:py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Simple Pricing</h2>
            <p className="text-muted-foreground">Clear rates with no surprises.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle>Onsite Tech Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-3xl sm:text-4xl font-extrabold">$100<span className="text-base sm:text-lg font-medium">/hr</span></p>
                <ul className="text-muted-foreground">
                  <li>• Home visits and in‑person help</li>
                  <li>• Device setup and cleanup</li>
                  <li>• Wi‑Fi, backups, Photos, iCloud</li>
                </ul>
                <Button variant="hero" size="sm" asChild className="w-full sm:w-auto">
                  <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer">Book Free Tech Check</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <CardTitle>Remote Tech Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-3xl sm:text-4xl font-extrabold">$50<span className="text-base sm:text-lg font-medium">/hr</span></p>
                <ul className="text-muted-foreground">
                  <li>• Secure screen‑share assistance</li>
                  <li>• Quick fixes and coaching</li>
                  <li>• Great for follow‑ups</li>
                </ul>
                <Button variant="hero" size="sm" asChild className="w-full sm:w-auto">
                  <a href={CALCOM_URL} target="_blank" rel="noopener noreferrer">Book Free Tech Check</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About */}
        <section id="about" className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <article className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About Me</h2>
              <p className="text-muted-foreground">
                I provide patient, practical tech help tailored for seniors and anyone who
                prefers a calm, simple approach. I specialize in Apple products and make
                technology feel approachable and enjoyable.
              </p>
              <ul className="text-muted-foreground">
                <li>• iPhone, iPad, and Mac setup & training</li>
                <li>• Photos and iCloud organization & backups</li>
                <li>• Email, Messages, Contacts cleanup</li>
                <li>• Password managers and online safety</li>
              </ul>
            </article>
            <aside>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Quick Intro Video</h3>
                <video className="aspect-video w-full rounded-md bg-muted" controls poster="/placeholder.svg">
                  <source src="" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add your intro video file or a YouTube embed here.
                </p>
              </div>
              <Dialog open={isMailingListDialogOpen} onOpenChange={setIsMailingListDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="cta" className="mt-4">Join Mailing List</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Get Apple Tips and Updates</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewsletter} className="space-y-4">
                    <Input 
                      type="text" 
                      placeholder="First Name" 
                      aria-label="First name" 
                      value={newsletterFirstName} 
                      onChange={e => setNewsletterFirstName(e.target.value)} 
                      required 
                    />
                    <Input 
                      type="email" 
                      placeholder="email" 
                      aria-label="Email address" 
                      value={newsletterEmail} 
                      onChange={e => setNewsletterEmail(e.target.value)} 
                      required 
                    />
                    <Button type="submit" variant="cta" className="w-full">Subscribe</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </aside>
          </div>
        </section>

        {/* Course Coming Soon */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                Coming soon
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Simple Tech Made Easy — Online Course</h2>
              <p className="max-w-2xl text-muted-foreground">
                Step‑by‑step lessons for everyday tasks with iPhone, iPad, and Mac. Subscribe to be notified at launch.
              </p>
              <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="cta">Subscribe - Notify Me</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Get Course Updates</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleNewsletter} className="space-y-4">
                    <Input 
                      type="text" 
                      placeholder="Enter your first name" 
                      aria-label="First name" 
                      value={newsletterFirstName} 
                      onChange={e => setNewsletterFirstName(e.target.value)} 
                      required 
                    />
                    <Input 
                      type="email" 
                      placeholder="Email for course updates" 
                      aria-label="Email for course updates" 
                      value={newsletterEmail} 
                      onChange={e => setNewsletterEmail(e.target.value)} 
                      required 
                    />
                    <Button type="submit" variant="cta" className="w-full">Subscribe - Notify Me</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="container mx-auto px-4 border-t py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Tech Made Simple. All rights reserved.</p>
        <p className="mt-1">Apple, iPhone, iPad, and Mac are trademarks of Apple Inc. I provide independent support.</p>
      </footer>
    </>;
};
export default Index;