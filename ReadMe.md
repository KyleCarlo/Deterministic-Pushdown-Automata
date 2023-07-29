# Machine Definition File Format
- The machine definition follows the format below by line
    1. number of states 
    2. list of states 
    3. number of inputs 
    4. list of inputs 
    5. number of transitions
    6. transitions in the format q s q’ such that f(q,s) = q’ (one transition per line)
    7. start state
    8. number of final states
    9. list of final states