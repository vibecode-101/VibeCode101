import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useRef } from "react";

export default function Contact() {
  const [, navigate] = useLocation();
  const BASE = import.meta.env.BASE_URL;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="max-w-3xl mb-16">
            <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/10 px-3 py-1 rounded-full text-sm">
              <Mail className="w-3.5 h-3.5 mr-2 inline" /> Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Have a question about the event, sponsorships, or partnerships? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="holo-card holo-glow p-12 text-center">
                  <div className="relative z-[2]">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-7 h-7 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Message Sent!</h3>
                    <p className="text-muted-foreground font-light">We'll get back to you within 24 hours. Check your email for a confirmation.</p>
                  </div>
                </div>
              ) : (
                <div className="holo-card holo-glow">
                  <div className="relative z-[2] p-8">
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      setError("");
                      setSending(true);
                      try {
                        const res = await fetch(`${BASE}api/contact`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: nameRef.current?.value,
                            email: emailRef.current?.value,
                            subject: subjectRef.current?.value,
                            message: messageRef.current?.value,
                          }),
                        });
                        const data = await res.json();
                        if (!res.ok) {
                          setError(data.error || "Something went wrong. Please try again.");
                        } else {
                          setSubmitted(true);
                        }
                      } catch {
                        setError("Could not send message. Please email founders@vibecode-101.com directly.");
                      } finally {
                        setSending(false);
                      }
                    }} className="flex flex-col gap-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                          <input
                            ref={nameRef}
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 dark:bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                          <input
                            ref={emailRef}
                            type="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 dark:bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                        <select ref={subjectRef} className="w-full px-4 py-3 rounded-xl bg-muted/50 dark:bg-white/5 border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all">
                          <option>General Inquiry</option>
                          <option>Sponsorship</option>
                          <option>Group Tickets</option>
                          <option>Speaking Opportunity</option>
                          <option>Press & Media</option>
                          <option>Accessibility</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                        <textarea
                          ref={messageRef}
                          required
                          rows={5}
                          placeholder="Tell us what's on your mind..."
                          className="w-full px-4 py-3 rounded-xl bg-muted/50 dark:bg-white/5 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                      )}
                      <Button type="submit" disabled={sending} className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-white text-base disabled:opacity-50">
                        {sending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground font-light">All inquiries: <span className="text-primary">founders@vibecode-101.com</span></p>
                  </div>
                </div>
              </div>

              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Location</h4>
                    <p className="text-sm text-muted-foreground font-light">International Drive</p>
                    <p className="text-sm text-muted-foreground font-light">Orlando, FL 32819</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Exact venue shared 2 weeks before event</p>
                  </div>
                </div>
              </div>

              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Community</h4>
                    <p className="text-sm text-muted-foreground font-light">Join the Discord for real-time chat</p>
                    <p className="text-sm text-muted-foreground font-light">Follow us on Twitter @vibecode101</p>
                  </div>
                </div>
              </div>

              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Response Time</h4>
                    <p className="text-sm text-muted-foreground font-light">We typically respond within 24 hours on business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
