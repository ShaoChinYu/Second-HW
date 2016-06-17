
var webSocket;
var renderer;//声明一个全局变量
/*
 *构建基本画布 渲染器
 */

function initThree() {
    width = document.getElementById('webgl').clientWidth;
    height = document.getElementById('webgl').clientHeight;
    renderer = new THREE.WebGLRenderer({antialias:true});//生成渲染器对象，属性：锯齿效果设为true
    renderer.setSize(width,height);//设置渲染器的宽和高，和画布大小一致
    document.getElementById('webgl').appendChild(renderer.domElement);//追加canvas元素到webgl元素当中
    renderer.setClearColor(0xFFFFFF,1.0);//设置渲染器的清除色


}
/*
 *设置相机
 */
var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45,width/height,1,50000);
    //此处为设置透视投影的相机，默认情况下，相机的上方向为Y轴，右方向为X轴，沿着Z轴垂直朝里（视野角：fov； 纵横比：aspect； 相机离视最近的距离：near； 相机离视体积最远距离：far）
    camera.position.x = 800;//设置相机的位置坐标
    camera.position.y = 300;
    camera.position.z = -10;
    //设置相机的上为y轴方向
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;

    camera.lookAt( {x:0, y:0, z:0 } );
}
/*
 *设置场景，所有的元素只有在添加到场景当中之后才能够生效
 */
var scene;
function initScene() {
    scene = new THREE.Scene();
}
/*
 *设置光源
 */
var light;
function initLight() {
    light = new THREE.DirectionalLight(0xFFFFFF,1.0);//设置平行光DirectionalLight
    light.position.set(50,50,50);//光源向量，即光源的位置
    scene.add(light);//追加光源到场景
}

/*
 *设置物体
 */
var cube;
var player;
function initObject() {

    var crateTexture = new THREE.ImageUtils.loadTexture("image/floor.jpg");
    cube = new THREE.Mesh(
        new THREE.CubeGeometry(100000,10,300),
        new THREE.MeshLambertMaterial({map:crateTexture,color:0x0000FF})
    );
    scene.add(cube);
    cube.position.set(-49500,0,0);

    crateTexture = new THREE.ImageUtils.loadTexture("image/boxface.bmp");
    player = new THREE.Mesh(
        new THREE.SphereGeometry(30,20),
        new THREE.MeshLambertMaterial({map:crateTexture,color:0xFFFFFF})
    );
    scene.add(player);
    player.position.set(400,35,0);




}
//生成障碍物
var barriers=Array();
var allBarriers = new THREE.Geometry();
var numOfBarriers = 20;
var numOfReset = 6;
var restNum = numOfBarriers-numOfReset;
var crateTexture;
function ressetBarriers(){
    for(var i =0; i<numOfReset;i++){
        scene.remove(barriers[i]);
    }
    for(var i = 0 ;i<restNum;i++){
        barriers[i] = barriers[i+6];
        if( i < 6){
            scene.add(barriers[i]);
        }
    }

    for(var i = restNum ;i < numOfBarriers;i++){
        barriers[i]=new THREE.Mesh(//mesh是three.js的一个类
            new THREE.CubeGeometry(40,40,100),//形状 （宽 高 深度)
            new THREE.MeshLambertMaterial({map:crateTexture,color:0xFF0000})//材质
        );
        scene.add(barriers[i]);
    }
    var barriersdes = 200; //障碍物距离
    for(var i= restNum ;i < numOfBarriers ;i+=2){
        barriers[i].position.x=   100 - barriersdes*i;
        barriers[i+1].position.x=  100 - barriersdes*i;
        barriers[i].position.y = 25;
        barriers[i+1].position.y = 25;
    }
    var count = restNum;
    var randn1 ;
    var randn2 ;
    var z1 ;
    var z2 ;
    while( count < numOfBarriers ){
        randn1 = (Math.ceil(Math.random()*9)) %3;
        randn2 = (Math.ceil(Math.random()*9)) %3;
        if(randn1 !=randn2){
            if(randn1 == 0 ){z1 = 100;}
            if(randn1 == 1 ){z1 = 0;}
            if(randn1 == 2 ){z1 = -100;}
            if(randn2 == 0 ){z2 = 100;}
            if(randn2 == 1 ){z2 = 0;}
            if(randn2 == 2 ){z2 = -100;}
            barriers[count].position.z = z1;
            barriers[count+1].position.z=z2;
            count += 2;
        }
    }


}


function createBarriers() {

    //single
    crateTexture = new THREE.ImageUtils.loadTexture("image/boxface.bmp");
    for (var i = 0; i < numOfBarriers; i++) {
        barriers[i] = new THREE.Mesh(//mesh是three.js的一个类
            new THREE.CubeGeometry(40, 40, 100),//形状 （宽 高 深度)
            new THREE.MeshLambertMaterial({map: crateTexture, color: 0xFF0000})//材质
        );
        scene.add(barriers[i]);
    }

    var barriersdes = 200; //障碍物距离
    for (var i = 0; i < numOfBarriers; i += 2) {
        barriers[i].position.x = 100 - barriersdes * i;
        barriers[i + 1].position.x = 100 - barriersdes * i;
        barriers[i].position.y = 25;
        barriers[i + 1].position.y = 25;
    }
    var count = 0;
    var randn1;
    var randn2;
    var z1;
    var z2;
    while (count < (numOfBarriers - 1)) {
        randn1 = (Math.ceil(Math.random() * 9)) % 3;
        randn2 = (Math.ceil(Math.random() * 9)) % 3;
        if (randn1 != randn2) {
            if (randn1 == 0) {
                z1 = 100;
            }
            if (randn1 == 1) {
                z1 = 0;
            }
            if (randn1 == 2) {
                z1 = -100;
            }
            if (randn2 == 0) {
                z2 = 100;
            }
            if (randn2 == 1) {
                z2 = 0;
            }
            if (randn2 == 2) {
                z2 = -100;
            }
            barriers[count].position.z = z1;
            barriers[count + 1].position.z = z2;
            count += 2;
        }
    }




}
/*
 *旋转
 */

