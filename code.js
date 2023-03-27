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
let currentValue = 0; // Valeur à append à currentNumber
let currentNumber = document.createElement('p');
currentNumber.innerText = 0; // Valeur du résultat principal dans le div result
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
            numberValue = (Number(number.innerText)); // On récupère le contenue de son texte (sa valeur)
            let decimalLength = (currentNumber.innerText.slice(currentNumber.innerText.indexOf(".").length).length) - 1; // Nombre de caractères après le point

            if (currentValue < 10) {
                currentValue = currentValue + (numberValue * Math.pow(10, -decimalLength)); //On l'ajoute à currentValue (* Math.pow(10, -decimalLength) pour actualiser la valeur en fonction sa place après la virgule)
            } else if (currentValue >= 10) {
                currentValue = currentValue + 10 * (numberValue * Math.pow(10, -decimalLength));
            }
        } else {
            numberValue = Number(number.innerText);
            currentValue = currentValue * 10 + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
        }
        
        
        currentNumber.innerText = currentValue; // On donne cette valeur à currentNumber
        result.appendChild(currentNumber); 
    }));
});

const allButtons = Array.from(document.querySelectorAll('button'));

allButtons.forEach(button => button.addEventListener("mouseenter", () => {
    let bgButtonColorR = Math.floor(Math.random() * 256);
    let bgButtonColorG = Math.floor(Math.random() * 256);
    let bgButtonColorB = Math.floor(Math.random() * 256);
    button.style.backgroundColor = `rgb(${bgButtonColorR}, ${bgButtonColorG}, ${bgButtonColorB})`;
}));

allButtons.forEach(button => button.addEventListener("mouseleave", () => {
    button.style.backgroundColor = `rgb(237, 224, 249)`;
}));

const allOperators  = Array.from(document.querySelectorAll('.operator'));

allOperators.forEach(operator => operator.addEventListener('click', () => {
    if (isCalcul === 0) {  
        operatorSign = operator.getAttribute('data-operator'); 
        updateDisplay(operatorSign);
        previousOperator = operatorSign;
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
    currentValue = (currentValue - previousNumber) / 10;
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
        case "/":
            return a / b;
    }
}

function updateDisplay(operator) { // Affiche le nombre en haut avec l'opérateur tapé
    memoryNumber.innerText += '' + currentValue + ' ' + operator; // memory affiche le nombre plus l'opérateur
    currentNumber.innerText = 0; // On remet à 0 current
    currentValue = parseFloat(currentNumber.innerText).toFixed(2); // On convertit la valeur de currentNumber en entier = a
    isCalcul++; // Prochain opérateur cliqué = résultat à afficher donc calcul à faire
    result.appendChild(memoryNumber);
    result.appendChild(currentNumber); 
}

function displayFinalResult() {
    let previousValue = parseFloat(memoryNumber.innerText);
    let finalResult = doTheMath(previousValue, currentValue, operatorSign);
    finalResult = parseFloat(finalResult.toFixed(2)); // On arrondit à 2 décimals près
    if (finalResult % 1 === 0) { // Si le résultat est un entier 
        finalResult = finalResult.toString(); // On le convertit en string
    }
    currentNumber.innerText = finalResult;
    memoryNumber.innerText = previousValue + ' ' + operatorSign + ' ' + currentValue + ' = ' + finalResult;
    previousValue = currentValue;
    currentValue = 0;
    isReset++;
    isCalcul++;
    result.appendChild(memoryNumber);
    result.appendChild(currentNumber);

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
    }

}
