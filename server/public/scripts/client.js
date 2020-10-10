console.log('client.js has been loaded');
$(onReady)

function onReady () {

    console.log('jquery.js has been loaded');
    
    $('#calculate').on('click', calculate);
}

// This function takes handles the click event for the calculate button.
function calculate () {
    
    console.log('calculate button has been clicked');
}