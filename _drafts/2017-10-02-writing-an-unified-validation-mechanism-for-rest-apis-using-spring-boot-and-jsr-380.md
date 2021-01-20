---
title: "Writing an unified validation mechanism for REST APIs using Spring Boot and JSR-380"
date: "2017-10-02"
categories: 
  - "java-programming-languages"
  - "spring"
tags: 
  - "hibernate-validator"
  - "java-2"
  - "java-bean-validation"
  - "jbvext"
  - "jsr380"
  - "spring"
  - "spring-boot"
---

**[JSR-380](http://beanvalidation.org/2.0/spec/)** defines a metadata model and API for Java Bean validation. It can be used an "architectural-agnostic" way and it is particularly useful when it comes to validating the RESTful APIs (syntactic validation).

The default metadata source is [@Annotations](https://docs.oracle.com/javase/tutorial/java/annotations/), with the ability to override and extend the metadata through the use of XML validation descriptors or custom code:

// source: http://www.baeldung.com/javax-validation
public class User {
 
    @NotNull(message = "Name cannot be null")
    private String name;
 
    @AssertTrue
    private boolean working;
 
    @Size(min = 10, max = 200, message = "About Me must be between 10 and 200 characters")
    private String aboutMe;
 
    @Min(value = 18, message = "Age should not be less than 18")
    @Max(value = 150, message = "Age should not be greater than 150")
    private int age;
 
    @Email(message = "Email should be valid")
    private String email;
 
    // standard setters and getters 
}

**JSR-380** was finished in August, 2017 and it's now a Java EE 8 standard. It's also included by default in Spring Boot through the only available implementation - [Hibernate Validator](http://hibernate.org/validator/).

By default, **JSR-380** doesn't standardise a big list of validating @Annotations. Hibernate Validator adds a few extra, and enhances the existing ones, but it's still not enough. As a developer working for a _real world_ application you will probably need to [write custom constraints](https://docs.jboss.org/hibernate/validator/5.0/reference/en-US/html/validator-customconstraints.html).

That's why i've compiled myself a library of common annotations (that are not in the standard or in Hibernate Validator). The library and code can be found on github under the name [JBVExt (Java Bean Validation Extensions)](https://github.com/nomemory/java-bean-validation-extension).

## The project setup

The "example" project is a simple Spring Boot project. The main dependencies are:

dependencies {
    compile ("org.springframework.boot:spring-boot-starter-web")
    compile 'net.andreinc.jbvext:jbvext:0.0.6'
    compileOnly('org.projectlombok:lombok')
}

By default the **spring-boot-starter-web** includes Hibernate Validator, so there's no need to explicitly define it as a dependency.

## Decorating the RESTful API

The API we are going to validate is composed by two REST web-services:

\- **POST /user/** : For creating an user; - **POST /post/** : For submitting the text;

The requestBodies are being mapped to the following two classes.

@Data
@AllArgsConstructor
@NoArgsConstructor
class CreateUserReq {
    // Needs to be alphanumeric (with no space)
    // Max Size = 32, Min Size = 6
    private String userName;

    // Needs to be a valid email address
    private String email;

    // Can have two values: "MALE" and "FEMALE"
    private String gender;

    // Needs to be in the format: "yyyy-MM-dd"
    private String dateOfBirth;

    // It's a non-null string
    // Starts with "A"
    // EndsWith "00"
    private String appCode;
}

The comments describe each of the field-level constraints.

For example in the above class the field **appCode** needs to always start with "A" and end in "00".

@Data
@AllArgsConstructor
@NoArgsConstructor
class CreatePostReq {
    // Needs to be a valid email
    private String authorEmail;
   
    // Contains only alphanumeric characters and spaces
    // Max String size is 3, max size is 256
    private String title;

    // Non-null string in the format: "dd-MM-yyyy"
    private String publishDate;

    // Not null or empty
    // Min size is 0, max size is 1000
    // Can contain even non-ASCII characters
    private String text;

    // Each string in the list is alphanumeric with no spaces
    private List tags;
} 

_Note: The **@Data**, **@AllArgsConstructor** and **@NoArgsConstructor** are not related with JSR-380, but are part of [Project Lombok](https://projectlombok.org)._

In order to implement the constraints at the field level, we would normally to write custom Java code. This type of code can become repetitive (and less readable) as soon the application grows.

JSR-380 proposes a new "decorative" approach. So instead to add the validation code at the controller level, we could just decorate the model layer with @Annotations.

In conclusion the **CreateUserReq.java** becomes:

@Data
@AllArgsConstructor
@NoArgsConstructor
class CreateUserReq {

    @Alphanumeric
    @Size(min = 6, max = 32)
    private String userName;

    @Email
    private String email;

    @OneOfStrings({"MALE", "FEMALE"})
    private String gender;

    @IsDate("yyyy-MM-dd")
    private String dateOfBirth;

    @StartsWith("A")
    @EndsWith("00")
    private String appCode;
}

And the **CreatePostReq.java** class becomes:

@Data
@AllArgsConstructor
@NoArgsConstructor
class CreatePostReq {

    @Email
    private String authorEmail;

    @AlphanumericSpace
    @Size(min = 3, max = 256)
    private String title;

    @IsDate("dd-MM-yyyy")
    private String publishDate;

    @NotNull
    @Size(min = 0, max = 10000)
    private String text;

    private List<@Alphanumeric String> tags;
}

## Creating an unified way of intercepting validation errors.

The [JBVExt library](https://github.com/nomemory/java-bean-validation-extension) contains an util method **SimpleValidation.validate(...)** that will throw a **BeanValidationException** exception the first time a constraint is violated.

So we will make each controller of our API invoke this method before doing anything else:

@PostMapping("/user/")
public ResponseEntity createUser(@RequestBody CreateUserReq request) {
        // If the TestBodyReq fails the validation a BeanValidationException will be thrown.
        SimpleValidation.validate(request);
        System.out.println("Request received: " + request);
        return status(OK).build();
}

@PostMapping("/post/")
public ResponseEntity createPost(@RequestBody CreatePostReq request) {
        // If the TestBodyReq fails the validation a BeanValidationException will be thrown.
        SimpleValidation.validate(request);
        System.out.println("Request received: " + request);
        return status(OK).build();
}

The next step will be define a "Global" Exception Handler that will intercept any BeanValidationException thrown from our Controllers and treat them in the same manner.

The [@ControllerAdvice](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/ControllerAdvice.html) and [@ExceptionHandler](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/ExceptionHandler.html) annotations (part of Spring) will become handy:

@ControllerAdvice
public class BeanValidationExceptionCatch extends ResponseEntityExceptionHandler {

    /\*\*
     \* This method acts as a "Global" catch block for all the exceptions of type BeanValidationException.
     \* We will use to identify all the "mal-formatted" requests that are made against our REST API and treat them
     \* in a generic way.
     \*
     \* @param ex Can be cast to (BeanValidationException).
     \* @param webRequest The webRequest.
     \* @return A ResponseEntity that is a BAD\_REQUEST and contains the error message supplied by the JSR-380 validation.
     \*/
    @ExceptionHandler(value = {BeanValidationException.class})
    public ResponseEntity handleValidationException(RuntimeException ex, WebRequest webRequest) {
        BeanValidationException exception = (BeanValidationException) ex;
        return handleExceptionInternal(exception, exception.getMessage(), new HttpHeaders(), HttpStatus.BAD\_REQUEST, webRequest);
    }

}

So instead of having to repeat all the try/catch code in each controller, we can define this unified strategy in a separate class, that will threat each exception (of type **BeanValidationException**) in the same way.

## Running the code

The code is available on git:

git clone https://github.com/nomemory/spring-boot-jbvext-example

The Spring Boot application will run by default on port **8080**.

If we try to **POST http://localhost:8080** with an invalid bodyRequest (as described by the JSR380 validation):

[![](images/jsr-380-new-1024x227.png)](http://andreinc.net/wp-content/uploads/2017/10/jsr-380-new.png)
