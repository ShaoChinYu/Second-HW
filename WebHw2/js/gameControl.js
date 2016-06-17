var scene = getScene();
var renderer = getRenderer();
var camera = getCamera();
var player = getPlayer();
var it;
var playerx = 400;
var playery = 35;
var playerz = 0;
var x = 0;
var y = 0;
var z = 0;
function left(){
    clearInterval(it);
    if(playerz <= 130) {
        playerz += 10;
        player.position.set(playerx, playery, playerz);
        player.rotation.set(playerz / 30, 0, 0);
    }
}
function right(){
    clearInterval(it);
    if(playerz >= -130) {
        playerz -= 10;
        player.position.set(playerx, playery, playerz);
        player.rotation.set(playerz / 30, 0, 0);
    }
}
window.document.onkeydown = keyDownEvt;
function keyDownEvt(evt) {
    evt = (evt) ? evt : window.event
    if (evt.keyCode) {
        if (evt.keyCode == 37 && playerz <= 130) {
            //left
          //  it = setInterval("left()",100);

            playerz += 10;
            player.position.set(playerx,playery,playerz);
            player.rotation.set(playerz/30,0,0);

        }
        if (evt.keyCode == 38 ) {
            //up
            camera.position.x-=40;
            x-=40;
        }
        if (evt.keyCode == 39 && playerz >= -130) {
            //right

        //    it = setInterval("right()",100);

            playerz -= 10;
            player.position.set(playerx,playery,playerz);
            player.rotation.set(playerz/30,0,0);

        }
        if (evt.keyCode == 40) {
            //down
            camera.position.x+=4 ;
            x+=4;
        }
        if (evt.keyCode == 87) {
            //w
           // y+=10;
           // camera.lookAt( {x:x,y:y,z:z } );
            camera.position.y+=4;
            y+=4;
            renderer.render(scene,camera);
        }
        if (evt.keyCode == 83) {
            //s
            //y-=10
            //camera.lookAt( {x:x,y:y,z:z } );
            camera.position.y-=4;
            y-=4;
            renderer.render(scene,camera);
        }
        if (evt.keyCode == 65 ) {
            //a
            z+=10;
            camera.lookAt( {x:x,y:y,z:z } );
            renderer.render(scene,camera);
        }
        if (evt.keyCode == 68) {
            //d
            z-=10
            camera.lookAt( {x:x,y:y,z:z } );
            renderer.render(scene,camera);
        }
    }
}


window.document.onkeyup = keyUpEvt;
function keyUpEvt(evt) {
    evt = (evt) ? evt : window.event
    if (evt.keyCode) {
        if (evt.keyCode == 37 ) {
            //left
       //     clearInterval(it);
        }
        if (evt.keyCode == 39 ) {
            //right
      //      clearInterval(it);
        }
    }
}
var mode = getMode();
function setMode(i){
    mode = i;
    if( i==0){
        document.getElementById("playbtn").style.display="block";
        document.getElementById("playerinput").style.display="none";
        document.getElementById("roominfo").style.display="none";
    }
    if( i==1 || i==2){
        document.getElementById("playbtn").style.display="none";
        document.getElementById("roominfo").style.display="none";
        document.getElementById("playerinput").style.display="block";
        if( i == 2){
            document.getElementById("roomid").style.display="block";
        }
        newWebSocket(i);
    }
    if( i==1){
        document.getElementById("roomid").style.display="none";
        document.getElementById("opponame").innerHTML="WAIT FOR SOME ONE...";
    }
}

function send(){

    var sendmes;
    if(mode == 1){
        var name = document.getElementById("playername").value;
        document.getElementById("playerinput").style.display="none";
        document.getElementById("roominfo").style.display="block";
        document.getElementById("yourname").innerHTML="    "+name;
        sendmes = ['owner',name];
        webSocket.send(sendmes);
    }
    if(mode == 2){
        var name = document.getElementById("playername").value;
        var roomid = document.getElementById("roomid").value;
        document.getElementById("playerinput").style.display="none";
        document.getElementById("roominfo").style.display="block";
        document.getElementById("yourname").innerHTML="    "+name;
        sendmes= ['roomid',roomid];
        webSocket.send(sendmes);
        for(var i =0;i<1000;i++){}

        sendmes=['joiner',name];
        webSocket.send(sendmes);
    }


}
