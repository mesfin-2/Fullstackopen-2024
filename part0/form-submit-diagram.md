
```mermaid
sequenceDiagram
    title 0.4: New note diagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Writes note in text field
    activate Browser
    Browser->>Server: POST /new_note with note content
    activate Server
    Server->>Server: Validates note content
    Server->>Browser: Success/Error response
    deactivate Server
    Browser->>Browser: Updates note list
    deactivate Browser
```

