let memory = 0;

function memorySet(){
    memory = Number(result.textContent);
    memory = Math.round(memory*100000)/100000;
    memoryOut.textContent = memory;
    memoryAni('memoryAniSet');
    
}
function memoryPlus(){
    memory += Number(result.textContent);
    memory = Math.round(memory*100000)/100000;
    memoryOut.textContent = memory;
    memoryAni('memoryAniPlus');

}
function memoryMinus(){
    memory -= Number(result.textContent);
    memory = Math.round(memory*100000)/100000;
    memoryOut.textContent = memory;
    memoryAni('memoryAniMinus');

}

function useMemory(){
    //計算式入力して=押した後に復帰
    if(KeyO === 'Number' || KeyO=== 'LeftBracket'){
        inpN = memory.toString();
        result.textContent = inpN;
    }else if(KeyO === 'Operator'){
        pushStack(inpO);
        inpN = memory.toString();
        result.textContent = inpN;
    }else if (KeyO === 'RightBracket'){
            pushStack('×');
                inpN = memory.toString();
            result.textContent = inpN;
    }else if(KeyO === '' || KeyO === 'Enter'){
        formal = '';
        stack = [];
        input.value = '';
        inpN = memory;
        result.textContent = inpN;
    }
    KeyO ='Number';
    f_dot = /\./.test(inpN);
    buttonDisableSetting();
    operatorSelectedReset();
}

function memoryAni(className){
    memoryOut.classList.add(className);
    window.setTimeout(()=>{
        memoryOut.classList.remove(className);
    }, 200);
}

