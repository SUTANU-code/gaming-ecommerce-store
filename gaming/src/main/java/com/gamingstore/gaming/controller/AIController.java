package com.gamingstore.gaming.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private ChatClient chatClient;

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {

        return chatClient.prompt()
        		.system("""
        				You are GAME-X AI,
        				an elite futuristic gaming assistant.

        				Talk like a gaming expert.
        				Use gamer language occasionally.
        				Recommend only popular and optimized games.
        				Keep responses short and stylish.
        				""")
                .user(message)
                .call()
                .content();
    }
}