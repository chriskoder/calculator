let currentOperator, currentOperatorValue, numberOne, numberTwo, switched, e;
const buttons = document.querySelector('.buttons');
const operationArray = document.querySelectorAll('.operator');
const numberArray = document.querySelectorAll('.number');
const OPERATION_SELECTORS = {
    btnDivide: document.querySelector('.slash'),
    btnDelete: document.querySelector('.del'),
    btnSubstract: document.querySelector('.substract'),
    btnEqual: document.querySelector('.equal'),
    btnAdd: document.querySelector('.add'),
    btnPow: document.querySelector('.pow'),
    btnClear: document.querySelector('.clear'),
    btnRemainder: document.querySelector('.rem'),
    btnMultiply: document.querySelector('.multiply')
}
const DISPLAY_SELECTORS = {
    dispPrevious: document.querySelector('.workwith'),
    dispCurrent: document.querySelector('.numbers'),
    dispOutcome: document.querySelector('.outcome')
}
allClear = () => {
    numberOne = '';
    numberTwo = '';
    currentOperator = '';
    e = '';
    switched = false;
    DISPLAY_SELECTORS.dispPrevious.textContent = '0';
    DISPLAY_SELECTORS.dispCurrent.textContent = '0';
    DISPLAY_SELECTORS.dispOutcome.textContent = '0';
}
handleButtonClicks = () => {
    buttons.onclick = function(event) {
        let target = event.target;
        let inside = target.classList.contains('button-inside');
        if(inside) {
            target = event.target.parentElement;
            if (target.classList.contains('number')) {
                if(e === '') {
                    if(!switched) {
                        numberOne += target.getAttribute('data-value');
                    } else {
                        numberTwo += target.getAttribute('data-value');
                    }
                } else {
                    allClear();
                    numberOne += target.getAttribute('data-value');
                }
            } else if (target.classList.contains('operator')) {
                if(target.getAttribute('data-value') != 'clear' && target.getAttribute('data-value') != 'del') {
                    if(e === '') {
                        currentOperator = target.getAttribute('data-value');
                        getOperatorByName();
                        switched = true;
                    } else {
                        if(e != 'Math error') {
                            currentOperator = target.getAttribute('data-value');
                            getOperatorByName();
                            numberOne = e;
                            e = '';
                            numberTwo = '';
                            DISPLAY_SELECTORS.dispOutcome.textContent = '0'; 
                        }
                    }
                }  else if(target.getAttribute('data-value') === 'del') {
                    deleteLast();
                } else if (target.getAttribute('data-value') === 'clear') {
                    allClear();
                }
            }
        } else {
            if (target.classList.contains('number')) {
                if(e == '') {
                    if(!switched) {
                        numberOne += target.getAttribute('data-value');
                    } else {
                        numberTwo += target.getAttribute('data-value');
                    }
                } else {
                    allClear();
                    numberOne += target.getAttribute('data-value');
                }
            } else if (target.classList.contains('operator')) {
                if(target.getAttribute('data-value') != 'clear' && target.getAttribute('data-value') != 'del') {
                    if(e === '') {
                        currentOperator = target.getAttribute('data-value');
                        getOperatorByName();
                        switched = true;
                    } else {
                        if(e != 'Math error') {
                            currentOperator = target.getAttribute('data-value');
                            getOperatorByName();
                            numberOne = e;
                            e = '';
                            numberTwo = '';
                            DISPLAY_SELECTORS.dispOutcome.textContent = '0'; 
                        }
                    }
                } else if(target.getAttribute('data-value') === 'del') {
                    deleteLast();
                } else if (target.getAttribute('data-value') === 'clear') {
                    allClear();
                }
            }
        }
        render();
    }
}
render = () => {
    if(currentOperator != 'equal') {
        if(!switched) {
            if(numberOne == '') {
                DISPLAY_SELECTORS.dispCurrent.textContent = '0'; 
                numberOne = '';
            } else {
                DISPLAY_SELECTORS.dispCurrent.textContent = numberOne; 
            
            }
        } else {
            if(numberOne != '') {
                DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + ' ' + currentOperatorValue;

                if(numberTwo != '') {
                    DISPLAY_SELECTORS.dispCurrent.textContent = numberTwo;
                } else {
                    DISPLAY_SELECTORS.dispCurrent.textContent = '0';
                }
            } else {
                numberOne = '0';
            }
        }
    }
}
getOperatorByName = () => {
    if(currentOperator === 'substract') {
        currentOperatorValue = '-';
    } else if (currentOperator === 'add') {
        currentOperatorValue =  '+';
    } else if (currentOperator === 'divide') {
        currentOperatorValue =  '÷';
    } else if (currentOperator === 'multiply') {
        currentOperatorValue =  'x';
    } else if (currentOperator === 'rem') {
        currentOperatorValue =  '%';
    } else if (currentOperator === 'pow') {
        currentOperatorValue =  '^';
    } else if (currentOperator === 'equal') {
        DISPLAY_SELECTORS.dispOutcome.textContent = '= ' + operate(numberOne, numberTwo, currentOperatorValue);
    }
    DISPLAY_SELECTORS.dispPrevious.textContent = numberOne + ' ' + currentOperatorValue;
    if(numberOne === '') {
        DISPLAY_SELECTORS.dispPrevious.textContent = '0' + ' ' + currentOperatorValue;
    }
}
operate = (a, b, op) => {
    if(DISPLAY_SELECTORS.dispCurrent.textContent === '0') {
        b = 0;
    }
    if(op === '-') {
        e  = parseFloat(a) - parseFloat(b);
    } else if (op === '+') {
        e = parseFloat(a) + parseFloat(b);
    } else if (op === '÷') {
        if(b != 0) {
            e = parseFloat(a) / parseFloat(b);
        } else {
            e = 'Math error'
            return e;
        }
    } else if (op === 'x') {
        e = parseFloat(a) * parseFloat(b);
    } else if (op === '%') {
        e = parseFloat(a) % parseFloat(b);
    } else if (op === '^') {
        e = Math.pow(parseFloat(a), parseFloat(b));
    }
    switched = false;
    return e.toFixed(2);
}
deleteLast = () => {
    if(!switched) {
        numberOne = numberOne.slice(0, -1);
    } else {
        numberTwo = numberTwo.slice(0, -1);
    }
}
init = (() => {
    e = '';
    allClear();
    handleButtonClicks();
})();