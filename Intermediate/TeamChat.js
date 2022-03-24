var kirmizitakim = [];
var mavitakim = [];
var teamMessageCommand = "!t";

var room = HBInit({roomName:"Team Chat",noPlayer:true,public:true,maxPlayers:12});

room.onPlayerChat = function (player, message) {
    if (message.startsWith(teamMessageCommand) == true) {
        if (kirmizitakim.includes(player.name) == true) {
            for (var i = 0; i < kirmizitakim.length; i++) { //Kırmızı takımdaki bütün oyunculara mesaj gönder
                room.sendAnnouncement(player.id + " 🟥 | " + player.name + ": " + message.slice(teamMessageCommand.length), room.getPlayerList().find(p=> p.name == kirmizitakim[i]).id, 0x19FFBA, 'bold', 2);
                return false;
            }
        }
        else if (mavitakim.includes(player.name) == true) {
            for (var i = 0; i < mavitakim.length; i++) { //Mavi takımdaki bütün oyunculara mesaj gönde
                room.sendAnnouncement(player.id + " 🟦 | " + player.name + ": " + message.slice(teamMessageCommand.length), room.getPlayerList().find(p=> p.name == mavitakim[i]).id, 0x19FFBA, 'bold', 2);
                return false;
            }
        }
    }
}

room.onPlayerLeave = function (player) {
    if (player.team == 1) { //Kırmızı takımdayken odayı terk ettiyse
        if (kirmizitakim.includes(player.name) == true) {
            var index = kirmizitakim.indexOf(player.name);
            kirmizitakim.splice(index, 1);
        }
    }
    else if (player.team == 2) { //Mavi takımdayken odayı terk ettiyse
        if (mavitakim.includes(player.name) == true) {
            var index = mavitakim.indexOf(player.name);
            mavitakim.splice(index, 1);
        }
    }
}

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
    if (changedPlayer.team == 1) {
        if (kirmizitakim.includes(changedPlayer.name) == false) { //Kırmızı takımda yoksa
            kirmizitakim.push(changedPlayer.name);
        }
        if (mavitakim.includes(changedPlayer.name) == true) { //Kırmızı takıma mavi takımdan geldiyse
            var index = mavitakim.indexOf(changedPlayer.name);
            mavitakim.splice(index, 1);
        }
    }
    else if (changedPlayer.team == 2) {
        if (mavitakim.includes(changedPlayer.name) == false) { //Mavi takımda yoksa
            mavitakim.push(changedPlayer.name);
        }
        if (kirmizitakim.includes(changedPlayer.name) == true) { //Mavi takıma kırmızı takımdan geldiyse
            var index = kirmizitakim.indexOf(changedPlayer.name);
            kirmizitakim.splice(index, 1);
        }
    }
    else {
        if (kirmizitakim.includes(changedPlayer.name) == true) { //Spec'e kırmızı takımdan geçtiyse
            var index = kirmizitakim.indexOf(changedPlayer.name);
            kirmizitakim.splice(index, 1);
        }
        else if (mavitakim.includes(changedPlayer.name) == true) { //Spec'e mavi takımdan geçtiyse
            var index = mavitakim.indexOf(changedPlayer.name);
            mavitakim.splice(index, 1);
        }
    }
}
