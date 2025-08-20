import React from 'react';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    return (
        <div className="min-h-[100vh] bg-gray-50 dark:bg-mine-shaft-950 text-mine-shaft-900 dark:text-white font-['poppins'] py-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-bright-sun-400 mb-6">
                        About TalentTrace
                    </h1>
                    <p className="text-xl text-mine-shaft-600 dark:text-mine-shaft-300 leading-relaxed">
                        Connecting talented professionals with opportunities that matter
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-bright-sun-400 mb-6">Our Mission</h2>
                    <p className="text-lg text-mine-shaft-700 dark:text-mine-shaft-200 leading-relaxed mb-4">
                        At TalentTrace, we believe that finding the right job or the perfect candidate shouldn't be a challenge. 
                        Our mission is to bridge the gap between talented professionals and employers looking for exceptional talent.
                    </p>
                    <p className="text-lg text-mine-shaft-700 dark:text-mine-shaft-200 leading-relaxed">
                        We're committed to creating a platform that empowers job seekers to showcase their skills, experience, 
                        and achievements while helping employers discover the talent they need to grow their businesses.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-bright-sun-400 mb-6">What We Offer</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-mine-shaft-900 p-6 rounded-lg border border-gray-200 dark:border-mine-shaft-800">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-3">For Job Seekers</h3>
                            <ul className="space-y-2 text-mine-shaft-700 dark:text-mine-shaft-200">
                                <li>• Create comprehensive professional profiles</li>
                                <li>• Showcase skills, experience, and certifications</li>
                                <li>• Apply to jobs that match your expertise</li>
                                <li>• Track your application history</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-mine-shaft-900 p-6 rounded-lg border border-gray-200 dark:border-mine-shaft-800">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-3">For Employers</h3>
                            <ul className="space-y-2 text-mine-shaft-700 dark:text-mine-shaft-200">
                                <li>• Post job opportunities easily</li>
                                <li>• Search and filter talented candidates</li>
                                <li>• Manage job postings and applications</li>
                                <li>• Connect with the right talent faster</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-semibold text-bright-sun-400 mb-6">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-3">Innovation</h3>
                            <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                We continuously evolve our platform to meet the changing needs of the job market.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-3">Transparency</h3>
                            <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                We believe in honest, clear communication between job seekers and employers.
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-bright-sun-300 mb-3">Success</h3>
                            <p className="text-mine-shaft-700 dark:text-mine-shaft-200">
                                Your success is our success. We're here to help you achieve your career goals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-white dark:bg-mine-shaft-900 p-8 rounded-lg border border-gray-200 dark:border-mine-shaft-800">
                    <h2 className="text-2xl font-semibold text-bright-sun-400 mb-4">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-mine-shaft-700 dark:text-mine-shaft-200 mb-6">
                        Join thousands of professionals who have found their perfect match on TalentTrace.
                    </p>
                    <div className="space-x-4">
                        <Link 
                            to="/find-jobs" 
                            className="inline-block bg-bright-sun-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-bright-sun-300 transition-colors"
                        >
                            Find Jobs
                        </Link>
                        <Link 
                            to="/post-job/0" 
                            className="inline-block border border-bright-sun-400 text-bright-sun-400 px-6 py-3 rounded-lg font-semibold hover:bg-bright-sun-400 hover:text-white transition-colors"
                        >
                            Post a Job
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
