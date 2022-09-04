var colors = {
    onPlayerChat: {
        Player: [[0xFFFFFF, 0x95FF8E], [0xFFDB72, 0x95FF8E]]
    },
    onPlayerJoin: {
        VIP: 0x95FF8E
    },
    onPlayerLeave: {
        VIP: 0x95FF8E
    }
};

var fonts = {
    onPlayerChat: {
        Player: [["normal", "bold"], ["bold", "bold"]]
    },
    onPlayerJoin: {
        VIP: "bold"
    },
    onPlayerLeave: {
        VIP: "bold"
    }
};

var sounds = {
    onPlayerChat: {
        Player: [[1, 1], [1, 2]],
    },
    onPlayerJoin: {
        VIP: 1
    },
    onPlayerLeave: {
        VIP: 1
    }
};

var messages = {
    onPlayerChat: {
        Player: [["[PLAYER]", "[VIP][PLAYER]"], ["[ADMIN]", "[VIP][ADMIN]"]]
    },
    onPlayerJoin: {
        VIP: "✅ A VIP user has joined:"
    },
    onPlayerLeave: {
        VIP: "➡️ A VIP user has left:"
    }
};

var roomObject = {
    maxPlayers: 4,
    noPlayer: true,
    public: true,
    roomName: "VIP Roles",
};

var vips = {
    auth: ["auth1", "auth2"],
    id: []
}

var playerList = [];

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function checkJoiningHistory(player) {
    return playerList.length > 0 && playerList.filter(p => p.name == player.name || p.auth == player.auth).length > 0;
}

function checkPlayerAuth(auth) {
    return vips.auth.length > 0 && vips.auth.includes(auth);
}

function checkPlayerID(id) {
    return vips.id.length > 0 && vips.id.includes(id);
}

function setPlayer(name, auth, conn) {
    playerList.push({ name: name, auth: auth, conn: conn });
}

room.onPlayerChat = function (player, message) {
    room.sendAnnouncement(`${messages.onPlayerChat.Player[Number(player.admin)][Number(checkPlayerID(player.id))]} ${player.name}: ${message}`, null, colors.onPlayerChat.Player[Number(player.admin)][Number(checkPlayerID(player.id))], fonts.onPlayerChat.Player[Number(player.admin)][Number(checkPlayerID(player.id))], sounds.onPlayerChat.Player[Number(player.admin)][Number(checkPlayerID(player.id))]);
    return false;
}

room.onPlayerJoin = function (player) {
    if (playerList.length == 0) {
        setPlayer(player.name, player.auth, player.conn);
    }
    else {
        var data = checkJoiningHistory(player);
        if (data) {
            var checkAuth = checkPlayerAuth(player.auth);
            var checkID = checkPlayerID(player.id);
            if (checkAuth && !checkID) {
                vips.id.push(player.id);
                room.sendAnnouncement(`${messages.onPlayerJoin.VIP} ${player.name}`, null, colors.onPlayerJoin.VIP, fonts.onPlayerJoin.VIP, sounds.onPlayerJoin.VIP);
            }
        }
        else{
            setPlayer(player.name, player.auth, player.conn);
            var checkAuth = checkPlayerAuth(player.auth);
            var checkID = checkPlayerID(player.id);
            if (checkAuth && !checkID) {
                vips.id.push(player.id);
                room.sendAnnouncement(`${messages.onPlayerJoin.VIP} ${player.name}`, null, colors.onPlayerJoin.VIP, fonts.onPlayerJoin.VIP, sounds.onPlayerJoin.VIP);
            }
        }
    }
}

room.onPlayerLeave = function (player) {
    if (checkPlayerID(player.id)) {
        var index = vips.id.findIndex(p => p == player.id);
        if (index !== -1) {
            room.sendAnnouncement(`${messages.onPlayerLeave.VIP} ${player.name}`, null, colors.onPlayerLeave.VIP, fonts.onPlayerLeave.VIP, sounds.onPlayerLeave.VIP);
            vips.id.splice(index, 1);
        }
    }
}
