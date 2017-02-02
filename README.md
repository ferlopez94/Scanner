# Scanner
Implementation of a scanner by coding a Finite Deterministic Automaton as a Transition Matrix.

This version recognizes:

Integer numbers | Float numbers   | Binary operators | Delimiters | End of program | Illegal expressions
--------------- | --------------- | ---------------- | ---------- | -------------- | --------------
 12             | 9.0             | +                | (          | $              | %
 354            | 3.54            | -                | )          |                | &
 20             | 20.1234         | *                |            |                | .0
                |                 | /                |            |                | 1...00
                |                 |                  |            |                | var.5

Variables | Separators |
--------- | ---------- |
my_var1   | ,          |
myvar2    |            |
my3_3var  |            |
\_var_4   |            |

- Varibles
Identifiers begin with a lowercase letter or underscore, followed by zero or more lowercase letters, underscores and/or digits.

## Input example
```
my_var1, 12 - 5..00(3 * 7.8) - 0.56$
```

## Output example
```
Variable my_var1
Separator ,
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
[ 106, 107, 100, 102, 200, 103, 100, 102, 101, 104, 102, 101 ]
```

At the end of execution, an array containing the tokens formed from the last entry is returned.

## Finite Deterministic Automaton
![Finite Deterministc Automato](/img/fda.png)
