# Scanner
Implementation of a scanner by coding a Finite Deterministic Automaton as a Transition Matrix.

This version recognizes:
- Integer numbers
  - 12
  - 354
  - 20
  
- Float numbers
  - 9.0
  - 3.54
  - 20.1234
  
- Binary operators
  - +
  - -
  - *
  - /
  
- Delimiters
  - (
  - )
  
- End of program
  - $
  
## Input example
```
12 - 5..00(3 * 7.8) - 0.56$
```

## Output example
```
Integer 12
Binary operator -
Unexpected token 5..00
Delimiter (
Integer 3
Binary operator *
Float 7.8
Delimiter )
Binary operator -
Float 0.56
End of program
[ 100, 102, 200, 103, 100, 102, 101, 104, 102, 101 ]
```

At the end of execution, an array containing the tokens formed from the last entry is returned.

## Finite Deterministic Automaton
![Finite Deterministc Automato](/img/fda.png)
