import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Database } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-iron-dark text-iron-light flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-iron-gold to-yellow-200 bg-clip-text text-transparent">
                    Empowering Women Leaders
                </h1>
                <p className="text-xl text-iron-slate max-w-2xl mb-12">
                    Experience our AI-driven guidance and streamlined operations management.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Card 1: AI Solution */}
                    <div className="bg-iron-accent p-8 rounded-2xl border border-gray-800 hover:border-iron-gold transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                        <div className="bg-iron-dark w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-gray-800 group-hover:border-iron-gold">
                            <Sparkles className="text-iron-gold" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Career Companion AI</h2>
                        <p className="text-iron-slate mb-8 h-20">
                            Find the perfect program for your career stage using our advanced AI recommendation engine.
                        </p>
                        <Link to="/career-companion" className="inline-flex items-center gap-2 text-iron-gold font-semibold hover:gap-4 transition-all">
                            Try AI Assistant <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Card 2: Internal Ops */}
                    <div className="bg-iron-accent p-8 rounded-2xl border border-gray-800 hover:border-iron-gold transition-all group cursor-pointer hover:shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                        <div className="bg-iron-dark w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-gray-800 group-hover:border-iron-gold">
                            <Database className="text-iron-gold" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Internal Operations</h2>
                        <p className="text-iron-slate mb-8 h-20">
                            Manage student applications and program data with our secure internal dashboard.
                        </p>
                        <Link to="/admin" className="inline-flex items-center gap-2 text-iron-gold font-semibold hover:gap-4 transition-all">
                            Access Dashboard <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
