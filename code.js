const container = document.querySelector('#container');
const result = document.querySelector('.result');

let currentValue = 0; // Value to append to currentNumber
let currentNumber = document.createElement('p');
currentNumber.innerText = 0; // Value of main number in result's div
currentNumber.classList.add('currentNumber');

let memoryNumber = document.createElement('p');
memoryNumber.classList.add('memoryNumber');

let isCalcul = 0; // 0 = pas de calcul à faire, 1 = calcul à effectuer.
let isReset = 0;
let operatorSign;


const allNumbers  = Array.from(document.querySelectorAll('.number')); // Array of all button that contains a number

allNumbers.forEach(number => number.addEventListener('click', () => { // Quand un nombre est cliqué  
    reset(); 
    const numberValue = Number(number.innerText); // On récupère le contenue de son texte (sa valeur)
    currentValue = currentValue * 10 + numberValue; //On l'ajoute à currentValue (*10 pour supporter les nombres > 9)
    currentNumber.innerText = currentValue; // On donne cette valeur à currentNumber
    result.appendChild(currentNumber);    
}));

const allOperators  = Array.from(document.querySelectorAll('.operator'));

allOperators.forEach(operator => operator.addEventListener('click', () => {
    
    if (isCalcul === 0) {
        operatorSign = operator.getAttribute('data-operator'); // On récupère le signe de l'opération
        memoryNumber.innerText = currentNumber.innerText + ' ' + operatorSign;
        currentNumber.innerText = 0;
        currentValue = parseInt(currentNumber.innerText); // On convertit la valeur de currentNumber en entier = a
        isCalcul++; // Prochain opérateur cliqué = résultat à afficher donc calcul à faire
        result.appendChild(memoryNumber);
        result.appendChild(currentNumber);    
    } else {
        console.log('YEP'); 
        let previousValue = parseInt(memoryNumber.innerText); // On convertit la valeur de memoryNumber en entier = b
        console.log(operatorSign);
        let finalResult = doTheMath(previousValue, currentValue, operatorSign); // On fait doncle bon calcul de notre ancienne valeur (stocké dans memoryNumber) et l'actuelle (currentValue)
        currentNumber.innerText = finalResult; // On modifie la valeur de currentNumber pour afficher le résultat
        memoryNumber.innerText = previousValue + " " + operatorSign + " " + currentValue + " = " + finalResult; // On remet memoryNumber à 0
        isReset++;
        isCalcul--;
    }    
}));

// FUNCTIONS 

function reset() { // Rénitialise tout texte après un calcul
    if (isReset === 1) {
        currentNumber.innerText = "";
        memoryNumber.innerText = "";
        currentValue = 0;
        isReset--
    }
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

function sum(a, b) {
    a = Number(a);
    b = Number(b);
    console.log(a, b)
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