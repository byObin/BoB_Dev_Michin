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
        resultImage.src = 'memory.png';  // 성공 이미지의 경로
        resultText.innerText = '게임 클리어!';
        return 'success';  // 성공을 나타내는 문자열 반환
    } else {
        resultImage.src = 'error.png';  // 실패 이미지의 경로
        resultText.innerText = failMessage;  // 실패 메시지로 변경
        return 'fail';  // 실패를 나타내는 문자열 반환
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

window.onload = function() {
    let gameCircles = document.querySelectorAll('.gameCircle');

    gameCircles.forEach(gameCircle => {
        gameCircle.addEventListener('click', function() {
            const speed = parseInt(gameCircle.getAttribute('data-speed'));
            const targetSize = parseInt(gameCircle.getAttribute('data-targetSize'));
            const failMessage = gameCircle.getAttribute('data-failMessage');

            // Open a new window for the mini-game.
            const miniGameWindow = window.open('', '_blank', 'width=800,height=600');
            miniGameWindow.document.write('<!DOCTYPE html><html><head>');
            miniGameWindow.document.write('<title>Mini Game</title>');
            // Add external CSS, JS or any other dependencies if required.
            miniGameWindow.document.write('</head><body>');
            // Here, copy the necessary HTML structure for the game into the new window.
            miniGameWindow.document.write(document.getElementById('gameScreen').outerHTML);
            miniGameWindow.document.write('<script>');
            // Add the game's functions and initializers here.
            miniGameWindow.document.write('let direction = ' + direction + ';');
            miniGameWindow.document.write('let circlePosition = 0;');
            miniGameWindow.document.write(moveCircle.toString());
            miniGameWindow.document.write(checkGameResult.toString());
            miniGameWindow.document.write(setTargetSize.toString());
            miniGameWindow.document.write(startGame.toString());
            miniGameWindow.document.write('</script>');
            miniGameWindow.document.write('</body></html>');
            miniGameWindow.document.close();

            miniGameWindow.onload = function() {
                miniGameWindow.startGame(speed, targetSize);
            };
        });

        let randomTop = (window.innerHeight * 0.35) + (Math.random() * (window.innerHeight * 0.55));
        let randomLeft = Math.random() * (window.innerWidth * 0.6);

        gameCircle.style.top = randomTop + 'px';
        gameCircle.style.left = randomLeft + 'px';
    });

    document.body.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            gameCircles.forEach(gameCircle => {
                const failMessage = gameCircle.getAttribute('data-failMessage');
                checkGameResult(failMessage);
            });
        }
    });
}

document.getElementById('backToMain').addEventListener('click', function() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('gameChoices').style.display = 'block';
    gameResult.style.display = 'none';
    circlePosition = 0;
    circle.style.left = circlePosition + 'px';
});
