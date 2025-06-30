const resultDisplay = document.querySelector('.result-text');
const buttons = document.querySelectorAll('.btn');

let expression = '';
let openBracket = true;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      expression = '';
      resultDisplay.textContent = '0';
    }

    else if (value === '←') {
      expression = expression.slice(0, -1);
      resultDisplay.textContent = expression || '0';
    }

    else if (value === '=') {
      try {
        // Validate safe characters
        if (!/^[0-9+\-*/().\s]+$/.test(expression)) throw Error("Invalid input");

        // Evaluate expression
        const result = eval(expression);
        resultDisplay.textContent = parseFloat(result.toFixed(10)); // fix float precision
        expression = result.toString(); // allow chaining
      } catch {
        resultDisplay.textContent = 'Error';
        expression = '';
      }
    }

    else if (value === '%') {
      try {
        // convert last number to percent
        const match = expression.match(/(\d+(\.\d+)?)$/);
        if (!match) throw Error();

        const number = match[0];
        const percent = parseFloat(number) / 100;
        expression = expression.slice(0, -number.length) + percent;
        resultDisplay.textContent = expression;
      } catch {
        resultDisplay.textContent = 'Error';
        expression = '';
      }
    }

    else if (value === '( )') {
      expression += openBracket ? '(' : ')';
      openBracket = !openBracket;
      resultDisplay.textContent = expression;
    }

    else {
      expression += value;
      resultDisplay.textContent = expression;
    }
  });
});

// ✅ Optional: Keyboard input support
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    expression += key;
    resultDisplay.textContent = expression;
  }
  else if (key === 'Enter') {
    try {
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) throw Error("Invalid input");
      const result = eval(expression);
      resultDisplay.textContent = parseFloat(result.toFixed(10));
      expression = result.toString();
    } catch {
      resultDisplay.textContent = 'Error';
      expression = '';
    }
  }
  else if (key === 'Backspace') {
    expression = expression.slice(0, -1);
    resultDisplay.textContent = expression || '0';
  }
  else if (key === 'Escape') {
    expression = '';
    resultDisplay.textContent = '0';
  }
});
