const bar = document.getElementById('bar');
const circle = document.getElementById('circle');
const targetZone = document.getElementById('targetZone');
const gameResult = document.getElementById('gameResult');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');

let direction = 1; // 1: 오른쪽, -1: 왼쪽
let interval;
let circlePosition = 0;

function moveCircle(speed) {
    circlePosition += (speed * direction);

    if (circlePosition > (bar.offsetWidth - circle.offsetWidth)) {
        circlePosition = bar.offsetWidth - circle.offsetWidth;
        direction *= -1; 
    } else if (circlePosition < 0) {
        circlePosition = 0;
        direction *= -1; 
    }

    circle.style.left = circlePosition + 'px';
}

function checkGameResult() {
    const circleRight = circlePosition + circle.offsetWidth;
    const targetLeft = targetZone.offsetLeft;
    const targetRight = targetLeft + targetZone.offsetWidth;

    clearInterval(interval); // 게임 중지

    if (circlePosition < targetRight && circleRight > targetLeft) {
        resultImage.src = 'memory.png'; // 성공 이미지의 경로
        resultText.innerText = '게임 클리어!';
    } else {
        resultImage.src = 'error.png'; // 실패 이미지의 경로
        resultText.innerText = '게임 실패!';
    }

    gameResult.style.display = 'block'; // 결과 화면 표시
}

function setTargetSize(size) {
    targetZone.style.width = size + 'px';
    targetZone.style.left = (bar.offsetWidth - size) / 2 + 'px'; // 중앙에 위치시킴
}

function startGame(speed, targetSize) {
    setTargetSize(targetSize);
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
    interval = setInterval(() => moveCircle(speed), 50);
}


document.getElementById('mainCircle').addEventListener('click', function() {
    document.getElementById('mainCircle').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    startGame(gameSpeed, targetSize);
});

document.getElementById('backToMain').addEventListener('click', function() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('mainCircle').style.display = 'block';
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
});

document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        checkGameResult();
    }
});

// 게임 시작 속도와 특정 영역의 크기를 설정
const gameSpeed = 10; // 동그라미의 이동 속도
const targetSize = 60; // 특정 영역의 크기
