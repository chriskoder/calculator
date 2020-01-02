let currentOperator, numberOne, numberTwo, switched, values;
const buttons = document.querySelector('.buttons');
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
    currentOperator = '';
    numberOne = '';
    numberTwo = '';
    switched = false;
    numberArr = Array.from(numberArray); //since numberArray is a nodelist
    buttons.onclick = function(event) {
        let target = event.target;
        let inside = target.classList.contains('button-inside');
        if (inside) {
            target = event.target.parentElement;
            let num = target.classList.contains("number");
            let n = target.getAttribute('data-value');
            if (num) {
                if (switched) {
                    numberOne += n;
                } else {
                    numberTwo += n;
                }
            }
        } else {
            let num = target.classList.contains('number');
            if(num) {
                if (switched) {
                    numberOne += n;
                } else {
                    numberTwo += n;
                }
            }
        }
    }
    OPERATION_SELECTORS.btnEqual.addEventListener('click', operate);
})();
function operate(op, a, b) {
    console.log('should operate');
}
