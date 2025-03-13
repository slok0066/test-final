import { StaticPageLayout } from "@/components/static-page-layout";

export default function Cookies() {
  return (
    <StaticPageLayout
      title="Cookie Policy"
      description="How we use cookies and similar technologies"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
          Cookie Policy
        </h1>

        <p className="lead">Last updated: March 20, 2024</p>

        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit our website. 
          They help us provide you with a better experience by:
        </p>
        <ul>
          <li>Remembering your preferences</li>
          <li>Keeping you signed in</li>
          <li>Understanding how you use our tools</li>
          <li>Improving our services based on usage data</li>
        </ul>

        <h2>2. Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as security and user preferences.
        </p>

        <h3>Analytics Cookies</h3>
        <p>
          We use analytics cookies to understand how visitors interact with our website, helping us improve our services.
        </p>

        <h3>Preference Cookies</h3>
        <p>
          These cookies remember your settings and preferences to enhance your experience.
        </p>

        <h2>3. Managing Cookies</h2>
        <p>
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
        </p>

        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at:
          <br />
          Email: privacy@webtoolkit.dev
        </p>
      </div>
    </StaticPageLayout>
  );
} 