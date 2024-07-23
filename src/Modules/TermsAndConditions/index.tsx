import React from "react";

type Props = {};

const TermsAndConditionsPage = (props: Props) => {
  return (
    <section className='py-[50px]'>
      <header className='container max-w-[38rem] mx-auto mb-[50px]'>
        <div className='text-[48px] text-center font-bold leading-snug'>
          <h1>Terms and Conditions</h1>
        </div>
      </header>
      <div className='container w-2/3 mx-auto'>
        <div className='text-xl space-y-6'>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of our Quality Assurance as a Service (QAaaS) Platform, located
            at qaplatform.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use qaplatform.com if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>
          <p>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            "Client", "You" and "Your" refers to you, the person log on this
            website and compliant to the Company's terms and conditions. "The
            Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
            "Party", "Parties", or "Us", refers to both the Client and
            ourselves. "QA Tester" refers to the quality assurance professionals
            who provide services through our platform. All terms refer to the
            offer, acceptance and consideration of payment necessary to
            undertake the process of our assistance to the Client in the most
            appropriate manner for the express purpose of meeting the Client's
            needs in respect of provision of the Company's stated services, in
            accordance with and subject to, prevailing law.
          </p>
          <h3>
            <strong className="text-[30px] font-semibold">Platform Usage</strong>
          </h3>
          <p>
            Our QAaaS Platform connects software developers (Clients) with
            skilled QA testers. By using our platform, you agree to:
          </p>
          <ul>
            <li>
              Provide accurate and complete information when creating an account
            </li>
            <li>Maintain the security of your account credentials</li>
            <li>
              Use the platform for its intended purpose of facilitating QA
              services
            </li>
            <li>
              Respect the intellectual property rights of all parties involved
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Project Postings and Assignments</strong>
          </h3>
          <p>
            Clients may post QA projects on our platform. By doing so, you agree
            that:
          </p>
          <ul>
            <li>Your project details are accurate and complete</li>
            <li>
              You have the authority to post the project and engage QA services
            </li>
            <li>
              You will evaluate and select QA Testers fairly based on their
              qualifications
            </li>
            <li>
              You will provide necessary resources and information for QA
              Testers to complete their tasks
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">QA Tester Responsibilities</strong>
          </h3>
          <p>QA Testers using our platform agree to:</p>
          <ul>
            <li>
              Provide accurate information about their skills and experience
            </li>
            <li>
              Perform QA tasks to the best of their abilities and in a timely
              manner
            </li>
            <li>Maintain confidentiality of all project-related information</li>
            <li>
              Communicate professionally with Clients through our platform
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Payment and Fees</strong>
          </h3>
          <p>
            Our platform facilitates payments between Clients and QA Testers. By
            using our payment system, you agree to:
          </p>
          <ul>
            <li>Pay the agreed-upon amount for completed QA services</li>
            <li>
              Accept our platform's fee structure for facilitating the service
            </li>
            <li>
              Resolve any payment disputes through our designated channels
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Intellectual Property</strong>
          </h3>
          <p>
            All intellectual property rights related to the QA projects remain
            with the Client, unless explicitly agreed otherwise. QA Testers
            agree to:
          </p>
          <ul>
            <li>
              Not use or disclose any proprietary information outside of the
              project scope
            </li>
            <li>
              Transfer any created intellectual property to the Client upon
              project completion and payment
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Privacy and Data Protection</strong>
          </h3>
          <p>
            We are committed to protecting your privacy and personal data.
            Please refer to our Privacy Policy for detailed information on how
            we collect, use, and protect your data.
          </p>
          <h3>
            <strong className="text-[30px] font-semibold">Dispute Resolution</strong>
          </h3>
          <p>
            In case of disputes between Clients and QA Testers, our platform
            provides a mediation process. All parties agree to:
          </p>
          <ul>
            <li>
              Attempt to resolve disputes in good faith through our platform's
              communication channels
            </li>
            <li>
              Participate in our mediation process if direct resolution is not
              possible
            </li>
            <li>
              Abide by the final decision made through our dispute resolution
              process
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Limitation of Liability</strong>
          </h3>
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website. We shall not be held liable for:
          </p>
          <ul>
            <li>
              The quality or outcome of QA services provided through our
              platform
            </li>
            <li>
              Any direct, indirect, or consequential losses resulting from the
              use of our platform
            </li>
            <li>
              Disputes between Clients and QA Testers, except as specifically
              provided in our dispute resolution process
            </li>
          </ul>
          <h3>
            <strong className="text-[30px] font-semibold">Modifications to Terms and Conditions</strong>
          </h3>
          <p>
            We reserve the right to modify these terms and conditions at any
            time. Continued use of the platform after such modifications
            constitutes acceptance of the updated terms.
          </p>
          <h3>
            <strong className="text-[30px] font-semibold">Contact Us</strong>
          </h3>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at support@qaplatform.com.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
