const bar = document.getElementById('bar');
const circle = document.getElementById('circle');
const targetZone = document.getElementById('targetZone');
const gameResult = document.getElementById('gameResult');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');

let direction = 1;  // 1: 오른쪽, -1: 왼쪽
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

    if (circlePosition < targetRight && circleRight > targetLeft) {
        resultImage.src = 'memory.png';
        resultText.innerText = '게임 클리어!';
        return 'success';
    } else {
        resultImage.src = 'error.png';
        resultText.innerText = currentFailMessage;
        return 'fail';
    }
}

function setTargetSize(size) {
    targetZone.style.width = size + 'px';
    targetZone.style.left = (bar.offsetWidth - size) / 2 + 'px';  // 중앙에 위치시킴
}

function startGame(speed, targetSize, failMessage) { 
    currentFailMessage = failMessage;
    setTargetSize(targetSize);
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
    interval = setInterval(() => moveCircle(speed), 50);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        checkGameResult();
    }
});

document.getElementById('backToMain').addEventListener('click', function() {
    window.close();
});
