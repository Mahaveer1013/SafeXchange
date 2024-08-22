### <span style='color:#0891e9;'>Security Features of safexchange</span>
The safexchange package provides robust security measures to protect client-server communications from various types of attacks, especially when requests are intercepted and modified. By encrypting request and response data, safexchange ensures that sensitive information is not exposed and prevents the execution of unauthorized actions.

### This is how basically request or response interception works:
<img src='./demo/Screenshot 2024-08-22 212448.png' />

### This is how my package secures it:
<img src='./demo/Screenshot 2024-08-22 212256.png' />

### <span style='color:#0891e9;'>How It Works</span>
Client-Side Encryption:
When a client sends a message to the server, safexchange intercepts the request on the client side and encrypts the request body using a predefined secret key. This encrypted data is then sent to the server.

### <span style='color:#0891e9;'>Server-Side Decryption:</span>
Upon receiving the encrypted request, the server decrypts the data using the same secret key. This ensures that any attempts to modify the data during transmission will result in an error, as the server will detect the tampering and reject the request.

### <span style='color:#0891e9;'>Encrypted Responses:</span>
The server also encrypts its responses using the same secret key. The client then decrypts the response on its end, preventing any interception and modification of the response data.

### <span style='color:#0891e9;'>Protection Against Common Attacks</span>
By encrypting both requests and responses, safexchange helps protect against the following attack vectors commonly exploited by tools like Burp Suite:


### <h3>SQL Injection:</h3>
Prevention: Encrypted data cannot be manipulated to inject SQL commands.<br />
Example Attack: ' OR 1=1 --

### <h3>Cross-Site Scripting (XSS):</h3>
Prevention: Malicious scripts cannot be injected into encrypted data fields.<br />
Example Attack: <script>alert('XSS')</script>

### <h3>Cross-Site Request Forgery (CSRF):</h3>
Prevention: Unauthorized actions cannot be performed on behalf of another user, as the encrypted data will not match the expected format.<br />
Example Attack: Forging a transaction in another user's session.

### <h3>Command Injection:</h3>
Prevention: Encrypted data prevents execution of system commands.<br />
Example Attack: ; ls -la

### <h3>File Inclusion:</h3>
Prevention: File paths cannot be modified to include unauthorized files.<br />
Example Attack: ../../etc/passwd

### <h3>XML External Entity (XXE) Injection:</h3>
Prevention: Malicious XML cannot be included in the encrypted data.<br />
Example Attack: <!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]><foo>&xxe;</foo>

### <h3>Directory Traversal:</h3>
Prevention: Directory paths cannot be altered to access restricted areas.<br />
Example Attack: ../../etc/passwd

### <h3>Parameter Pollution:</h3>
Prevention: Multiple parameters with the same name are properly encrypted, preventing tampering.<br />
Example Attack: param=value&param=modified

### <h3>Buffer Overflow:</h3>
Prevention: The encryption process ensures that excessively large data does not overflow buffers.<br />
Example Attack: Sending a very large string to overflow buffers.

### <h3>Business Logic Bypass:</h3>
Prevention: Business logic checks are protected by encryption, ensuring valid data is sent.<br />
Example Attack: Modifying price or quantity parameters.

### <h3>Mass Assignment:</h3>
Prevention: Unintended fields cannot be added through encrypted data.<br />
Example Attack: Adding fields like isAdmin=true.

### <h3>NoSQL Injection:</h3>
Prevention: Malicious NoSQL queries are ineffective on encrypted data.<br />
Example Attack: { "$ne": null }

### <h3>JSON Web Token (JWT) Attacks:</h3>
Prevention: JWTs cannot be tampered with since they are encrypted during transmission.<br />
Example Attack: Modifying the payload to escalate privileges.

### Tools and Functionalities in Burp Suite
Even though Burp Suite is a powerful tool for testing vulnerabilities, the encryption provided by safexchange ensures that any intercepted data remains secure and unmodifiable. Burp Suite functionalities like Repeater, Intruder, and Scanner will be rendered ineffective against the encrypted data, providing a strong layer of protection.

### <span style='color:#0891e9;'>Practical Demo: </span>

<h2>This is how the request is visible while sending to server. (Which is Modifiable.)</h2>
<img src='./demo/Screenshot (266).png' />

<h2>This is how request send from my package send the data.</h2>
<img src='./demo/Screenshot (269).png' />

<h2>This is how server handles that encrypted request data. Also can see the response Intercepted as a encrypted value.</h2>
<img src='./demo/Screenshot (270).png' />

<h2>This is how server handles that encrypted response data.</h2>
<img src='./demo/Screenshot (272).png' />

### Will be Published in NPM soon.