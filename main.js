// 랜덤 번호 지정
// 유저가 번호를 입력 그리고 go라는 버튼을 누름
// 만약 유저가 랜덤번호를 맞추면, 맞췄습니다.
// 랜덤번호가 <유저번호 DOWN!!
// 랜덤 번호가 > 유저번호 UP!!
// RESET 버튼을 누르면 게임이 리셋된다
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
// 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 감소시키지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 감소시키지 않는다
let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let resetButton = document.getElementById("reset-button");
let history = [];

let chance = 5;
let gameOver = false;

playButton.addEventListener("click",play); // 여기서 play함수를 매개변수처럼 취급 
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus",function(){userInput.value=""}) // 커서가 올라갔을때 

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    // Math.random(): 0~1 사이의 숫자를 랜덤해서 (0이상 1미만)
    // Math.floor: 소수점버림
    console.log("정답:", computerNum);
}

function play(){
    let userValue = userInput.value;
    // 유효성검사 파트
    if(userValue<1 || userValue>100){
        resultArea.textContent = "1이상 100이하 의 숫자를 입력해주세요."
        return; // 함수를 종료시키는 용도
    }
    if(history.includes(userValue)){
        resultArea.textContent=`${userValue}는 이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.`
        return; // 함수를 종료시키는 용도
    }
    chance -=1;
    chanceArea.textContent = `남은 기회: ${chance}번`; // 동적인 값을 넣고싶으면 백틱 `${} `써야함
    
    if(userValue<computerNum){
        console.log("Up!");
        resultArea.textContent ="UP.!!!"
    }
    else if(userValue>computerNum){
        console.log("Down!");
        resultArea.textContent ="DOWN.!!!"
    }else{
        console.log("맞췄습니다!")
        resultArea.textContent ="맞췄습니다.!!!"
        gameOver = true;
        //playButton.disabled = true;
    }
    if(chance <1){
        gameOver = true;
    }
    if (gameOver ==true){
        playButton.disabled = true;
    }

    history.push(userValue);
}
function reset(){
    // user input 창 비우기 
    // 새로운 번호(정답)지정
    userInput.value ="";
    pickRandomNum()
    resultArea.textContent = "숫자를 입력하세요."
    chance = 5;
    chanceArea.textContent = `남은 기회: ${chance}번`; // 동적인 값을 넣고싶으면 백틱 `${} `써야함
    history = [];
}
pickRandomNum()