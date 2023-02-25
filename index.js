let stack = [];
let hr = 1;
let hr_div = false; 
let f_cal = true;
let f_ope = false;
let f_dot = false;
let f_rightB = false;
let brackets = 0;

window.onload = ()=>{
    var result =  document.getElementById('result');
    var input = document.getElementById('input');
    document.addEventListener('keypress', getKeyboardValue);
}

function append(_v){
    if (f_cal){
        input.value = '';
        result.textContent = _v;
        f_cal = false
    }else{
        if (f_ope){
            result.textContent=_v;
        }else{
            result.textContent += _v;
        }
    }
    f_ope = false
}

function dot(){
    if (f_cal){
        input.value = '';
        result.textContent = '0.';
        f_cal = false
    }else{
        if (f_ope){
            result.textContent='0.';
        }else if(!f_dot){ 
            result.textContent += '.';
        }
    }
    f_dot = true
    f_ope = false
}

function ope(_v){
    if (f_cal){
        input.value = result.textContent + _v;
        f_cal = false
    }else{
        if ( f_ope){
            return;
            input.value = input.value.replace(/[\+\-×÷]$/,_v);
        }else{
            if(f_dot){
            result.textContent = result.textContent.replace(/\.$/,'');
            }
            input.value += result.textContent + _v;
        }
    }
    if ('×' == _v){
        if (hr_div){
            hr /= Number(result.textContent);
        }else{
            hr *= Number(result.textContent);
        }
        result.textContent = hr;
        hr_div = false;
    } else if ('÷' == _v){
        if (hr_div){
            hr /= Number(result.textContent);
        }else{
            hr *= Number(result.textContent);
        }
        result.textContent = hr;
        hr_div = true;
    } else if (/^[\+\-]$/.test(_v)){
        hr =1;
        let tempst = input.value + '0';
        if(brackets > 0){
            let tempst_search = tempst.lastIndexOf('(');
            tempst = tempst.substring(tempst_search);
            tempst = tempst + ')'
        }
        result.textContent =  cal_RPC(tempst);
        hr_div = false;
    }
    f_ope = true;
    f_dot = false;
}

function leftB(){
    if (f_cal){
        input.value = '(';
        f_cal = false
    }else{
        if (f_ope){
            input.value += '(';
        }else{
            if(f_dot){
            result.textContent = result.textContent.replace(/.$/,'');
            }
            input.value += result.textContent + '×(';
        }
        result.textContent=0;
    }
    f_ope = true;
    f_dot = false;
    brackets++;
}
function rightB(){
    if (brackets == 0){
        return;
    }

    if(f_dot){
        result.textContent = result.textContent.replace(/.$/,'');
    }
    if(!f_rightB){
        input.value += result.textContent;
    }
    input.value += ')';

    let tempst = input.value;
    tempst_search = tempst.lastIndexOf('(');
    tempst = tempst.substring(tempst_search);
    result.textContent =  cal_RPC(tempst);

    f_ope = true;
    f_dot = false;
    brackets--;
    f_rightB=true;
}

function clr(){
    input.value='';
    result.textContent='0';
    f_ope = false;
    f_cal = true;
    f_dot = false;
    brackets = 0;
    hr = 1;
    hr_div = false;
}
function cal(){
    if (f_cal){
        input.value = result.textContent + '=';
    }else{
        if(!f_rightB){
            input.value += result.textContent ;
        } 
        for(let i = brackets;i >= 1;i--){
            input.value += ')';
        }    
        result.textContent=cal_RPC(input.value);

        input.value += '=';
        f_ope = false;
        f_cal = true;
        f_dot = false;
        brackets = 0;
        hr = 1;
        hr = 1;
        hr_div = false;
        result.classList.add('ani');
    }
}

function cal_RPC(st){
    let rp = st;
    rp = rp.replace(/×/g,'*');
    rp = rp.replace(/÷/g,'/');
    return ReversePolishCalculator(ReversePolishConverter(rp));
}

function pushButton(_v){
    result.classList.remove('ani');
    if (f_rightB){
        if (/^\d$/.test(_v)){
            input.value += '×';
            append(_v);
        }else if('.' == _v){
            input.value += '×';
            dot();
        }else if(/^[\+\-×÷]$/.test(_v)){
            input.value += _v;
        }else if('(' == _v){
            input.value += '×';
            leftB();
        }else if (')' == _v){
            rightB();
            return;
        }else if('=' === _v){
            cal();
        }else if('C' === _v){
            clr();
        }
        f_rightB = false
    }else{
        if (/^\d$/.test(_v)){
            append(_v);
        }else if('.' == _v){
            dot();
        }else if(/^[\+\-×÷]$/.test(_v)){
            ope(_v);
        }else if('(' == _v){
            leftB();
        }else if (')' == _v){
            rightB();
        }else if('=' === _v){
            cal();
        }else if('C' === _v){
            clr();
        }
    }
}


function ReversePolishCalculator(inp){
    var len = inp.length
    var stack=[];
    var tempnum=0;
    var ch;
    var popA;
    var popB;
    var ope;
    for(let i = 1;i<=len;i++){
        ch = inp.slice(0,1);
        inp=inp.slice(1);
        if(/^\d$/.test(ch)){
            tempnum = tempnum*10+Number(ch);
            ope = 0;
        }else if(/^[\+\-\*\/]$/.test(ch)){
            popB = stack.pop()
            popA = stack.pop()
            switch (ch){
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
            }
            ope = 1;
        }else{
            if (ope == 0){
                stack.push(tempnum);
                tempnum=0
            }   
        }
    }
    return stack.pop()
}
function ReversePolishConverter(inp){
    var len = inp.length
    var stack=[];
    var tempnum=0;
    var output="";
    var ope=0;
    var ch;
    var popA;
    for(let i = 1;i<=len;i++){
        ch = inp.slice(0,1);
        inp=inp.slice(1);
        if(/^\d$/.test(ch)){
            tempnum = tempnum*10+Number(ch);
            ope=0
        }else if(/^[\+\-\*\/]$/.test(ch)){
            if (ope==0){
            output+= tempnum.toString() + ',';
            tempnum=0;
            }
            if(/^[\*\/]$/.test(ch)){
                if(/^[\*\/]$/.test(stack[stack.length-1])){
                    output+= stack.pop() + ',';
                }
            }else if(/^[\+\-]$/.test(ch)){
                while (stack.length > 0){
                    if('(' == stack[stack.length-1]){
                        break;
                    }
                    output+= stack.pop() + ',';
                }
            }
            stack.push(ch);
            ope=1
        }else if ('(' == ch || ')' == ch){
            if ('(' == ch){
                stack.push(ch);
            }else if (')' == ch){
                if (ope==0){
                    output+= tempnum.toString() + ',';
                    tempnum=0;
                    }
                while (stack.length > 0){
                    if('(' == stack[stack.length-1]){
                        stack.pop();
                        break;
                    }
                    output+= stack.pop() + ',';
                }
            }
            ope=1
        }
    }
    if (ope==0){
        output+= tempnum.toString() + ',';
        tempnum=0;
        }
    while (stack.length > 0){
        output+=stack.pop()+','
    }
    return output;
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
        pushButton('c');
        break;
  }

}