import { motion } from "framer-motion";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
// import Logo from "@/assets/avani-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "SEO Marketing",
    "Social Media",
    "Google & Meta Ads",
  ];

  return (
    <footer className="relative pt-20 pb-10 border-t border-border/40">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">

          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src="./avani-logo.jpg"
                alt="Avani Enterprises Logo"
                className="w-20 h-20 rounded-xl object-cover shadow-md border border-border/50"
              />
              <h2 className="text-2xl font-display font-semibold tracking-wide text-foreground">
                Avani Enterprises
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Delivering innovative digital solutions to help your business grow,
              scale, and succeed with confidence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="text-muted-foreground hover:text-accent transition-all flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Our Services
            </h4>

            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector("#services");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="text-muted-foreground hover:text-accent transition-all flex items-center gap-1 group"
                  >
                    {service}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Contact Us
            </h4>

            <ul className="space-y-5">
              <li>
                <a
                  href="mailto:contact@avanienterprises.com"
                  className="flex items-start gap-3 text-muted-foreground hover:text-accent group transition"
                >
                  <Mail className="w-5 h-5 mt-0.5" />
                  <span>kp@avanienterprises.in</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919253625099"
                  className="flex items-start gap-3 text-muted-foreground hover:text-accent group transition"
                >
                  <Phone className="w-5 h-5 mt-0.5" />
                  <span>+91 93119 67319</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Avani Enterprises. All rights reserved.
            </p>

           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
