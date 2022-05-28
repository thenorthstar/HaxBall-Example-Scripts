var avatar = "0";
var playerList = {};
var playerListArray = [];

var room = HBInit({ roomName: "Player Avatar Control", noPlayer: true, public: false, maxPlayers: 12 });

function changePlayerAvatar(player, value) {
    room.setPlayerAvatar(player.id, value);
    playerList[player.name].avatar = value;
}

function getPreviousAccounts(player) {
    return playerListArray.filter(p => p.auth == player.auth || p.conn == player.conn);
}

room.onPlayerJoin = function (player) {
    if (playerListArray.length != 0) {
        var accounts = getPreviousAccounts(player);

        if (accounts.length != 0) {
            var lastAccount = accounts[accounts.length - 1];

            if (playerList[player.name] == undefined) {
                playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, avatar: avatar };
                changePlayerAvatar(player, avatar);
                playerListArray.push(playerList[player.name]);
            }
            else {
                changePlayerAvatar(player, lastAccount.avatar);
                playerListArray.push(playerList[player.name]);
            }
        }
        else {
            if (playerList[player.name] == undefined) {
                playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, avatar: avatar };
                changePlayerAvatar(player, avatar);
                playerListArray.push(playerList[player.name]);
            }
            else {
                room.kickPlayer(player.id, "A player with this name already exists in the database, please join this room with your original informations.", false); //This can occur when a player changes their informations or another player with the same name tries to join the room.
                playerListArray.push(playerList[player.name]);
            }
        }
    }
    else {
        if (playerList[player.name] == undefined) {
            playerList[player.name] = { name: player.name, auth: player.auth, conn: player.conn, avatar: avatar };
            changePlayerAvatar(player, avatar);
            playerListArray.push(playerList[player.name]);
        }
        else {
            console.log("Bad"); //This is a rare situation, in fact it shouldn't occur in a logical way but I have added it.
            changePlayerAvatar(player, avatar);
            playerListArray.push(playerList[player.name]);
        }
    }
}
