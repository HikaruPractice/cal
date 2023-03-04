let inpN = '';
let inpO = '';
let stack =[];
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

window.onload = ()=>{
    result =  document.getElementById('result');
    input = document.getElementById('input');
    rightParenthesis = document.getElementById('button_right');
    rightParenthesis.disabled = true; 
    document.addEventListener('keypress', getKeyboardValue);


}

function reset(){
    inpN = '';
    inpO = '';
    stack =[];
    formal = '';
    brackets = 0;
    f_dot = false;
    KariResult = 0;
}



function pushButton(_v){
    KeyN = _v;
    //計算後初回入力で数式を消す
    if ('C' === KeyN){
        reset();
        KeyN = '';
        KeyO = '';
        input.value = '';
        result.textContent = '0';
    }else{
        //直前が数字かドットの時
        if (/^[\d\.]$/.test(KeyO)){
            if (/^[\d\.]$/.test(KeyN)){
                inpN += KeyN;
                result.textContent = inpN;
            }else if(/^[\+\-×÷\*\/]$/.test(KeyN)){
                pushStack(inpN);
                inpO = KeyN;
                input.value = formal + KeyN;
                Kari_Cal();
            }else if('(' === KeyN){
    
            }else if(')' === KeyN){
                pushStack(inpN);
                pushStack(')');
                brackets--;
                Kari_Cal();
            }else if ('=' === KeyN){
                pushStack(inpN);
                main_Cal();
            }
        //直前が演算子の時
        }else if(/^[\+\-×÷\*\/]$/.test(KeyO)){
            if (/^[\d\.]$/.test(KeyN)){
                pushStack(inpO);
                inpO = '';
                inpN = KeyN;
                result.textContent = inpN;

            }else if(/^[\+\-×÷\*\/]$/.test(KeyN)){
                inpO = KeyN;
                input.value = formal + KeyN;
            }else if('(' === KeyN){
                pushStack(inpO);
                pushStack('(');
                brackets++;
            }else if(')' === KeyN){
    
            }else if ('=' === KeyN){
                pushStack(inpO);
                pushStack(KariResult);
                main_Cal();
            }

        }else if('(' === KeyO){

            if (/^[\d\.]$/.test(KeyN)){
                inpN = KeyN;
                result.textContent = inpN;
            }else if(/^[\+\-×÷\*\/]$/.test(KeyN)){
    
            }else if('(' === KeyN){
                pushStack('(');
                brackets++;
            }else if(')' === KeyN){
    
            }else if ('=' === KeyN){
                
            }
        }else if(')' === KeyO){
            if (/^[\d\.]$/.test(KeyN)){
            

            }else if(/^[\+\-×÷\*\/]$/.test(KeyN)){
                inpO = KeyN;
                input.value = formal + KeyN;
            }else if('(' === KeyN){
    
            }else if(')' === KeyN){
                pushStack(')');
                brackets--;
            }else if ('=' === KeyN){
                main_Cal();
            }

        //初期状態のとき
        }else if(/^\={0,1}$/.test(KeyO)){
            input.value = '';
            if (/^[\d\.]$/.test(KeyN)){
                inpN = KeyN;
                result.textContent = inpN;
            }else if(/^[\+\-×÷\*\/]$/.test(KeyN)){
                inpN = Ans;
                pushStack(inpN);
                inpO = KeyN;
                input.value = formal + KeyN;
                Kari_Cal();
            }else if('(' === KeyN){
                pushStack('(');
                brackets++;
            }else if(')' === KeyN){
    
            }else if ('=' === KeyN){
                inpN = Ans;
                input.value = Ans + '=';
                result.textContent = Ans;
            }
        //計算実行後
        }
        KeyO = KeyN;
    }
    rightParenthesis.disabled = (brackets === 0);
}

function pushStack(st){
    formal += st;
    stack.push(st);
    input.value = formal;
}


//改修前の計算機
//計算式の文字列を引数とする
function Kari_Cal(){
    KariResult = Calculation(stack);
    result.textContent = KariResult;
}

function main_Cal(){
    for (let i = 1;i <= brackets;i++){
        input.value+=')';
        stack.push(')');
    }
    brackets = 0;
    Ans = Calculation(stack);

    input.value+='=';
    result.textContent = Ans;
    reset();
}

function manualDo(){
    let st = document.getElementById('manual').value;
    let arr = new Array();
    let len = st.length;
    pushButton('C');
    for (let i=1;i<=len;i++){
        pushButton(st.slice(0,1));
        st=st.slice(1);
    }
    pushButton('=');
}

function Calculation(st){
    let rtn = 0;
    let rp = st.slice();
    let max = rp.length;
    //キーに応じてstackに入れるときはその文字列のまま処理
    //計算するとき(ここ)に適切な中身に変換した新しい配列を作る
    for (let i = 0;i <max;i++ ){
        switch (rp[i]){
            case '×':
            rp[i] = '*';
            break;
            case '÷':
            rp[i] = '/';
            break;
            default:
            if (/[\d\.]+/.test(rp[i])){
                rp[i] = Number(rp[i]);
            }
        }
    }
    
    for (let i = 1;i <= brackets;i++){
        rp.push(')');
    }
    rtn = ReversePolishCalculator(ReversePolishConverter(rp));

    return rtn;
}
function ReversePolishCalculator(inp){
    var len = inp.length
    var inpRev = inp.reverse();
    var stack=new Array();
    var popInp;
    for (i=0;i<len;i++){
        popInp = inpRev.pop();
        switch(typeof(popInp)){
            case 'string':
            popB = stack.pop()
            popA = stack.pop()
            switch (popInp){
                case '+':
                    stack.push(popA+popB);
                    break;
                case '-':
                    stack.push(popA-popB);
                    break;
                case '*':
                    stack.push(popA*popB);
                    break;
                case '/':
                    stack.push(popA/popB);
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
    return stack.pop()
}
function ReversePolishConverter(inp){
    var len = inp.length;
    var inpRev = inp.reverse();
    var OpeStack=new Array();
    var OutStack=new Array();
    var popA;
    for(let i = 1;i<=len;i++){
        popA = inpRev.pop();
        switch (typeof(popA)){
            case 'number':
                OutStack.push(popA);
                break;
            case 'string':
                if (/^[\*\/]$/.test(popA)){
                    if(/^[\*\/]$/.test(OpeStack[OpeStack.length-1])){
                        OutStack.push(OpeStack.pop());
                    }
                    OpeStack.push(popA);
                }else if(/^[\+\-]$/.test(popA)){
                    while (OpeStack.length > 0){
                        if('(' == OpeStack[OpeStack.length-1]){
                            break;
                        }
                        OutStack.push(OpeStack.pop());
                    }
                    OpeStack.push(popA);
                }else if('(' == popA){
                    OpeStack.push(popA);
                }else if(')' == popA){
                    while (OpeStack.length > 0){
                        if('(' == OpeStack[OpeStack.length-1]){
                            OpeStack.pop();
                            break;
                        }
                        OutStack.push(OpeStack.pop());
                    }
                }
            
        }
    }
    while (OpeStack.length > 0){
        OutStack.push(OpeStack.pop());
    }
    return OutStack;
}

// 同じ動作をキーボードの[1]キーが入力されたときに実行したい
function getKeyboardValue  (e)  {
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
            pushButton('+');
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