
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white shadow-sm rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-gradient-primary">Privacy Policy</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Introduction</h2>
              <p>
                This Privacy Policy outlines how Hardeep Anand ("I", "me", or "my") collects, uses, and protects your personal information when you visit this website. I respect your privacy and am committed to protecting your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Information I Collect</h2>
              <p>I may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Your name and email address when you subscribe to my newsletter</li>
                <li>Information you provide when filling out the interest form</li>
                <li>Analytics data about how you interact with my website</li>
                <li>Cookies and similar technologies to enhance your browsing experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">How I Use Your Information</h2>
              <p>I use the information I collect to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Send you the newsletter you subscribed to</li>
                <li>Respond to your inquiries about my services</li>
                <li>Improve my website based on your feedback and interactions</li>
                <li>Personalize your experience on the website</li>
                <li>Provide you with information about courses and other offerings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Data Security</h2>
              <p>
                I implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. I use industry-standard encryption and data storage practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Third-Party Services</h2>
              <p>
                This website may use third-party services such as analytics tools and newsletter management services. These services may collect information sent by your browser as part of their functionality. They have their own privacy policies governing the use of this information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Cookies</h2>
              <p>
                This website uses cookies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit your ability to use some features of the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Access the personal data I hold about you</li>
                <li>Request correction of your personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Changes to This Privacy Policy</h2>
              <p>
                I may update this privacy policy from time to time to reflect changes in my practices or for other operational, legal, or regulatory reasons. I will notify you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact me through the contact information provided on this website.
              </p>
            </section>

            <p className="text-sm mt-8 pt-4 border-t border-gray-100">
              Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
