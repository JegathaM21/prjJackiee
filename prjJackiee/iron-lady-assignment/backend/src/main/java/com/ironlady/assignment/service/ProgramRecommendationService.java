package com.ironlady.assignment.service;

import org.springframework.stereotype.Service;

@Service
public class ProgramRecommendationService {

    public String recommendProgram(String query) {
        if (query == null) return "How can I help you today?";
        String lowerQuery = query.toLowerCase();
        
        if (lowerQuery.contains("board") || lowerQuery.contains("director")) {
            return "Based on your interest in board positions, I highly recommend the '100 Board Members Program'. This flagship initiative includes mentorship and industry networking designed specifically to prepare women for board-level roles.";
        } else if (lowerQuery.contains("salary") || lowerQuery.contains("raise") || lowerQuery.contains("glass ceiling")) {
            return "To break the glass ceiling and increase your compensation, our 'Master Class' is ideal. It focuses on proven strategies for salary negotiation and overcoming workplace barriers.";
        } else if (lowerQuery.contains("war") || lowerQuery.contains("tactic") || lowerQuery.contains("negotiat") || lowerQuery.contains("strategy") || lowerQuery.contains("complex")) {
            return "For advanced business tactics, I recommend the 'Master of Business Warfare (MBW)'. This transformative program teaches high-level negotiation and 'Business War Tactics' to help you win without fighting in competitive environments.";
        } else if (lowerQuery.contains("confidence") || lowerQuery.contains("pitch") || lowerQuery.contains("start") || lowerQuery.contains("essential")) {
            return "The 'Leadership Essentials Program (LEP)' is perfect for you. It's a 4-week digital bootcamp that teaches 'Shameless Pitching', strategic positioning, and how to build unwavering confidence.";
        } else {
            return "We have programs for every stage: 'Leadership Essentials' for emerging leaders, 'MBW' for advanced strategy, and '100 Board Members' for the C-suite. Tell me a bit more about your current role so I can guide you.";
        }
    }
}
