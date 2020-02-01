let currentOperator, numberOne, numberTwo, switched, values, done;
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
    dispPrevious: document.querySelector('.workwith'),
    dispCurrent: document.querySelector('.numbers'),
    dispOutcome: document.querySelector('.outcome')
}
let init = (function () {
    clear();
    done = 0;
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
                if (done > 0) {
                    checkButtonPress(target);
                    DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
                    console.log('asd');
                } else {
                    checkButtonPress(target);
                }
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
                if (done > 0) {
                    checkButtonPress(target);
                    console.log(target);
                    DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
                } else {
                    checkButtonPress(target);
                }
            }
        }
    }
    OPERATION_SELECTORS.btnEqual.addEventListener('click', function() {
        if (numberTwo != '') {
            e = operate(currentOperator, numberOne, numberTwo);
            DISPLAY_SELECTORS.dispOutcome.textContent = e;
            numberOne = e;
            numberTwo = '';
            currentOperator = '';
            done++;
        } 
    });
    OPERATION_SELECTORS.btnDelete.addEventListener('click', delOne);
})();
function delOne(cur) {
    if(DISPLAY_SELECTORS.dispCurrent.textContent != '0') {
        if(switched) {
            if(numberTwo.length > 1) {
                cur = numberTwo;
                numberTwo = numberTwo.slice(0, -1);
                update(numberTwo);
            } else {
                numberTwo = '';
                update('0');
            }
        } else {
            if(numberOne.length > 1) {
                cur = numberOne;
                numberOne = numberOne.slice(0, -1);
                update(numberOne);
            } else {
                numberOne = '';
                update('0');
            }
        }
    }
}
function operate(op, a, b) {
    op = currentOperator;
    a = parseFloat(numberOne);
    b = parseFloat(numberTwo);
    if (op === 'x') {
        return Math.round((a * b)*1000) / 1000;
    } else if (op === '÷') {
        return Math.round((a / b)*1000) / 1000;
    } else if (op === '+') {
        return Math.round((a + b)*1000) / 1000;
    } else if (op === '-') {
        return Math.round((a - b)*1000) / 1000;
    } else if (op === '%') {
        return Math.round((a % b)*1000) / 1000;
    } else if (op === '√') {
        return Math.sqrt(a); 
    }
}
function update(x) {
    DISPLAY_SELECTORS.dispCurrent.textContent = x;
}
function clear() {
    numberOne = '';
    numberTwo = '';
    DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    DISPLAY_SELECTORS.dispOutcome.textContent = '0';
    DISPLAY_SELECTORS.dispPrevious.textContent = '0';
    switched = false;
}
function checkButtonPress(trg) {
    if(trg.getAttribute('data-value') === 'clear') {
        clear();
    } else if(trg.getAttribute('data-value') === 'multiply') {
        currentOperator = 'x';
        str = numberOne;
        switched = true;
        DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
        DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    } else if(trg.getAttribute('data-value') === 'divide') {
        currentOperator = '÷';
        str = numberOne;
        switched = true;
        DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + '÷';
        DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    } else if(trg.getAttribute('data-value') === 'add') {
        currentOperator = '+';
        str = numberOne;
        switched = true;
        DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
        DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    } else if(trg.getAttribute('data-value') === 'substract') {
        currentOperator = '-';
        str = numberOne;
        switched = true;
        DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
        DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    } else if(trg.getAttribute('data-value') === 'rem') {
        currentOperator = '%';
        str = numberOne;
        switched = true;
        DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + currentOperator;
        DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    } else if(trg.getAttribute('data-value') === 'sqrt') {
        currentOperator = '√';
        switched = true;
        str = numberOne;
        DISPLAY_SELECTORS.dispPrevious.textContent = '√' + numberOne;
        DISPLAY_SELECTORS.dispCurrent.textContent = '√' + numberOne + ' =';
    }
}