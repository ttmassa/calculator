const container = document.querySelector('#container');
const result = document.querySelector('.result');

let currentValue = 0; // Value to append to currentNumber
const currentNumber = document.createElement('p');
currentNumber.classList.add('currentNumber');


const allNumbers  = Array.from(document.querySelectorAll('.number'));

allNumbers.forEach(number => number.addEventListener('click', () => {
    const numberValue = Number(number.innerText);
    currentValue = currentValue * 10 + numberValue;
    currentNumber.innerText = currentValue;
    result.appendChild(currentNumber);
}));

function sum(a, b) {
    return a + b;
}

function difference(a, b) {
    return a - b;
}

function product(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}