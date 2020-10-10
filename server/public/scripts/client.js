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
    }).catch(error => {
        alert(error);
    });
}

// This function handles the click event for the clear input button
function clear () {

    console.log('clear input button had been clicked');
}