var mul = 0;
var err = 0;
window.onload = function() {
    let gameCircles = document.querySelectorAll('.gameCircle');

    gameCircles.forEach(gameCircle => {
        gameCircle.addEventListener('click', function() {
            const speed = parseInt(gameCircle.getAttribute('data-speed'));
            const targetSize = parseInt(gameCircle.getAttribute('data-targetSize'));
            const failMessage = gameCircle.getAttribute('data-failMessage');

            // Open a new window for the mini-game.
            const miniGameWindow = window.open('mini-game.html', '_blank', 'width=800,height=600');
            
            miniGameWindow.onload = function() {
                // Set up the mini game using the parameters from the main game
                miniGameWindow.startGame(speed, targetSize);
            };
        });

        let randomTop = (window.innerHeight * 0.35) + (Math.random() * (window.innerHeight * 0.55));
        let randomLeft = Math.random() * (window.innerWidth * 0.6);

        gameCircle.style.top = randomTop + 'px';
        gameCircle.style.left = randomLeft + 'px';
    });
}

document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        gameCircles.forEach(gameCircle => {
            const failMessage = gameCircle.getAttribute('data-failMessage');
            checkGameResult(failMessage);
        });
    }
});

function receiveConstantFromChild(valueToSend) {
    console.log("받은 상수 값: " + valueToSend);
    // 변수 값을 가져와서 HTML 요소에 삽입
    document.getElementById("output").innerText = valueToSend;
    if(valueToSend == 1){
        mul+=1;
        document.getElementById("mul_output").innerText = mul;
        if (mul === 5) {
            // 변수 값이 5일 때 특정 HTML 페이지 호출
            window.location.href = 'end_success.html';
        }
    }
    else if(valueToSend == -1){
        err+=1;
        document.getElementById("err_output").innerText = err;
        if (err === 5) {
            // 변수 값이 5일 때 특정 HTML 페이지 호출
            window.location.href = 'end_fail.html';
        }
    }
  }

 