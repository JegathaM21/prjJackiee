package com.ironlady.assignment.controller;

import com.ironlady.assignment.service.ProgramRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private ProgramRecommendationService recommendationService;

    @GetMapping("/recommend")
    public Map<String, String> recommend(@RequestParam String query) {
        String response = recommendationService.recommendProgram(query);
        return Map.of("response", response);
    }
}
