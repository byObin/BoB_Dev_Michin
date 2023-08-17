const bar = document.getElementById('bar');
const circle = document.getElementById('circle');
const targetZone = document.getElementById('targetZone');
const gameResult = document.getElementById('gameResult');
const resultImage = document.getElementById('resultImage');
const resultText = document.getElementById('resultText');
const result = document.getElementById('result');

let direction = 1; // 1: 오른쪽, -1: 왼쪽
let interval;
let circlePosition = 0;
let successfulAttempts = 0;
let failAttempts = 0;

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

function successStatus() {
    successfulAttempts += 1;
    const successImages = ["감자_머리.png", "감자_몸통.png", "감자_오눈.png", "감자_왼눈.png", "감자_수염.png"];
  
    if (successfulAttempts <= 5) {
      result.src = successImages[successfulAttempts - 1];
  
      // 성공한 이미지를 Memory.png로 변경
      const memoryImageElement = document.getElementById(`success${successfulAttempts}`);
      memoryImageElement.src = "Memory.png";
    }
  
    if (successfulAttempts === 5) {
      document.getElementById('evolutionBtn').disabled = false;
      document.getElementById('evolutionBtn').classList.remove('disabled-button');
    }
  }
  


  function failStatus() {
    failAttempts += 1;
    if (failAttempts <= 5) {
        document.getElementById(`Error${failAttempts}`).src = "error.png";
        if (failAttempts === 5) {
            document.getElementById('evolutionBtn').disabled = false;
            document.getElementById('evolutionBtn').classList.remove('disabled-button');
          }
      }

  }
  

function checkGameResult() {
    const circleRight = circlePosition + circle.offsetWidth;
    const targetLeft = targetZone.offsetLeft;
    const targetRight = targetLeft + targetZone.offsetWidth;

    clearInterval(interval); // 게임 중지

    gameResult.style.display = 'block'; // 결과 화면 표시 <- 올바른 위치로 옮깁니다.

    if (circlePosition < targetRight && circleRight > targetLeft) {
        successStatus();
        resultImage.src = 'memory.png'; // 성공 이미지의 경로
        resultText.innerText = '게임 클리어!';
        return 'success';  // 성공을 나타내는 문자열 반환
    } else {
        failStatus();
        resultImage.src = 'error.png'; // 실패 이미지의 경로
        resultText.innerText = '게임 실패!';
        return 'fail';  // 실패를 나타내는 문자열 반환
    }
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
    gameResult.style.display = 'none'; // 게임 결과 화면을 숨깁니다.
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