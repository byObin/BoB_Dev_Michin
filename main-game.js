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
                miniGameWindow.startGame(speed, targetSize, failMessage);
            };

            // Remove the clicked gameCircle from the DOM after launching the mini-game
            gameCircle.remove();
        });

        let randomTop = (window.innerHeight * 0.35) + (Math.random() * (window.innerHeight * 0.55));
        let randomLeft = Math.random() * (window.innerWidth * 0.6);

        gameCircle.style.top = randomTop + 'px';
        gameCircle.style.left = randomLeft + 'px';
    });
}

document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        gameCircles = document.querySelectorAll('.gameCircle');  // Update gameCircles to get the current list after some might have been removed.
        gameCircles.forEach(gameCircle => {
            const failMessage = gameCircle.getAttribute('data-failMessage');
            checkGameResult(failMessage);
        });
    }
});

