import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function PrivacyPolicy() {
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
            <Lock className="w-3.5 h-3.5 mr-2 inline" /> Privacy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: March 15, 2026</p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8">
              AiAssist.net ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us in connection with Vibe Code 101.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Information We Collect</h2>
            <p className="text-muted-foreground font-light leading-relaxed mb-3">We collect information you provide directly when you:</p>
            <ul className="text-muted-foreground font-light leading-relaxed space-y-2">
              <li>Register for the event (name, email, company, role)</li>
              <li>Purchase tickets (billing address, payment method via Stripe)</li>
              <li>Submit projects to the gallery (project name, description, screenshots)</li>
              <li>Subscribe to our newsletter (email address)</li>
              <li>Interact with the AI Concierge on this website (chat messages)</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How We Use Your Information</h2>
            <ul className="text-muted-foreground font-light leading-relaxed space-y-2">
              <li>Process ticket purchases and send confirmation emails</li>
              <li>Communicate event updates, schedule changes, and logistics</li>
              <li>Display submitted projects in the public gallery</li>
              <li>Improve the event experience and plan future events</li>
              <li>Send marketing emails (only with your opt-in consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Data Sharing</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              We do not sell your personal information. We may share limited data with event sponsors only if you explicitly opt in during registration. Payment processing is handled securely by Stripe — we never store your full credit card information.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Cookies & Analytics</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              This website uses minimal analytics to understand traffic patterns. We do not use third-party advertising cookies. The AI Concierge stores conversation history only in your browser's session — it is not persisted on our servers.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Data Retention</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              We retain your registration data for up to 2 years after the event for communication purposes. You may request deletion of your data at any time by emailing <span className="text-primary">founders@vibecode-101.com</span>.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Your Rights</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              You have the right to access, correct, or delete your personal data. You can opt out of marketing emails at any time using the unsubscribe link in any email we send. For data requests, contact <span className="text-primary">founders@vibecode-101.com</span>.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Contact</h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              For privacy-related questions or concerns, please contact us at <span className="text-primary">founders@vibecode-101.com</span>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
