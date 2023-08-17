var clothes_img = ['img/item_1.png','img/item_2.png','img/item_3.png','img/item_4.png'];
var clothes_index=0;

let draggedItem=null;

function drag(){
    draggedItem = this;
    console.log(draggedItem.src);
}
function dragenter(){
    document.getElementById('chara-clo').src=clothes_img[clothes_index];
}
  
function changeOnFooter(){
    document.getElementById('onoff').style.display = "block";
}
function changeOffFooter(){
    document.getElementById('onoff').style.display = "none";
}


function upclothesBotton(){
    if(clothes_index>=3){
        clothes_index=0;
    }else{
        clothes_index++;
    }
    document.getElementById('chara-clothes').src = clothes_img[clothes_index];
}
function downclothesBotton(){
    if(clothes_index<=0){
        clothes_index=3;
    }else{
        clothes_index--;
    }
    document.getElementById('chara-clothes').src = clothes_img[clothes_index];
}

function changeChcolor (color){
    if(color=="white"){
        document.getElementById('chara-img').src = "img/final_success.png";
        console.log("OK");
    }else if(color=="black"){
        document.getElementById('chara-img').src = "img/overnight_migam.png";
        console.log("OK");
    }else if(color=="pink"){
        document.getElementById('chara-img').src = "img/angry_migam.png";
        console.log("OK");
    }else if(color=="yellow"){
        document.getElementById('chara-img').src = "img/drunk_migam.png";
    }else if(color=="blue"){
        document.getElementById('chara-img').src = "img/sad_migam.png";
        console.log("OK");
    }else if(color=="purple"){
        document.getElementById('chara-img').src = "img/hungry_migam.png";
        console.log("OK");
    }
    
}