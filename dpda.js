// MACHINE VARIABLES
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
var numFinalStates;
var finalStates = {};
var stack = [];
var allTransitions = [];

// GUI VARIABLES
var step = 0;
var verdict;
var spanWidth = 20;
var iString = 0;

class Transition {
    constructor(input, pop, q2, push) {
        this.input = input;
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
    stack = [];
    initStackSymbol = null;
    numTransitions = null;
    transitions = {};
    startState = null;
    numFinalStates = null;
    finalStates = [];
    allTransitions = [];
}

// DPDA MACHINE
function DPDA(inputString){
    allTransitions = [];
    let currentState = startState;
    let loop = true;
    let i = 0;
    allTransitions.push({
        'state': currentState,
        'input': '',
        'stack': [initStackSymbol]
    })

    while (loop){
        let input = inputString[i];
        let availableTransitions = transitions[currentState];
        let transitionFound = availableTransitions.find(transition => (transition.input === input || transition.input === '')
                                                        && (transition.pop === stack[stack.length-1] || transition.pop === ''));
        
        if (transitionFound == undefined || (i == inputString.length && finalStates.includes(currentState))) {
            loop = false;
        } else {
            if(transitionFound.input !== '')
                i++;
            else 
                input = '';
            if(transitionFound.pop !== '')
                stack.pop();
            if(transitionFound.push !== '')
                stack.push(transitionFound.push);
            currentState = transitionFound.q2;

            allTransitions.push({
                'state': currentState,
                'input': input,
                'stack': stack.slice()
            });
        }
    }

    if(i == inputString.length && finalStates.includes(currentState))
        return 'accepted';
    else
        return 'rejected';
}

function reject(container){
    container.text('Rejected');
    container.css('color', 'red');
}

function accept(container){
    container.text('Accepted');
    container.css('color', 'var(--accept)');
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

    if (numInputs > 0) {
        input = input.slice(1);
        inputs = input[0].split(' ');
        if (inputs.length !== numInputs) {
            throw new Error('Number of inputs does not match the number of inputs given.');
        }
        if(inputs.includes('*')){
            throw new Error('* cannot be part of input alphabet as it represents the empty string.');
        }
        for(let i = 0; i < inputs.length; i++){
            if (inputs[i].length != 1){
                throw new Error('Only single-character inputs are accepted.');
            }
        }
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
    
    for(let i = 0; i < stackSymbols.length; i++){
        if (stackSymbols[i].length != 1) {
            throw new Error('Only single-character stack symbols are accepted.');
        }
    }

    // 7-8. TRANSITIONS
    // Transition format: q s pop q' push
    input = input.slice(1);
    numTransitions = parseInt(input[0]);
    
    if (isNaN(numTransitions)) {
        throw new Error('Invalid number of transitions.');
    }
    
    for(let i = 0; i < numTransitions; i++) {
        input = input.slice(1);
        let newTrans = input[0].split(' ');
        if (newTrans.length !== 5) {
            throw new Error('Invalid transition format.');
        }

        // IF STATES ARE NOT DEFINED
        if (!states.includes(newTrans[0]) || !states.includes(newTrans[3])) {
            throw new Error('Invalid state transitions.');
        }

        // IF INPUT ARE NOT DEFINED
        if (newTrans[1] != '*')
            if (!inputs.includes(newTrans[1])) {
                throw new Error('Invalid state transitions.');
            }

        // IF STACK SYMBOLS ARE NOT DEFINED
        if (newTrans[2] != '*')
            if (!stackSymbols.includes(newTrans[2])) {
                throw new Error('Invalid state transitions.');
            }
        if (newTrans[4] != '*')
            if (!stackSymbols.includes(newTrans[4])) {
                throw new Error('Invalid state transitions.');
            }

        // CHECKING FOR DETERMINISM 
        if (newTrans[1] == '*') {
            newTrans[1] = '';
        }
        if (newTrans[2] == '*') {
            newTrans[2] = '';
        }
        if (newTrans[4] == '*') {
            newTrans[4] = '';
        }

        let state = newTrans[0];
        let newInput = newTrans[1];
        let newPop = newTrans[2];
        for(let j = 0; j < transitions[state].length; j++){
            if(transitions[state][j].input == '' && transitions[state][j].pop == ''){
                throw new Error('Non-deterministic.');
            }
            if(newInput == "" && newPop == ""){
                throw newError('Non-deterministic.');
            }
            if(transitions[state][j].input == newInput){
                if(transitions[state][j].pop == newPop ||
                    newPop == "" ||
                    transitions[state][j].pop == ""){
                        throw new Error('Non-deterministic');
                }
            }
            if(transitions[state][j].pop == newPop){
                if(newInput == "" ||
                    transitions[state][j].input == ""){
                        throw new Error('Non-deterministic');
                }
            }
            if((newPop == "" && transitions[state][j].input == "") ||
                (newInput == "" && transitions[state][j].pop == "")){
                throw new Error('Non-deterministic');
            }
        }

        transitions[newTrans[0]].push(new Transition(newTrans[1], newTrans[2], newTrans[3], newTrans[4]));
    }

    // 9. START STATE
    input = input.slice(1);
    startState = input[0];
    if (!states.includes(startState)) {
        throw new Error('Invalid start state.');
    }

    // 10. INITIAL STACK SYMBOL
    input = input.slice(1);
    initStackSymbol = input[0];
    if (!stackSymbols.includes(initStackSymbol)) {
        throw new Error('Invalid initial stack symbol.');
    }

    // 11. FINAL STATES
    input = input.slice(1);
    numFinalStates = parseInt(input[0]);
    if (isNaN(numFinalStates)) {
        throw new Error('Invalid number of final states.');
    }

    input = input.slice(1);
    finalStates = input[0].split(' ');
    for (let i = 0; i < finalStates.length; i++) {
        if (!states.includes(finalStates[i])) {
            throw new Error('Invalid final state.');
        }
    }

    // INITIAL STACK SYMBOL
    stack.push(initStackSymbol);
    stackContainer.empty();
    
    stackContainer.append($('<span>').text(stack[0]));
    stateContainer.text(startState);
}

const runDPDA = function(inputString, inputStringContainer, stringContainer, stateContainer, stackContainer, pointer, verdictContainer, speed){
    verdict = DPDA(inputString);
    var animationSpeed = 100 * (11-speed);
    $('#readMachine').prop('disabled', true);

    inputStringContainer.prop('disabled', true);
    stringContainer.css('transform', 'translateX(calc(50% + ('+ (-spanWidth)+'px)))');  
    stack = [initStackSymbol];

    $('#run').prop('disabled', true);
    $('#forward').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $('#inputFileBtn').prop('disabled', true);
    for (let i = 0; i < allTransitions.length; i++) {
        setTimeout(function() {
            step++;

            // UPDATE STACK
            stackContainer.empty();
            for (let j = 0; j < allTransitions[i].stack.length; j++) {
                stackContainer.append($('<span>').text(allTransitions[i].stack[j]));
            }
            if (stackContainer.children().length == 0) {
                stackContainer.append($('<span>'));
            }

            // UPDATE STATE
            stateContainer.text(allTransitions[i].state);
            
            // UPDATE INPUT STRING
            if (allTransitions[i].input != '' || iString == inputString.length) {
                spanWidth += $('.gui .string .pointer').outerWidth();
                pointer.css('border', 'solid 5px var(--orange)');
                stringContainer.css('transform', 'translateX(calc(50% + ('+ (-spanWidth)+'px)))');      
                iString++;         
            } else if (inputString[iString-1] != undefined && inputString[iString+1] != undefined) {
                pointer.css('border', 'solid 5px transparent');
            }
        }, animationSpeed * i);
    }
    setTimeout(function() {
        step--;
        inputStringContainer.prop('disabled', false);
        $('#backward').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#inputFileBtn').prop('disabled', false);
        if (verdict != null){
            if (verdict == 'accepted') 
                accept(verdictContainer);
            else
                reject(verdictContainer);
        }
    }, animationSpeed * allTransitions.length);
}

const stepDPDA = function(inputString, stringContainer, stateContainer, stackContainer, pointer, verdictContainer){
    verdict = DPDA(inputString);

    $('#runInput').prop('disabled', true);
    stack = [initStackSymbol];
    // FORWARD
    if (step < allTransitions.length - 1)
        step++;
    $('#backward').prop('disabled', false);

    // UPDATE STACK
    stackContainer.empty();
    for (let j = 0; j < allTransitions[step].stack.length; j++) {
        stackContainer.append($('<span>').text(allTransitions[step].stack[j]));
    }
    if (stackContainer.children().length == 0) {
        stackContainer.append($('<span>'));
    }

    // UPDATE STATE
    stateContainer.text(allTransitions[step].state);

    // UPDATE INPUT STRING
    if (allTransitions[step].input != '' || iString == inputString.length) {
        spanWidth += $('.gui .string .pointer').outerWidth();
        pointer.css('border', 'solid 5px var(--orange)');
        stringContainer.css('transform', 'translateX(calc(50% + ('+ (-spanWidth)+'px)))');   
        iString++;         
    } else if (inputString[iString-1] != undefined && inputString[iString+1] != undefined) {
        pointer.css('border', 'solid 5px transparent');
    }

    if (step == allTransitions.length - 1) {
        if (verdict == 'accepted') 
            accept(verdictContainer);
        else if (verdict == 'rejected')
            reject(verdictContainer);
        $('#forward').prop('disabled', true);
    }
    
};

const resetGUI = function(stringContainer, stateContainer, stackContainer, pointer, verdictContainer, isMachineExist){
    spanWidth = 20;
    iString = 0;
    step = 0;
    stateContainer.text(startState);
    stringContainer.css('transform', 'translateX(calc(50% + ('+ (-spanWidth)+'px)))');
    pointer.css('border', 'solid 5px var(--orange)');
    verdictContainer.text('--');
    verdictContainer.css('color', 'var(--blue)');
    stackContainer.empty();
    stackContainer.append($('<span>').text(initStackSymbol));
    if (isMachineExist){
        $('#forward').prop('disabled', false);
        $('#backward').prop('disabled', true);
        $('#runInput').prop('disabled', false);
    }
}

export {dpdaReader, runDPDA, stepDPDA, resetGUI};