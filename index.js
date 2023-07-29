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

// INPUTS
const machineInput = $('#machineInput'); 

// ERROR HANDLERS
const validation = $('.validation');
const errorCover = $('.error-cover');
const errorContainer = $('.error-details');
const errorDetails = $('#errorDetails');

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

run.prop('disabled', false);
// READING INPUT STRING
run.on('click', function(){
    runDPDA($('#inputString').val());
});