let inpN = '';
let inpO = '';
let stack = [];
let formal = '';
let brackets = 0;
let KeyN = '';
let KeyO = '';
let f_dot = false;
let KariResult = 0;
let Ans = 0;
let result;
let input;
let rightParenthesis;
let f_manualInput = false;
let Enters = 1;

const pattern_Numbers = /^[\d\.]$/;
const pattern_Operators = /^[\+\-\*\/＋‐×÷]$/;
const pattern_Signs = /^[\+\-＋‐]$/;
const pattern_LeftBracket = /^\($/;
const pattern_RightBracket = /^\)$/;
const pattern_Enter = /^\=$/;
const pattern_Clear = /^[cC]$/;
const pattern_Others = /^[^\d\.\+\-\*\/＋‐×÷\(\)\=]$/

window.onload = () => {
    result = document.getElementById('result');
    input = document.getElementById('input');

    memoryOut = document.getElementById('memory');

    rightParenthesis = document.getElementById('button_right');
    rightParenthesis.disabled = true;
    button_back = document.getElementById('button_back');
    document.addEventListener('keypress', getKeyboardValue);
    document.getElementById('manual').addEventListener('focus', () => {
        f_manualInput = true;

    });
    document.getElementById('manual').addEventListener('blur', () => {
        f_manualInput = false;
    });

    button_plus = document.getElementById('button_plus');
    button_minus = document.getElementById('button_minus');
    button_times = document.getElementById('button_times');
    button_divided = document.getElementById('button_divided');
    signModeSw(true);
    button_dot = document.getElementById('button_dot');



}



function debugout() {
    // console.log(stack);
    // console.log(formal);
    // console.log(input.value);
    // console.log(result.textContent);
}


function reset() {
    inpN = '';
    inpO = '';
    stack = [];
    formal = '';
    brackets = 0;
    f_dot = false;
    KariResult = 0;
    Enters = 1;
}

function operatorSelectedReset() {
    button_plus.classList.remove('operator_selected');
    button_minus.classList.remove('operator_selected');
    button_times.classList.remove('operator_selected');
    button_divided.classList.remove('operator_selected');
}
function operatorSelected(_v) {
    switch (_v) {
        case '+':
        case '＋':
            button_plus.classList.add('operator_selected');
            break;
        case '-':
        case '‐':
            button_minus.classList.add('operator_selected');
            break;
        case '*':
        case '×':
            button_times.classList.add('operator_selected');
            break;
        case '/':
        case '÷':
            button_divided.classList.add('operator_selected');
    }
}

function calAni() {

    result.classList.add('ani');
    window.setTimeout(() => {
        result.classList.remove('ani');
    }, 100);
}

function buttonDisableSetting() {
    //「)」可否判定
    if (KeyO === 'Operator' || KeyO === 'LeftBracket' || KeyO === 'Sign') {
        rightParenthesis.disabled = true;
    } else {
        rightParenthesis.disabled = (brackets === 0);
    }
    //符号モード判定
    if (KeyO === '' || KeyO === 'LeftBracket' || KeyO === 'Sign') {
        signModeSw(true);
    } else {
        signModeSw(false);
    }
    button_dot.disabled = f_dot;
}
function signModeSw(b) {
    button_times.disabled = b;
    button_divided.disabled = b;
}

