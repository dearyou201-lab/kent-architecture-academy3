let player = {
    name: "",
    house: "",
    creativity: 0,
    structure: 0,
    law: 0,
    communication: 0
};

const scenes = [

{
    speaker:"Narrator",
    text:"ここは魔法が存在する世界。"
},

{
    speaker:"Narrator",
    text:"建築は、人々の願いを形にする魔法だった。"
},

{
    speaker:"エレノア",
    text:"ようこそ。"
},

{
    speaker:"エレノア",
    text:"ケント建築学院へ。"
},

{
    speaker:"エレノア",
    text:"この学院には The Living Blueprint と呼ばれる生きた設計図があります。"
},

{
    speaker:"エレノア",
    text:"建築魔導士は卒業の日、自らの設計図をここへ刻みます。"
}

];

let currentScene = -1;
let gameStarted = false;

const speakerName =
    document.getElementById("speaker-name");

const messageText =
    document.getElementById("message-text");

const nextButton =
    document.getElementById("next-button");

nextButton.addEventListener(
    "click",
    nextScene
);

function nextScene() {

    if(!gameStarted){

        const inputName =
            prompt("名前を入力してください");

        player.name =
            inputName || "新入生";
            updateStatus();

        gameStarted = true;
    }

    currentScene++;

if(currentScene >= scenes.length){

    startQuiz();

    return;
}

    const scene =
        scenes[currentScene];

    speakerName.textContent =
        scene.speaker;

    messageText.textContent =
        scene.text;
}
const quizQuestions = [
{
    question: "古びた橋を調査する。最初に確認するのは？",
    answers: [
        ["美しさ","creativity"],
        ["安全性","structure"],
        ["法規","law"],
        ["利用者","communication"]
    ]
},
{
    question: "課題提出は明日。まず何をする？",
    answers: [
        ["アイデアを考える","creativity"],
        ["完成を優先する","structure"],
        ["条件を確認する","law"],
        ["先輩に相談する","communication"]
    ]
}

,{
    question: "ドラゴン伯爵から依頼が来た。最も気になるのは？",
    answers: [
        ["どんな建物を望んでいるか","creativity"],
        ["建物が崩れないか","structure"],
        ["法規的に問題ないか","law"],
        ["依頼主と信頼関係を築けるか","communication"]
    ]
}

,{
    question: "あなたが一番嬉しい瞬間は？",
    answers: [
        ["完成した建物を見て感動される","creativity"],
        ["難しい構造が成立した","structure"],
        ["申請が一発で通った","law"],
        ["施主に感謝された","communication"]
    ]
}

,{
    question: "学長からの質問。『建築とは何だと思うかね？』",
    answers: [
        ["夢を形にするもの","creativity"],
        ["人を守るもの","structure"],
        ["社会を支える仕組み","law"],
        ["人と人を繋ぐもの","communication"]
    ]
}
,{
    question: "夜遅く。フクロウ便が届いた。『打合せ開始10分前ですが修正お願いします』",
    answers: [
        ["美しく修正する","creativity"],
        ["構造を確認する","structure"],
        ["正式な依頼か確認する","law"],
        ["とりあえず相手に連絡する","communication"]
    ]
}
];

let currentQuestion = 0;

function startQuiz(){

    currentQuestion = 0;

    showQuestion();
}

function showQuestion(){

    const question =
        quizQuestions[currentQuestion];

    speakerName.textContent =
        "The Living Blueprint";

    messageText.textContent =
        question.question;

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.textContent =
            answer[0];

        button.onclick = function(){
          
          player[answer[1]]++;

            nextQuestion();
        };

        choices.appendChild(button);
    });

    nextButton.style.display =
        "none";
}

function nextQuestion(){

    currentQuestion++;

if(currentQuestion >= quizQuestions.length){

    showResult();

    return;
}

    showQuestion();
}
function showResult(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "The Living Blueprint";

    messageText.textContent =
        "あなたの所属寮が決定しました。";

    const button =
        document.createElement("button");

    button.textContent =
        "結果を見る";

    button.onclick =
        showHouseResult;

    choices.appendChild(button);
}

function showHouseResult(){
  

let scores = {
    "オーレリア": player.creativity,
    "ストーンフォージ": player.structure,
    "シルバークイル": player.law,
    "ワイルドルート": player.communication
};

let winner = "ワイルドルート";
let maxScore = -1;

for(let house in scores){

    if(scores[house] > maxScore){

        maxScore = scores[house];
        winner = house;
    }
}

player.house = winner;

  updateStatus();

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "The Living Blueprint";

messageText.textContent =
    "あなたは" + player.house +
    "寮に所属します。";

    const button =
        document.createElement("button");

    button.textContent =
        "寮へ向かう";

    button.onclick =
        showDormIntro;

    choices.appendChild(button);
}

