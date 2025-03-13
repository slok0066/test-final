import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { ScrollText, UserCheck, AlertTriangle, Ban, Scale, HeartHandshake } from 'lucide-react';

const sections = [
  {
    icon: UserCheck,
    title: "Account Terms",
    content: `By creating an account, you agree to:
    • Provide accurate and complete information
    • Maintain the security of your account
    • Not share your account credentials
    • Be responsible for all activity under your account`
  },
  {
    icon: ScrollText,
    title: "Acceptable Use",
    content: `You agree to use our services:
    • In compliance with all applicable laws
    • Without violating any third-party rights
    • In accordance with our guidelines
    • For legitimate and lawful purposes only`
  },
  {
    icon: AlertTriangle,
    title: "Prohibited Activities",
    content: `You must not engage in:
    • Unauthorized access or use
    • Distribution of malware or viruses
    • Spamming or harassment
    • Any illegal or harmful activities`
  },
  {
    icon: Scale,
    title: "Intellectual Property",
    content: `You acknowledge that:
    • All content remains our property
    • You may not copy or redistribute content
    • Trademarks and logos are protected
    • Your feedback may be used by us`
  },
  {
    icon: Ban,
    title: "Termination",
    content: `We reserve the right to:
    • Suspend or terminate accounts
    • Remove content without notice
    • Block access to services
    • Take legal action if necessary`
  },
  {
    icon: HeartHandshake,
    title: "Service Agreement",
    content: `By using our services:
    • You accept these terms
    • You agree to our privacy policy
    • You understand our limitations
    • You accept our pricing terms`
  }
];

export default function Terms() {
  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-lg">
          Last updated: March 15, 2024
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-12"
      >
        <Card className="p-6">
          <p className="text-muted-foreground">
            Please read these Terms of Service carefully before using WebToolKit. By accessing or using
            our services, you agree to be bound by these terms. If you disagree with any part of the
            terms, you may not access our services.
          </p>
        </Card>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (index * 0.1) }}
          >
            <Card className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/5">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <div className="text-muted-foreground text-sm whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-3xl mx-auto mt-12 text-center"
      >
        <p className="text-sm text-muted-foreground">
          These terms are subject to change at any time. We will notify you of any changes by posting
          the new terms on this page. Your continued use of our services after such changes constitutes
          your acceptance of the new terms.
        </p>
      </motion.div>
    </div>
  );
} 