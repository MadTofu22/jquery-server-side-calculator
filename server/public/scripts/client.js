console.log('client.js has been loaded');
$(onReady);

// Define global variable.
let leftOperand = '';
let rightOperand = '';
let operator = '';

function onReady () {

    console.log('jquery.js has been loaded');
    
    updateHistory();
    
    // This handles all of the numbers, and decimal point, and adds the clicked item to the calculaor input field.
    $('.numInput').on('click', button => {
        
        console.log(button.target.id, 'has been clicked!');
        let number = button.target.id;
        currentInput = $('#calcInput').val();
        $('#calcInput').val(currentInput+number);
    });

    // This handles all the operator input buttons and adds the clicked item to the calculator input field.
    $('.operatorInput').on('click', button => {

        console.log(button.target.id, 'has been clicked!');
        let clickedOperator = button.target.id;
        currentInput = $('#calcInput').val();

        // Check to ensure a number has been entered before the operator, if not clear the invalid input then alert the user. If the input is valid, add the operator to the input display and disable the operator buttons. Store the left operand and operator to global variables.
        if (currentInput === ''){
            $('#calcInput').val('');
            alert('Please enter a number before an operator.')
        } else {
            $('#calcInput').val(currentInput+clickedOperator);
            leftOperand += currentInput;
            operator += clickedOperator;
            $('.operatorInput').prop('disabled', true);
        }
    });

    $('#calculate').on('click', calculate);
    $('#clear').on('click', clear);
}

// This function handles the click event for the calculate button.
function calculate () {
    
    console.log('calculate button has been clicked');

    // Find the index op the operator that was input and store the number after it to the rightOperator variable.

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
        resetCalculator();
    }).catch(error => {
        alert(error);
    });
}

// This function 

// This function handles the click event for the clear input button.
function clear () {

    console.log('clear input button had been clicked');
    $('#calcInput').val('');

    // Add DELETE request to remove the history.
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

// This function takes the calculator input string and parses it for the left operand.
function parseLeft (inputString) {
    
    console.log('hello from parseLeft()');
    let operandString = '';
    let operatorFound = false;

    // Iterate through the characters in the input string and store the number that comes before the operator into the operand string.
    do {
        let index = 0;
        // Check if the current character is a math operator
        if (inputString[index] === '+' || inputString[index] === '-' || inputString[index] === '*' || inputString[index] === '/') {
            operatorFound = true;
        } else {
            console.log('inputString[index]', inputString[index]);
            operandString += inputString[index];
        }
    } while (!operatorFound);
    console.log('operatandString:', operandString);
    return operandString;
}

function parseRight (inputString) {

    console.log('hello from parseRight()');
}

function parseOperator (inputString) {
    
    console.log('hello from parseOperator()');
}
