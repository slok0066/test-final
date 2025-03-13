import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is WebToolKit free to use?",
    answer: "Yes, WebToolKit is completely free to use for all basic features. We offer a premium subscription for advanced features and higher usage limits."
  },
  {
    question: "Do I need to create an account to use WebToolKit?",
    answer: "No, you can use most tools without creating an account. However, creating an account allows you to save your work, access your history, and use premium features if you subscribe."
  },
  {
    question: "Is my data secure when using WebToolKit?",
    answer: "Yes, we take data security very seriously. All data is processed in your browser whenever possible, and we don't store your data unless you explicitly save it to your account. Our servers use encryption for all data transfers."
  },
  {
    question: "Can I use WebToolKit offline?",
    answer: "Some tools can work offline once the page is loaded, but most require an internet connection. We're working on a fully offline-capable version for the future."
  },
  {
    question: "How do I report a bug or request a feature?",
    answer: "You can report bugs or request features through our GitHub repository or by contacting our support team through the contact form on our website."
  },
  {
    question: "Are there API rate limits?",
    answer: "Yes, free accounts have a limit of 100 API requests per day. Premium subscribers have higher limits based on their subscription tier."
  },
  {
    question: "Can I embed WebToolKit tools on my website?",
    answer: "Yes, we offer embeddable versions of many of our tools. Check the API documentation for details on how to embed tools on your website."
  },
  {
    question: "Is WebToolKit open source?",
    answer: "Parts of WebToolKit are open source and available on our GitHub repository. Some premium features and proprietary algorithms remain closed source."
  },
  {
    question: "How often are new tools added?",
    answer: "We aim to add new tools monthly. You can check our roadmap to see what's coming next and subscribe to our newsletter for updates."
  },
  {
    question: "Can I contribute to WebToolKit?",
    answer: "Yes, we welcome contributions! Check our GitHub repository for contribution guidelines and open issues that need help."
  }
];

export default function FAQ() {
  return (
    <div className="container py-10 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <Link href="/docs">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Documentation
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about WebToolKit.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-primary/5 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer to your question, feel free to contact our support team.
          </p>
          <Button>Contact Support</Button>
        </div>
      </motion.div>
    </div>
  );
} 