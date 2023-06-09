// function for adding 2 values
function add(x, y) {
    x = new Decimal(x);
    y = new Decimal(y);
    return x.plus(y);
}

// function for subracting 2 values
function subtract(x, y) {
    x = new Decimal(x);
    y = new Decimal(y);
    return x.minus(y);
}

// function for multiplying 2 values
function multiply(x, y) {
    x = new Decimal(x);
    y = new Decimal(y);
    return x.times(y);
}
// function for dividing 2 values
function divide(x, y) {
    x = new Decimal(x);
    y = new Decimal(y);
    return x.dividedBy(y);
}

// variables for storing the operation values
let operand1 = "";
let operator = "";
let operand2 = "";
let result = "";

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
        case "*":
            result = multiply(x, y);
            break;
        case "/":
            if (y === "0") {
                result = "OOPS!";
            } else {
                result = divide(x, y);
            }
            break;
        default:
            result = "ERROR";
    }

    return result.toString();
}

// function for populating the display
let display = document.getElementsByClassName("display")[0];
updateDisplay();

function updateDisplay(value) {
    if (!value) {
        value = "0";
    }
    display.textContent = value;
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
    const hasError = display.textContent === "ERROR" || display.textContent === "TOO BIG" || display.textContent === "OOPS!";
    
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
            if (!result && !hasError) {
                if (!operator) {
                    if (operand1 === "0") {
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
            }
            break;
        case ".":
            if (!result && !hasError) {
                if (!operator) {
                    if (!operand1) {
                        operand1 = "0.";
                    } else {
                        if (!operand1.includes(".") && digitsAvailable(operand1) > 0) {
                            operand1 += ".";
                        }
                    }
                } else {
                    if (!operand2) {
                        operand2 = "0.";
                    } else {
                        if (!operand2.includes(".")  && digitsAvailable(operand2) > 0) {
                            operand2 += ".";
                        }
                    }
                }
            }
            break;
        case "+":
        case "-":    
        case "*":
        case "/":
            if (!hasError) {
                if (result) {
                    operand1 = result;
                    result = "";
                }
                if (operand1) {
                    if (!operand2) {
                        if(operand1.endsWith(".")) {
                            operand1 = operand1.substring(0, operand1.length - 1);
                        }
                        operator = key.value;
                    } else {
                        operand1 = operate(operator, operand1, operand2);
                        operator = key.value;
                        operand2 = "";
                    }
                }
            }
            break;
        case "=":
            if (operand2 && !hasError) {
                result = operate(operator, operand1, operand2);
                operand1 = "";
                operator = "";
                operand2 = "";
            }
            break;
        case "clear":
            operand1 = "0";
            operator = "";
            operand2 = "";
            result = "";
            break;
        case "backspace":
            if (!result && !hasError) {
                if (operand1) {
                    if(operand2) {
                        operand2 = operand2.slice(0, -1);
                    } else {
                        if(!operator) {
                            operand1 = operand1.slice(0, -1);
                        }
                    }
                }
            }
            break;
    }

    let newDisplayValue = result ? result : 
                        operand2 ? operand2 : operand1;

    if (digitsAvailable(newDisplayValue) < 0) {
        newDisplayValue = fitInDisplay(newDisplayValue);
    }

    updateDisplay(newDisplayValue);
}

// funtion for checking how many digits an operand has left before reaching the maximum length of 8 digits.
const MAX_DIGITS = 8;
function digitsAvailable(number) {
    return MAX_DIGITS - number.toString().replace(/[.]/g, "").length;
}

// function for adapting a big result for fitting in the calculator display
function fitInDisplay(value) {
    if (value % 1 != 0) {
        const integer = value.split(".", 1)[0];
        let freeDigits = digitsAvailable(integer);
        freeDigits = freeDigits < 0 ? 8 : freeDigits;
        value = Number.parseFloat(value).toFixed(freeDigits) * 1;
    } else {
        value = Number.parseInt(value).toExponential();
    }

    if (digitsAvailable(value) < 0) {
        value = "TOO BIG";
    }
    
    return value;
}

// add keyboard support
document.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    try {
        const button = document.getElementById(ev.key);
        button.click();
        button.classList.add("active");
    } catch (error) {
        console.warn("Not a key on the calculator.");
    }
});

document.addEventListener("keyup", (ev) => {
    ev.preventDefault();
    try {
        const button = document.getElementById(ev.key);
        button.classList.remove("active");
    } catch (ev) {}
});

// TO DO:
//  1. Refactor and improve code 

// Testing code