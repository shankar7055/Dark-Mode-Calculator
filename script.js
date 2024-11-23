// script.js

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '';
let operator = null;
let firstOperand = null;

// Listen for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '.') {
            // Numbers and decimal point
            currentInput += value;
            display.value = currentInput;
        } else if (value === 'C') {
            // Clear everything
            currentInput = '';
            operator = null;
            firstOperand = null;
            display.value = '';
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Operators
            if (currentInput !== '') {
                firstOperand = parseFloat(currentInput);
                operator = value;
                currentInput = '';
                display.value = `${firstOperand} ${operator}`;
            }
        } else if (value === '=') {
            // Calculate result
            const secondOperand = parseFloat(currentInput);
            if (operator && firstOperand !== null && !isNaN(secondOperand)) {
                let result;
                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        result = firstOperand / secondOperand;
                        break;
                }
                display.value = result;
                currentInput = '';
                operator = null;
                firstOperand = null;
            }
        }
    });
});

// Enable keyboard input
document.addEventListener('keydown', event => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        currentInput += key;
        display.value = currentInput;
    } else if (['+', '-', '*', '/'].includes(key)) {
        if (currentInput !== '') {
            firstOperand = parseFloat(currentInput);
            operator = key;
            currentInput = '';
            display.value = `${firstOperand} ${operator}`;
        }
    } else if (key === 'Enter') {
        const secondOperand = parseFloat(currentInput);
        if (operator && firstOperand !== null && !isNaN(secondOperand)) {
            let result;
            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
            }
            display.value = result;
            currentInput = '';
            operator = null;
            firstOperand = null;
        }
    } else if (key === 'Backspace') {
        // Handle backspace
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    } else if (key === 'Escape') {
        // Handle clear (C)
        currentInput = '';
        operator = null;
        firstOperand = null;
        display.value = '';
    }
});
