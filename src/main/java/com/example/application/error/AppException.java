package com.example.application.error;

import com.vaadin.hilla.exception.EndpointException;

import java.util.Map;

public class AppException extends EndpointException {
    private static final MessageProvider PROVIDER = MessageProvider.getInstance();

    public AppException(String message) {
        super(message, Map.<String, Object>of(
                "ar", PROVIDER.getMessage("ar", message),
                "en", PROVIDER.getMessage("en", message)
        ));
    }

}
