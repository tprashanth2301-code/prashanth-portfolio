import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download, ExternalLink, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * Portfolio Design Philosophy: Data-Driven Professional
 * - Dark theme with cyan (#00d9ff) and purple (#7c3aed) accents
 * - Metric-focused achievements and quantifiable impact
 * - Smooth scroll animations and interactions
 * - Professional yet approachable aesthetic
 */

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: "Data Analytics & Technical",
    items: ["SQL", "Python (Pandas, NumPy)", "Data Wrangling", "ETL Automation", "Data Modeling", "Snowflake", "Power BI", "Excel"],
  },
  {
    category: "Analytics & Business",
    items: ["Data Quality Analysis", "Root-Cause Analysis", "Stakeholder Collaboration", "Cross-Functional Communication", "Process Improvement"],
  },
  {
    category: "Tools & Platforms",
    items: ["Snowflake", "Power BI", "Jira", "Confluence", "GraphQL"],
  },
];

interface Achievement {
  metric: string;
  description: string;
  icon: string;
}

const achievements: Achievement[] = [
  {
    metric: "70%",
    description: "Data product performance boost through ETL automation",
    icon: "📈",
  },
  {
    metric: "60%+",
    description: "Validation efficiency improvement, scaled from 1 to 100+ datasets",
    icon: "✅",
  },
  {
    metric: "$96K",
    description: "Annual cost savings generated",
    icon: "💰",
  },
  {
    metric: "9%",
    description: "Reporting accuracy improvement through data analysis",
    icon: "🎯",
  },
];

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

const experience: ExperienceItem[] = [
  {
    title: "Senior Product Analyst (Data Analytics Focus)",
    company: "FactSet Research Systems",
    period: "Jun 2022 – Jan 2026",
    highlights: [
      "Boosted data product performance by 70% through ETL-driven automation, saving 250+ analyst hours and generating $96K in annual cost savings",
      "Performed data wrangling by extracting, cleaning, transforming and validating datasets using Python, SQL, and Snowflake",
      "Automated Python and SQL pipelines, reducing manual effort by 40% and improving data consistency",
      "Defined and tracked success metrics and KPIs to measure data product performance and user adoption",
      "Analyzed large-scale datasets using Snowflake and SQL to identify inconsistencies and improve reporting accuracy by 9%",
      "Conducted data validation and QA analysis, improving validation efficiency by 60%+ and scaling support from 1 to 100+ client datasets",
      "Built Power BI dashboards and Excel reports to visualize KPIs, trends and performance metrics",
    ],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sendMessageMutation = trpc.contact.sendMessage.useMutation();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendMessageMutation.mutateAsync(formData);
      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776986575/SVTGt9G5c2WqNRPpe5qGox/logo-kzAVFV8LYhwtQb8NL2EYxq.webp"
              alt="PT Logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Prashanth
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id ? "text-cyan-400" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-600 text-background font-medium"
            onClick={() => scrollToSection("contact")}
          >
            Get in Touch
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663776986575/SVTGt9G5c2WqNRPpe5qGox/hero-bg-mUUivPidztFx56TwPDvjrS.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background z-10" />

        {/* Content */}
        <div className="container relative z-20 text-center max-w-4xl mx-auto px-4">
            <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-cyan-400 font-medium text-sm tracking-widest uppercase">Welcome to my portfolio</p>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Prashanth Terupelli
              </h1>
              <p className="text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Senior Product Analyst
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Data-driven insights that drive real business impact. 3.7+ years transforming complex data into actionable intelligence with SQL, Python, and modern BI tools.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-2xl font-bold text-cyan-400">{achievement.metric}</div>
                  <p className="text-xs text-muted-foreground mt-2">{achievement.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-background font-semibold group"
                onClick={() => scrollToSection("about")}
              >
                Explore My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="/Prashanth_Terupelli_Resume.pdf"
                download
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-cyan-400/30 hover:bg-cyan-400/10 transition-all duration-300 font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card/30">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>About Me</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Who I Am</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm an analytical and results-driven Senior Product Analyst with 3.7+ years of experience leveraging data-driven insights to analyze product and business performance. I specialize in transforming complex datasets into actionable intelligence that drives strategic decisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">My Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I believe in writing clean, maintainable code and following best practices. Every analysis starts with understanding requirements, designing optimal solutions, and implementing with attention to data quality and scalability.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">My Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To continuously enhance my skills in data analytics, cloud computing, and AI while solving complex real-world problems. I aim to contribute to meaningful projects that leverage cutting-edge technologies.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-background/50 border border-border rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
                  <h4 className="font-bold text-cyan-400 mb-4">Quick Facts</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">▸</span>
                      <span><strong>Location:</strong> Hyderabad, Telangana</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">▸</span>
                      <span><strong>Experience:</strong> 3.7+ years in Data Analytics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">▸</span>
                      <span><strong>Education:</strong> B.Tech in Computer Science</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-500 mt-1">▸</span>
                      <span><strong>Status:</strong> Immediate Joiner</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background/50 border border-border rounded-lg p-6">
                  <h4 className="font-bold text-cyan-400 mb-4">Connect With Me</h4>
                  <div className="flex gap-3">
                    <a
                      href="mailto:tprashanth2301@gmail.com"
                      className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 rounded-lg transition-all duration-300"
                      title="Email"
                    >
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 rounded-lg transition-all duration-300"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-cyan-400" />
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 rounded-lg transition-all duration-300"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5 text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Technical Expertise</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skillGroup, idx) => (
                <div
                  key={idx}
                  className="bg-card/50 border border-border rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <h3 className="font-bold text-lg mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {skillGroup.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 bg-background border border-border rounded-full text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-card/30">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Professional Journey</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
            </div>

            <div className="space-y-8">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-border pb-8 last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <div className="bg-background/50 border border-border rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                        <p className="text-cyan-400 font-medium">{item.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full border border-border">
                        {item.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed">
                          <span className="text-cyan-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Let's Connect</h2>
                <p className="text-muted-foreground text-lg">
                  Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg group-hover:bg-cyan-500/20 transition-all">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Me At</p>
                    <a href="mailto:tprashanth2301@gmail.com" className="font-bold hover:text-cyan-400 transition-colors">
                      tprashanth2301@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg group-hover:bg-purple-500/20 transition-all">
                    <Linkedin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Professional Profile</p>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-purple-400 transition-colors">
                      linkedin.com/in/prashanth
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-border rounded-2xl p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-background font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="mailto:tprashanth2301@gmail.com"
                className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-border rounded-lg hover:border-cyan-400/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">Email</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-border rounded-lg hover:border-cyan-400/50 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-background/50 border border-border rounded-lg hover:border-cyan-400/50 transition-all duration-300"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card/30">
        <div className="container text-center text-muted-foreground text-sm">
          <p>© 2026 Prashanth Terupelli. All rights reserved.</p>
          <p className="mt-2">Crafted with passion by Prashanth Terupelli</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {scrolled && (
        <button
          onClick={() => scrollToSection("hero")}
          className="fixed bottom-8 right-8 z-40 p-3 bg-cyan-500 hover:bg-cyan-600 text-background rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
        </button>
      )}
    </div>
  );
}
