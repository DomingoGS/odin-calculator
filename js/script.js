// function for adding 2 values
function add(x, y) {
    return x + y;
}

// function for subracting 2 values
function subtract(x, y) {
    return x - y;
}

// function for multiplying 2 values
function multiply(x, y) {
    return x * y;
}
// function for dividing 2 values
function divide(x, y) {
    return x / y;
}

// variables for storing the operation values
let operand1;
let operator;
let operand2;

// function for managing the operation
function operate(operand, x, y) {
    let result;

    switch(operand) {
        case "+":
            result = add(x, y);
            break;
        case "-":
            result = subtract(x, y);
            break;
        case "x":
            result = multiply(x, y);
            break;
        case "/":
            if (y === 0) {
                result = "OOPS!";
            } else {
                result = divide(x, y);
            }
            break;
        default:
            result = "ERROR";
    }

    return result;
}

// Testing code
