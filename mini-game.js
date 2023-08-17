const bar = document.getElementById('bar');
const circle = document.getElementById('circle');
const targetZone = document.getElementById('targetZone');
const gameResult = document.getElementById('gameResult');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');

let direction = 1;  // 1: 오른쪽, -1: 왼쪽
let interval;
let circlePosition = 0;
let currentFailMessage;

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

function checkGameResult(failMessage) {
    const circleRight = circlePosition + circle.offsetWidth;
    const targetLeft = targetZone.offsetLeft;
    const targetRight = targetLeft + targetZone.offsetWidth;

    clearInterval(interval);  // 게임 중지

    gameResult.style.display = 'block';  // 결과 화면 표시

    if (circlePosition < targetRight && circleRight > targetLeft) {
        resultImage.src = '/images/memory.png';
        resultText.innerText = '물리 메모리 획득!';
        return 'success';
    } else {
        resultImage.src = '/images/error.png';
        resultText.innerText = failMessage;
        return 'fail';
    }
}

function setTargetSize(size) {
    targetZone.style.width = size + 'px';
    targetZone.style.left = (bar.offsetWidth - size) / 2 + 'px';  // 중앙에 위치시킴
}

function startGame(speed, targetSize, failMessage) {
    setTargetSize(targetSize);
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
    interval = setInterval(() => moveCircle(speed), 50);
    currentFailMessage = failMessage; // 실패 메시지를 저장합니다.
}

document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        checkGameResult(currentFailMessage); // 저장된 failMessage를 사용합니다.
    }
});
document.getElementById('backToMain').addEventListener('click', function() {
    window.close();
});
