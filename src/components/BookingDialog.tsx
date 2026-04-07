import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface BookingDialogProps {
  children: React.ReactNode;
  defaultMember?: string;
}

const BookingDialog = ({ children, defaultMember }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    member: defaultMember || "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("booking_requests").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        service: formData.service,
        member: formData.member,
        message: formData.message.trim() || null,
      });
      if (error) throw error;
      toast.success("Booking request sent! We'll get back to you soon.");
      setOpen(false);
      setFormData({ name: "", email: "", phone: "", service: "", member: defaultMember || "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again or email us at autodopeent@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl tracking-wider text-foreground">
            Book <span className="text-primary">AutoDope</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <Input
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
          />
          <Select
            value={formData.service}
            onValueChange={(v) => setFormData({ ...formData, service: v })}
          >
            <SelectTrigger className="bg-muted border-border text-foreground">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="dj">DJ / Live Performance</SelectItem>
              <SelectItem value="photo">Photography</SelectItem>
              <SelectItem value="video">Videography / Editing</SelectItem>
              <SelectItem value="full">Full Package</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={formData.member}
            onValueChange={(v) => setFormData({ ...formData, member: v })}
          >
            <SelectTrigger className="bg-muted border-border text-foreground">
              <SelectValue placeholder="Who are you booking?" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="dj-orlando">DJ Orlando</SelectItem>
              <SelectItem value="suave">Suave.sts (Photographer)</SelectItem>
              <SelectItem value="j5">J5 (Videographer)</SelectItem>
              <SelectItem value="full-team">Full Team</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Tell us about your event..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-muted border-border text-foreground placeholder:text-muted-foreground min-h-[100px]"
          />
          <div className="flex flex-col gap-3 pt-2">
            <Button type="submit" disabled={loading} className="w-full gradient-purple text-primary-foreground font-semibold">
              {loading ? "Sending..." : "Submit Booking Request"}
            </Button>
            <a
              href="https://www.instagram.com/autodope.ent?igsh=M2FhcTAwbnZ4NHIz&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Or DM us on Instagram →
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
