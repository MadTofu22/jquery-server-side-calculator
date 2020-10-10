// This module will handle the calculations made by the calculator.
// It takes in an object with 3 properties, left operand, right operand, and operator, from the server.
// The math is then conducted, and a new object of 4 properties, left operand, right operand, operator, and result, is returned to the server.
// Input Ex.
// {
//     leftOperand: 5,
//     rightOperand: 10,
//     operator: '+',
// }

// Output Ex.
// {
//     leftOperand: '5',
//     rightOperand: '10',
//     operator: '+',
//     result: '15'
// }

// This function determines the calculation required based on the input operator, then passes the operands to proper function to conduct the math.
function calculation (mathObj) {
    let resultObj = {};
    let result = null;

    switch (mathObj.operator) {
        case '+':
            result = addition(mathObj.leftOperand, mathObj.rightOperand);
            break;
        case '-':
            result = subtraction(mathObj.leftOperand, mathObj.rightOperand);
            break;
        case '+':
            result = multiplication(mathObj.leftOperand, mathObj.rightOperand);
            break;
        case '+':
            result = division(mathObj.leftOperand, mathObj.rightOperand);
            break;
        default:
            console.log('An invalid operator has gotten to calculation() in calulator.js');
    }
    resultObj = newResultsObj(mathObj, result);
    return resultObj;
}

// This function takes in two numbers and adds them together
function addition (num1, num2) {
    
    return num1 + num2;
}

// This function takes in two numbers and subracts the the right from the left
function subtraction (left, right) {
    
    return left - right;
}

// This functions takes in two numbers and multiplies them together
function multiplication (num1, num2) {

    return num1 * num2;
}

// This function takes in two numbers and divides the left by the right
function division (left, right) {

    return left / right;
}

// This function takes in a math object, with two operand numbers and an operator string, and the result of a mathmematical calculation, then returns a new object with with all 4 properties as strings for DOM displaying.
function newResultsObj (inputObj, result) {

    let newObj = {
        firstOperand: String(inputObj.leftOperand),
        secondOperand: String(inputObj.rightOperand),
        operator: inputObj.operator,
        result: String(result)
    }
    return newObj;
}

module.exports = calculation;