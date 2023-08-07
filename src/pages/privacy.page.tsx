import React from "react";
import { Container } from "#components/container";
import { Header } from "#components/header";
import { Footer } from "#components/footer";
import { Link} from "#renderer/Link"
import { Helmet } from 'react-helmet-async';


export const Page: React.FC = () => {
    return (
        <Container>
            <Helmet>
                <title>Privacy - Jhattse</title>
                <meta name="description" content="Privacy on Jhattse. Jhattse is a local ecommerce platform which provides product visibility, best price discovering and all available deals and offers." />
            </Helmet>
            <Header />
            <div className="flex flex-col h-full p-4 font-manrope">
                <h1 className="text-xl"><strong>Privacy Policy for Esangrah Technologies Pvt Ltd</strong></h1>

                <p className="text-neutral-900">At Jhattse, accessible from <a href="https://jhattse.com">https://jhattse.com</a>, one of our main priorities is the privacy of our visitors. This
                    Privacy Policy document contains types of information that is collected and recorded by Jhattse and how we use it.
                </p>

                <p className="text-neutral-900">If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us contact@esangrah.com.
                </p>

                <p className="text-neutral-900">This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to
                    the information that they shared and/or collect in Jhattse. This policy is not applicable to any information
                    collected offline or via channels other than this website.</p>

                <h2 className="mt-4 text-lg"><strong>Consent</strong></h2>

                <p className="text-neutral-900">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                <h2 className="mt-4 text-lg"><strong>Information we collect</strong></h2>

                <p className="text-neutral-900">The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made
                    clear to you at the point we ask you to provide your personal information.</p>
                <p className="text-neutral-900">If you contact us directly, we may receive additional information about you such as your name, email address, phone
                    number, the contents of the message and/or attachments you may send us, and any other information you may choose to
                    provide.</p>
                <p className="text-neutral-900">When you register for an Account, we may ask for your contact information, including items such as name, company
                    name, address, email address, and telephone number. We may track your browsing behaviour on our website which and
                    accumulate the information to give out better services on our platform.</p>

                <h2 className="mt-4 text-lg"><strong>How we use your information</strong></h2>

                <p className="text-neutral-900">We use the information we collect in various ways, including to:</p>

                <ul className="list-disc list-inside">
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide
                        you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                    <li>Send you emails</li>
                    <li>Find and prevent fraud</li>
                </ul>

                <h2 className="mt-4 text-lg"><strong>Log Files</strong></h2>

                <p className="text-neutral-900">Jhattse follows a standard procedure of using log files. These files log visitors when they visit websites. All
                    hosting companies do this and a part of hosting services' analytics. The information collected by log files include
                    internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit
                    pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                    The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the
                    website, and gathering demographic information.</p>

                <h2 className="mt-4 text-lg"><strong>Cookies and Web Beacons</strong></h2>

                <p className="text-neutral-900">Like any other website, Jhattse uses 'cookies'. These cookies are used to store information including visitors'
                    preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize
                    the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>



                <h2 className="mt-4 text-lg"><strong>Advertising Partners Privacy Policies</strong></h2>

                <p className="text-neutral-900">You may consult this list to find the Privacy Policy for each of the advertising partners of Jhattse.</p>

                <p className="text-neutral-900">Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in
                    their respective advertisements and links that appear on Jhattse, which are sent directly to users' browser. They
                    automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of
                    their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>

                <p className="text-neutral-900">Note that Jhattse has no access to or control over these cookies that are used by third-party advertisers.</p>

                <h2 className="mt-4 text-lg"><strong>Third Party Privacy Policies</strong></h2>

                <p className="text-neutral-900">Jhattse's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the
                    respective Privacy Policies of these third-party ad servers for more detailed information. It may include their
                    practices and instructions about how to opt-out of certain options. </p>

                <p className="text-neutral-900">You can choose to disable cookies through your individual browser options. To know more detailed information about
                    cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

                <h2 className="mt-4 text-lg"><strong>Sharing of personal information</strong></h2>

                <p className="text-neutral-900">We may share personal information internally within Esangrah group companies, affiliates, related companies and with other third parties for purposes of providing products and services offered by them.
                    These entities and affiliates may share such information with their affiliates, business partners and other third parties for the purpose of providing you their products and services and may market to you as a result of such sharing unless you explicitly opt-out.</p>

                <h2 className="mt-4 text-lg"><strong>Children's Information</strong></h2>

                <p className="text-neutral-900">Another part of our priority is adding protection for children while using the internet. We encourage parents and
                    guardians to observe, participate in, and/or monitor and guide their online activity.</p>

                <p className="text-neutral-900">Use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. We do not knowingly solicit or collect personal information from children under the age of 18 years.
                    If you have shared any personal information of children under the age of 18 years, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.
                </p>

                <h2 className="mt-4 text-lg"><strong>Grievance Officer</strong></h2>
                <p className="text-neutral-900">
                    In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
                </p>
                <p className="text-neutral-900">Mr. Manish C</p>
                <p className="text-neutral-900">Designation: Senior Analyst</p>
                <p className="text-neutral-900">Esangrah Technologies Pvt. Ltd.</p>
                <p className="text-neutral-900">Lane No 14C Indraprastha</p>
                <p className="text-neutral-900">Dehradun, Uttarakhand 248005</p>
                <p className="text-neutral-900"><Link href="mailto:support@esangrah.com">Email: support@esangrah.com</Link></p>
                <p className="text-neutral-900">Time: Mon - Sat (9:00 - 18:00)</p>
            </div>
            <Footer />
        </Container>
    );
};