function pushButton(_v) {
    console.log('push:' + _v);
    //場合分けの設定
    button_back.disabled = false;
    operatorSelectedReset();
    if (pattern_Numbers.test(_v)) {
        KeyN = 'Number';
    } else if (pattern_Operators.test(_v)) {
        KeyN = 'Operator';
    } else if (pattern_LeftBracket.test(_v)) {
        KeyN = 'LeftBracket';
    } else if (pattern_RightBracket.test(_v)) {
        KeyN = 'RightBracket';
    } else if (pattern_Enter.test(_v)) {
        KeyN = 'Enter';
    } else if (pattern_Clear.test(_v)) {
        KeyN = 'Clear';
    } else if (pattern_Others.test(_v)) {
        KeyN = 'Other';
    }

    //計算後初回入力で数式を消す
    if (KeyO === 'Enter') {
        if (KeyN === 'Enter') {

        } else {
            reset();
        }
    }

    if (KeyN === 'Clear') {
        reset();
        KeyN = '';
        KeyO = '';
        input.value = '';
        result.textContent = '0';

        button_back.disabled = false;

    } else if (KeyN === 'Other') {
        return;
    } else {

        //数字以外が入力されたらドットモード解除
        if (KeyN === 'Number') { }
        else {
            f_dot = false;
            inpN = Number(inpN).toString();
        }

        //直前が数字かドットの時
        if (KeyO === 'Number') {
            if (KeyN === 'Number') {
                if (_v === '.') {
                    if (f_dot) {
                        //異常入力
                        return;
                    } else {
                        f_dot = true;
                    }
                }
                inpN += _v;
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                pushStack(inpN);
                inpO = _v;
                input.value = formal + _v;
                operatorSelected(_v);
                Kari_Cal();
            } else if (KeyN === 'LeftBracket') {
                pushStack(inpN);
                Kari_Cal();
                pushStack('×');
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                pushStack(inpN);
                pushStack(')');
                brackets--;
                Kari_Cal();
            } else if (KeyN === 'Enter') {
                pushStack(inpN);
                main_Cal();
            }
            //直前が演算子の時
        } else if (KeyO === 'Operator') {
            if (KeyN === 'Number') {
                pushStack(inpO);
                if (_v === '.') {
                    inpN = '0.';
                    f_dot = true;
                } else {
                    inpN = _v;
                }
                result.textContent = inpN;

            } else if (KeyN === 'Operator') {
                inpO = _v;
                input.value = formal + _v;
                operatorSelected(_v);
            } else if (KeyN === 'LeftBracket') {
                pushStack(inpO);
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                pushStack(inpO);
                pushStack(KariResult);
                Kari_Cal();
            } else if (KeyN === 'Enter') {
                pushStack(inpO);
                pushStack(KariResult);
                main_Cal();
            }

        } else if (KeyO === 'LeftBracket') {

            if (KeyN === 'Number') {
                if (_v === '.') {
                    inpN = '0.';
                    f_dot = true;
                } else {
                    inpN = _v;
                }
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                if (pattern_Signs.test(_v)) {
                    KeyN = 'Sign';
                    inpN = _v;
                    result.textContent = inpN;
                } else {
                    //異常入力
                    return;
                }
            } else if (KeyN === 'LeftBracket') {
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                //異常入力
                return;
            } else if (KeyN === 'Enter') {
                //異常入力
                return;
            }
        } else if (KeyO === 'RightBracket') {
            if (KeyN === 'Number') {
                pushStack('×');
                if (_v === '.') {
                    inpN = '0.';
                    f_dot = true;
                } else {
                    inpN = _v;
                }
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                inpO = _v;
                input.value = formal + _v;
                operatorSelected(_v);
            } else if (KeyN === 'LeftBracket') {
                pushStack('×');
                pushStack('(');
                brackets++;

            } else if (KeyN === 'RightBracket') {
                pushStack(')');
                brackets--;
            } else if (KeyN === 'Enter') {
                main_Cal();
            }

            //初期状態のとき
        } else if (KeyO === '') {
            if (KeyN === 'Number') {
                if (_v === '.') {
                    inpN = '0.';
                    f_dot = true;
                } else {
                    inpN = _v;
                }
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                if (pattern_Signs.test(_v)) {
                    KeyN = 'Sign';
                    inpN = _v;
                    pushStack('(');
                    brackets++;
                    result.textContent = inpN;
                } else {
                    //異常入力
                    return;
                }
            } else if (KeyN === 'LeftBracket') {
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                //異常入力
                return;
            } else if (KeyN === 'Enter') {
                inpN = Ans.toString();
                f_dot = /\./.test(inpN);
                input.value = Ans + '=';
                result.textContent = Ans;
                KeyN = 'Number';
            }
        } else if (KeyO === 'Enter') {
            if (KeyN === 'Number') {
                input.value = '';
                if (_v === '.') {
                    inpN = '0.';
                    f_dot = true;
                } else {
                    inpN = _v;
                }
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                pushStack(Ans);
                inpO = _v;
                input.value = formal + _v;
                operatorSelected(_v);
                Kari_Cal();

            } else if (KeyN === 'LeftBracket') {
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                //異常入力
                return;
            //=連続入力で繰り返し計算
            } else if (KeyN === 'Enter') {
                Enters++;
                switch (inpO) {
                    case '+':
                    case '＋':
                        input.value = formal + '×' + Enters + '=';
                        Ans = Number(result.textContent) + Number(stack[stack.length - 1]);
                        break;
                    case '-':
                    case '‐':

                        input.value = formal + '×' + Enters + '=';
                        Ans = Number(result.textContent) - Number(stack[stack.length - 1]);
                        break;
                    case '×':
                    case '*':

                        input.value = formal + '^' + Enters + '=';
                        Ans = Number(result.textContent) * Number(stack[stack.length - 1]);
                        break;
                    case '/':
                    case '÷':
                        input.value = formal + '^' + Enters + '=';
                        Ans = Number(result.textContent) / Number(stack[stack.length - 1]);
                        break;
                }
                Ans = Math.round(Ans*100000)/100000;
                result.textContent = Ans;
                calAni() ;
            }
        } else if (KeyO === 'Sign') {
            if (KeyN === 'Number') {
                if (_v === '.') {
                    inpN += '0.';
                    f_dot = true;
                } else {
                    inpN += _v;
                }
                result.textContent = inpN;
            } else if (KeyN === 'Operator') {
                if (pattern_Signs.test(_v)) {
                    KeyN = 'Sign';
                    inpN = _v;
                    result.textContent = inpN;
                } else {
                    //異常入力
                    return;
                }
            } else if (KeyN === 'LeftBracket') {
                if (inpN === '-') {
                    pushStack('-1');
                    Kari_Cal();
                    pushStack('×');
                } else if (inpN === '+') {
                    result.textContent = KariResult;
                }
                pushStack('(');
                brackets++;
            } else if (KeyN === 'RightBracket') {
                //異常入力
                return;
            } else if (KeyN === 'Enter') {
                //異常入力
                return;
            }
        }
        KeyO = KeyN;
    }
    buttonDisableSetting();
    debugout();
}

