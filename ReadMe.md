# Project Specification
- The objective of this project is to implement a simulation of a Deterministic Pushdown Automaton (DPDA) and provide a minimalist Graphical User Interface (GUI) for interacting with the simulation. The DPDA will serve as an abstract machine capable of accepting or rejecting input strings. This project serves as a requirement in the subject Advanced Algorithms and Complexity (STALGCM) in De La Salle University.
# Project Setup
### Online Setup
- Accessible in the link: https://kylecarlo.github.io/Deterministic-Pushdown-Automata/
### Local Setup
1. Download the project from the repository.
2. Open a terminal.
3. Using the terminal, go to the project directory (directory where index.html is located).
4. Type in the terminal, ```npm start```
# Manual
### Input Machine Definition
- Input the machine definition based on the proper format stated <a href="#machine-definition-file-format">below</a>
- Press ```IMPORT``` if you have an input from ```.txt``` file.
- Press ```READ``` button to check the machine definition.
    - Troubleshoot: If error exists, check the input format again or check if all the transitions are deterministic.
### Input a String
- Input the string you want to check in the box in the ```Input String``` panel.
    - NOTE: There should be no ```*``` in the input string as it represents ```λ``` in the machine definition.
### Running the Machine
- Press ```RUN``` button to check if the string is accepted or not.
- Press ```STEP``` button to check the step-by-step procedure done by the machine.
- Press ```RESET``` button to go back from the start.
- You can control the speed of the machine execution by controlling the slider. Rightmost being the fastest.
# Machine Definition Input Format
- The machine definition follows the format below by line
    1. number of states
    2. list of states
    3. number of symbols in the input alphabet
    4. input alphabet
    5. number of symbols in the stack alphabet
    6. stack alphabet
    7. number of transitions
    8. list of transitions in the format ```q s pop q’ push``` such that ```f(q,s,pop) = (q’,push)```
        - Note that for this simulation, only single-character inputs and single-character push/pop to the stack are accepted
        - DPDA's formal definition is followed for other rules regarding transitions
    9. start state
        - ```*``` represents ```λ``` 
    10. initial stack symbol
    11. number of final states
    12. list of final states
# Authors
- Daphne Janelyn L. Go
- Kyle Carlo C. Lasala
- Maria Monica Manlises
