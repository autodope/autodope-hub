import { Instagram, Mail } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/autodope.ent?igsh=M2FhcTAwbnZ4NHIz&utm_source=qr", label: "Instagram" },
  { icon: Mail, href: "mailto:book@autodope.com", label: "Email" },
];

const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container max-w-4xl flex flex-col items-center gap-6">
      <p className="font-display text-2xl tracking-wider text-foreground">
        AUTO<span className="text-primary">DOPE</span>
      </p>
      <div className="flex gap-5">
        {socials.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} AutoDope Entertainment. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
