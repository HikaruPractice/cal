let history_formal = [];
let history_stack = [];
let history_Ans = [];

function button_history(_n){
    return document.getElementById('history').getElementsByTagName('button')[1+_n];
}

function saveResulet(){
    history_formal.unshift(formal);
    history_stack.unshift(stack);
    history_Ans.unshift(Ans);
    //6個以上の履歴を消す処理はまだ入れてない
    
    //アニメーションを付ける前に文字を消す
    //変更前の文字ごとワープしないように
    for (i=0;i<5;i++){
        button_history(i).innerText = '';
        }
    //要素をワープさせる
    button_history(0).classList.add('disappear');
    for (i=1;i<5;i++){
        button_history(i).classList.add('warp');
    }
    //中身を書き換える
    for (i=0;i<5;i++){
        if (typeof(history_formal[i]) === 'string'){
        button_history(i).innerText = history_formal[i] + '=\n' + history_Ans[i];
        }
    }
    //アニメーションさせる
    button_history(0).classList.add('appear');
    for (i=1;i<5;i++){
        button_history(i).classList.add('move');
    }
}



function useHistory(_n){

            //計算後初回入力で数式を消す
            if (KeyO === 'Enter') {
                button_history(0).classList.remove('disappear','appear');
                for (i=1;i<5;i++){
                    button_history(i).classList.remove('warp','move');
                }
            }

    //計算式入力して=押した後に復帰
    if(KeyO === 'Number' || KeyO=== 'LeftBracket'){
        inpN = history_Ans[_n].toString();
        result.textContent = inpN;
        KeyO ='Number';
    }else if(KeyO === 'Operator'){
        pushStack(inpO);
        inpN = history_Ans[_n].toString();
        result.textContent = inpN;
        KeyO ='Number';
    }else if (KeyO === 'RightBracket'){
            pushStack('×');
                inpN = history_Ans[_n].toString();
            result.textContent = inpN;
            KeyO ='Number';
    }else if(KeyO === '' || KeyO === 'Enter'){
        formal = history_formal[_n];
        Ans = history_Ans[_n];
        stack = history_stack[_n];
        input.value = formal + '=';
        result.textContent = Ans;
        signModeSw(false);
        button_back.disabled = false;
        KeyO = 'Enter';
    }
    f_dot = /^./.test(inpN);
    buttonDisableSetting();
    operatorSelectedReset();
}