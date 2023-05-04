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
                    operand1 += key.value;
                } else {
                    operand2 += key.value;
                }
                break;
            case ".":
                console.log(key.value);
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
                        operand1 = operate(operator, operand1, operand2);
                        operator = key.value;
                        operand2 = "";
                    }
                }
                break;
            case "=":
                if (operand2) {
                    operand1 = operate(operator, operand1, operand2);
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

    const newDisplayValue = operand2 ? operand2 : operand1;
    updateDisplay(newDisplayValue);
}

// Testing code
