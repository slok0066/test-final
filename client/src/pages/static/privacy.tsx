import { StaticPageLayout } from "@/components/static-page-layout";

export default function Privacy() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      description="How we handle and protect your data"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
          Privacy Policy
        </h1>

        <p className="lead">Last updated: March 20, 2024</p>

        <h2>1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us when using WebToolKit:
        </p>
        <ul>
          <li>Account information (email, username)</li>
          <li>Usage data to improve our services</li>
          <li>Tool preferences and settings</li>
          <li>Content you create using our tools</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information for:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Personalizing your experience</li>
          <li>Sending important updates and notifications</li>
          <li>Analyzing usage patterns to enhance performance</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your data:
        </p>
        <ul>
          <li>End-to-end encryption for sensitive data</li>
          <li>Regular security audits</li>
          <li>Secure data storage and transmission</li>
          <li>Access controls and monitoring</li>
        </ul>

        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request data correction or deletion</li>
          <li>Opt-out of marketing communications</li>
          <li>Export your data</li>
        </ul>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          Email: privacy@webtoolkit.dev
        </p>
      </div>
    </StaticPageLayout>
  );
} 