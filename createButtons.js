
let Calculator = document.getElementById('Calculator').getElementsByTagName('tbody')[0];
let tr_element_buttons;
let td_element_buttons;
let button;
let Symbols = [
    ['C', '(', ')', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', ''],
]
let SymbolNames = [
    ['CLR', 'left', 'right', 'divided'],
    ['7', '8', '9', 'times'],
    ['4', '5', '6', 'minus'],
    ['1', '2', '3', 'plus'],
    ['0', 'dot', 'Enter', 'dummy'],
]
for (let i = 0; i < Symbols.length; i++) {
    tr_element_buttons = document.createElement('tr');
    for (let j = 0; j < Symbols[0].length; j++) {
        td_element_buttons = document.createElement('td');
        td_element_buttons.id = 'td_' + SymbolNames[i][j];
        button = document.createElement('button');
        button.onclick = event => pushButton(Symbols[i][j]);
        button.id = 'button_' + SymbolNames[i][j];
        button.textContent = Symbols[i][j];
        td_element_buttons.appendChild(button);
        tr_element_buttons.appendChild(td_element_buttons);
    }
    Calculator.appendChild(tr_element_buttons);
}
let td_dummy = document.getElementById('td_dummy');
td_dummy.parentNode.removeChild(td_dummy);
let td_plus = document.getElementById('td_plus');
td_plus.rowSpan = '2';