import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function CodeOfConduct() {
  const [, navigate] = useLocation();
  const BASE = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-2xl backdrop-saturate-[1.8] border-b border-border/50 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 group">
            <img src={`${BASE}images/logo-vibe-code-alt.png`} alt="Vibe Code 101" className="w-12 h-12 object-contain" />
            <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Vibe Code 101</span>
          </button>
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/10 px-3 py-1 rounded-full text-sm">
            <Shield className="w-3.5 h-3.5 mr-2 inline" /> Community Standards
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Code of Conduct</h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              Vibe Code 101 is dedicated to providing a harassment-free event experience for everyone, regardless of gender, gender identity, sexual orientation, disability, physical appearance, body size, race, or religion.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Our Pledge</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              We pledge to make participation in our event and community a welcoming, inclusive, and respectful experience. We expect all attendees, speakers, sponsors, and staff to demonstrate empathy, kindness, and professionalism at all times.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Expected Behavior</h2>
            <ul className="text-muted-foreground font-light leading-relaxed space-y-3">
              <li>Be respectful of differing viewpoints, experiences, and skill levels</li>
              <li>Give and accept constructive feedback gracefully</li>
              <li>Focus on what's best for the community and the learning environment</li>
              <li>Show empathy and kindness toward other community members</li>
              <li>Respect personal boundaries and consent at all times</li>
              <li>Help beginners and newcomers feel welcomed and supported</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Unacceptable Behavior</h2>
            <ul className="text-muted-foreground font-light leading-relaxed space-y-3">
              <li>Harassment, intimidation, or discrimination in any form</li>
              <li>Sexualized language, imagery, or unwanted sexual attention</li>
              <li>Personal attacks, insults, or derogatory comments</li>
              <li>Deliberate misgendering or use of dead names</li>
              <li>Publishing others' private information without consent</li>
              <li>Disruptive behavior during sessions, talks, or workshops</li>
              <li>Advocating for or encouraging any of the above behaviors</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Reporting</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              If you experience or witness unacceptable behavior, please report it immediately to any event staff member (identifiable by their orange lanyards) or email <span className="text-primary">founders@vibecode-101.com</span>. All reports will be handled with discretion and confidentiality.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Enforcement</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Event organizers reserve the right to take any action deemed necessary, including warning the offender, expulsion from the event without refund, or banning from future events. We are committed to providing a safe environment for all participants.
            </p>

            <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-foreground font-medium text-center">
                By attending Vibe Code 101, you agree to abide by this Code of Conduct.
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Questions? Email <span className="text-primary">founders@vibecode-101.com</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
