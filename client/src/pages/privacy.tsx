import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Shield, Lock, Eye, Server, Cookie, Mail } from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: "Information Collection",
    content: `We collect information that you provide directly to us, including:
    • Account information when you create an account
    • Usage data and preferences
    • Technical information about your device and browser
    • Communication data when you contact us`
  },
  {
    icon: Lock,
    title: "Data Security",
    content: `We implement appropriate security measures to protect your data:
    • Encryption of sensitive information
    • Regular security assessments
    • Secure data storage and transmission
    • Access controls and authentication`
  },
  {
    icon: Eye,
    title: "Information Usage",
    content: `We use your information to:
    • Provide and improve our services
    • Personalize your experience
    • Communicate with you about updates
    • Analyze usage patterns and trends`
  },
  {
    icon: Server,
    title: "Data Storage",
    content: `Your data is stored securely:
    • On servers located in secure facilities
    • With regular backups
    • Following industry best practices
    • With limited access by authorized personnel`
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to:
    • Remember your preferences
    • Analyze usage patterns
    • Improve our services
    • Provide a better user experience`
  },
  {
    icon: Mail,
    title: "Contact Information",
    content: `For privacy-related inquiries:
    • Email: privacy@webtoolkit.com
    • Address: 123 Privacy Street, Tech City
    • Response time: Within 48 hours`
  }
];

export default function Privacy() {
  return (
    <div className="container py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Privacy Policy
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
            At WebToolKit, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, and protect your personal information when you use our services. By using WebToolKit,
            you agree to the collection and use of information in accordance with this policy.
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
          This privacy policy is subject to change. We will notify you of any changes by posting the new
          privacy policy on this page. Changes are effective immediately upon posting.
        </p>
      </motion.div>
    </div>
  );
} 