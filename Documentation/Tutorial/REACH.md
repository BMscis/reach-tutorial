#### NFT AUCTION

### Install and Initialize

### Implementation

[index.rsh](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/p1/index.rsh)

Let's go through the code to see what is happening.

+ Line 1 indicates that this is a Reach program.
You'll always have this at the top of every program.
+ Line 3 defines the main export from the program.
When you compile, this is what the compiler will look at.
+ Lines 4 through 6 specifies the a **Participant** creator for this application, _Creator_.
+ Line 7 through 9 specifies an **API** called 'Bidder'. We are going to learn about API's later in the tutorial.
+  Line 10 marks the deployment of the the Reach program, which allows the program to start doing things.

### Reach Expression
- [Participant](https://docs.reach.sh/rsh/appinit/#rsh_Participant)
        
    A Participant in Reach represent a dictionary that: 
    + Contains all functions that must be provided to the backend by the frontend.
    + Represents a unique user of the contract.

    For instance, the contract above 