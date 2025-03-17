
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

const TermsOfService = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white shadow-sm rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-gradient-primary">Terms of Service</h1>
          
          <div className="space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Introduction</h2>
              <p>
                Welcome to Hardeep Anand's website. These Terms of Service govern your use of this website and any related services offered here. By accessing or using this website, you agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Hardeep Anand or his content suppliers and is protected by international copyright laws.
              </p>
              <p className="mt-2">
                You may access, download, or print material from this website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works from, publicly display, or exploit in any way any content from this website without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">User Conduct</h2>
              <p>When using this website, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Use the website for any unlawful purpose or in violation of these Terms</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the operation of the website</li>
                <li>Collect or harvest any personal information from the website</li>
                <li>Upload or transmit viruses or other malicious code</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites that are not owned or controlled by Hardeep Anand. I have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that I shall not be responsible or liable for any damage or loss caused by the use of such websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Courses and Services</h2>
              <p>
                Information about courses and services on this website is provided for general informational purposes only. I reserve the right to modify or discontinue any course or service without notice. I do not guarantee that any course or service will be available at any particular time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Disclaimer of Warranties</h2>
              <p>
                This website and its content are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Hardeep Anand shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or in connection with your use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Hardeep Anand from and against any claims, liabilities, damages, losses, and expenses, including but not limited to reasonable attorneys' fees, arising out of or in any way connected with your access to or use of this website or your violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Hardeep Anand operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Changes to Terms</h2>
              <p>
                I reserve the right to modify these Terms at any time without prior notice. Your continued use of this website after any such changes constitutes your acceptance of the new Terms.
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

export default TermsOfService;