/*
 * 游戏控制参数
 */
var mode = 0; //0 is single ,1 is owner , 2 is joiner;

var speed = 5;  //当前障碍物移动速度
var distance = 0;  //障碍物移动距离
var isStart = false; //游戏是否开始（点击play后开始）
var isContinue = false; //游戏结束后是否重新开始了
var resetdistance = 1200; //重置障碍物的距离
var resettimes = 0;  //重置障碍物的次数
var greatestScore = 0 ;
var t = 0;
function loop(){
    renderer.clear();
    if(isStart == true){
        player.rotation.set(0,0,t/100);
        t += 5;
        for(var i =0;i<numOfBarriers ;i++){
            barriers[i].position.x += speed;
        }
        gameOver();
        domNowScore.innerHTML =greatestScore;
        distance += speed ;
        greatestScore += speed;
        if(distance >= resetdistance){
            //reset barriers
            ressetBarriers();
            resettimes ++;
            if(resettimes >3){
                speed += 1;
                resettimes = 0 ;
            }
            distance = 0 ;
            // resetdistance = 1200;
        }
    }

    renderer.render(scene,camera);
    window.requestAnimationFrame(loop);
}
if(localStorage.greatestScore == null){
    localStorage.greatestScore = 0;

}
/*
 *执行
 */
function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    createBarriers();
    domBestScore = document.getElementById("best");
    domBestScore.innerHTML =localStorage.greatestScore;
    domNowScore = document.getElementById("now");
    loop();
    renderer.clear();
    renderer.render(scene,camera);


}

//准备参数
var restTime;   //rest time before game start
var interval = 0;  // interval functino id
var domRestTime;
var domBestScore;
var domNowScore;

//play button
function gameStart(){
    if(mode == 1){
        //send start message to joiner
        webSocket = getSocket();
        webSocket.send("s");
    }
    if(isStart == true){
        return;
    }
    if(interval != 0 ){clearInterval(interval);}
    restTime = 3;
    //add rest time to html
    domRestTime = document.getElementById("gameinfo");
    domRestTime.style.display = "block";
    domRestTime.innerHTML ="Time to start : "+ restTime;

    //reset Gmae
    resetGame();
    //interval
    interval = setInterval("getRestTime()",1000);
}
function getRestTime(){
    restTime--;
    domRestTime.innerHTML ="Time to start : "+ restTime;
    if(restTime == 0 ){
        clearInterval(interval);
        domRestTime.style.display ="none";
        isStart = true;
    }
}

function gameOver() {
    var barrierx;
    var playerz = player.position.z;
    var barrierz1;
    var barrierz2;
    for(var i =0;i < numOfReset ;i+=2){
        //会放生碰撞的只有前 numOfReset个障碍物
        barrierz1 = barriers[i].position.z;
        barrierz2 = barriers[i+1].position.z;
        barrierx = barriers[i].position.x;
        if(barrierx>=380 &&barrierx <=420 ){
            //球和障碍物在同一条线
            //障碍物在左边和中间
            if( (barrierz1 + barrierz2) == 100){
                if( ( (playerz + 30) >= (barrierz1 - 50) ) || ( (playerz + 30) >= (barrierz2 - 50) ) ){
                    isStart = false; //gameover
                    break;
                }//if
            }//if

            //障碍物在左边和右边
            else if( (barrierz1 + barrierz2) == 0){
                //让barrierz1大于z2.
                if(barrierz1 < barrierz2){
                    var tmp = barrierz1;
                    barrierz1 = barrierz2;
                    barrierz2 = tmp;
                }
                if( ( (playerz + 30) >= (barrierz1 - 50) ) || ( (playerz - 30) <= (barrierz2 + 50) ) ){
                    isStart = false; //gameover
                    break;
                }//if
            }//if

            //障碍物在右边和中间
            //if( (barrierz1 + barrierz2) == -100)
            else {
                if( ( (playerz - 30) <= (barrierz1 + 50) ) || ( (playerz - 30) <= (barrierz2 + 50) ) ){
                    isStart = false; //gameover
                    break;
                }//if
            }//else
        }//if
    }//for
    if( isStart == false && mode != 0 ){
        //send gameover message to server
        console.log("LOSER");
        alert("YOU LOSE!");
        webSocket.send("c");
    }
}
function resetGame(){
    //游戏结束，重置画面
    for(var i = 0;i< numOfBarriers ;i++){
        scene.remove(barriers[i]);
    }
    barriers = new Array();
    createBarriers();
    renderer.render(scene,camera);
    //重置参数
    distance = 0;
    resettimes = 0;
    speed = 5;

    //如果获得新的最好成绩，更新
    if(greatestScore > localStorage.greatestScore){
        localStorage.greatestScore = greatestScore;

        domBestScore.innerHTML =localStorage.greatestScore;
    }
    greatestScore = 0 ;
}
function getScene(){
    return scene;
}

function getRenderer(){
    return renderer;
}

function getCamera(){
    return camera;
}

function getPlayer() {
    return player;
}

function  getMode(){
    return mode;
}