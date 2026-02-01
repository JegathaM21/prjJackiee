import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, UserCog, Home } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-iron-dark border-b border-gray-800 p-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-iron-gold flex items-center gap-2 tracking-wider">
                    IRON LADY
                </Link>
                <div className="flex gap-6">
                    <Link to="/career-companion" className="flex items-center gap-2 text-iron-light hover:text-iron-gold transition-colors text-sm font-medium tracking-wide">
                        <Bot size={18} />
                        <span>AI COMPANION</span>
                    </Link>
                    <Link to="/admin" className="flex items-center gap-2 text-iron-light hover:text-iron-gold transition-colors text-sm font-medium tracking-wide">
                        <UserCog size={18} />
                        <span>INTERNAL OPS</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
