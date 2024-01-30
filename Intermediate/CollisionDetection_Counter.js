var room = HBInit({ roomName: "Collision Detection / Counter", noPlayer:true, public:false, maxPlayers: 10 });

var tolerance = 0.01;
var collisionCounter = 0;

function getDistance(p1,p2){
    return Math.hypot((p2.x-p1.x),(p2.y-p1.y));
}

function checkIfColliding(p1,p2){
    var collision = false;
    if(room.getPlayerDiscProperties(p1.id) != null && room.getPlayerDiscProperties(p2.id) != null){
	var p1Disc = room.getPlayerDiscProperties(p1.id);
	var p2Disc = room.getPlayerDiscProperties(p2.id);
	var p1Radius = p1Disc.radius;
	var p2Radius = p2Disc.radius;
	var p1Name = room.getPlayer(p1.id).name;
	var p2Name = room.getPlayer(p2.id).name;
	var distance = getDistance(p1Disc,p2Disc);
	var distanceCheck = p1Radius + p2Radius + tolerance;
	if(distance < distanceCheck && collision == false){
	    collisionCounter++;
	    room.sendAnnouncement(`${p1Name} and ${p2Name} are colliding with each other! Total collisions so far: ${collisionCounter}`,null,0xFFFF00,"bold",2);
	    collision = true;
	}
	else if(distance >= distanceCheck + tolerance && collision == true){
	    collision = false;
	}
    }
}

function checkForCollisions(){
    var players = room.getPlayerList();
    var length = players.length;
    for(var i=0; i<length; i++){
	for(var j=0; j<i; j++){
	    checkIfColliding(players[i],players[j]);
	}
    }
}

room.onPlayerJoin = function(player){console.log(player.name + " has joined.");}
room.onPlayerLeave = function(player){console.log(player.name + " has left.");}
room.onPlayerChat = function(player, message){console.log(player.name + ": " + message);};

room.onGameStart = function(byPlayer){
    if(collisionCounter != 0) collisionCounter = 0;
}

room.onGameStop = function(byPlayer){
    room.sendAnnouncement(`Number of total collisions is: ${collisionCounter}.`,null,0x00FFFF,"normal",1);
    if(collisionCounter != 0) collisionCounter = 0;
}

room.onGameTick = function(){
    checkForCollisions();
}
