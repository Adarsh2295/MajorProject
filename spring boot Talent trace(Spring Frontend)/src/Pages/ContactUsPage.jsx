import React, { useState } from 'react';
import { IconMail, IconPhone, IconMapPin, IconSend } from '@tabler/icons-react';

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Contact form submitted:', formData);
        // You can add API call here to submit the form
        alert('Thank you for your message! We will get back to you soon.');
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="min-h-[100vh] bg-gray-50 dark:bg-mine-shaft-950 text-mine-shaft-900 dark:text-white font-['poppins'] py-20">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-bright-sun-400 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl text-mine-shaft-600 dark:text-mine-shaft-300 leading-relaxed">
                        We'd love to hear from you. Get in touch with our team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-semibold text-bright-sun-400 mb-8">Get in Touch</h2>
                        <p className="text-lg text-mine-shaft-700 dark:text-mine-shaft-200 leading-relaxed mb-8">
                            Have questions about TalentTrace? Need help with your account? Want to partner with us? 
                            We're here to help and would love to hear from you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-bright-sun-400 p-3 rounded-full">
                                    <IconMail className="h-6 w-6 text-mine-shaft-950" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-bright-sun-300">Email</h3>
                                    <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                        <a href="mailto:support@talenttrace.com" className="hover:text-bright-sun-400 transition-colors">
                                            support@talenttrace.com
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-bright-sun-400 p-3 rounded-full">
                                    <IconPhone className="h-6 w-6 text-mine-shaft-950" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-bright-sun-300">Phone</h3>
                                    <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                        <a href="tel:+917721359410" className="hover:text-bright-sun-400 transition-colors">
                                            +91 7721359410
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-bright-sun-400 p-3 rounded-full">
                                    <IconMapPin className="h-6 w-6 text-mine-shaft-950" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-bright-sun-300">Address</h3>
                                    <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                        Raintree Marg, near Bharati Vidyapeeth,<br />
                                        Sector 7, CBD Belapur,<br />
                                        Navi Mumbai, Maharashtra 400614
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="mt-8 bg-white dark:bg-mine-shaft-900 p-6 rounded-lg border border-gray-200 dark:border-mine-shaft-800">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-4">Business Hours</h3>
                            <div className="space-y-2 text-mine-shaft-700 dark:text-mine-shaft-200">
                                <div className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white dark:bg-mine-shaft-900 p-8 rounded-lg border border-gray-200 dark:border-mine-shaft-800">
                            <h2 className="text-2xl font-semibold text-bright-sun-400 mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-mine-shaft-700 dark:text-mine-shaft-200 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-mine-shaft-800 border border-mine-shaft-700 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 transition-colors"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-mine-shaft-200 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-mine-shaft-800 border border-mine-shaft-700 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-mine-shaft-200 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-mine-shaft-800 border border-mine-shaft-700 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 transition-colors"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-mine-shaft-200 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-mine-shaft-800 border border-mine-shaft-700 rounded-lg text-white focus:outline-none focus:border-bright-sun-400 transition-colors resize-vertical"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-bright-sun-400 text-mine-shaft-950 py-3 px-6 rounded-lg font-semibold hover:bg-bright-sun-300 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <IconSend className="h-5 w-5" />
                                    <span>Send Message</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold text-bright-sun-400 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-mine-shaft-900 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-bright-sun-300 mb-3">
                                How do I create an account?
                            </h3>
                            <p className="text-mine-shaft-200">
                                Click on the "Sign Up" button and choose whether you're an applicant or employer. 
                                Fill out the required information and verify your email to get started.
                            </p>
                        </div>
                        
                        <div className="bg-mine-shaft-900 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-bright-sun-300 mb-3">
                                Is TalentTrace free to use?
                            </h3>
                            <p className="text-mine-shaft-200">
                                Yes! Creating an account and basic features are completely free for both job seekers and employers. 
                                We may offer premium features in the future.
                            </p>
                        </div>
                        
                        <div className="bg-mine-shaft-900 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-bright-sun-300 mb-3">
                                How do I update my profile?
                            </h3>
                            <p className="text-mine-shaft-200">
                                Once logged in, go to your profile page where you can update your personal information, 
                                skills, experience, and certifications at any time.
                            </p>
                        </div>
                        
                        <div className="bg-mine-shaft-900 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-bright-sun-300 mb-3">
                                How do I post a job?
                            </h3>
                            <p className="text-mine-shaft-200">
                                Employers can post jobs by navigating to the "Post Job" section after logging in. 
                                Fill out the job details and publish to start receiving applications.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;
