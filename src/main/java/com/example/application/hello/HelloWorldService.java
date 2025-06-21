package com.example.application.hello;

import com.example.application.error.AppException;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class HelloWorldService {

    public String sayHello(String name) {
        if (name.isEmpty()) {
            throw new AppException("invalid.parameter.name.empty");
        } else {
            return "Hello " + name;
        }
    }

    public String hi() {
        return "Hi";
    }
}
