let currentOperator, numberOne, numberTwo, switched, values;
const buttons = document.querySelector('.buttons');
const operationArray = document.querySelectorAll('.operator');
const numberArray = document.querySelectorAll('.number');
const OPERATION_SELECTORS = {
    btnDivide: document.querySelector('.slash'),
    btnDelete: document.querySelector('.del'),
    btnSubstract: document.querySelector('.substract'),
    btnEqual: document.querySelector('.equal'),
    btnAdd: document.querySelector('.add'),
    btnSqrt: document.querySelector('.sqrt'),
    btnClear: document.querySelector('.clear'),
    btnRemainder: document.querySelector('.rem'),
    btnMultiply: document.querySelector('.multiply')
}
const DISPLAY_SELECTORS = {
    dispCurrent: document.querySelector('.numbers'),
    dispOutcome: document.querySelector('.outcome')
}
let init = (function () {
    clear();
    currentOperator = '';
    numberOne = '';
    numberTwo = '';
    switched = false;
    numberArr = Array.from(numberArray); //since numberArray is a nodelist
    operationArr = Array.from(operationArray);
    buttons.onclick = function(event) {
        let target = event.target;
        let inside = target.classList.contains('button-inside');
        if (inside) {
            target = event.target.parentElement;
            if(target.classList.contains('number')) {
                if(switched) {
                    numberTwo += target.getAttribute('data-value');
                    update(numberTwo)
                } else {
                    numberOne += target.getAttribute('data-value');
                    update(numberOne)
                }
            } else if(target.classList.contains('operator')) {
                checkButtonPress(target);
            }
        } else {
            if(target.classList.contains('number')) {
                if(switched) {
                    numberTwo += target.getAttribute('data-value');
                    update(numberTwo)
                } else {
                    numberOne += target.getAttribute('data-value');
                    update(numberOne)
                }
            } else if(target.classList.contains('operator')) {
                checkButtonPress(target);
            }
        }
    }
    OPERATION_SELECTORS.btnEqual.addEventListener('click', operate);
    
})();
function operate(op, a, b) {
    console.log('should operate');
}
function update(x) {
    DISPLAY_SELECTORS.dispCurrent.textContent = x;
}
function clear() {
    numberOne = '';
    numberTwo = '';
    DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    DISPLAY_SELECTORS.dispOutcome.textContent = '0';
    switched = false;
}
function checkButtonPress(trg) {
    if(trg.getAttribute('data-value') === 'clear') {
        clear();
    } else if(trg.getAttribute('data-value') === 'multiply') {
        str = numberOne;
        switched = true;
    }
}