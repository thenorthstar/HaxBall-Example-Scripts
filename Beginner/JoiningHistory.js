var playerList = {};
var _playerList = [];

var room = HBInit({roomName:"Joining History",noPlayer:true,public:true,maxPlayers:12});

room.onPlayerJoin = function(player){
    var players = room.getPlayerList();

    if(playerList[player.name] == undefined){
	playerList[player.name] = {name: player.name, auth: player.auth, conn: player.conn};
    }
    _playerList.push(playerList[player.name]);

    var set = _playerList.filter(x => playerList[x.name].auth == player.auth || playerList[x.name].conn == player.conn);

    room.sendAnnouncement(`Hello ${player.name}. The list of your old names is the following:\n${set.map(s => (1+set.indexOf(s)) + "-) " + s.name).join('\n')}`,player.id,0xFFFFFF,"normal",0); //Bounded as many as the bound of sendAnnouncement
    /*set.forEach(s => {
	room.sendAnnouncement(`${1+set.indexOf(s)}-) ${s.name}`,player.id,0xFFFFFF,"normal",0); //An alternative way, bounded as many as the player count corresponding with player auth or conn
    });*/
}
