var x1 = -200;
var x2 = 200;
var y1 = -200;
var y2 = 200;

var room = HBInit({roomName:"Marked Zone",noPlayer:true,public:true,maxPlayers:12});

function isBallInZone(){
    return (x1 < room.getDiscProperties(0).x && room.getDiscProperties(0).x < x2) && (y1 < room.getDiscProperties(0).y && room.getDiscProperties(0).y < y2);
}

function some_function(){
    if(isBallInZone()){ //Do something.}
    else{ //Do something.}
}

room.onGameTick = function(){
    isBallInZone();
}
