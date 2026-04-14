import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function TermsOfService() {
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
            <FileText className="w-3.5 h-3.5 mr-2 inline" /> Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 15, 2026</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              By purchasing a badge or attending Vibe Code 101, you agree to the following terms and conditions.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Event Participation</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Vibe Code 101 is organized by AiAssist.net. Attendance requires a valid badge purchased through our official website. We reserve the right to refuse admission or remove any attendee who violates our Code of Conduct.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Badges & Refunds</h2>
            <ul className="text-muted-foreground font-light leading-relaxed space-y-2">
              <li>All badge sales are processed securely through Stripe</li>
              <li>Full refunds are available up to 14 days before the event</li>
              <li>After the 14-day window, badges are non-refundable but transferable to another person</li>
              <li>Badge upgrades are available at any time before the event — pay only the difference</li>
              <li>Group discounts (5+ people: 15% off, 10+ people: 25% off) cannot be applied retroactively</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              All projects built during Vibe Code 101 remain the intellectual property of their creators. By submitting a project to the gallery, you grant AiAssist.net a non-exclusive license to display your project name, description, and screenshots on the event website and marketing materials.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Content & Recordings</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Keynotes and masterclass sessions may be recorded and shared with badge holders after the event. By attending, you consent to being photographed or recorded for event documentation and marketing purposes. If you do not wish to be photographed, please notify event staff.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Liability</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              AiAssist.net is not responsible for lost, stolen, or damaged personal property during the event. Attendees participate at their own risk. We maintain appropriate venue insurance and security for the safety of all participants.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Event Changes</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              We reserve the right to modify the event schedule, speakers, or venue due to circumstances beyond our control. In the unlikely event of a full cancellation, all badge holders will receive a complete refund.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Contact</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              For questions about these terms, contact us at <span className="text-primary">founders@vibecode-101.com</span>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
