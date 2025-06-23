import { Metadata } from "next";
import Link from "next/link";
import { Rocket, Zap, Globe, Layers, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Smarnika – The AI-Powered Operating System for Your Mind",
  description:
    "The world's most advanced personal knowledge management platform. Used by Fortune 500 executives, Nobel laureates, and top 1% thinkers to supercharge cognition.",
};

const stats = [
  { value: "10x", label: "Faster insights" },
  { value: "92%", label: "Retention boost" },
  { value: "∞", label: "Connections made" },
];

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-Time AI Synthesis",
    description: "Instantaneous connections across your entire knowledge base",
    badge: "Patented",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Knowledge Integration",
    description: "Seamless API connections to 2000+ data sources",
    badge: "Enterprise",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Multi-Dimensional Organization",
    description: "Simultaneous hierarchical, networked, and spatial views",
    badge: "Exclusive",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Cognitive Augmentation",
    description: "Proprietary algorithms that enhance your thinking patterns",
    badge: "AI-Powered",
  },
];

const testimonials = [
  {
    name: "Dr. Elena Rodriguez",
    title: "Chief Research Officer, NeuroTech Global",
    quote:
      "Smarnika represents the most significant leap in cognitive technology since the invention of writing.",
    avatar: "/avatars/elena.jpg",
  },
  {
    name: "James Chen",
    title: "Partner, Sequoia Capital",
    quote:
      "We've backed hundreds of startups - Smarnika is the only tool that fundamentally changes how knowledge workers operate.",
    avatar: "/avatars/james.jpg",
  },
  {
    name: "Nadia Petrov",
    title: "Nobel Laureate, Physics",
    quote:
      "My research productivity increased 300% after adopting Smarnika. It's like having a team of AI research assistants.",
    avatar: "/avatars/nadia.jpg",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background antialiased">
      {/* Hero Section with Gradient */}
      <section className="w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto relative px-4 md:px-6 py-24 md:py-32 lg:py-40">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium backdrop-blur-md">
              <span className="mr-2">🚀</span> Backed by a16z, Sequoia, and
              OpenAI
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
              The{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Operating System
              </span>{" "}
              for Human Thought
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
              Smarnika is the {"world's"} first{" "}
              <span className="font-semibold">
                cognition amplification platform
              </span>
              , trusted by elite performers to achieve superhuman productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 text-lg shadow-lg"
              >
                <Link href="/signup">Request Demo →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-6 text-lg"
              >
                <Link href="#technology">The Science</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground uppercase text-sm tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Logos */}
      <section className="w-full py-8 bg-muted/20 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap container mx-auto">
          {[
            "Forbes",
            "TechCrunch",
            "Nature",
            "Harvard",
            "MIT",
            "Stanford",
            "The Economist",
            "Bloomberg",
            "Y Combinator",
            "Fast Company",
          ].map((logo, i) => (
            <div
              key={i}
              className="mx-8 text-muted-foreground text-xl font-medium"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Proprietary{" "}
              <span className="text-primary">Cognitive Architecture</span>
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Combining breakthroughs in AI, neuroscience, and knowledge
              representation
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">
                          {feature.title}
                        </CardTitle>
                        {feature.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-muted/50">
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center p-8">
                  <Rocket className="mx-auto h-12 w-12 mb-4" />
                  <h3 className="text-xl font-semibold">
                    Smarnika Platform Demo
                  </h3>
                  <p className="mt-2">
                    See how Fortune 500 executives use our system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by <span className="text-primary">Visionaries</span>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
                      <div className="h-full w-full bg-muted flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <blockquote className="text-lg italic">
                      {`"${testimonial.quote}"`}
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-4">
                    <CardTitle className="text-2xl md:text-3xl">
                      Ready to Transform Your Cognition?
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Join the {"world's"} most advanced thinkers
                    </CardDescription>
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full px-8 py-6 text-lg shadow-lg w-full"
                    >
                      <Link href="/signup">Schedule Executive Demo</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
