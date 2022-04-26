var zone = {MinX: -370, MaxX: 370, MinY: -170, MaxY: 170};
var playerList = {};

var room = HBInit({ roomName: "Zone Check", noPlayer: true, public: true, maxPlayers: 2 });

function checkIfPlayerInZone(player){
    return player != null && player.position != null && (zone.MinX <= player.position.x && player.position.x <= zone.MaxX) && (zone.MinY <= player.position.y && player.position.y <= zone.MaxY);
}

function warnIfPlayerInZone(){
    var players = room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null);
    players.forEach(p => {
        if(checkIfPlayerInZone(p) == true){
            if(playerList[p.name].isInZoneWarning == false){
                room.sendAnnouncement(`You are inside the zone!`,p.id,0xFFFFFF,"bold",2);
                playerList[p.name].isInZoneWarning = true;
            }
        }
        else{
            if(playerList[p.name].isInZoneWarning == true){
                room.sendAnnouncement(`You are outside the zone!`,p.id,0xFFFFFF,"bold",2);
                playerList[p.name].isInZoneWarning = false;
            }
        }
    });
}

room.onGameTick = function(){
    warnIfPlayerInZone();
}

room.onPlayerJoin = function(player){
    if(playerList[player.name] == undefined) playerList[player.name] = {name: player.name, isInZoneWarning: false};
}
