function pointDistance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function findNearestPlayerToBall() {
    var data = JSON.parse("[" + room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null)
        .map(p => `{\"name\": \"${p.name}\", \"id\": \"${p.id}\", \"distance\": \"${pointDistance(p.position, room.getBallPosition())}\"}`)
        .join(",") + "]")
        .sort((a, b) => {
            if (Number(a.distance) > Number(b.distance)) return 1;
            else if (Number(a.distance) < Number(b.distance)) return -1;
            else return 0;
        });
    room.setPlayerAvatar(data[0].id,"✅");
    room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null && p.id != data[0].id)
                        .forEach(p => {
                            if(p) room.setPlayerAvatar(p.id,null);
                        });
}

var room = HBInit({ roomName: "Find the Nearest Player to Ball", noPlayer: true, public: false, maxPlayers: 4, password: "1234567890" });

room.onGameTick = function () {
    if (room.getScores() != null && room.getPlayerList().filter(p => room.getPlayerDiscProperties(p.id) != null).length > 0) {
        findNearestPlayerToBall();
    }
}
