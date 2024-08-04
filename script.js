document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let firstOperand = null;
    let secondOperand = null;
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            try {
                handleInput(value);
            } catch (error) {
                display.innerText = 'Error';
                currentInput = '';
                firstOperand = null;
                secondOperand = null;
                operator = null;
                console.error(error);
            }
        });
    });

    function handleInput(value) {
        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculateResult();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    }

    function clear() {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        operator = null;
        display.innerText = '0';
    }

    function calculateResult() {
        if (operator && firstOperand !== null) {
            secondOperand = parseFloat(currentInput);
            if (isNaN(secondOperand)) {
                throw new Error('Invalid second operand');
            }
            if (operator === '/' && secondOperand === 0) {
                throw new Error('Division by zero');
            }
            currentInput = '';
            display.innerText = calculate(firstOperand, secondOperand, operator);
            firstOperand = parseFloat(display.innerText);
            operator = null;
        }
    }

    function setOperator(value) {
        if (currentInput !== '') {
            firstOperand = parseFloat(currentInput);
            if (isNaN(firstOperand)) {
                throw new Error('Invalid first operand');
            }
            currentInput = '';
        }
        operator = value;
    }

    function appendNumber(value) {
        currentInput += value;
        display.innerText = currentInput;
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                throw new Error('Unknown operator');
        }
    }
});
