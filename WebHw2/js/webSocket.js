/**
 * Created by Yao1 on 2016/6/4.
 */
    var webSocket;
    var mode = getMode();
    function newWebSocket(i){
       // document.getElementById('webgl').style.left = '400px';
        webSocket = new WebSocket('ws://localhost:8080/ServerForWebHw2/WebSocketServer');
        webSocket.onerror = function(event) {
            onError(event)
        };

        webSocket.onopen = function(event) {
            onOpen(event)
        };

        webSocket.onmessage = function(event) {
            onMessage(event)
        };

        function onMessage(event) {

            var str = event.data.split(":");
            var str1 = str[0];
            var str2 = str[1];
            if(str1 == "room"){
                document.getElementById("roomnum").innerHTML =str2;
            }
            if(str1=="owner"){
                document.getElementById("opponame").innerHTML=str2;
                var roomid = document.getElementById("roomid").value;
                document.getElementById("roomnum").innerHTML = roomid;
            }
            if(str1=="joiner"){
                document.getElementById("opponame").innerHTML=str2;
                document.getElementById("playbtn").style.display="block";
            }
            if(str1=="start"){
                gameStart();
            }
            if(str1=="win"){
                console.log("WINNER");
                alert("YOU WIN");
                isStart = false;
            }
            if(str1=="leave"){
                if(isStart == true){
                    isStart = false;
                    alert("YOU WIN");
                }
                if(mode == 2){
                    //joiner
                    document.getElementById("roominfo").style.display="none";
                    document.getElementById("playerinput").style.display="block";
                }
                if(mode == 1){
                    //owner
                    document.getElementById("opponame").innerHTML="WAIT FOR SOME ONE...";
                    document.getElementById("playbtn").style.display="none";
                }
            }
          console.log(event.data);
        }

        function onOpen(event) {
            console.log("web socket open");
            if(i==1){
                //a : new Room
                webSocket.send('a');
            }
        }

        function onError(event) {
            console.log("error:"+event.data);
        }
    }

function test(){


}

function start() {
    webSocket.send('hello');
    return false;
}

function getSocket(){
    return webSocket;
}