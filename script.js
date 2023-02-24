
var date = "";
var is_calc = false;   

window.onload = ()=>{
    result = document.getElementById('result');
    debug = document.getElementById('debug');
}

function update( _v ) // input tag を更新する関数
{
    result.value = _v;
}

function append( _v ) // 数字ボタンが押されたので数字を後ろに追加する
{
    result.value  += _v;
}
function debug( _v){

}

function calc() // 「＝」ボタンが押されたので計算する
{
    const v = result.value;
    var s = v;
    var arr=[];
    var sum=0;
    var mlut=1;
    var divi=1;
    var tempnum=0;
    var ch;
    var tempst = v;
    var ope = 0;
    var divisw = 0;
    for (let i = 1 ;i<=v.length;i++){
        ch = tempst.slice(0,1);
        tempst=tempst.slice(1);
        if(ope == 0){
            switch(ch){
                case '*':
                case '/':
                    if(divisw == 0){
                        mlut *= tempnum;
                    }else{
                        divi *= tempnum;
                    }
                    if (ch == '*'){
                        divisw = 0;
                    }else if(ch=='/'){
                        divisw = 1;
                    }
                    tempnum = 0;
                    ope=1;
                    break;
                case '-':
                case '+':
                    
                        
                    if(divisw == 0){
                        mlut = mlut*tempnum;
                    }else{
                        divi= divi*tempnum;
                    }
                    sum=sum+mlut/divi;
                    if (ch=='+'){
                        mlut = 1;
                    }else if(ch=='-'){
                        mlut = -1;
                    }
                    divi = 1;
                    divisw = 0;
                    tempnum = 0;
                    ope=1;
                    break;
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
                    tempnum = tempnum*10 + Number(ch);
                break;
            }
        }else{
            switch(ch){
                case '*':
                case '/':
                    //エラーを出すべき
                    break;
                case '-':
                case '+':
                    if (ch=='+'){
                        //mlut *= 1;
                    }else if(ch=='-'){
                        mlut *= -1;
                    }
                    break;
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
                    tempnum = tempnum*10 + Number(ch);
                    ope=0;
                break;
            }
        }
    }                    
    if(divisw == 0){
        mlut = mlut*tempnum;
    }else{
        divi= divi*tempnum;
    }
    sum+=mlut/divi;
    
    debug.value = sum;
}

//'100+30/5-21/-+7'
//100+30/5-21*7
//-41