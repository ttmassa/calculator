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
            if (number.innerText === "0" && !currentNumber.innerText.includes(".0")) {
                console.log("CALLED");
                const numberValue = 0; // Récupère un 0
                const decimalIndex = currentNumber.innerText.indexOf("."); // La place de la virgule dans le string
                const decimalLength = currentNumber.innerText.slice(decimalIndex + 1).length; // La longueur de la partie décimale
                let currentValue = Number(currentNumber.innerText).toFixed(1);
                console.log(currentValue);

                if (currentValue < 0) {
                    decimalLength--;
                }

                console.log("NumberValue = " + numberValue);
                let decimalValue = numberValue * Math.pow(10, -decimalLength);
                console.log("decimale value = " + decimalValue);
                currentValue += decimalValue;

            } else {
                numberValue = (Number(number.innerText));
                let decimalLength = (currentNumber.innerText.slice(currentNumber.innerText.indexOf(".").length).length) - 1;

                if (currentValue < 10) {
                    currentValue = currentValue + (numberValue * Math.pow(10, -decimalLength));
                } else if (currentValue >= 10) {
                    currentValue = currentValue + 10 * (numberValue * Math.pow(10, -decimalLength));
                }
            }
        } else {
            numberValue = Number(number.innerText);
            currentValue = currentValue * 10 + numberValue;
        }

        currentNumber.innerText = currentValue;
        result.appendChild(currentNumber); 
    }));
});


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
    removeLastDigit();  
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

function removeLastDigit() {

    if (currentNumber.innerText.includes(".")) {
        // Si le nombre contient un point, on traite la partie décimale et la partie entière séparément
        let decimalIndex = currentNumber.innerText.indexOf(".");
        let integerPart = currentNumber.innerText.slice(0, decimalIndex);
        let decimalPart = currentNumber.innerText.slice(decimalIndex + 1);

        if (decimalPart.length > 1) {
        // S'il y a plus d'un chiffre après le point, on supprime simplement le dernier chiffre
        decimalPart = decimalPart.slice(0, -1);
        } else {
        // S'il n'y a qu'un seul chiffre après le point, on supprime également le point
        decimalPart = "";
        }
  
        let newCurrentNumber = integerPart + (decimalPart ? "." + decimalPart : "");
        currentNumber.innerText = newCurrentNumber;
        currentValue = Number(newCurrentNumber);
    } else {
        // Si le nombre ne contient pas de point, on supprime simplement le dernier chiffre
        let previousNumber = parseInt(currentNumber.innerText.slice(-1));
        let newCurrentNumber = currentNumber.innerText.slice(0, -1);
        currentNumber.innerText = newCurrentNumber;
        currentValue = (currentValue - previousNumber) / 10;
    }
}
  