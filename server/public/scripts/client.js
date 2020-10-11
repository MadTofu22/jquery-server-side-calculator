console.log('client.js has been loaded');
$(onReady)

function onReady () {

    console.log('jquery.js has been loaded');
    
    updateHistory();
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
        displayResult();
        updateHistory();
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
function addResultToDom (result) {

    console.log('hello from displayResult()');
    $('#resultContainer').empty();
    $('#resultContainer').append(`<h2>${result}</h2>`);
}

// This function gets the latest calculation from the server.
function displayResult () {

    console.log('hello from getLastCalculation()');

    // Get the last calculation results from the /calc route on the server and display it to the DOM.
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then(response => {
        addResultToDom(response.result);
    }).catch(error => {
        alert(error);
    });
}

// This function updates the history of all calculation made.
function updateHistory () {

    console.log('hello from updateHistory()');

    // Get the history of all previous calculations from the server and display them to the DOM.
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(response => {
        // Iterate through the response array and add the calculations to the DOM
        $('#historyList').empty();
        for (let calculation of response) {
            $('#historyList').append(`
                <li id="calc_${response.indexOf(calculation)}">${calculation.firstOperand} ${calculation.operator} ${calculation.secondOperand} = ${calculation.result}</li>`);
        }
    }).catch(error => {
        alert(error);
    });
}