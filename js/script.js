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
let operand1 = "";
let operator = "";
let operand2 = "";

// function for managing the operation
function operate(operator, x, y) {
    let result;
    x = Number(x);
    y = Number(y);

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
    displayValue = value;
    display.textContent = displayValue;
}

// Add event listener to each key for providing corresponding value
const keys = document.querySelectorAll("button");
keys.forEach(element => {
    element.addEventListener("click", (ev) => {
        processKey(ev.target);
    });
});

// function for processing the value of the pressed key
function processKey(key) {
    if (key.className === "btn-digit") {
        switch (key.value) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                if (!operator) {
                    if (operand1 === "0" || operand1 === "ERROR") {
                        operand1 = "";
                    }
                    if (digitsAvailable(operand1) > 0) {
                        operand1 += key.value;
                    }
                } else  {
                    if (digitsAvailable(operand2) > 0) {
                        operand2 += key.value;
                    }
                }
                break;
            case ".":
                if (!operator) {
                    if (!operand1) {
                        operand1 = "0.";
                    } else {
                        if (!operand1.includes(".")) {
                            operand1 += ".";
                        }
                    }
                } else {
                    if (!operand2) {
                        operand2 = "0.";
                    } else {
                        if (!operand2.includes(".")) {
                            operand2 += ".";
                        }
                    }
                }
                break;
        }
    } else if (key.className === "btn-operator") {
        switch (key.value) {
            case "+":
            case "-":    
            case "x":
            case "/":
                if (operand1) {
                    if (!operand2) {
                        operator = key.value;
                    } else {
                        operand1 = operate(operator, operand1, operand2).toString();
                        operator = key.value;
                        operand2 = "";
                    }
                }
                break;
            case "=":
                if (operand2) {
                    operand1 = operate(operator, operand1, operand2).toString();
                    operator = "";
                    operand2 = "";
                }
                break;
        }
    } else if (key.className === "btn-clear") {
        operand1 = "0";
        operator = "";
        operand2 = "";
    }

    let newDisplayValue = operand2 ? operand2 : operand1;

    if (digitsAvailable(newDisplayValue) < 0) {
        newDisplayValue = fitInDisplay(newDisplayValue);
    }

    updateDisplay(newDisplayValue);
}

// funtion for checking how many digits an operand has left before reaching the maximum length of 8 digits.
const MAX_DIGITS = 8;
function digitsAvailable(number) {
    return MAX_DIGITS - number.toString().replace(/[.-]/g, "").length;
}

// function for adapting a big result for fitting in the calculator display
function fitInDisplay(value) {
    if (value % 1 != 0) {
        const integer = value.split(".", 1)[0];
        let freeDigits = digitsAvailable(integer);
        freeDigits = freeDigits < 0 ? freeDigits : 8;
        value = Number.parseFloat(value).toFixed(freeDigits) * 1;
    } else {
        value = Number.parseInt(value).toExponential();
    }

    if (digitsAvailable(value) < 0) {
        value = "TOO BIG";
    }
    
    return value;
}

// TO DO:
//   1. Fix still being able to type decimal when display is at max (8 digits)

// Testing code