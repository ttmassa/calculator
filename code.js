const container = document.querySelector('#container');
const result = document.querySelector('.result');

let currentValue = 0; // Value to append to currentNumber
const currentNumber = document.createElement('p');
currentNumber.innerText = 0; // Value of main number in result's div
currentNumber.classList.add('currentNumber');

const memoryNumber = document.createElement('p');
memoryNumber.classList.add('memoryNumber');


const allNumbers  = Array.from(document.querySelectorAll('.number')); // Array of all button that contains a number

allNumbers.forEach(number => number.addEventListener('click', () => { // Quand un nombre est cliqué
    
    const numberValue = Number(number.innerText); // On récupère le contenue de son texte (sa valeur)
    currentValue = currentValue * 10 + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
    currentNumber.innerText = currentValue; // On donne cette valeur à currentText
    result.appendChild(currentNumber);
}));

const allOperators  = Array.from(document.querySelectorAll('.operator'));

allOperators.forEach(operator => operator.addEventListener('click', () => {
    const operatorSign = operator.getAttribute('data-operator');
    memoryNumber.innerText = currentNumber.innerText + ' ' + operatorSign;
    currentNumber.innerText = 0;
    currentValue = 0;
    result.appendChild(memoryNumber);
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