import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Trash2, RefreshCw, Mail, User, Calendar, Phone } from "lucide-react";

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  member: string;
  message: string | null;
  created_at: string;
}

const serviceLabels: Record<string, string> = {
  dj: "DJ / Live Performance",
  photo: "Photography",
  video: "Videography / Editing",
  full: "Full Package",
};

const memberLabels: Record<string, string> = {
  "dj-orlando": "DJ Orlando",
  suave: "Suave.sts",
  j5: "J5",
  "full-team": "Full Team",
};

const Admin = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load bookings");
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      fetchBookings();
    }
  }, [user, isAdmin]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("booking_requests").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Booking deleted");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (authLoading || (!user || !isAdmin)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl tracking-wider text-foreground">
            AUTO<span className="text-primary">DOPE</span>
          </h1>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">ADMIN</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={fetchBookings}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Booking Requests</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {bookings.length} request{bookings.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-12">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 border border-border rounded-lg">
            <p className="text-muted-foreground">No booking requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-card border border-border rounded-lg p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{booking.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`mailto:${booking.email}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {booking.email}
                      </a>
                    </div>
                    {booking.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a
                          href={`tel:${booking.phone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {booking.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(booking.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(booking.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    {serviceLabels[booking.service] || booking.service}
                  </span>
                  <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                    {memberLabels[booking.member] || booking.member}
                  </span>
                </div>
                {booking.message && (
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {booking.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
