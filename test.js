document.addEventListener("DOMContentLoaded", function () {
    const numImages = 500; // 생성할 이미지 개수
    const images = ["/images/soil.png"]; // 이미지 파일 목록
    const body = document.body;
  
    function getRandomPosition() {
      const x = Math.random() * (window.innerWidth - 900)-50;
      const y = Math.random() * (window.innerHeight - 250) +100;
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
  