function showDormIntro(){
if(player.house === "オーレリア"){

    background.style.backgroundImage =
        'url("bg/aurelia.jpg")';
}
else if(player.house === "ストーンフォージ"){

    background.style.backgroundImage =
        'url("bg/stoneforge.jpg")';
}
else if(player.house === "シルバークイル"){

    background.style.backgroundImage =
        'url("bg/silverquill.jpg")';
}
else{

    background.style.backgroundImage =
        'url("bg/wildroot.jpg")';
}

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

speakerName.textContent =
    player.house + "寮";

if(player.house === "オーレリア"){

    messageText.textContent =
        "創造性と美を追求する芸術家たちの寮です。";
}
else if(player.house === "ストーンフォージ"){

    messageText.textContent =
        "構造と技術を極める職人気質の寮です。";
}
else if(player.house === "シルバークイル"){

    messageText.textContent =
        "知識と研究を愛する学究派の寮です。";
}
else{

    messageText.textContent =
        "自然と人との繋がりを大切にする寮です。";
}

    const button =
        document.createElement("button");

    button.textContent =
        "ライラに会う";

    button.onclick =
        showLyra;

    choices.appendChild(button);
}

function showLyra(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "ライラ";

messageText.textContent =
    "おーい！ " + player.name +
    "やったっけ？ うちはライラ。ワイルドルートへようこそ。";

    const button =
        document.createElement("button");

    button.textContent =
        "話を聞く";

button.onclick =
    showLyraTalk;

    choices.appendChild(button);
}

function showMorning(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "Narrator";

    messageText.textContent =
        "翌朝―― ケント建築学院。";

    const button =
        document.createElement("button");

    button.textContent =
        "授業へ向かう";
        button.onclick =
    showBenchAssignment;

    choices.appendChild(button);
}

function showBenchAssignment(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "教授";

    messageText.textContent =
        "中庭に設置するベンチを設計してください。";

    addBenchChoice(
        "美しいデザインを優先する"
    );

    addBenchChoice(
        "強度を優先する"
    );

    addBenchChoice(
        "利用者を観察する"
    );

    addBenchChoice(
        "条件整理から始める"
    );
}

function addBenchChoice(text){

    const button =
        document.createElement("button");

    button.textContent = text;

    button.onclick =
        showBenchResult;

    document
        .getElementById("choices")
        .appendChild(button);
}

function showBenchResult(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "教授";

    messageText.textContent =
        "悪くありません。建築はまず人や場所を知ることから始まります。";

    const button =
        document.createElement("button");

    button.textContent =
        "講評を聞く";

    button.onclick =
        showBenchReview;

    choices.appendChild(button);
}
function showBenchReview(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "エレノア";

    messageText.textContent =
        "建築に正解はありません。だからこそ面白いのです。";

    const button =
        document.createElement("button");

    button.textContent =
        "寮へ帰る";

    button.onclick =
        showMonth1Ending;

    choices.appendChild(button);
}
function showMonth1Ending(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "ライラ";

    messageText.textContent =
        "な？ 建築おもろいやろ？";

    const button =
        document.createElement("button");

    button.textContent =
        "Month1 Complete";

    button.onclick =
        showMonth1Complete;

    choices.appendChild(button);
}
function showMonth1Complete(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "Month1 Complete";

    messageText.textContent =
        "初めての設計課題を終えた。";

    const button =
        document.createElement("button");

    button.textContent =
        "続く";

    choices.appendChild(button);
}
function updateStatus(){

    const nameElement =
        document.getElementById("player-name");

    const houseElement =
        document.getElementById("player-house");

    if(nameElement){

        nameElement.textContent =
            player.name || "新入生";
    }

    if(houseElement){

        houseElement.textContent =
            player.house || "未所属";
    }
}

function showLyraTalk(){

    const choices =
        document.getElementById("choices");

    choices.innerHTML = "";

    speakerName.textContent =
        "ライラ";

    messageText.textContent =
        "まあ難しいことは明日からや！ 今日はゆっくりしとき！";

    const button =
        document.createElement("button");

    button.textContent =
        "翌朝へ";

    button.onclick =
        showMorning;

    choices.appendChild(button);
}