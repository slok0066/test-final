import { StaticPageLayout } from "@/components/static-page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const roadmapItems = [
  {
    quarter: "Q2 2024",
    status: "in-progress",
    items: [
      { title: "AI-Powered Code Analysis", description: "Integrate AI to provide code suggestions and improvements" },
      { title: "Advanced API Testing", description: "Enhanced API testing with mock server capabilities" },
      { title: "Collaborative Features", description: "Real-time collaboration on tools and projects" }
    ]
  },
  {
    quarter: "Q3 2024",
    status: "planned",
    items: [
      { title: "Custom Workflows", description: "Create and share tool workflows" },
      { title: "Desktop App", description: "Native desktop application for offline use" },
      { title: "Enhanced Security Tools", description: "Advanced encryption and security testing features" }
    ]
  },
  {
    quarter: "Q4 2024",
    status: "planned",
    items: [
      { title: "Team Workspaces", description: "Dedicated spaces for team collaboration" },
      { title: "CI/CD Integration", description: "Integrate with popular CI/CD platforms" },
      { title: "Mobile App", description: "Native mobile app for on-the-go access" }
    ]
  }
];

export default function Roadmap() {
  return (
    <StaticPageLayout title="Roadmap" description="Our vision and future plans">
      <div className="space-y-8">
        <div className="prose prose-lg dark:prose-invert">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
            Product Roadmap
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our planned features and upcoming improvements. We're constantly evolving to meet developer needs.
          </p>
        </div>

        <div className="space-y-12">
          {roadmapItems.map((quarter, index) => (
            <motion.div
              key={quarter.quarter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">{quarter.quarter}</h2>
                <Badge variant={quarter.status === "in-progress" ? "default" : "secondary"}>
                  {quarter.status === "in-progress" ? "In Progress" : "Planned"}
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {quarter.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
} 