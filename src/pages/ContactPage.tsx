import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Send, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allCountries } from "@/data/countries";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().optional(),
  country: z.string().min(1, "Please select a country"),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", country: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent!", description: "An advisor will get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", country: "", message: "" });
    }, 1200);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    
    <div className="min-h-screen bg-background pt-14">

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary/95 to-accent/20 px-4 py-8 text-center">
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
          <span className="inline-block px-3 py-1 rounded-full border border-accent/40 text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </span>
          <h1 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2">
            Start Your Study Abroad Journey
          </h1>
          <p className="text-primary-foreground/60 text-xs max-w-sm mx-auto">
            Fill in the form and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-5 gap-6 items-start">

        {/* Form — left / top */}
        <motion.div
          initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="md:col-span-3 bg-card rounded-2xl border border-border p-5 md:p-6 shadow-sm"
        >
          <h2 className="font-display text-lg text-foreground mb-4">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-medium">Full Name <span className="text-destructive">*</span></Label>
                <Input id="name" placeholder="John Doe" value={form.name} onChange={e => updateField("name", e.target.value)} className={`h-9 text-sm ${errors.name ? "border-destructive" : ""}`} />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs font-medium">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => updateField("phone", e.target.value)} className="h-9 text-sm" />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-medium">Email Address <span className="text-destructive">*</span></Label>
              <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={e => updateField("email", e.target.value)} className={`h-9 text-sm ${errors.email ? "border-destructive" : ""}`} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Country of Interest <span className="text-destructive">*</span></Label>
              <Select value={form.country} onValueChange={v => updateField("country", v)}>
                <SelectTrigger className={`h-9 text-sm ${errors.country ? "border-destructive" : ""}`}>
                  <SelectValue placeholder="Select a destination country" />
                </SelectTrigger>
                <SelectContent>
                  {allCountries.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="message" className="text-xs font-medium">Your Message <span className="text-destructive">*</span></Label>
              <Textarea
                id="message"
                placeholder="Tell us about your goals, preferred programs, or any questions..."
                value={form.message}
                onChange={e => updateField("message", e.target.value)}
                className={`min-h-[90px] resize-none text-sm ${errors.message ? "border-destructive" : ""}`}
              />
              <div className="flex justify-between">
                {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
                <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
              </div>
            </div>

            <Button type="submit" disabled={submitting} className="w-full h-10 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-sm">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Send Message
                </span>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>

        {/* Contact Info — right / bottom */}
        <motion.div
          initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
          className="md:col-span-2 space-y-4"
        >
          <div>
            <h2 className="font-display text-lg text-foreground mb-0.5">Contact Information</h2>
            <p className="text-xs text-muted-foreground">Reach us through any of these channels</p>
          </div>

          {[
            { icon: Phone,  label: "Phone",  value: "+91 97785 58140",           href: "tel:+919778558140" },
            { icon: Mail,   label: "Email",  value: "ECoverseas@gmail.com",            href: "mailto:your@gmail.com" },
            { icon: MapPin, label: "Office", value: "ECoverseas", href: "https://maps.app.goo.gl/3K2yygR7kKj79ta77" },
            { icon: Clock,  label: "Hours",  value: "Mon – Sat, 9 AM – 6 PM",    href: null },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <item.icon className="h-3.5 w-3.5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:text-accent transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919778558140"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Chat on WhatsApp</p>
              <p className="text-xs text-muted-foreground">Typically replies within minutes</p>
            </div>
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactPage;
