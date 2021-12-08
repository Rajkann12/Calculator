class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement
        this.clear();
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    append(number) {
        if (this.currentOperand.includes(".") && number == ".") return;
        this.currentOperand = this.currentOperand.toString() + number.toString();



    }

    delete() {
        this.currentOperand = this.currentOperand.substr(0, this.currentOperand.length - 1)


    }

    operations(operator) {
        if (this.currentOperand === "" || this.currentOperand[this.currentOperand.length - 1] === ".") return;


        if (this.previousOperand != "") {
            this.compute()
            // this.currentOperand="hello";
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";

    }

    compute() {
        let computation;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);

        if (this.currentOperand == "" || this.previousOperand == "") return;
        switch (this.operator) {

            case "+":
                computation = prev + curr;
                break;

            case "-":
                computation = prev - curr;
                break;

            case "÷":
                computation = prev / curr;
                break;

            case "*":
                computation = prev * curr;
                break;

        }

        this.currentOperand = computation;
        this.previousOperand = "";
        this.operator = undefined;

    }

    getDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operator != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`;
        }
        else { this.previousOperandTextElement.innerText = this.previousOperand; }

    }


}

let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]')
let equalButton = document.querySelector('[data-equals]')
let deleteButton = document.querySelector('[data-delete]')
let allClearButton = document.querySelector('[data-all-clear]')
let currentOperandTextElement = document.querySelector('[data-current-operand]')
let previousOperandTextElement = document.querySelector('[data-previous-operand]')


let calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    // calculator.getDisplay();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationButtons.forEach((element) => element.addEventListener('click', () => {
    calculator.operations(element.innerText);
    calculator.updateDisplay();
    // calculator.getDisplay();  
}))

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})




