import React from 'react';
import { IconMail, IconPhone, IconMapPin, IconClock } from '@tabler/icons-react';

const HelpSupport = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-mine-shaft-900 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-mine-shaft-900 dark:text-white mb-4">
                        Help & Support
                    </h1>
                    <p className="text-lg text-mine-shaft-600 dark:text-mine-shaft-300 max-w-2xl mx-auto">
                        We're here to help! Get in touch with us for any questions, concerns, or feedback about TalentTrace.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div className="text-center p-6 bg-gray-50 dark:bg-mine-shaft-800 rounded-lg">
                        <IconMail className="h-12 w-12 text-bright-sun-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-mine-shaft-900 dark:text-white mb-2">
                            Email Support
                        </h3>
                        <a 
                            href="mailto:support@talenttrace.com" 
                            className="text-bright-sun-400 hover:text-bright-sun-500 transition-colors"
                        >
                            support@talenttrace.com
                        </a>
                    </div>

                    <div className="text-center p-6 bg-gray-50 dark:bg-mine-shaft-800 rounded-lg">
                        <IconPhone className="h-12 w-12 text-bright-sun-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-mine-shaft-900 dark:text-white mb-2">
                            Phone Support
                        </h3>
                        <a 
                            href="tel:+917721359410" 
                            className="text-bright-sun-400 hover:text-bright-sun-500 transition-colors"
                        >
                            +91 7721359410
                        </a>
                    </div>

                    <div className="text-center p-6 bg-gray-50 dark:bg-mine-shaft-800 rounded-lg">
                        <IconMapPin className="h-12 w-12 text-bright-sun-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-mine-shaft-900 dark:text-white mb-2">
                            Office Location
                        </h3>
                        <p className="text-mine-shaft-600 dark:text-mine-shaft-300">
                            Raintree Marg, near Bharati Vidyapeeth,<br />
                            Sector 7, CBD Belapur,<br />
                            Navi Mumbai, Maharashtra 400614
                        </p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 dark:bg-mine-shaft-800 rounded-lg">
                        <IconClock className="h-12 w-12 text-bright-sun-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-mine-shaft-900 dark:text-white mb-2">
                            Support Hours
                        </h3>
                        <p className="text-mine-shaft-600 dark:text-mine-shaft-300">
                            Mon - Fri: 9:00 AM - 6:00 PM<br />
                            Sat - Sun: 10:00 AM - 4:00 PM<br />
                            (EST)
                        </p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-mine-shaft-900 dark:text-white mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-gray-50 dark:bg-mine-shaft-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-mine-shaft-900 dark:text-white mb-3">
                                How do I create a job seeker account?
                            </h3>
                            <p className="text-mine-shaft-600 dark:text-mine-shaft-300">
                                Click on the "Sign Up" button and select "Job Seeker". Fill in your personal details, 
                                create a strong password, and verify your email address to get started.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-mine-shaft-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-mine-shaft-900 dark:text-white mb-3">
                                How can I apply for jobs?
                            </h3>
                            <p className="text-mine-shaft-800 dark:text-mine-shaft-300">
                                Browse through available jobs using our search and filter features. When you find a job 
                                that matches your skills, click "Apply" and follow the application process.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-mine-shaft-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-mine-shaft-900 dark:text-white mb-3">
                                How do I update my profile?
                            </h3>
                            <p className="text-mine-shaft-600 dark:text-mine-shaft-300">
                                Go to your profile page by clicking on your profile icon. You can update your personal 
                                information, skills, experience, and upload your resume from there.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-mine-shaft-800 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-mine-shaft-900 dark:text-white mb-3">
                                How can employers post jobs?
                            </h3>
                            <p className="text-mine-shaft-600 dark:text-mine-shaft-300">
                                Employers need to create an employer account and complete their company profile. 
                                Once verified, they can post jobs, manage applications, and find the best candidates.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto mt-12">
                    <h2 className="text-3xl font-bold text-mine-shaft-900 dark:text-white mb-8 text-center">
                        Send us a Message
                    </h2>
                    
                    <div className="bg-gray-50 dark:bg-mine-shaft-800 p-8 rounded-lg">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300 mb-2">
                                        First Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-mine-shaft-600 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent bg-white dark:bg-mine-shaft-900 text-mine-shaft-900 dark:text-white"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300 mb-2">
                                        Last Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-mine-shaft-600 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent bg-white dark:bg-mine-shaft-900 text-mine-shaft-900 dark:text-white"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300 mb-2">
                                    Email
                                </label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-mine-shaft-600 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent bg-white dark:bg-mine-shaft-900 text-mine-shaft-900 dark:text-white"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300 mb-2">
                                    Subject
                                </label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-mine-shaft-600 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent bg-white dark:bg-mine-shaft-900 text-mine-shaft-900 dark:text-white"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-300 mb-2">
                                    Message
                                </label>
                                <textarea 
                                    rows="5"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-mine-shaft-600 rounded-lg focus:ring-2 focus:ring-bright-sun-400 focus:border-transparent bg-white dark:bg-mine-shaft-900 text-mine-shaft-900 dark:text-white"
                                    placeholder="Please describe your question or concern..."
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;
