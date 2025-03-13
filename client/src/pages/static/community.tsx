import { StaticPageLayout } from "@/components/static-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageSquare, Users } from "lucide-react";

const communityLinks = [
  {
    title: "GitHub",
    description: "Contribute to our open source project",
    icon: Github,
    href: "https://github.com/yourusername/project",
    color: "text-orange-500"
  },
  {
    title: "Community Chat",
    description: "Join our community chat",
    icon: MessageSquare,
    href: "https://discord.gg/your-server",
    color: "text-purple-500"
  },
  {
    title: "Twitter",
    description: "Follow for updates",
    icon: Twitter,
    href: "https://twitter.com/shlok",
    color: "text-blue-500"
  },
  {
    title: "Discussions",
    description: "Participate in discussions",
    icon: Users,
    href: "/discussions",
    color: "text-green-500"
  }
];

export default function Community() {
  return (
    <StaticPageLayout
      title="Community"
      description="Join our growing developer community"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {communityLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                  {link.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-12">
        <h2>Get Involved</h2>
        <p>
          There are many ways to contribute to WebToolKit. Whether you're a developer,
          designer, or just enthusiastic about tools, we welcome your participation!
        </p>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <Button size="lg" className="gap-2">
            <Github className="h-5 w-5" />
            View on GitHub
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <MessageSquare className="h-5 w-5" />
            Join Community Chat
          </Button>
        </div>
      </div>
    </StaticPageLayout>
  );
} 