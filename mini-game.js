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

function checkGameResult(failMessage) {
    const circleRight = circlePosition + circle.offsetWidth;
    const targetLeft = targetZone.offsetLeft;
    const targetRight = targetLeft + targetZone.offsetWidth;

    clearInterval(interval);  // 게임 중지

    gameResult.style.display = 'block';  // 결과 화면 표시

    if (circlePosition < targetRight && circleRight > targetLeft) {
        resultImage.src = '/images/memory.png';
        resultText.innerText = '게임 클리어!';
        const valueToSend = 1;
         // 부모 창의 함수를 호출하여 상수 값 전달
        window.opener.receiveConstantFromChild(valueToSend);
        return 'success';
    } else {
        resultImage.src = '/images/error.png';
        resultText.innerText = failMessage;
        const valueToSend = -1;
        window.opener.receiveConstantFromChild(valueToSend);
        return 'fail';
    }
}

function setTargetSize(size) {
    targetZone.style.width = size + 'px';
    targetZone.style.left = (bar.offsetWidth - size) / 2 + 'px';  // 중앙에 위치시킴
}

function startGame(speed, targetSize) {
    setTargetSize(targetSize);
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
    interval = setInterval(() => moveCircle(speed), 50);
}
document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        checkGameResult("게임 종료!");
    }
});
document.getElementById('backToMain').addEventListener('click', function() {
    window.close();
});
