import { StaticPageLayout } from "@/components/static-page-layout";

export default function Terms() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      description="Terms and conditions for using WebToolKit"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
          Terms of Service
        </h1>

        <p className="lead">Last updated: March 20, 2024</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using WebToolKit, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>

        <h2>2. Use License</h2>
        <p>
          We grant you a personal, non-exclusive, non-transferable license to use WebToolKit for development purposes.
        </p>
        <ul>
          <li>You may not use our tools for malicious purposes</li>
          <li>You may not redistribute our tools without permission</li>
          <li>You retain ownership of your content</li>
        </ul>

        <h2>3. Service Availability</h2>
        <p>
          We strive to maintain high availability but do not guarantee uninterrupted access to our services.
        </p>

        <h2>4. User Responsibilities</h2>
        <ul>
          <li>Maintain account security</li>
          <li>Use tools responsibly</li>
          <li>Respect intellectual property rights</li>
          <li>Follow applicable laws and regulations</li>
        </ul>

        <h2>5. Limitation of Liability</h2>
        <p>
          WebToolKit is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our services.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of new terms.
        </p>
      </div>
    </StaticPageLayout>
  );
} 