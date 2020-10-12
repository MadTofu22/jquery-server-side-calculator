console.log('client.js has been loaded');
$(onReady);

// Define global variable.
let leftOperand = '';
let rightOperand = '';
let operator = '';

function onReady () {

    console.log('jquery.js has been loaded');
    
    // Inital history load if the page was just refreshed.
    updateHistory();
    
    // This handles all of the numbers, and decimal point, and adds the clicked item to the calculaor input field.
    $('.numInput').on('click', button => {
        
        console.log(button.target.id, 'has been clicked!');
        let number = button.target.id;
        currentInput = $('#calcInput').val();
        $('#calcInput').val(currentInput+number);
    });

    // Thhis handles the decimal button being pushed, and disables it until it's made reusable by other actions.
    $('.decimal').on('click', button => {
        currentInput = $('#calcInput').val();
        $('#calcInput').val(currentInput+'.');
        $('.decimal').prop('disabled', true);
    });

    // This handles all the operator input buttons and adds the clicked item to the calculator input field.
    $('.operatorInput').on('click', button => {

        console.log(button.target.id, 'has been clicked!');
        let clickedOperator = button.target.id;
        getOperator(clickedOperator);
    });

    // This handles the click event for the submit button, =.
    $('#calculate').on('click', () => {
        
        getRightOperand();
        console.log('leftOperand', leftOperand, 'operator', operator, 'rightOperand', rightOperand);

        if (!leftOperand || !operator || !rightOperand) {
            alert('Please enter a full equation.');
        } else {
            calculate();
        }
    });

    // This handles the click even for the clear input button.
    $('#clear').on('click', clear);

    // This handles the click event for clearing results history.
    $('#clearHistory').on('click', clearHistory);

    // This handles the click even for allowing the user to click an equation in the history and re-run it.
    $('#historyList').on('click', 'li', button => {

        console.log(button.target.id, 'has beenclicked.');
        leftOperand = $('#calcInput').val();
        let calcID = button.target.id;
        rerunCalc(calcID);
    }); 
}

// This function parses the id for the history item clicked then reruns the calculation.
function rerunCalc (id) {
    
    console.log('hello from rerunCalc(), id:', id);

    // Get the server history index number by removing 'calc_' from the id.
    let index = id.slice(5);

    // Connect to the /rerun post route on the server
    $.ajax({
        method: 'POST',
        url: '/rerun',
        data: {
            index
        }
    }).then(response => {
        displayResult();
        updateHistory();
        resetCalculator();
    }).catch(error => {
        alert(error);
    });
}

// This function handles the click event for the calculate button.
function calculate () {
    
    console.log('calculate button has been clicked');

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
        displayResult();
        updateHistory();
        resetCalculator();
    }).catch(error => {
        alert(error);
    });
}

// This function gets the operator from the input display.
function getOperator (clickedOperator) {
    
    currentInput = $('#calcInput').val();

    // Check to ensure a number has been entered before the operator, if not clear the invalid input then alert the user.
    if (currentInput === ''){
        $('#calcInput').val('');
        alert('Please enter a number before an operator.')
    } else {
        $('#calcInput').val(currentInput+clickedOperator);
        leftOperand += currentInput;
        operator += clickedOperator;
        $('.operatorInput').prop('disabled', true);
        $('.decimal').prop('disabled', false);
    }
}

// This function finds the index op the operator that was input and store the number after it to the rightOperator variable.
function getRightOperand () {

    console.log('hello from getRightOperand()');
    let inputString = $('#calcInput').val();
    let start = inputString.indexOf(operator)+1;
    rightOperand += inputString.slice(start, inputString.length);
}

// This function clears global variables and resets the disabled operator buttons and input display.
function resetCalculator () {
    
    console.log('hello from resetCalculator()');
    $('.operatorInput').prop('disabled', false);
    $('#calcInput').val('');
    leftOperand = '';
    rightOperand = '';
    operator = '';
}

// This function handles the click event for the clear input button.
function clear () {

    console.log('clear input button had been clicked');
    $('#calcInput').val('');
    leftOperand = '';
    rightOperand = '';
    operator = '';
    $('button').prop('disabled', false);
}

// This function gets the latest calculation from the server.
function displayResult () {

    console.log('hello from getLastCalculation()');

    // Get the last calculation results from the /calc route on the server and display it to the DOM.
    $.ajax({
        method: 'GET',
        url: '/calc'
    }).then(response => {
        $('#calcInput').val(response.result);
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
                <li id="calc_${response.indexOf(calculation)}">${calculation.firstOperand} ${calculation.operator} ${calculation.secondOperand}</li>`);
        }
    }).catch(error => {
        alert(error);
    });
}

// This function clears the history on the server and updates the history display.
function clearHistory () {
    
    console.log('hello from clearHistory()');

    $.ajax({
        method: 'DELETE',
        url: '/history'
    }).then(response => {
        updateHistory();
    }).catch(error => {
        alert(error);
    });
}