function back() {
    console.log('push:Back');
    operatorSelectedReset();



    let temp;
    let type;

    if (KeyO === 'Number' || KeyO === 'Sign') {
        inpN = '';
        result.textContent = '';
        temp = stack.pop();
        type = ptnch(temp);
        switch (type) {
            case 'Operator':
                formal = formal.slice(0, -1);
                inpO = temp;
                KeyO = 'Operator';
                operatorSelected(temp);
                break;
            case 'LeftBracket':
                stack.push('(');
                KeyO = 'LeftBracket';
                break;
            case '':
                button_back.disabled = true;
                KeyO = '';
        }
    } else if (KeyO === 'Operator') {
        temp = stack.pop();
        type = ptnch(temp);
        switch (type) {
            case 'Number':
                formal = formal.slice(0, -temp.length);
                inpN = temp;
                result.textContent = temp;
                KeyO = 'Number';
                break;
            case 'RightBracket':
                stack.push(')');
                KeyO = 'RightBracket';

        }
        input.value = formal;
    } else if (KeyO === 'LeftBracket') {
        stack.pop();
        brackets--;
        rightParenthesis.disabled = (brackets === 0);
        temp = stack.pop();
        type = ptnch(temp);
        switch (type) {
            case 'Operator':
                formal = formal.slice(0, -2);
                inpO = temp;
                input.value = formal + temp;
                KeyO = 'Operator';
                operatorSelected(temp);
                break;
            case 'LeftBracket':
                stack.push('(');
                formal = formal.slice(0, -1);
                input.value = formal;
                KeyO = 'LeftBracket';
                break;
            case '':
                formal = formal.slice(0, -1);
                input.value = formal;
                KeyO = '';
                button_back.disabled = true;
        }
    } else if (KeyO === 'RightBracket') {
        stack.pop();
        brackets++;
        rightParenthesis.disabled = false;
        temp = stack.pop();
        type = ptnch(temp);
        switch (type) {
            case 'Number':
                formal = formal.slice(0, -(temp.length + 1));
                inpN = temp;
                input.value = formal;
                result.textContent = temp;
                KeyO = 'Number';
                break;
            case 'RightBracket':
                stack.push(')');
                formal = formal.slice(0, -1);
                input.value = formal;
                KeyO = 'RightBracket';

        }
    } else if (KeyO === 'Enter') {
        temp = stack.pop();
        type = ptnch(temp);
        switch (type) {
            case 'Number':
                formal = formal.slice(0, -temp.length);
                inpN = temp;
                input.value = formal;
                result.textContent = temp;
                KeyO = 'Number';
                break;
            case 'RightBracket':
                input.value = formal;
                stack.push(')');
                KeyO = 'RightBracket';

        }
    }
    f_dot = /\./.test(inpN);
    buttonDisableSetting();
    debugout();
}
function ptnch(temp) {
    if (temp == null) {
        return ""
    }
    let type;
    let tempsample = temp.slice(0, 1);
    if (!isNaN(temp)) {
        type = 'Number';
    } else if (pattern_Operators.test(tempsample)) {
        type = 'Operator';
    } else if (pattern_LeftBracket.test(tempsample)) {
        type = 'LeftBracket';
    } else if (pattern_RightBracket.test(tempsample)) {
        type = 'RightBracket';
    } else if (pattern_Enter.test(tempsample)) {
        type = 'Enter';
    } else if (pattern_Clear.test(tempsample)) {
        type = 'Clear';
    } else if (pattern_Others.test(tempsample)) {
        type = 'Other';
    }
    return type;
}

