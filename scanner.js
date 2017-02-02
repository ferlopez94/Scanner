/* Implementation of a scanner by coding a Finite Deterministic Automaton
   as a Transition Matrix.
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  input += '\n';
  if (scanner(input) == -1) {
    rl.close();
  }
});

const INT = 100;  // Integer number
const FLT = 101;  // Float number
const BOP = 102;  // Binary operator
const LLP = 103;  // Delimiter: left parenthesis
const RRP = 104;  // Delimiter: right parenthesis
const END = 105;  // End of program
const ERR = 200;  // Lexical error: unknown word

// Transition Matrix: FDA coding
// Row = No final state
// Column = Transition
// States > 99 are final states (acceptors)
// Special case: State 200 = ERROR
//            dig  op    (    )   odd  spa   .    $
const MT = [[   1, BOP, LLP, RRP,   4,   0,   4, END],    // State 0 - Initial state
            [   1, INT, INT, INT,   4, INT,   2, INT],    // State 1 - Integer numbers
            [   3, ERR, ERR, ERR,   4, ERR,   4, ERR],    // State 2 - First decimal number
            [   3, FLT, FLT, FLT,   4, FLT,   4, FLT],    // State 3 - Decimal numbers remaining
            [   4, ERR, ERR, ERR,   4, ERR,   4, ERR]];   // State 4 - Error state

function scanner(input) {
  var state = 0;
  var lexema = '';
  var tokens = [];
  var read = true;
  var character;

  var i = 0;
  var length = input.length;

  while (i < length) {
    while (state < 100 && i < length) {
      if (read) {
        character = input[i];
        i++;
      } else {
        read = true;
      }

      state = MT[state][filter(character)];
      //console.log('Read', character, state);
      if (state < 100 && state !== 0) {
        lexema += character;
      }
    }

    switch (state) {
      case INT:
        read = false;
        console.log('Integer', lexema);
        break;
      case FLT:
        read = false;
        console.log('Float', lexema);
        break;
      case BOP:
        lexema += character;
        console.log('Binary operator', lexema);
        break;
      case LLP:
        lexema += character;
        console.log('Delimiter', lexema);
        break;
      case RRP:
        lexema += character;
        console.log('Delimiter', lexema);
        break;
      case END:
        console.log('End of program');
        console.log(tokens);
        return -1;
        break;
      case ERR:
        read = false;
        console.log('Unexpected token', lexema);
        break;
    }

    tokens.push(state);
    lexema = '';
    state = 0;
  }
  console.log('');
}

function filter(character) {
  switch(character) {
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7':case '8': case '9':
			return 0; // Digits
		case '+': case '-': case '*': case '/':
			return 1; // Operators
		case '(':
			return 2; // Delimiter (
		case ')':
			return 3; // Delimiter )
		case ' ': case String.fromCharCode(10): case String.fromCharCode(13):
			return 5; // Blank spaces
		case '.':
			return 6; // Decimal point
		case '$':
			return 7; // End of program
		default:
			return 4; // Weird character (ilegal)
  }
}
