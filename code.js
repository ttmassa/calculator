// DEFAULT VARIABLES

let isCalcul = 0; // 0 = pas de calcul à faire, 1 = calcul à effectuer.
let isReset = 0;
let operatorSign;
let previousOperator;

// SELECTORS
const container = document.querySelector('#container');
const result = document.querySelector('.result');
const ac  = document.querySelector('.ac');
const equals = document.querySelector('.equal');
const del = document.querySelector('.del');

// 
let currentValue = 0; // Value to append to currentNumber
let currentNumber = document.createElement('p');
currentNumber.innerText = 0; // Value of main number in result's div
currentNumber.classList.add('currentNumber');
result.appendChild(currentNumber);

let memoryNumber = document.createElement('p');
memoryNumber.classList.add('memoryNumber');


// EVENT LISTENERS

const allNumbers  = Array.from(document.querySelectorAll('.number')); // Array of all button that contains a number

allNumbers.forEach(number => number.addEventListener('click', () => { // Quand un nombre est cliqué  
    if (isReset === 1) {
        reset();
        isReset--;
    }
    const numberValue = Number(number.innerText); // On récupère le contenue de son texte (sa valeur)
    currentValue = currentValue * 10 + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
    currentNumber.innerText = currentValue; // On donne cette valeur à currentNumber
    result.appendChild(currentNumber);    
}));

const allButtons = Array.from(document.querySelectorAll('button'));

allButtons.forEach(number => number.addEventListener('mouseenter', () => {
    number.classList.remove('button');
    number.classList.add('number-clicked');
}));

allButtons.forEach(number => number.addEventListener('mouseleave', () => {
    number.classList.remove('number-clicked');
    number.classList.add('button');
}));

const allOperators  = Array.from(document.querySelectorAll('.operator'));

allOperators.forEach(operator => operator.addEventListener('click', () => {
    if (isCalcul === 0) {  
        operatorSign = operator.getAttribute('data-operator'); 
        updateDisplay(operatorSign);
        previousOperator = operatorSign;
        console.log(previousOperator);
    } else {
        operatorSign = operator.getAttribute('data-operator');
        previousOperator = performCalculation(previousOperator, operatorSign); // Met à jour previousOperator pour le prochain calcul
    }
}));

ac.addEventListener('click', () => {
    reset();
});

del.addEventListener('click', () => {
    let previousNumber = parseInt(currentNumber.innerText.slice(currentNumber.innerText.length - 1, currentNumber.innerText.length));
    let newCurrentNumber = currentNumber.innerText.slice(0, currentNumber.innerText.length - 1);
    currentNumber.innerText = newCurrentNumber;
    console.log(currentValue);
    console.log(newCurrentNumber);
    currentValue = (currentValue - previousNumber) / 10;
    console.log(currentValue);
});

equals.addEventListener('click', () => {
    displayFinalResult(operatorSign);
});

// FUNCTIONS 

function reset() {
    currentNumber.innerText = 0;
    memoryNumber.innerText = '';
    currentValue = 0;
    isCalcul = 0;
}

function doTheMath(a, b, operator) {
    switch(operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "÷":
            return a / b;
    }
}

function updateDisplay(operator) { //Put the number to the top with its operator 
    memoryNumber.innerText += '' + currentValue + ' ' + operator; // memory affiche le nombre plus l'opérateur
    currentNumber.innerText = 0; // On remet à 0 current
    currentValue = parseInt(currentNumber.innerText); // On convertit la valeur de currentNumber en entier = a
    isCalcul++; // Prochain opérateur cliqué = résultat à afficher donc calcul à faire
    result.appendChild(memoryNumber);
    result.appendChild(currentNumber); 
}

function displayFinalResult(operator) {
    let previousValue = parseInt(memoryNumber.innerText); // On convertit la valeur de memoryNumber en entier = b
    let finalResult = doTheMath(previousValue, currentValue, operatorSign); // On fait donc le bon calcul de notre ancienne valeur (stockée dans memoryNumber) et l'actuelle (currentValue)
    currentNumber.innerText = finalResult; // On modifie la valeur de currentNumber pour afficher le résultat
    memoryNumber.innerText = previousValue + ' ' + operator + ' ' + currentValue + ' = ' + finalResult; // On met à jour la valeur de memoryNumber avec le résultat et l'opérateur de la nouvelle opération
    previousValue = currentValue; // On met à jour la valeur de previousValue avec la nouvelle valeur de currentValue
    currentValue = 0; // On réinitialise la valeur de currentValue pour la nouvelle opération
    isReset++;
    isCalcul++; // On met isCalcul à 1 pour indiquer qu'une nouvelle opération est en cours
    result.appendChild(memoryNumber); // On ajoute memoryNumber à l'affichage
    result.appendChild(currentNumber); // On ajoute currentNumber à l'affichage
}

function performCalculation(previousOperator, operator) {
    console.log('CALLED!');
    let tValue = memoryNumber.innerText.split(' ');
    let beforeValue  = parseInt(tValue[0]); 
    memoryNumber.innerText = '';
    let result = doTheMath(beforeValue, currentValue, previousOperator);
    memoryNumber.innerText += result + ' ' + operator;
    previousOperator = operator; // Met à jour previousOperator avec le nouvelle opérateur
    currentValue = 0;
    currentNumber.innerText = '';
    return previousOperator; // On doit retourner previousOperator puisqu'on en aura besoin dans le forEach Operator
}
