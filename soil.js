document.addEventListener("DOMContentLoaded", function () {
    const numImages = 300; // 생성할 이미지 개수
    const images = ["/images/soil.png"]; // 이미지 파일 목록
    const body = document.body;
  
    function getRandomPosition() {
      const x = (Math.random() * window.innerWidth)*0.65; // 화면 너비 전체 범위에서 랜덤한 x 위치를 얻습니다.
      const y = (window.innerHeight * 0.35) + (Math.random() * (window.innerHeight * 0.6)); // 화면의 35%부터 100%까지의 범위에서 랜덤한 y 위치를 얻습니다.
  
      return { x, y };
  }
  
  
    for (let i = 0; i < numImages; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const { x, y } = getRandomPosition();
  
      const img = new Image();
      img.src = randomImage;
      img.className = "random-image";
      img.style.left = x + "px";
      img.style.top = y + "px";
  
      img.addEventListener("click", function () {
        img.style.display = "none";
      });
  
      body.appendChild(img);
    }
  });
  
