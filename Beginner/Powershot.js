var powerActive = false; //You can kick the ball faster when this is true.
var PowerCoefficient = 3; //Original ball kick speed would be multiplied by this number when power shot is activated.
var TimeOut = 180; //This means 3 seconds.
var TimePlayerBallTouch = 0; //The time indicator that increases as player touched to the ball

var assistingTouch = "";
var lastPlayerTouched = "";
var lastTeamTouched = 0;
var previousPlayerTouched;
var radiusBall = 10; //Classic map puck radius, you can change it with respect to the ball radius of your map.
var radiusPlayer = 15; //The original player radius, you can change it with respect to the player radius of your map.
var triggerDistance = radiusBall + radiusPlayer + 0.01; //Player ball distance tolerance. You can increase it for less sensitivity.

var room = HBInit({roomName:"TEST",playerName:"",noPlayer:true,public:true,maxPlayers:12});

function getLastTouchTheBall(){
    var ballPosition = room.getBallPosition();
    var players = room.getPlayerList();
    for(var i=0; i<players.length; i++){
        if(players[i].position != null){
            var distanceToBall = pointDistance(players[i].position,ballPosition);
            if(distanceToBall < triggerDistance){
                if(lastPlayerTouched.id != players[i].id){
                    if(lastTeamTouched==players[i].team){
                        assistingTouch = lastPlayerTouched;
                    }
		    else{
			assistingTouch = "";
		    }
                }
                lastTeamTouched = players[i].team;
                previousPlayerTouched == lastPlayerTouched;
                lastPlayerTouched = players[i];
            }
        }
    }
    return lastPlayerTouched;
}

function pointDistance(p1,p2){
    var d1 = p1.x-p2.x;
    var d2 = p1.y-p2.y;
    return Math.sqrt(d1*d1 + d2*d2);
}

function CheckPowerShot(){
    if(pointDistance(room.getPlayerDiscProperties(lastPlayerTouched.id),room.getDiscProperties(0)) < triggerDistance){
	TimePlayerBallTouch++;

	if(TimePlayerBallTouch == TimeOut){
	    room.sendAnnouncement("✅ Power shot activated!",null,0x00FF00,"italic",2); //Power shot is activated when the player touches to the ball for 3 seconds long.
	}
	if(TimePlayerBallTouch >= TimeOut){
	    if(powerActive == false){
		powerActive = true;
	    }
	}
    }
    else{
	if(TimePlayerBallTouch != 0){ //Touch timer is reset when the contact between player and ball is interrupted.
	    TimePlayerBallTouch = 0;
	    //room.sendAnnouncement("🚫 Power shot inactivated!",null,0xFF0000,"italic",2); //You can remove this to prevent bot to spam too much.
	}
    }
}

room.onPlayerBallKick = function(player){ //Ball speed is multiplied by the speed coefficient when power shot is active.
    if(powerActive == true){
	room.setDiscProperties(0,{xspeed:PowerCoefficient * room.getDiscProperties(0).xspeed,yspeed:PowerCoefficient * room.getDiscProperties(0).yspeed});
	powerActive = false;
    }
}

room.onGameStop = function(byPlayer){ //This is important to avoid from gametick errors.
    lastPlayerTouched = "";
}

room.onGameTick = function(){
    if(room.getPlayerList().filter(p => p.team != 0).length > 0 && lastPlayerTouched != ""){ //This is also important to avoid from gametick errors.
	CheckPowerShot();
    }

    getLastTouchTheBall(); //You have to use this in here to get the last toucher.
}
