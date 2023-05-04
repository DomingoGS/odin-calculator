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
function operate(operator, x, y) {
    let result;

    switch(operator) {
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

// function for populating the display
let displayValue = "0";
let display = document.getElementsByClassName("display")[0];
display.textContent = displayValue;

function updateDisplay(value) {
    if (displayValue === "0") {
        displayValue = value;
    } else {
        displayValue += value;
    }

    display.textContent = displayValue;
}

// Add event listener to each key for providing corresponding value
const keys = document.querySelectorAll("button");
keys.forEach(element => {
    element.addEventListener("click", (ev) => {
        ev.target;
    });
});

// function for processing the value of the pressed key


// Testing code
// function log(key) {
//     console.log(key.value);
// }