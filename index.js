import {dpdaReader, runDPDA, stepDPDA, resetGUI} from './dpda.js';

// BUTTONS
const inputFile = $('#inputFile');
const pseudoBtn = $('#inputFileBtn');
const readMachine = $('#readMachine');
const genConBtn = $('.control button').slice(0, 3);
const run = $('#runInput');
const reset = $('#reset');
const speed = $('#speedInput');
const step = $('#forward');
const reload = $('#reload');

// INPUTS
const machineInput = $('#machineInput'); 
const inputString = $('#inputString');

// ERROR HANDLERS
const validation = $('.validation');
const errorCover = $('.error-cover');
const errorContainer = $('.error-details');
const errorDetails = $('#errorDetails');

// GUI ELEMENTS
const stringContainer = $('.gui .string');
const stateContainer = $('.gui .current-state .container span');
const stackContainer = $('.gui .stack');
const pointer = $('.gui .head .pointer');
const verdictContainer = $('.gui .verdict .container span');

// TRACKER
var isMachineExist = false;

// ERROR COVER
errorContainer.on('click', function(){
    $('body').css('overflow', 'initial');
    errorContainer.css('z-index', '-1');
    errorContainer.css('opacity', '0');
    errorCover.css('z-index', '-1');
    errorCover.css('opacity', '0');
});

// FILE INPUT
pseudoBtn.on('click', function() {
    inputFile.trigger('click');
});

inputFile.on('change', function() {
    $('#readMachine').prop('disabled', false);
    validation.css('visibility', 'hidden');
    resetGUI(stringContainer, stateContainer, stackContainer, pointer, verdictContainer);
    genConBtn.prop('disabled', true);

    var fr = new FileReader();
    fr.onload = function(){
        machineInput.val(fr.result);
    }
        
    fr.readAsText(this.files[0]);
});

// READING MACHINE DEFINITION
readMachine.on('click', function(){
    try {
        dpdaReader(machineInput.val(), stackContainer, stateContainer);
        genConBtn.prop('disabled', false);
        $('#backward').prop('disabled', true);
        validation.css('visibility', 'visible');
        isMachineExist = true;
    } catch (error) {
        console.log(error.message);
        errorDetails.text('Detected ' + error);
        $('body').css('overflow', 'hidden');
        errorContainer.css('z-index', '1');
        errorContainer.css('opacity', '1');
        errorCover.css('z-index', '1');
        errorCover.css('opacity', '0.5');
        validation.css('visibility', 'hidden');
        genConBtn.prop('disabled', true);
    }
});

machineInput.on('input', function(){
    validation.css('visibility', 'hidden');
    $('#readMachine').prop('disabled', false);
    isMachineExist = false;
    resetGUI(stringContainer, stateContainer, stackContainer, pointer, verdictContainer, isMachineExist);
    genConBtn.prop('disabled', true);
});

// READING INPUT STRING
run.on('click', function(){
    run.prop('disabled', true);
    inputString.prop('disabled', true);
    runDPDA(inputString.val(), inputString, stringContainer, stateContainer, stackContainer, pointer, verdictContainer, speed.val());
});

reset.on('click', function(){
    resetGUI(stringContainer, stateContainer, stackContainer, pointer, verdictContainer, isMachineExist);
});

step.on('click', function(){
    stepDPDA(inputString.val(), stringContainer, stateContainer, stackContainer, pointer, verdictContainer);
});

// UPDATING GUI
inputString.on('input', function(){
    stringContainer.empty();
    stringContainer.append($('<span class="pointer"></span>'));
    resetGUI(stringContainer, stateContainer, stackContainer, pointer, verdictContainer, isMachineExist);
    for (let i = 0; i < inputString.val().length; i++) {
        stringContainer.append('<span>' + inputString.val()[i] + '</span>');
    }
    if (inputString.val().length === 0) {
        stringContainer.append('<span></span>');
    }
});

// RELOAD
reload.on('click', function(){
    location.reload();
});