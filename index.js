import {dpdaReader, runDPDA} from './dpda.js';

// BUTTONS
const inputFile = $('#inputFile');
const pseudoBtn = $('#inputFileBtn');
const readMachine = $('#readMachine');
const genConBtn = $('.control button');
const run = $('#runInput');
const pause = $('#pause');
const back = $('#backward');
const forward = $('#forward');
const reset = $('#reset');
const speed = $('#speedInput');

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
    var fr = new FileReader();
    fr.onload = function(){
        machineInput.val(fr.result);
    }
        
    fr.readAsText(this.files[0]);
});

// READING MACHINE SPECIFICATION
readMachine.on('click', function(){
    try {
        dpdaReader(machineInput.val());
        genConBtn.prop('disabled', false);
        validation.css('visibility', 'visible');
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
    genConBtn.prop('disabled', true);
});

// READING INPUT STRING
run.on('click', function(){
    runDPDA(inputString.val(), stringContainer);
});

// UPDATING GUI
inputString.on('input', function(){
    console.log(speed.val());
    stringContainer.empty();
    for (let i = 0; i < inputString.val().length; i++) {
        stringContainer.append('<span>' + inputString.val()[i] + '</span>');
    }
    if (inputString.val().length === 0) {
        stringContainer.append('<span> </span>');
        stringContainer.css('transform', 'translateX(calc(50% - 14.8px))');
    } else {
        let spanWidth = stringContainer.children().eq(0).outerWidth();
        stringContainer.css('transform', 'translateX(calc(50% - '+ (spanWidth /2) +'px))');
    }
});