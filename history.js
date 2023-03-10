let history_formal = [];
let history_stack = [];
let history_Ans = [];

function button_history(_n){
    return document.getElementById('history').getElementsByTagName('button')[_n];
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
        button_history(i).innerText = history_formal[i] + '=\n' + history_Ans[i];
    }
    //アニメーションさせる
    button_history(0).classList.add('appear');
    for (i=1;i<5;i++){
        button_history(i).classList.add('move');
    }
}



function useHistory(_n){

    //計算式入力して=押した後に復帰
    pushButton('C');
    stack = history_stack[_n];
    formal = history_formal[_n];
    input.value = formal + '=';
    Ans = history_Ans[_n];
    result.textContent = Ans;
    button_back.disabled = false;
    KeyO = 'Enter';
}