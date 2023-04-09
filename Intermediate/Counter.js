var roomObject = {
    roomName: "Counter",
    noPlayer: true,
    public: false,
    maxPlayers: 12
}

var colors = {
    red: 0xFF0000,
    yellow: 0xFFFF00,
    green: 0x00FF00,
    blue: 0x0000FF,
    cyan: 0x00FFFF,
    magenta: 0xFF00FF,
    white: 0xFFFFFF
}

var fonts = {
    normal: "normal",
    bold: "bold",
    italic: "italic",
    small: "small",
    smallbold: "small-bold",
    smallitalic: "small-italic"
}

var sounds = {
    nothing: 0,
    normal: 1,
    highlight: 2
}

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

function counter(startMessage, counterStart, variation, counterEnd, endMessage) {
    room.sendAnnouncement(`${startMessage}`, null, colors.white, fonts.normal, sounds.normal); //At the zero moment

    if (Math.sign(variation) < 0) { //timeout (after the countdown) = (counterStart + |variation| - t) / |variation| * 1000
        for (var t = counterStart; t >= counterEnd; t += variation) sendTimedAnnouncement(`${t}`, null, colors.white, fonts.normal, sounds.normal, (counterStart + Math.abs(variation) - t) / Math.abs(variation) * 1000);
        //timeout (after the countup) = (|counterEnd - counterStart| + 2 * |variation|) / |variation| * 1000
        sendTimedAnnouncement(`${endMessage}`, null, colors.white, fonts.normal, sounds.normal, (Math.abs(counterEnd - counterStart) + 2 * Math.abs(variation)) / Math.abs(variation) * 1000);
    }
    else if (Math.sign(variation) > 0) { //timeout (in for loop) = (t + variation - counterStart) / variation * 1000
        for (var t = counterStart; t <= counterEnd; t += variation)  sendTimedAnnouncement(`${t}`, null, colors.white, fonts.normal, sounds.normal, (t + variation - counterStart) / variation * 1000);
        //timeout (after the countup) = (counterEnd - counterStart + 2 * variation) / variation * 1000
        sendTimedAnnouncement(`${endMessage}`, null, colors.white, fonts.normal, sounds.normal, (counterEnd - counterStart + 2 * variation) / variation * 1000);
    }
    else return false;
}

function sendTimedAnnouncement(message, target, color, font, sound, timeout) {
    setTimeout(function () { room.sendAnnouncement(`${message}`, target, color, font, sound) }, timeout);
}
