# apollo-gatewat-provides-issue


To run the reproduction run four servers in order:
```
node a.js
node b.js
node c.js
node abc_gateway.js
```

Queries this should be able to evaluate:
* Single Fetch from B:
  ```
  query askB{
    bs{
      b
      refA{ a }
    }
  }
  ```
* Single Fetch from C:
  ```
  query askC{
    cs{
      c
      refB{ refA { a }}
    }
  }
  ```

The services `a.js`, `b.js` and `c.js` do nothing but provide their SDL, look at debug log of the gateway to see if expected query plan was assembled.