package com.example.application.error;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.hilla.exception.EndpointException;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class AppException extends EndpointException {
    private static final MessageProvider PROVIDER = MessageProvider.getInstance();

    public AppException(String message) {
        super(message, getDetails(message));
    }

    private static Map<String, Object> getDetails(String message) {

        return Map.of(
                "ar", PROVIDER.getMessage("ar", message),
                "en", PROVIDER.getMessage("en", message)
        );
    }

    private static class MessageProvider {
        private static final MessageProvider INSTANCE = new MessageProvider();
        private final Map<String, JsonNode> messages = new HashMap<>();

        private MessageProvider() {
            try {
                ObjectMapper mapper = new ObjectMapper();

                try (InputStream arStream = getClass().getResourceAsStream("/messages/ar.json");
                     InputStream enStream = getClass().getResourceAsStream("/messages/en.json")) {
                    if (arStream == null || enStream == null) {
                        throw new RuntimeException("Message files not found in resources/messages directory");
                    }
                    messages.put("ar", mapper.readTree(arStream));
                    messages.put("en", mapper.readTree(enStream));
                }
            } catch (Exception e) {
                throw new RuntimeException("Error loading message files: " + e.getMessage(), e);
            }
        }

        public static MessageProvider getInstance() {
            return INSTANCE;
        }

        public String getMessage(String language, String key) {
            JsonNode langMessages = messages.get(language);
            return langMessages != null ? langMessages.path(key).asText(language + ": " + key) : language + ": " + key;
        }
    }
}
