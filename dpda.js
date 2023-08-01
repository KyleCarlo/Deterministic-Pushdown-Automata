var numStates;
var states = [];
var numInputs; 
var inputs = [];
var numStackSymbols;
var stackSymbols = [];
var initStackSymbol;
var numTransitions;
var transitions = {};
var startState;
var finalState;
var stack = [];

class Transition {
    constructor(s, pop, q2, push) {
        this.s = s;
        this.pop = pop;
        this.q2 = q2;
        this.push = push;
    }
}

function resetDPDA() {
    numStates = null;
    states = [];
    numInputs = null; 
    inputs = [];
    numStackSymbols = null;
    stackSymbols = [];
    initStackSymbol = null;
    numTransitions = null;
    transitions = {};
    startState = null;
    finalState = null;
    stack = [];
}

function reject(container){
    container.text('Rejected');
    container.css('color', 'red');
}

const dpdaReader = function(input, stackContainer, stateContainer){
    resetDPDA();
    stackContainer.empty();
    stackContainer.append($('<span>').text(' '));

    if (input === '') {
        throw new Error('Empty input.');
    }

    input = input.split('\n');

    // 1-2. STATES
    numStates = input[0];
    numStates = parseInt(numStates);
    if (isNaN(numStates)) {
        throw new Error('Invalid number of states.');
    }

    input = input.slice(1);
    states = input[0].split(' ');
    if (states.length !== numStates) {
        throw new Error('Number of states does not match the number of states given.');
    }
    for (let i = 0; i < states.length; i++) {
        transitions[states[i]] = [];
    }

    // 3-4. INPUT SYMBOLS
    input = input.slice(1);
    numInputs = parseInt(input[0]);
    if (isNaN(numInputs)) {
        throw new Error('Invalid number of inputs.');
    }

    input = input.slice(1);
    inputs = input[0].split(' ');
    if (inputs.length !== numInputs) {
        throw new Error('Number of inputs does not match the number of inputs given.');
    }

    // 5-6. STACK SYMBOLS
    input = input.slice(1);
    numStackSymbols = parseInt(input[0]);
    if (isNaN(numStackSymbols)) {
        throw new Error('Invalid number of stack symbols.');
    }

    input = input.slice(1);
    stackSymbols = input[0].split(' ');
    if (stackSymbols.length !== numStackSymbols) {
        throw new Error('Number of stack symbols does not match the number of stack symbols given.');
    }

    // 7-8. INITIAL STACK SYMBOL
    input = input.slice(1);
    initStackSymbol = input[0];
    if (stackSymbols.includes(initStackSymbol) || initStackSymbol === '' || initStackSymbol === ' ') {
        throw new Error('Invalid initial stack symbol.');
    }

    // 9. START STATE
    input = input.slice(1);
    startState = input[0];
    if (!states.includes(startState)) {
        throw new Error('Invalid start state.');
    }

    // 10. FINAL STATE
    input = input.slice(1);
    finalState = input[0];
    if (!states.includes(finalState)) {
        throw new Error('Invalid final state.');
    }

    // 11-. TRANSITIONS 
    // Transition format: q s pop q' push
    input = input.slice(1);
    numTransitions = parseInt(input[0]);
    if (isNaN(numTransitions)) {
        throw new Error('Invalid number of transitions.');
    }
    
    for(let i = 0; i < numTransitions; i++) {
        input = input.slice(1);
        let transition = input[0].split(' ');
        if (transition.length !== 5) {
            throw new Error('Invalid transition format.');
        }

        // IF STATES ARE NOT DEFINED
        if (!states.includes(transition[0]) || !states.includes(transition[3])) {
            throw new Error('Invalid state transitions. 1');
        }

        // IF INPUT ARE NOT DEFINED
        if (transition[1] != 'ε')
            if (!inputs.includes(transition[1])) {
                throw new Error('Invalid state transitions. 2');
            }

        // IF STACK SYMBOLS ARE NOT DEFINED
        if (transition[0] != 'ε'){
            // if (!stackSymbols.includes(transition[2]) || !stackSymbols.includes(transition[4])) {
            //     throw new Error('Invalid state transitions. 3');
            // }
        } else {
            if (initStackSymbol == transition[2] && transition[4] == 'ε') {
                throw new Error('Invalid state transitions. 4');
            }
        }

        transitions[transition[0]].push(new Transition(transition[1], transition[2], transition[3], transition[4]));
    }

    stack.push(initStackSymbol);
    stackContainer.empty();
    
    stackContainer.append($('<span>').text(stack[0]));
    stateContainer.text(startState);
}

const runDPDA = function(inputString, stringContainer, stackContainer, stateContainer, verdictContainer, speed){
    let animationSpeed = 100 * (11 - speed);
    let isAccepted = null;
    let spanWidth = stringContainer.children().eq(0).outerWidth();
    let currentState = startState;
    inputString += 'ε';
    
    for (let i = 0; i < inputString.length; i++){
        if (isAccepted == null){
            let stop = setTimeout(function(){
                console.log(currentState);
                
                let availableTransitions = transitions[currentState];

                let transitionFound = availableTransitions.find(transition => transition.s === inputString[i]);
                
                if (transitionFound == undefined) {
                    reject(verdictContainer);
                    return true;
                }
                
                console.log(transitionFound);
                if (transitionFound.pop != 'ε'){
                    if (stack[stack.length-1] != transitionFound.pop){
                        reject(verdictContainer);
                        return true;
                    } else {
                        stack.pop();
                        stackContainer.children().last().remove();
                        if (stackContainer.children().length == 0)
                            stackContainer.append($('<span>').text(' '));
                    }
                }
                
                if (transitionFound.push != 'ε'){
                    stack.push(transitionFound.push);
                    stackContainer.append($('<span>').text(stack[stack.length-1]));
                }
                console.log(i);
                console.log(inputString[i]);

                console.log(stack);
                currentState = transitionFound.q2;
                stateContainer.text(currentState);

                spanWidth += stringContainer.children().eq(i+1).outerWidth()/2;
                stringContainer.css('transform', 'translateX(calc(50% - '+ (spanWidth) +'px))');
                spanWidth += stringContainer.children().eq(i+1).outerWidth()/2;
            }, animationSpeed * i);
        }

        if (stop == true){
            isAccepted = false;
            break;
        }
    }
}

const stepDPDA = function(inputString, stringContainer, stackContainer, stateContainer, verdictContainer){

};

export {dpdaReader, runDPDA, stepDPDA};