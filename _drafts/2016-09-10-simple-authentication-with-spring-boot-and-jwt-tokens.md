---
title: "Simple authentication with Spring Boot and JWT Tokens"
date: "2016-09-10"
categories: 
  - "java-programming-languages"
  - "spring"
tags: 
  - "java-2"
  - "jwt"
  - "jwt-token"
  - "rest-api"
  - "secure-rest-api"
  - "spring-boot"
  - "webfilter"
---

In the following article I am going to prove how you can secure a REST API (developed with Spring Boot) with [JWT tokens](https://jwt.io). For simplicity, Spring Security will not be used.

_It is assumed the reader is already familiar with JWT._

Our Rest API will contain 3 endpoints, 2 public and 1 private (that can only be accepted with JWT):

- /api/public/hello/{name} : Public web service that prints hello.
- /api/secure/hello/{name} : Private web service that prints hello. Can only be called if the JWT token exist on the header. Otherwise returns [HTTP 403](https://en.wikipedia.org/wiki/HTTP_403).
- /api/public/auth/ : Authentication service. Based on user/pass credentials generates and valid JWT token.

All the code is available on [github](https://github.com/nomemory/spring-boot-jwt-example):

git clone https://github.com/nomemory/spring-boot-jwt-example

Project is bootstrapped using [Spring Initialzr](https://start.spring.io) together with [gradle](https://gradle.org).

The generated **build.gradle** file is:

buildscript {
	ext {
		springBootVersion = '1.4.1.RELEASE'
	}
	repositories {
		mavenCentral()
	}
	dependencies {
		classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
	}
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'idea'
apply plugin: 'spring-boot'

jar {
	baseName = 'simple-jwt'
	version = '0.0.1-SNAPSHOT'
}
sourceCompatibility = 1.8
targetCompatibility = 1.8

repositories {
	mavenCentral()
}

dependencies {
	// tag::jetty\[\]
	compile("org.springframework.boot:spring-boot-starter-web") {
		exclude module: "spring-boot-starter-tomcat"
	}
	compile("org.springframework.boot:spring-boot-starter-jetty")
	// end::jetty\[\]
	// tag::actuator\[\]
	compile("org.springframework.boot:spring-boot-starter-actuator")
	// end::actuator\[\]
	compile("org.projectlombok:lombok:1.16.10")
	// The JWT library 
	compile group: 'io.jsonwebtoken', name: 'jjwt', version: '0.7.0'
}

Observations:

- The library that coverts the JWT functionality is called [jjwt](https://github.com/jwtk/jjwt).
- I prefer to use [project lombok](https://projectlombok.org) in my projects. It's an useful library that can generate getters, setters, constructors, etc. through @Annotations.

We will be starting the project by defining some of the constants. A good idea is to store them in the **application.properties** file, so we can easily inject them at runtime using [@Value annotation](http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Value.html).

\# Jwt Configuration

# The secret will be used to sign the JWT tokens
jwt.token.secret=something-secret-you-cannot-keep-it

# The header we are going to use for authentication
jwt.auth.header=x-auth-token

# After how many hours the token will expire
jwt.expire.hours=24

The next step is to actually define the **JwtService** that will be responsible with the composition / decomposition of the token.

package com.simple.jwt.services;

import com.simple.jwt.model.JwtUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class JwtService
{

    @Value("${jwt.expire.hours}")
    private Long expireHours;

    @Value("${jwt.token.secret}")
    private String plainSecret;
    private String encodedSecret;

    @PostConstruct
    protected void init() {
        this.encodedSecret = generateEncodedSecret(this.plainSecret);
    }

    protected String generateEncodedSecret(String plainSecret)
    {
        if (StringUtils.isEmpty(plainSecret))
        {
            throw new IllegalArgumentException("JWT secret cannot be null or empty.");
        }
        return Base64
                .getEncoder()
                .encodeToString(this.plainSecret.getBytes());
    }

    protected Date getExpirationTime()
    {
        Date now = new Date();
        Long expireInMilis = TimeUnit.HOURS.toMillis(expireHours);
        return new Date(expireInMilis + now.getTime());
    }

    protected JwtUser getUser(String encodedSecret, String token)
    {
        Claims claims = Jwts.parser()
                .setSigningKey(encodedSecret)
                .parseClaimsJws(token)
                .getBody();
        String userName = claims.getSubject();
        String role = (String) claims.get("role");
        JwtUser securityUser = new JwtUser();
        securityUser.setUserName(userName);
        securityUser.setRole(role);
        return securityUser;
    }

    public JwtUser getUser(String token)
    {
        return getUser(this.encodedSecret, token);
    }

    protected String getToken(String encodedSecret, JwtUser jwtUser)
    {
        Date now = new Date();
        return Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setSubject(jwtUser.getUserName())
                .claim("role", jwtUser.getRole())
                .setIssuedAt(now)
                .setExpiration(getExpirationTime())
                .signWith(SignatureAlgorithm.HS512, encodedSecret)
                .compact();
    }

    public String getToken(JwtUser jwtUser)
    {
        return getToken(this.encodedSecret, jwtUser);
    }
}

The corresponding **JwtUser** class will look like this:

package com.simple.jwt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtUser
{
    private String userName;
    private String role;
}

It's mandatory not to store important user information in the generated JWT token.

So that's why I prefer to create a simple [Pojo](https://en.wikipedia.org/wiki/Plain_Old_Java_Object): **JwtUser** where only basic, non-sensitive information will be kept.

Don't get discouraged by the [@Data](https://projectlombok.org/features/Data.html), [@NoArgsConstructor](https://projectlombok.org/features/Constructor.html) and [@AllArgsConstructor](https://projectlombok.org/features/Constructor.html) annotations. They are part from Project Lombok, and basically they are generators for Setters, Getters and Constructors.

From the above service we will use the _getToken()_ and the _getUser()_ methods. The first one, will use the encoded secret key and the expiration time in order to generate an unique jwt token.

This token will be returned to the user after he authenticates. Then the user needs to adds to add this token as an 'x-auth-token' (the HTTP Header defined as jwt.auth.header in application. properties) if he wants to access the services that are under /api/secure\*.

To implement the authentication feature we can add a new Spring @Service called UserService:

package com.simple.jwt.services;

import com.simple.jwt.model.User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService
{
    private static Map users = new HashMap();
    static {
        users.put(
                "user1", User
                            .builder()
                            .userName("user1")
                            .passWord("123") // Never do this!
                            .email("user1@romania.com")
                            .role(User.ROLE\_ADMIN)
                            .isActivated(true)
                            .build()
        );
    }

    public User findUserByUserName(String userName)
    {
        return users.get(userName);
    }

    public Boolean authenticate(String userName, String passWord)
    {
        User user = findUserByUserName(userName);
        if (null!=user)
        {
            return user.getPassWord().equals(passWord);
        }
        return false;
    }
} 

As you can see we use another model called **User** (not **JwtUser**) to work with our internal data. Important to notice that the bean **JwtUser** will only be used as payload information for the jwt token. The User bean can contain critical information that (I repeat) we shouldn't not expose on the web.

The **User** class looks like this:

package com.simple.jwt.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User
{
    public static final String ROLE\_ADMIN = "ADM";
    public static final String ROLE\_USER = "USR";

    private String userName;
    private String passWord;
    private String email;
    private String description;
    private String role;
    private Boolean isActivated;
    private Boolean isAdmin;
}

Everything is now managed in at the controller level. In our simple case the orchestration is done at the @RestController level. In real-world application, this should be done in the Service layer.

The HelloJWT controller may look like this:

package com.simple.jwt.controllers;

import com.simple.jwt.dto.AuthDTO;
import com.simple.jwt.model.JwtUser;
import com.simple.jwt.services.JwtService;
import com.simple.jwt.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.\*;

@RestController
public class HelloJWT
{

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @GetMapping(value = "/api/secure/hello/{name}")
    public ResponseEntity helloSecure(@PathVariable String name)
    {
        String result = String.format("Hello JWT, %s! (Secure)", name);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/api/public/hello/{name}")
    public ResponseEntity helloPublic(@PathVariable String name)
    {
        String result = String.format("Hello JWT, %s! (Public)", name);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/api/public/auth")
    public ResponseEntity auth(@RequestBody AuthDTO auth) {
        String userName = auth.getUserName();
        String passWord = auth.getPassWord();
        Boolean correctCredentials = userService.authenticate(userName, passWord);
        if (correctCredentials) {
            JwtUser jwtUser = new JwtUser(userName, passWord);
            return ResponseEntity.ok(jwtService.getToken(jwtUser));
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }
}

And now comes the most interesting part.

For each HTTP Request that goes under **/api/secure\*** we need to configure a **@WebFilter** that will be responsible to verify if that request contains the desired HTTP Header containing a valid JWT token. In the contrary case the request will be rejected and the web service mapped at that url will not be accessed.

This the code for the **JwtFilter**.

package com.simple.jwt.security;

import com.simple.jwt.model.JwtUser;
import com.simple.jwt.services.JwtService;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.\*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = { "/api/secure/\*" })
public class JwtFilter implements Filter
{

    @Autowired
    private JwtService jwtTokenService;

    @Value("${jwt.auth.header}")
    String authHeader;

    @Override public void init(FilterConfig filterConfig) throws ServletException  {}
    @Override public void destroy() {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {
        final HttpServletRequest httpRequest = (HttpServletRequest) request;
        final HttpServletResponse httpResponse = (HttpServletResponse) response;
        final String authHeaderVal = httpRequest.getHeader(authHeader);

        if (null==authHeaderVal)
        {
            httpResponse.setStatus(HttpServletResponse.SC\_UNAUTHORIZED);
            return;
        }

        try
        {
            JwtUser jwtUser = jwtTokenService.getUser(authHeaderVal);
            httpRequest.setAttribute("jwtUser", jwtUser);
        }
        catch(JwtException e)
        {
            httpResponse.setStatus(HttpServletResponse.SC\_NOT\_ACCEPTABLE);
            return;
        }

        chain.doFilter(httpRequest, httpResponse);
    }
}

An additional configuration should be done. In order for Spring Boot to scan the @WebFilter component we need to use the @ServletComponentScan annotation to target the java package where we created our class.

This is how our main class looks like:

package com.simple.jwt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
// We need the following in order to detect the filter
// from the security package
@ServletComponentScan(value="com.simple.jwt.security")
public class SimpleJwtApplication {

	public static void main(String\[\] args) {
		SpringApplication.run(SimpleJwtApplication.class, args);
	}
}

By default the application should run on http://localhost:8080.

So if we hit the public api (localhost:8080/api/public/hello/andrei) we will receive the desire result:

[![Public-API-JWT](images/1-1024x606.png)](http://andreinc.net/wp-content/uploads/2016/10/1.png)

But if we want to hit the secure api at http://localhost:8080/api/secure/hello/andrei our request will be rejected:

[![jwt-hit-2-secure](images/2-300x91.png)](http://andreinc.net/wp-content/uploads/2016/10/2.png)

So in order to obtain the code we will need to first call the authentication service at http://localhost:8080/api/public/auth with the correct body:

[![jwt-auth-request](images/3-938x1024.png)](http://andreinc.net/wp-content/uploads/2016/10/3.png)

As you can see the authentication was correct and the response contains the JWT token.

Now we want to access the secure resource we just copy/paste this JWT token as the auth header and we will be able to access the /secure/\* api:

[![4](images/4-932x1024.png)](http://andreinc.net/wp-content/uploads/2016/10/4.png)

As you can see everything is working just as expected.

Thank you for reading.
