const display = document.querySelector(".result");
let currentInput = "0";
let operator = null;
let previousInput = "";

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = this.innerText;

    if (isNumber(value)) {
      handleNumber(value);
    } else if (isOperator(value)) {
      handleOperator(value);
    } else if (value === "AC") {
      clear();
    } else if (value === "=") {
      calculate();
    } else if (value === ",") {
      addDecimal();
    }

    updateDisplay();
  });
});

function isNumber(value) {
  return !isNaN(value);
}

function isOperator(value) {
  return ["+", "-", "×", "÷"].includes(value);
}

function handleNumber(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
}

function handleOperator(op) {
  if (operator) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      currentInput = (prev + current).toString();
      break;
    case "-":
      currentInput = (prev - current).toString();
      break;
    case "×":
      currentInput = (prev * current).toString();
      break;
    case "÷":
      currentInput = (prev / current).toString();
      break;
  }

  operator = null;
  previousInput = "";
}

function clear() {
  currentInput = "0";
  operator = null;
  previousInput = "";
}

function addDecimal() {
  if (!currentInput.includes(",")) {
    currentInput += ",";
  }
}

function updateDisplay() {
  display.innerText = currentInput;
}
