import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const AIChatbotPage = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Hello! I am your Iron Lady Career Companion. Tell me about your career goals, and I will recommend the best program for you.' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/ai/recommend?query=${encodeURIComponent(input)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "I'm having trouble connecting to the server. Please check if the backend is running." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-64px)] flex flex-col">
            <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Sparkles className="text-iron-gold" /> Career Companion
            </h1>

            <div className="flex-1 bg-iron-accent rounded-2xl border border-gray-800 p-6 mb-6 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.type === 'bot' ? 'bg-iron-gold text-iron-dark' : 'bg-iron-slate text-iron-dark'
                        }`}>
                            {msg.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
                        </div>
                        <div className={`p-4 rounded-xl max-w-[80%] ${
                            msg.type === 'bot' 
                                ? 'bg-gray-800 text-iron-light rounded-tl-none' 
                                : 'bg-iron-gold text-iron-dark rounded-tr-none font-medium'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-iron-gold text-iron-dark flex items-center justify-center">
                            <Bot size={20} />
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl rounded-tl-none text-iron-slate flex items-center gap-2">
                            <span className="w-2 h-2 bg-iron-gold rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-iron-gold rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-iron-gold rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="E.g., I want to join a board of directors..."
                    className="w-full bg-iron-accent border border-gray-800 rounded-xl py-4 pl-6 pr-16 text-iron-light focus:outline-none focus:border-iron-gold transition-colors"
                />
                <button 
                    type="submit" 
                    className="absolute right-2 top-2 bg-iron-gold text-iron-dark p-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
                    disabled={loading || !input.trim()}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default AIChatbotPage;
