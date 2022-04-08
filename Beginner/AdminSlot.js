var maxPlayers = 8;
var password = "adminSlot";
var administrators = [{Auth: "Auth1", Conn: "Conn1"}, {Auth: "Auth2", Conn: "Conn2"}]; //Administrators here

var room = HBInit({ roomName: "Administrator Slot", noPlayer: true, public: true, maxPlayers: maxPlayers });

function isAuthorized(player){
    return administrators.findIndex(a => a.Auth == player.auth || a.Conn == player.Conn) !== -1;
}

room.onPlayerJoin = function (player) {
    var players = room.getPlayerList();
    if(players.length == maxPlayers){
        if(isAuthorized(player) == false){
            room.kickPlayer(player.id,`${maxPlayers}. slot is for administrators.`,false);
        }
        else{
            room.sendAnnouncement(`${player.name} has joined as an administrator!`,null,0xFFDB72,"bold",0);
            room.setPlayerAdmin(player.id,true)
        }
    }
    else{
        if(players.length == maxPlayers - 1){
            room.setPassword(password);
        }
        else{
            room.setPassword();
        }
    }
}

room.onPlayerLeave = function (player) {
    var players = room.getPlayerList();
    if(players.length == maxPlayers - 1){
        room.setPassword(password);
    }
    else{
        room.setPassword();
    }
}
