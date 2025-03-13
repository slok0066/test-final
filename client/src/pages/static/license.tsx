import { StaticPageLayout } from "@/components/static-page-layout";

export default function License() {
  return (
    <StaticPageLayout
      title="License"
      description="Terms of use and distribution"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent inline-block">
          License Agreement
        </h1>

        <p className="lead">Last updated: March 20, 2024</p>

        <h2>1. Software License</h2>
        <p>
          WebToolKit is licensed under the MIT License. This means you are free to:
        </p>
        <ul>
          <li>Use the software for personal and commercial purposes</li>
          <li>Modify the software to suit your needs</li>
          <li>Distribute the software</li>
          <li>Include the software in your own projects</li>
        </ul>

        <h2>2. MIT License</h2>
        <div className="bg-muted p-4 rounded-lg">
          <p>Copyright (c) 2024 WebToolKit</p>
          <p>
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
          </p>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>

        <h2>3. Third-Party Licenses</h2>
        <p>
          WebToolKit uses various open-source libraries and tools. You can find their licenses in our GitHub repository.
        </p>

        <h2>4. Questions</h2>
        <p>
          If you have any questions about the license, please contact us at:
          <br />
          Email: legal@webtoolkit.dev
        </p>
      </div>
    </StaticPageLayout>
  );
} 