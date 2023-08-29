var commands = ["!bottom", "!top"];

var room = HBInit({ roomName: "Reorder Players", noPlayer: true, public: false, maxPlayers: 8 });

room.onPlayerChat = function (player, message) {
    var index = commands.indexOf(message);
    if (index !== -1) {
        var id = [];
        id.push(player.id);
        room.reorderPlayers(id, Boolean(index));
        room.sendAnnouncement(`You moved to the ${commands[index].slice(1)}.`, player.id, 0xFFFFFF, "bold", 2);
        return false;
    }
    else {
        room.sendAnnouncement("Only !bottom and !top are allowed!", player.id, 0xFFFFFF, "bold", 2);
        return false;
    }
}
