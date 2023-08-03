# Machine Definition File Format
- The machine definition follows the format below by line
    1. number of states
    2. list of states
    3. number of symbols in the input alphabet
    4. input alphabet
    5. number of symbols in the stack alphabet
    6. stack alphabet
    7. number of transitions
    8. list of transitions in the format q s pop q’ push such that f(q,s,pop) = (q’,push)
    - Note that for this simulation, only single-character inputs and single-character push/pop to the stack are accepted
    - DPDA's formal definition is followed for other rules regarding transitions
    9. start state
    10. initial stack symbol
    11. number of final states
    12. list of final states