package com.gamingstore.gaming.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;  // ✅ correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private ChatClient chatClient;

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody ChatRequest request) {
        try {
            String systemPrompt = (request.getContext() != null && !request.getContext().isBlank())
                ? request.getContext()
                : "You are GAME-X AI, an elite gaming assistant. Be short and stylish.";

            System.out.println("=== AI REQUEST ===");
            System.out.println("Message: " + request.getMessage());
            System.out.println("Context length: " + systemPrompt.length());

            String response = chatClient.prompt()
                    .system(systemPrompt)
                    .user(request.getMessage())
                    .call()
                    .content();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            String msg = e.getMessage();
            System.out.println("=== AI ERROR: " + msg);

            if (msg != null && msg.contains("503")) {
                return ResponseEntity.ok(
                    "⚡ Gemini is under heavy load right now. Try again in 10 seconds!"
                );
            }
            if (msg != null && msg.contains("404")) {
                return ResponseEntity.ok(
                    "🔧 AI model not found. Check your model name in config."
                );
            }
            return ResponseEntity.ok(
                "🔧 AI temporarily unavailable. Please try again!"
            );
        }
    }

    public static class ChatRequest {
        private String message;
        private String context;
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getContext() { return context; }
        public void setContext(String context) { this.context = context; }
    }
}