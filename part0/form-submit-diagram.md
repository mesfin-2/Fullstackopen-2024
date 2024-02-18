
```mermaid
graph LR;
    A[User] -->|Writes note| B[Text field]
    B -->|Enters text| C[Save button]
    C -->|Clicks Save| D[Page (https://studies.cs.helsinki.fi/exampleapp/notes)]
    D -->|Sends request| E((Server))
    E -->|Receives request| F((Database))
    F -->|Saves note| E
    E -->|Sends response| D
    D -->|Updates page| A
```

