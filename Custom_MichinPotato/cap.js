//이미지(png)로 다운로드
function PrintDiv(div){
	div = div[0]
	html2canvas(div).then(function(canvas){
		var myImage = canvas.toDataURL();
		downloadURI(myImage, "저장이미지이름.png") 
	});
}

function downloadURI(uri, name){
	var link = document.createElement("a")
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
}