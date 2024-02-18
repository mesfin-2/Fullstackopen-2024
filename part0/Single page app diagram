```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server
    participant Database

    User->>Browser: Enters URL https://studies.cs.helsinki.fi/exampleapp/spa
    Browser->>Server: Request for single-page app
    activate Server
    Server-->>Browser: Single-page app (HTML, CSS, JS)
    deactivate Server
    Browser->>Server: Fetches notes data
    activate Server
    Server->>Database: Request for notes data
    activate Database
    Database-->>Server: Notes data
    deactivate Database
    Server-->>Browser: Notes data (JSON)
    deactivate Server
    Browser->>Browser: Renders notes on the page
```
