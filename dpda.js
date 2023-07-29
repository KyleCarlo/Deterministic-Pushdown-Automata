var numStates;
var states = [];
var numInputs; 
var inputs = [];
var numTransitions;
var transitions = {};
var startState;
var numFStates;
var finalStates = [];

function transitionConstructor(s, q2, pop, push) {
    this.s = s;
    this.q2 = q2;
    this.pop = pop;
    this.push = push;
}

function resetDPDA() {
    numStates = null;
    states = [];
    numInputs = null;
    inputs = [];
    numTransitions = null;
    transitions = {};
    startState = null;
    numFStates = null;
    finalStates = [];
}

const dpdaReader = function(input){
    resetDPDA();

    if (input === '') {
        throw new Error('Empty input.');
    }

    input = input.split('\n');

    // READ STATES
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

    // READ SYMBOLS
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

    // READ TRANSITIONS 
    // Transition format: q1 s pop q2 push
    input = input.slice(1);
    numTransitions = parseInt(input[0]);
    for(let i = 0; i < numTransitions; i++) {
        input = input.slice(1);
        let transition = input[0].split(' ');
        // if (transition.length !== 4) {
        //     throw new Error('Invalid transition format.');
        // }
        if (!states.includes(transition[0]) || !states.includes(transition[2])) {
            throw new Error('Invalid state transitions.');
        }

        transitions[transition[0]].push(new transitionConstructor(transition[1], transition[2], transition[3], transition[3]));
    }

    // READ START STATE
    input = input.slice(1);
    startState = input[0];
    if (!states.includes(startState)) {
        throw new Error('Invalid start state.');
    }

    // READ FINAL STATES
    input = input.slice(1);
    numFStates = parseInt(input[0]);
    if (isNaN(numFStates)) {
        throw new Error('Invalid number of final states.');
    }

    input = input.slice(1);
    finalStates = input[0].split(' ');
    if (finalStates.length !== numFStates) {
        throw new Error('Number of final states does not match the number of final states given.');
    }
}

const runDPDA = function(inputString){
    console.log(inputs);
    for (let i = 0; i < inputString.length; i++) {
        if (!inputs.includes(inputString[i])) {
            console.log('REJECT');
            break;
        }
    }
}

export {dpdaReader, runDPDA};