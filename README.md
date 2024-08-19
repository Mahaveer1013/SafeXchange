# Burp Suite Request Body Attacks

Modifying the `req.body` in Burp Suite can be a powerful technique for performing various types of attacks. Below are some common attack types that can be executed by altering the request body:

## Attack Types

### 1. SQL Injection
Inject SQL commands into request body fields to manipulate database queries executed by the server.
- **Example:** Changing a parameter value to `' OR 1=1 --` to bypass authentication or extract data.

### 2. Cross-Site Scripting (XSS)
Inject malicious JavaScript into the request body to be executed in the context of another user's browser.
- **Example:** Inserting `<script>alert('XSS')</script>` into a text field.

### 3. Cross-Site Request Forgery (CSRF)
Modify the request body to perform actions on behalf of another user without their consent.
- **Example:** Changing form data to submit a transaction in a user's session.

### 4. Command Injection
Inject system commands into the request body to be executed on the server.
- **Example:** Changing a parameter value to `; ls -la` to list directory contents.

### 5. File Inclusion
Modify the request body to include files from the server.
- **Example:** Changing a parameter value to `../../etc/passwd` for Local File Inclusion (LFI).

### 6. XML External Entity (XXE) Injection
Inject malicious XML into the request body to access local files or network resources.
- **Example:** Adding an external entity in an XML payload like `<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]><foo>&xxe;</foo>`.

### 7. Directory Traversal
Manipulate file paths in the request body to access restricted directories and files.
- **Example:** Changing a file path to `../../etc/passwd` to read sensitive files.

### 8. Parameter Pollution
Send multiple parameters with the same name to see how the server processes them.
- **Example:** Including multiple instances of `param=value` in the body.

### 9. Buffer Overflow
Send excessively large data in the request body to overflow buffers and potentially execute arbitrary code.
- **Example:** Inserting a very large string to test buffer limits.

### 10. Business Logic Bypass
Manipulate the request body to bypass business logic or validation checks.
- **Example:** Changing price or quantity parameters in a purchase request.

### 11. Mass Assignment
Exploit poorly protected endpoints that bind input directly to data models.
- **Example:** Adding fields like `isAdmin=true` to elevate privileges.

### 12. NoSQL Injection
Inject malicious code into NoSQL database queries.
- **Example:** Changing JSON data in the request body to `{ "$ne": null }` to bypass filters.

### 13. JSON Web Token (JWT) Attacks
Manipulate JWTs in the request body to forge or tamper with tokens.
- **Example:** Changing the payload to escalate privileges.

## Tools and Functionalities in Burp Suite

- **Repeater:** Allows for manual modification and resending of requests.
- **Intruder:** Automates sending multiple payloads to test for vulnerabilities.
- **Scanner:** Automatically identifies common issues.

Feel free to use this guide to explore and understand various attack vectors by modifying the request body in Burp Suite.
