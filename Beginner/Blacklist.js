var blacklist = [{Auth: "Auth1", Conn: "Conn1"}, {Auth: "Auth2", Conn: "Conn2"}]; //The same structure goes...

var room = HBInit({ roomName: "Blacklist", noPlayer: true, public: true, maxPlayers: 12 });

function isBlacklisted(player){
    return blacklist.filter(b => b.Auth == player.auth || b.Conn == player.conn).length > 0;
}

room.onPlayerJoin = function (player) {
    if(isBlacklisted(player) == true) room.kickPlayer(player.id,"You are banned forever!",true);
}
