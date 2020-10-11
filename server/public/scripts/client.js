console.log('client.js has been loaded');
$(onReady)

function onReady () {

    console.log('jquery.js has been loaded');
    
    $('#calculate').on('click', calculate);
    $('#clear').on('click', clear);
}

// This function handles the click event for the calculate button.
function calculate () {
    
    console.log('calculate button has been clicked');

    let leftOperand = $('#firstInput').val();
    let rightOperand = $('#secondInput').val();
    let operator = $('#operatorList').val();

    // Connect to the /calc route on the server
    $.ajax({
        method: 'POST',
        url: '/calc',
        data: {
            leftOperand,
            rightOperand,
            operator,
        }
    }).then(response => {
        console.log('resonse from /calc', response);
        getLastCalculation();
    }).catch(error => {
        alert(error);
    });
}

// This function handles the click event for the clear input button.
function clear () {

    console.log('clear input button had been clicked');
    $('.operand').val('');
}

// This function displays the result of the current calculation.
function  displayResult (result) {

    console.log('hello from displayResult');
    $('#resultContainer').empty();
    $('#resultContainer').append(`<h2>${result}</h2>`);
}

// This function gets the latest calculation from the server.
function getLastCalculation () {

    console.log('hello from getLastCalculation');

    // Get the last calculation results from the /calc route on the server and display it to the DOM.
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then(response => {
        displayResult(response.result);
    }).catch(error => {
        alert(error);
    });
}