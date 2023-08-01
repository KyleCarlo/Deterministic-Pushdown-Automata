# Machine Definition File Format
- The machine definition follows the format below by line
    1. number of states
    2. list of states
    3. number of input alphabets
    4. list of input alphabets
    5. number of stack alphabets
    6. list of stack alphabets
    7. initial stack alphabet
    8. start state
    9. final state
    10. number of transitions
    11. list of transitions in the format q s pop q’ push such that f(q,s,pop) = (q’,push)