//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호 < 유저번호 Down!
//유저번호 < 랜덤번호 Up!
//Reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다

let RandomNum = 0
let chances = 5
let history = []

let PlayButton = document.getElementById("play-button")
let UserInput = document.querySelector("#user-input")
let ResultArea = document.getElementById("result-area")
let ResetButton = document.getElementById("reset-button")
let ChanceArea = document.getElementById("chance-area")
let InputFocus = document.querySelector(".input-focus")

PlayButton.addEventListener("click",play)
ResetButton.addEventListener("click",reset)
InputFocus.addEventListener("focus",focus)

function PickRandomNum(){
    RandomNum = Math.floor(Math.random()*100)+1
    console.log("정답",RandomNum)
}
PickRandomNum()
function play(){
    let UserValue = UserInput.value
    if(UserValue<1 || 100<UserValue){
        ResultArea.textContent = "1과 100사이의 숫자만 입력해 주세요"
        return 
    }
    if(history.includes(UserValue)){
        ResultArea.textContent = "이미 입력한 숫자입니다, 다른 숫자를 입력해 주세요"
        return
    }
    chances--
    ChanceArea.textContent = `남은 기회 : ${chances}번`
    if(UserValue<RandomNum){
        ResultArea.textContent = "Up!"
    }else if(UserValue>RandomNum){
        ResultArea.textContent = "Down!"    
    }else{
        ResultArea.textContent = "정답!"
        PlayButton.disabled = true
    }
    history.push(UserValue)
    console.log(history)
    if(chances<1){
        PlayButton.disabled = true
    }
}
function reset(){
    UserInput.value = ""
    PickRandomNum()
    PlayButton.disabled = false
    ResultArea.textContent = "결과"
    chances = 5
    ChanceArea.textContent = `남은 기회 : ${chances}번`
    history.splice(UserInput.value)
    console.log(history)
}
function focus(){
    UserInput.value = ""
}