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
const coma = document.querySelector('.coma');

// 2 p results
let currentValue = 0; // Value to append to currentNumber
let currentValue2 = 0;
let currentNumber = document.createElement('p');
currentNumber.innerText = 0; // Value of main number in result's div
currentNumber.classList.add('currentNumber');
result.appendChild(currentNumber);

let memoryNumber = document.createElement('p');
memoryNumber.classList.add('memoryNumber');


// EVENT LISTENERS

const allNumbers  = Array.from(document.querySelectorAll('.number')); // Array de tous les boutons qui ont pour classe .number

["click", "keypress"].forEach((event) => {
    allNumbers.forEach(number => number.addEventListener(event, (e) => {
        if (isReset === 1) {
            reset();
            isReset--;
        }

        let numberValue;

        if (currentNumber.innerText.includes(".")) {
            numberValue = (Number(number.innerText)) / 10; // On récupère le contenue de son texte (sa valeur)
            console.log(numberValue);
            currentValue = currentValue + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
        } else {
            numberValue = Number(number.innerText);
            currentValue = currentValue * 10 + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
        }
        
        
        currentNumber.innerText = currentValue; // On donne cette valeur à currentNumber
        result.appendChild(currentNumber); 
    }));
});

function addNumber(evt) {
    console.log('CALLED');
    if (isReset === 1) {
        reset();
        isReset--;
    }

    let numberValue2 = Number(evt.key);
    currentValue2 = 10 * currentValue2 + numberValue2; 
    currentNumber.innerText = currentValue2;

    result.appendChild(currentNumber);
}

document.addEventListener('keydown', addNumber, false);
    

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

function addOperator(evt) {
    if (evt.keyCode === 106 || evt.keyCode === 107 || evt.keyCode === 109 || evt.keyCode === 111) {
        if (isCalcul === 0) {  
            operatorSign = evt.key; 
            updateDisplay(operatorSign);
            previousOperator = operatorSign;
            console.log(previousOperator);
        } else {
            operatorSign = evt.key;
            previousOperator = performCalculation(previousOperator, operatorSign); // Met à jour previousOperator pour le prochain calcul
        }
    }   
}

document.addEventListener('keydown', addOperator, false); 

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

coma.addEventListener('click', () => {
    addDecimalPoint();
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

function updateDisplay(operator) { //Affiche le nombre en haut avec l'opérateur tapé
    memoryNumber.innerText += '' + currentValue + ' ' + operator; // memory affiche le nombre plus l'opérateur
    currentNumber.innerText = 0; // On remet à 0 current
    currentValue = parseFloat(currentNumber.innerText).toFixed(2); // On convertit la valeur de currentNumber en entier = a
    isCalcul++; // Prochain opérateur cliqué = résultat à afficher donc calcul à faire
    result.appendChild(memoryNumber);
    result.appendChild(currentNumber); 
}

function displayFinalResult(operator) {
    let previousValue = parseFloat(memoryNumber.innerText); // On convertit la valeur de memoryNumber en entier = b
    let finalResult = doTheMath(previousValue, currentValue, operatorSign).toFixed(2); // On fait donc le bon calcul de notre ancienne valeur (stockée dans memoryNumber) et l'actuelle (currentValue)
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
    let tValue = memoryNumber.innerText.split(' ');
    let beforeValue  = parseFloat(tValue[0]); 
    memoryNumber.innerText = '';
    let result = doTheMath(beforeValue, currentValue, previousOperator);
    memoryNumber.innerText += result + ' ' + operator;
    previousOperator = operator; // Met à jour previousOperator avec le nouvelle opérateur
    currentValue = 0;
    currentNumber.innerText = '';
    return previousOperator; // On doit retourner previousOperator puisqu'on en aura besoin dans le forEach Operator
}

function addDecimalPoint() {
    
    if (currentNumber.innerText.includes('.')) { // Empêche d'avoir 2 virgules dans le même nombre
        return currentNumber.innerText;
    } else {
        currentNumber.innerText += '.';
        console.log(currentValue);
    }

}