function pushStack(st) {
    if (st === '') {
        st = 0;
    }
    formal += st;
    stack.push(st);
    input.value = formal;
}


//改修前の計算機
//計算式の文字列を引数とする
function Kari_Cal() {
    KariResult = Calculation(stack);
    result.textContent = KariResult;
}

function main_Cal() {
    for (let i = 1; i <= brackets; i++) {
        input.value += ')';
        stack.push(')');
    }
    formal = input.value;
    brackets = 0;
    Ans = Calculation(stack);

    saveResulet();

    input.value += '=';
    result.textContent = Ans;
    calAni();
}

function manualDo() {
    let st = document.getElementById('manual').value;
    let len = st.length;
    pushButton('C');
    for (let i = 1; i <= len; i++) {
        pushButton(st.slice(0, 1));
        st = st.slice(1);
    }
    pushButton('=');


}

function Calculation(st) {
    let rtn = 0;
    let rp = st.slice();
    let max = rp.length;
    //キーに応じてstackに入れるときはその文字列のまま処理
    //計算するとき(ここ)に適切な中身に変換した新しい配列を作る
    for (let i = 0; i < max; i++) {
        switch (rp[i]) {
            case '×':
                rp[i] = '*';
                break;
            case '÷':
                rp[i] = '/';
                break;
            default:
                if (/[\d\.]+/.test(rp[i])) {
                    rp[i] = Number(rp[i]);
                }
        }
    }

    for (let i = 1; i <= brackets; i++) {
        rp.push(')');
    }
    rtn = ReversePolishCalculator(ReversePolishConverter(rp));

    return rtn;
}
function ReversePolishCalculator(inp) {
    var len = inp.length
    var inpRev = inp.reverse();
    var stack = new Array();
    var popInp;
    for (i = 0; i < len; i++) {
        popInp = inpRev.pop();
        switch (typeof (popInp)) {
            case 'string':
                popB = stack.pop()
                popA = stack.pop()
                switch (popInp) {
                    case '+':
                        stack.push(popA + popB);
                        break;
                    case '-':
                        stack.push(popA - popB);
                        break;
                    case '*':
                        stack.push(popA * popB);
                        break;
                    case '/':
                        stack.push(popA / popB);
                        break;
                    default:
                        //演算子以外の文字列を無視するために原状回復
                        stack.push(popB);
                        stack.push(popA);
                }
                break;
            case 'number':
                //数値の場合
                stack.push(popInp);
        }
    }
    return Math.round(stack.pop() * 100000) / 100000;
}
function ReversePolishConverter(inp) {
    var len = inp.length;
    var inpRev = inp.reverse();
    var OpeStack = new Array();
    var OutStack = new Array();
    var popA;
    for (let i = 1; i <= len; i++) {
        popA = inpRev.pop();
        switch (typeof (popA)) {
            case 'number':
                OutStack.push(popA);
                break;
            case 'string':
                if (/^[\*\/]$/.test(popA)) {
                    if (/^[\*\/]$/.test(OpeStack[OpeStack.length - 1])) {
                        OutStack.push(OpeStack.pop());
                    }
                    OpeStack.push(popA);
                } else if (/^[\+\-]$/.test(popA)) {
                    while (OpeStack.length > 0) {
                        if ('(' == OpeStack[OpeStack.length - 1]) {
                            break;
                        }
                        OutStack.push(OpeStack.pop());
                    }
                    OpeStack.push(popA);
                } else if ('(' == popA) {
                    OpeStack.push(popA);
                } else if (')' == popA) {
                    while (OpeStack.length > 0) {
                        if ('(' == OpeStack[OpeStack.length - 1]) {
                            OpeStack.pop();
                            break;
                        }
                        OutStack.push(OpeStack.pop());
                    }
                }

        }
    }
    while (OpeStack.length > 0) {
        OutStack.push(OpeStack.pop());
    }
    return OutStack;
}

// 同じ動作をキーボードの[1]キーが入力されたときに実行したい
function getKeyboardValue(e) {
    if (f_manualInput) {

        if (e.key === 'Enter') {
            manualDo();
        }
    } else {
        switch (e.key) { // 入力されたキーを判断
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '+':
            case '-':
            case 'C':
            case '(':
            case ')':
                pushButton(e.key);
                break;
            case 'c':
                pushButton('C');
                break;
            case ';':
            case '＋':
                pushButton('+');
                break;
            case '－':
                pushButton('-');
                break;
            case '/':
                pushButton('÷');
                break;
            case '*':
            case ':':
                pushButton('×');
                break;
            case 'Enter':
                pushButton('=');
                break;
            case 'Delete':
                pushButton('C');
                break;
        }
    }
}