var colors = {
    Chat: {
        Commands: [0xFFFFFF, 0xFFFFFF],
        InvalidPitch: 0xFFFF00,
        InvalidTeamID: 0xFFFF00,
        InvalidTeamName: 0xFFFF00,
        NoAuthorization: 0xFF0000,
        NotACommand: 0xFF0000,
        Player: [0xFFFFFF, 0xFFDB72],
        RandomUniformsSet: [0x00FF00, 0x00FF00],
        SomethingWentWrong: {
            Commands: 0xFFFF00
        },
        Teams: {
            Info: 0x0000FF,
            List: 0xFFFFFF
        },
        UniformsCannotSet: 0xFFFF00,
        UniformsSet: [0x808080,0xE56E56,0x5689E5]
    }
};

var fonts = {
    Chat: {
        Commands: ["normal", "normal"],
        InvalidPitch: "bold",
        InvalidTeamID: "bold",
        InvalidTeamName: "bold",
        NoAuthorization: "bold",
        NotACommand: "bold",
        Player: ["normal", "bold"],
        RandomUniformsSet: ["normal", "normal"],
        SomethingWentWrong: {
            Commands: "bold"
        },
        Teams: {
            Info: "normal",
            List: "normal"
        },
        UniformsCannotSet: "bold",
        UniformsSet: "bold"
    }
};

var sounds = {
    Chat: {
        Commands: [1, 1],
        InvalidPitch: 2,
        InvalidTeamID: 2,
        InvalidTeamName: 2,
        NoAuthorization: 2,
        NotACommand: 2,
        Player: [1, 1],
        RandomUniformsSet: [1, 1],
        SomethingWentWrong: {
            Commands: 2
        },
        Teams: {
            Info: 1,
            List: 0
        },
        UniformsSet: 2,
        UniformsSet: 1
    }
};

var messages = {
    Chat: {
        Commands: ["Available commands: !commands, !teams", "Available commands: !commands, !randomuniforms, !teams, !uniform [1/2] [TeamName] [Home/Away]"],
        InvalidPitch: "Invalid pitch! Only home or away is allowed! Example: !uniforms 1 bjk home",
        InvalidTeamID: "Invalid team ID! Example: !uniforms 1 bjk home",
        InvalidTeamName: "Invalid team name! Example: !uniforms 1 bjk home",
        NoAuthorization: "You have no authorization to do this!",
        NotACommand: "There is no such a command!",
        RandomUniformsSet: ["Random uniforms feature is now unavailable!", "Random uniforms feature is now available!"],
        SomethingWentWrong: {
            Commands: "Something went wrong with this command! Please try again!"
        },
        Teams: "Current teams below:\n",
        UniformsCannotSet: "Team uniforms cannot be adjusted when random uniforms feature is on!",
        UniformsSet: "team uniforms has been set to"
    }
};

var teams = [
    { ID: 1, shortName: "trn", longName: "KF Tirana", country: "Albania", uniform: [{ angle: 0, mainColor: [0x0059AB, 0xFFFFFF, 0x0059AB], avatarColor: 0xFFCA03 }, { angle: 0, mainColor: [0xFFCA03], avatarColor: 0x0059AB }] },
    { ID: 2, shortName: "boca", longName: "Club Atlético Boca Juniors", country: "Argentina", uniform: [{ angle: 0, mainColor: [0x103F79, 0xF3B229, 0x103F79], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x103F79 }] },
    { ID: 3, shortName: "rvp", longName: "Club Atlético River Plate", country: "Argentina", uniform: [{ angle: 30, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x000000, 0x404040, 0x000000], avatarColor: 0xFF0000 }] },
    { ID: 4, shortName: "mlb", longName: "Melbourne City FC", country: "Australia", uniform: [{ angle: 0, mainColor: [0x7AB2E1], avatarColor: 0xE31934 }, { angle: 0, mainColor: [0x000000], avatarColor: 0xE31934 }] },
    { ID: 5, shortName: "slz", longName: "FC Red Bull Salzburg", country: "Austria", uniform: [{ angle: 15, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0x000000 }, { angle: 15, mainColor: [0x000080, 0xFFFF00, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 6, shortName: "sgrz", longName: "SK Sturm Graz", country: "Austria", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0x00C000 }, { angle: 0, mainColor: [0x000000], avatarColor: 0x00C000 }] },
    { ID: 7, shortName: "bate", longName: "FK BATE Borisov", country: "Belarus", uniform: [{ angle: 0, mainColor: [0xFFFF00, 0x0080FF, 0xFFFF00], avatarColor: 0x000000 }, { angle: 0, mainColor: [0xFFFF00], avatarColor: 0x0080FF }] },
    { ID: 8, shortName: "gml", longName: "FK Gomel", country: "Belarus", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x00C000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x000000, 0x00FF00, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 9, shortName: "clb", longName: "Club Brugge KV", country: "Belgium", uniform: [{ angle: 0, mainColor: [0x000000, 0x0000FF, 0x000000], avatarColor: 0xFFFFFF }, { angle: 45, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x0000FF }] },
    { ID: 10, shortName: "gnt", longName: "KAA Gent", country: "Belgium", uniform: [{ angle: 0, mainColor: [0x0000FF], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFF00], avatarColor: 0x0000FF }] },
    { ID: 11, shortName: "gnk", longName: "KRC Genk", country: "Belgium", uniform: [{ angle: 0, mainColor: [0x000080, 0x0000FF, 0x000080], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0x0000FF }] },
    { ID: 12, shortName: "ant", longName: "Royal Antwerp FC", country: "Belgium", uniform: [{ angle: 90, mainColor: [0xC00000, 0xFF0000, 0xC00000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFF00, 0xFFFF00, 0x000000], avatarColor: 0xFF0000 }] },
    { ID: 13, shortName: "and", longName: "RSC Anderlecht", country: "Belgium", uniform: [{ angle: 0, mainColor: [0x8000FF, 0x400080, 0x8000FF], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x8000FF }] },
    { ID: 14, shortName: "fla", longName: "CR Flamengo", country: "Brazil", uniform: [{ angle: 90, mainColor: [0x000000, 0xFF0000, 0x000000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0xFF0000 }] },
    { ID: 15, shortName: "san", longName: "Santos FC", country: "Brazil", uniform: [{ angle: 0, mainColor: [0xC00000, 0xFF4000, 0xC00000], avatarColor: 0x000000 }, { angle: 0, mainColor: [0xFF4000, 0xC00000], avatarColor: 0x000000 }] },
    { ID: 16, shortName: "sao", longName: "São Paulo FC", country: "Brazil", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xE0E0E0, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0xFFFF00 }] },
    { ID: 17, shortName: "cor", longName: "SC Corinthians Paulista", country: "Brazil", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0x808080 }, { angle: 90, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0x008000 }] },
    { ID: 18, shortName: "pal", longName: "SE Palmeiras", country: "Brazil", uniform: [{ angle: 90, mainColor: [0x008000, 0xFFFFFF, 0x008000], avatarColor: 0xFFFFC0 }, { angle: 0, mainColor: [0xFFFFFF, 0x008000, 0xFFFFFF], avatarColor: 0xFFFFC0 }] },
    { ID: 19, shortName: "lud", longName: "PFK Ludogorets Razgrad", country: "Bulgaria", uniform: [{ angle: 75, mainColor: [0x008000, 0xFFFFFF, 0x008000], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x008000], avatarColor: 0xFFFFFF }] },
    { ID: 20, shortName: "bei", longName: "Beijing Guoan FC", country: "China", uniform: [{ angle: 0, mainColor: [0x00C000, 0x008000, 0x00C000], avatarColor: 0xFFFF00 }, { angle: 0, mainColor: [0x80FF00, 0xFFFFFF, 0x80FF00], avatarColor: 0xFFFF00 }] },
    { ID: 21, shortName: "gua", longName: "Guangzhou FC", country: "China", uniform: [{ angle: 90, mainColor: [0xFF4000, 0xFFFFFF, 0xFF4000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xFFFF00, 0x808080, 0xFFFF00], avatarColor: 0xFFFFFF }] },
    { ID: 22, shortName: "zag", longName: "GNK Dinamo Zagreb", country: "Croatia", uniform: [{ angle: 45, mainColor: [0x000080, 0x0000FF, 0x000080], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFF8000, 0xFFFF00, 0xFFFF00], avatarColor: 0x0000FF }] },
    { ID: 23, shortName: "sppr", longName: "Sparta Prague", country: "Czechia", uniform: [{ angle: 0, mainColor: [0x800000, 0xFFFFFF, 0x000000], avatarColor: 0xFFC000 }, { angle: 0, mainColor: [0xFFFFFF, 0x800000, 0xFFFFFF], avatarColor: 0xFFC000 }] },
    { ID: 24, shortName: "plz", longName: "FC Viktoria Plzeň", country: "Czechia", uniform: [{ angle: 0, mainColor: [0x0000FF, 0xFF0000, 0x0000FF], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000, 0x0000FF, 0xFF0000], avatarColor: 0xFFFFFF }] },
    { ID: 25, shortName: "sgm", longName: "SK Sigma Olomouc", country: "Czechia", uniform: [{ angle: 0, mainColor: [0x4080C0, 0xFFFFFF, 0x4080C0], avatarColor: 0x000000 }, { angle: 0, mainColor: [0xFF0000, 0xC00000, 0xFF0000], avatarColor: 0x0000FF }] },
    { ID: 26, shortName: "slpr", longName: "SK Slavia Prague", country: "Czechia", uniform: [{ angle: 0, mainColor: [0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x0060C0, 0x0080FF], avatarColor: 0x000000 }] },
    { ID: 27, shortName: "bro", longName: "Brøndby IF", country: "Denmark", uniform: [{ angle: 90, mainColor: [0xFFFF00, 0x0000FF, 0x0000FF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x404040, 0x808080, 0x404040], avatarColor: 0xFFFF00 }] },
    { ID: 28, shortName: "cop", longName: "Copenhagen FC", country: "Denmark", uniform: [{ angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x0000FF }, { angle: 90, mainColor: [0x000080, 0x000000, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 29, shortName: "mid", longName: "FC Midtjylland", country: "Denmark", uniform: [{ angle: 90, mainColor: [0x000000, 0x000000, 0xFFFFFF], avatarColor: 0xFF0000 }, { angle: 90, mainColor: [0x804080, 0x000080, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 30, shortName: "nrs", longName: "FC Nordsjælland", country: "Denmark", uniform: [{ angle: 0, mainColor: [0xFF0000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x0080FF], avatarColor: 0xFFFFFF }] },
    { ID: 31, shortName: "alh", longName: "Al Ahly", country: "Egypt", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0xC0C000 }, { angle: 90, mainColor: [0xC0C0C0, 0x000000, 0xC0C000], avatarColor: 0xC0C000 }] },
    { ID: 32, shortName: "mon", longName: "AS Monaco FC", country: "France", uniform: [{ angle: 120, mainColor: [0xFF0000, 0xFFFFFF, 0xFFFFFF], avatarColor: 0xC0C000 }, { angle: 0, mainColor: [0x000000], avatarColor: 0xC0C000 }] },
    { ID: 33, shortName: "asse", longName: "AS Saint-Étienne", country: "France", uniform: [{ angle: 90, mainColor: [0x00C000, 0xFFFFFF, 0x00C000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xFFFFFF, 0x00C000, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: 34, shortName: "lil", longName: "Lille OSC", country: "France", uniform: [{ angle: 90, mainColor: [0xFF0000, 0x000080, 0x000080], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFFFFFF, 0xFFFFFF, 0x000000], avatarColor: 0x000080 }] },
    { ID: 35, shortName: "ol", longName: "Olympique Lyonnais", country: "France", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0x0000FF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0xFF0000], avatarColor: 0x0000FF }] },
    { ID: 36, shortName: "mar", longName: "Olympique Marseille", country: "France", uniform: [{ angle: 0, mainColor: [0x00C0FF, 0xFFFFFF, 0x00C0FF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x404080, 0x202040, 0x00C0FF], avatarColor: 0xFFFFFF }] },
    { ID: 37, shortName: "psg", longName: "Paris Saint Germain FC", country: "France", uniform: [{ angle: 0, mainColor: [0x000080], avatarColor: 0xFF0000 }, { angle: 0, mainColor: [0xFFFFFF, 0xFFFFFF, 0x000080], avatarColor: 0xFF0000 }] },
    { ID: 38, shortName: "lev", longName: "Bayer 04 Leverkusen", country: "Germany", uniform: [{ angle: 90, mainColor: [0xFF0000, 0x000000, 0xFF0000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0xFF0000 }] },
    { ID: 39, shortName: "bay", longName: "Bayern Munchen", country: "Germany", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xC00000, 0xFF0000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000000, 0x404040, 0x000000], avatarColor: 0xC0C000 }] },
    { ID: 40, shortName: "dor", longName: "Borussia Dortmund", country: "Germany", uniform: [{ angle: 90, mainColor: [0xFFFF00, 0x000000, 0xFFFF00], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000], avatarColor: 0xFFFF00 }] },
    { ID: 41, shortName: "sch", longName: "FC Schalke 04", country: "Germany", uniform: [{ angle: 90, mainColor: [0x0000FF, 0xFFFFFF, 0x0000FF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xFFFFFF, 0x000080, 0xFFFFFF], avatarColor: 0x00FFFF }] },
    { ID: 42, shortName: "lei", longName: "RB Leipzig", country: "Germany", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0xFF0000, 0xFF0000], avatarColor: 0xFFC000 }, { angle: 90, mainColor: [0x000000], avatarColor: 0xC0C000 }] },
    { ID: 43, shortName: "wol", longName: "VfL Wolfsburg", country: "Germany", uniform: [{ angle: 0, mainColor: [0x00FF00], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000, 0x00FF00, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 44, shortName: "aek", longName: "AEK", country: "Greece", uniform: [{ angle: 45, mainColor: [0x000000, 0xFFFF00, 0x000000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000000, 0xFFFF00, 0xFFFF00], avatarColor: 0xFFFFFF }] },
    { ID: 45, shortName: "oly", longName: "Olympiacos", country: "Greece", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xC0C0C0, 0xFFFFFF, 0xC0C0C0], avatarColor: 0x000000 }] },
    { ID: 46, shortName: "pan", longName: "Panathinaikos FC", country: "Greece", uniform: [{ angle: 0, mainColor: [0x00C060], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x00C060 }] },
    { ID: 47, shortName: "paok", longName: "PAOK", country: "Greece", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0x008080 }, { angle: 0, mainColor: [0x000000, 0x404040, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 48, shortName: "btj", longName: "Beitar Jerusalem FC", country: "Israel", uniform: [{ angle: 0, mainColor: [0x000000, 0xFFFF00, 0x000000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000], avatarColor: 0xFFFF00 }] },
    { ID: 49, shortName: "hbe", longName: "Hapoel Be'er Sheva FC", country: "Israel", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xFFFFFF, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xE0E0E0, 0xFFFFFF, 0xFFFFFF], avatarColor: 0xFF0000 }] },
    { ID: 50, shortName: "mch", longName: "Maccabi Haifa FC", country: "Israel", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x008000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x404040, 0x000000, 0x404040], avatarColor: 0xFFFFFF }] },
    { ID: 51, shortName: "mca", longName: "Maccabi Tel Aviv FC", country: "Israel", uniform: [{ angle: 90, mainColor: [0xFFFF00, 0x0000FF, 0xFFFF00], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x000000, 0x000000, 0xFFFF00], avatarColor: 0xFFFFFF }] },
    { ID: 52, shortName: "mil", longName: "AC Milan", country: "Italy", uniform: [{ angle: 0, mainColor: [0xFF0000, 0x000000, 0xFF0000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFEDCBA], avatarColor: 0x800000 }] },
    { ID: 53, shortName: "rom", longName: "AS Roma FC", country: "Italy", uniform: [{ angle: 90, mainColor: [0xC00000, 0xFFC000, 0xC00000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000080, 0x0000C0, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 54, shortName: "int", longName: "FC Internazionale Milano", country: "Italy", uniform: [{ angle: 0, mainColor: [0x000080, 0x0000FF, 0x000080], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000, 0x0000FF, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 55, shortName: "juv", longName: "Juventus FC", country: "Italy", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0x000000, 0xFFFFFF], avatarColor: 0xFFFF00 }, { angle: 0, mainColor: [0x404040], avatarColor: 0xFFFF00 }] },
    { ID: 56, shortName: "nap", longName: "SSC Napoli", country: "Italy", uniform: [{ angle: 90, mainColor: [0x0080FF, 0xFFFFFF, 0x0080FF], avatarColor: 0x000080 }, { angle: 0, mainColor: [0x808000, 0xFFFFFF, 0x808000], avatarColor: 0x000080 }] },
    { ID: 57, shortName: "tor", longName: "Torino FC", country: "Italy", uniform: [{ angle: 90, mainColor: [0x800000, 0xFFFFFF, 0x000000], avatarColor: 0xFFC000 }, { angle: 45, mainColor: [0xFFFFFF, 0x800000, 0xFFFFFF], avatarColor: 0xFFC000 }] },
    { ID: 58, shortName: "ksh", longName: "Kashima Antlers", country: "Japan", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xC0C0C0, 0x000000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xC0C0C0, 0xFFFFFF, 0xFFFFFF], avatarColor: 0xFF0000 }] },
    { ID: 59, shortName: "kws", longName: "Kawasaki Frontale", country: "Japan", uniform: [{ angle: 90, mainColor: [0x0080FF, 0x0080FF, 0x000040], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xC0C0C0, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x0080FF }] },
    { ID: 60, shortName: "tig", longName: "Tigres UANL", country: "Mexico", uniform: [{ angle: 0, mainColor: [0xFFC000], avatarColor: 0x0000FF }, { angle: 0, mainColor: [0xC0D0E0], avatarColor: 0xFFC000 }] },
    { ID: 61, shortName: "ajx", longName: "AFC AJAX", country: "Netherlands", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x000080, 0x0000FF, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 62, shortName: "az", longName: "AZ Alkmaar", country: "Netherlands", uniform: [{ angle: 60, mainColor: [0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x404040, 0x000000, 0x404040], avatarColor: 0xFFFFFF }] },
    { ID: 63, shortName: "twe", longName: "FC Twente", country: "Netherlands", uniform: [{ angle: 0, mainColor: [0xC00000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000080, 0xC00000, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 64, shortName: "fey", longName: "Feyenoord", country: "Netherlands", uniform: [{ angle: 0, mainColor: [0xFF0000, 0xFFFFFF], avatarColor: 0x202020 }, { angle: 0, mainColor: [0xC0C0C0, 0x808080], avatarColor: 0xFFFFFF }] },
    { ID: 65, shortName: "psv", longName: "PSV Eindhoven", country: "Netherlands", uniform: [{ angle: 90, mainColor: [0xFF0000, 0x000000, 0xFFFFFF], avatarColor: 0xC0C000 }, { angle: 0, mainColor: [0x203040], avatarColor: 0xA0E0A0 }] },
    { ID: 66, shortName: "mol", longName: "Molde FK", country: "Norway", uniform: [{ angle: 90, mainColor: [0x0000FF, 0xFFFFFF, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xFFFFFF, 0x0000FF, 0x0000FF], avatarColor: 0x000000 }] },
    { ID: 67, shortName: "tro", longName: "Tromsø IL", country: "Norway", uniform: [{ angle: 0, mainColor: [0xFF0000, 0xFFC000, 0xFF0000], avatarColor: 0xFFC000 }, { angle: 0, mainColor: [0x000000, 0xFFC000, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 68, shortName: "lgw", longName: "Legia Warszawa", country: "Poland", uniform: [{ angle: 150, mainColor: [0xFFFFFF, 0xFFFFFF, 0x008000], avatarColor: 0xFF0000 }, { angle: 90, mainColor: [0x00C000, 0x008000, 0x008000], avatarColor: 0xFFFFFF }] },
    { ID: 69, shortName: "lpz", longName: "KKS Lech Poznań", country: "Poland", uniform: [{ angle: 0, mainColor: [0x0000C0, 0x000080, 0x0000C0], avatarColor: 0xFFFF00 }, { angle: 0, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x0000FF }] },
    { ID: 70, shortName: "por", longName: "FC Porto", country: "Portugal", uniform: [{ angle: 0, mainColor: [0x0000FF, 0xFFFFFF, 0x0000FF], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x000080, 0x000000, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 71, shortName: "bra", longName: "SC Braga", country: "Portugal", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0xC0C000 }, { angle: 0, mainColor: [0x006030], avatarColor: 0xC0C000 }] },
    { ID: 72, shortName: "ben", longName: "SL Benfica", country: "Portugal", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0xFF0000 }] },
    { ID: 73, shortName: "spo", longName: "Sporting CP", country: "Portugal", uniform: [{ angle: 90, mainColor: [0x00C000, 0xFFFFFF, 0x00C000], avatarColor: 0xFFC000 }, { angle: 90, mainColor: [0xC0FF00, 0x000000, 0xC0FF00], avatarColor: 0x00C000 }] },
    { ID: 74, shortName: "clj", longName: "CFR Cluj", country: "Romania", uniform: [{ angle: 0, mainColor: [0x800000, 0xFFFFFF, 0x800000], avatarColor: 0x000000 }, { angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x800000 }] },
    { ID: 75, shortName: "fcsb", longName: "FCSB", country: "Romania", uniform: [{ angle: 0, mainColor: [0xFF0000, 0x0000FF, 0xFF0000], avatarColor: 0xFFFF00 }, { angle: 90, mainColor: [0xFFFFFF, 0xA0C0E0, 0xFFFFFF], avatarColor: 0xFFC000 }] },
    { ID: 76, shortName: "dym", longName: "FC Dynamo Moscow", country: "Russia", uniform: [{ angle: 0, mainColor: [0x0080FF], avatarColor: 0xC0C000 }, { angle: 90, mainColor: [0xFFFFFF], avatarColor: 0x0080FF }] },
    { ID: 77, shortName: "kra", longName: "FC Krasnodar", country: "Russia", uniform: [{ angle: 0, mainColor: [0x000000, 0x008000, 0x000000], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x008080, 0x00FFFF, 0x00FFFF], avatarColor: 0x000000 }] },
    { ID: 78, shortName: "spa", longName: "FC Spartak Moscow", country: "Russia", uniform: [{ angle: 60, mainColor: [0xC00000, 0xFFFFFF, 0xC00000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: 79, shortName: "znt", longName: "FK Zenit", country: "Russia", uniform: [{ angle: 0, mainColor: [0x0080FF], avatarColor: 0xC0C000 }, { angle: 90, mainColor: [0xFFFFFF], avatarColor: 0x0080FF }] },
    { ID: 80, shortName: "lkm", longName: "Lokomotiv Moscow", country: "Russia", uniform: [{ angle: 90, mainColor: [0x008000, 0xFF0000, 0x008000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x008000 }] },
    { ID: 81, shortName: "cska", longName: "PFC CSKA Moscow", country: "Russia", uniform: [{ angle: 90, mainColor: [0xC00030, 0x3000C0, 0x3000C0], avatarColor: 0xFFC000 }, { angle: 90, mainColor: [0xC0C0C0, 0xFFFFFF, 0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: 82, shortName: "cel", longName: "Celtic FC", country: "Scotland", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x00C000, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x008000], avatarColor: 0xC0C000 }] },
    { ID: 83, shortName: "ran", longName: "Glasgow Rangers", country: "Scotland", uniform: [{ angle: 90, mainColor: [0x0080FF, 0xFFFFFF, 0x000000], avatarColor: 0xFF0000 }, { angle: 90, mainColor: [0x000000, 0x000000, 0xFF0000], avatarColor: 0xFFFFFF }] },
    { ID: 84, shortName: "crv", longName: "FK Crvena Zvezda", country: "Serbia", uniform: [{ angle: 55, mainColor: [0xFFFFFF, 0xFF0000, 0xFF0000], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x003030], avatarColor: 0xFFFFFF }] },
    { ID: 85, shortName: "par", longName: "FK Partizan Belgrade", country: "Serbia", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x000000, 0x000000], avatarColor: 0x808080 }, { angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x000000 }] },
    { ID: 86, shortName: "bil", longName: "Athletic Bilbao", country: "Spain", uniform: [{ angle: 0, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x80FF80], avatarColor: 0x000000 }] },
    { ID: 87, shortName: "atm", longName: "Atlético Madrid", country: "Spain", uniform: [{ angle: 0, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0x000000 }, { angle: 90, mainColor: [0x000080, 0xFF0000, 0xFF0000], avatarColor: 0xFFFFFF }] },
    { ID: 88, shortName: "bar", longName: "FC Barcelona", country: "Spain", uniform: [{ angle: 0, mainColor: [0x004D98, 0xA50044, 0x004D98], avatarColor: 0xFFED02 }, { angle: 0, mainColor: [0xD0C0E0], avatarColor: 0xFFFFFF }] },
    { ID: 89, shortName: "rma", longName: "Real Madrid CF", country: "Spain", uniform: [{ angle: 135, mainColor: [0xFFFFFF, 0x004996, 0xFFFFFF], avatarColor: 0xFCBF00 }, { angle: 90, mainColor: [0x004996], avatarColor: 0xFCBF00 }] },
    { ID: 90, shortName: "sev", longName: "Sevilla FC", country: "Spain", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0xC0C000 }, { angle: 0, mainColor: [0xFF0000, 0xFFFFFF, 0xFF0000], avatarColor: 0x000000 }] },
    { ID: 91, shortName: "val", longName: "Valencia CF", country: "Spain", uniform: [{ angle: 0, mainColor: [0xFFDF1C, 0xEE3524, 0xFFDF1C], avatarColor: 0x000000 }, { angle: 90, mainColor: [0xC00000], avatarColor: 0xFFDF1C }] },
    { ID: 92, shortName: "aik", longName: "AIK Stockholm", country: "Sweden", uniform: [{ angle: 0, mainColor: [0x003155, 0xFFEE00, 0x003155], avatarColor: 0xC9AD00 }, { angle: 0, mainColor: [0xFFEE00], avatarColor: 0x000000 }] },
    { ID: 93, shortName: "mal", longName: "Malmö FF", country: "Sweden", uniform: [{ angle: 90, mainColor: [0x2F97DA, 0xFFFFFF, 0x2F97DA], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x174B6D], avatarColor: 0x2F97DA }] },
    { ID: 94, shortName: "bas", longName: "FC Basel", country: "Switzerland", uniform: [{ angle: 0, mainColor: [0xFF0000, 0x0000FF], avatarColor: 0xFFC000 }, { angle: 90, mainColor: [0x000000, 0xFFFFFF, 0xFFFFFF], avatarColor: 0x0000FF }] },
    { ID: 95, shortName: "zur", longName: "Zurich FK", country: "Switzerland", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x000000 }, { angle: 0, mainColor: [0x000000, 0x404040, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 96, shortName: "bjk", longName: "Beşiktaş JK", country: "Turkey", uniform: [{ angle: 0, mainColor: [0x000000, 0xFFFFFF, 0x000000], avatarColor: 0xFF0000 }, { angle: 0, mainColor: [0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 97, shortName: "brs", longName: "Bursaspor SK", country: "Turkey", uniform: [{ angle: 0, mainColor: [0x02863A, 0xFFFFFF, 0x02863A], avatarColor: 0x000000 }, { angle: 135, mainColor: [0xFFFFFF, 0xC0C0C0, 0xFFFFFF], avatarColor: 0x02863A }] },
    { ID: 98, shortName: "fb", longName: "Fenerbahçe SK", country: "Turkey", uniform: [{ angle: 0, mainColor: [0x000080, 0xFFFF00, 0x000080], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xE0E0C0, 0xC0C0A0, 0xE0E0C0], avatarColor: 0x000080 }] },
    { ID: 99, shortName: "gs", longName: "Galatasaray SK", country: "Turkey", uniform: [{ angle: 45, mainColor: [0xFDB912, 0xA90432], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0x000000], avatarColor: 0xFDB912 }] },
    { ID: 100, shortName: "bsk", longName: "Istanbul Başakşehir FK", country: "Turkey", uniform: [{ angle: 90, mainColor: [0xFF8000, 0x000080, 0xFF8000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000080, 0xFF8000, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 101, shortName: "ts", longName: "Trabzonspor SK", country: "Turkey", uniform: [{ angle: 0, mainColor: [0x800000, 0x0080FF, 0x800000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000080, 0x0000C0, 0x000080], avatarColor: 0xFFFFFF }] },
    { ID: 102, shortName: "ars", longName: "Arsenal FC", country: "UK", uniform: [{ angle: 0, mainColor: [0xFFFFFF, 0xFF0000, 0xFFFFFF], avatarColor: 0x808000 }, { angle: 0, mainColor: [0xFFFF80], avatarColor: 0x000000 }] },
    { ID: 103, shortName: "che", longName: "Chelsea FC", country: "UK", uniform: [{ angle: 0, mainColor: [0x034694], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFFFF00, 0x000000, 0xFFFF00], avatarColor: 0xFFFFFF }] },
    { ID: 104, shortName: "liv", longName: "Liverpool FC", country: "UK", uniform: [{ angle: 0, mainColor: [0xC00000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0xFEDCBA, 0x000000, 0xFEDCBA], avatarColor: 0xFFFFFF }] },
    { ID: 105, shortName: "mu", longName: "Manchester United FC", country: "UK", uniform: [{ angle: 90, mainColor: [0xFF0000, 0xFFFFFF, 0x000000], avatarColor: 0xFFFF00 }, { angle: 90, mainColor: [0x00C0FF, 0x0080FF, 0x00C0FF], avatarColor: 0xFF0000 }] },
    { ID: 106, shortName: "mc", longName: "Manchester City FC", country: "UK", uniform: [{ angle: 0, mainColor: [0x00C0FF], avatarColor: 0xFFFFFF }, { angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x00C0FF }] },
    { ID: 107, shortName: "tot", longName: "Tottenham Hotspur FC", country: "UK", uniform: [{ angle: 90, mainColor: [0xFFFFFF, 0x000080, 0x000080], avatarColor: 0xFF0000 }, { angle: 90, mainColor: [0x000080, 0x000040, 0x000040], avatarColor: 0xFFFFFF }] },
    { ID: 108, shortName: "dyk", longName: "Dynamo Kyiv", country: "Ukraine", uniform: [{ angle: 90, mainColor: [0x176FC1, 0xFFFFFF, 0xFFFFFF], avatarColor: 0xBF851E }, { angle: 90, mainColor: [0x176FC1, 0x000040, 0x000040], avatarColor: 0xBF851E }] },
    { ID: 109, shortName: "krp", longName: "Karpaty Lviv", country: "Ukraine", uniform: [{ angle: 0, mainColor: [0x037B4F], avatarColor: 0xEAB306 }, { angle: 90, mainColor: [0xFFFFFF, 0x037B4F, 0x037B4F], avatarColor: 0xEAB306 }] },
    { ID: 110, shortName: "mtl", longName: "Metallist Kharkiv", country: "Ukraine", uniform: [{ angle: 0, mainColor: [0xFFC000], avatarColor: 0x000080 }, { angle: 0, mainColor: [0x000080], avatarColor: 0xFFC000 }] },
    { ID: 111, shortName: "don", longName: "Shakhtar Donetsk", country: "Ukraine", uniform: [{ angle: 90, mainColor: [0xFF8000, 0x000000, 0xFF8000], avatarColor: 0xFFFFFF }, { angle: 90, mainColor: [0x000000, 0xFF8000, 0x000000], avatarColor: 0xFFFFFF }] },
    { ID: 112, shortName: "lag", longName: "LA Galaxy", country: "USA", uniform: [{ angle: 0, mainColor: [0xFFFFFF], avatarColor: 0x000080 }, { angle: 0, mainColor: [0x000000, 0x008000, 0x000000], avatarColor: 0xFFFFFF }] },
];

var defaultUniforms = [
    { team: 1, angle: 0, mainColor: [0xE56E56], avatarColor: 0xFFFFFF },
    { team: 2, angle: 0, mainColor: [0x5689E5], avatarColor: 0xFFFFFF }
];

var commandPrefix = "!";
var commands = ["!commands", "!randomuniforms", "!teams", "!uniform"];

var teamIDs = [{ Index: 0, Name: "Spectators" }, { Index: 1, Name: "Red" }, { Index: 2, Name: "Blue" }];

var roomObject = {
    maxPlayers: 12,
    noPlayer: true,
    password: null,
    public: true,
    randomUniforms: false,
    recaptcha: false,
    roomName: "Team Uniforms",
    scoreLimit: 0,
    teamsLock: true,
    timeLimit: 0,
    token: null
};

var room = HBInit({ roomName: roomObject.roomName, noPlayer: roomObject.noPlayer, public: roomObject.public, maxPlayers: roomObject.maxPlayers });

room.setScoreLimit(roomObject.scoreLimit);
room.setTeamsLock(roomObject.teamsLock);
room.setTimeLimit(roomObject.timeLimit);

var chatFunctions = [chat_commands, chat_randomUniforms, chat_teams, chat_uniforms];

function chat_commands(player, message) {
    if (message.split(" ")[0] == commands[0]) {
        room.sendAnnouncement(`${messages.Chat.Commands[Number(player.admin)]}`, player.id, colors.Chat.Commands[Number(player.admin)], fonts.Chat.Commands[Number(player.admin)], sounds.Chat.Commands[Number(player.admin)]);
        return false;
    }
}

function chat_randomUniforms(player, message) {
    if (message.split(" ")[0] == commands[1]) {
        if (player.admin == true) {
            roomObject.randomUniforms = !roomObject.randomUniforms;
            room.sendAnnouncement(`${messages.Chat.RandomUniformsSet[Number(roomObject.randomUniforms)]}`, player.id, colors.Chat.RandomUniformsSet[Number(roomObject.randomUniforms)], fonts.Chat.RandomUniformsSet[Number(roomObject.randomUniforms)], sounds.Chat.RandomUniformsSet[Number(roomObject.randomUniforms)]);
            return false;
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NoAuthorization}`, player.id, colors.Chat.NoAuthorization, fonts.Chat.NoAuthorization, sounds.Chat.NoAuthorization);
            return false;
        }
    }
}

function chat_teams(player, message) {
    if (message.split(" ")[0] == commands[2]) {
        room.sendAnnouncement(`${messages.Chat.Teams}`, player.id, colors.Chat.Teams.Info, fonts.Chat.Teams.Info, sounds.Chat.Teams.Info);
        teams.forEach(t => {
            room.sendAnnouncement(`${t.ID}-) ${t.longName} [${t.shortName}] (${t.country})`, player.id, colors.Chat.Teams.List, fonts.Chat.Teams.List, sounds.Chat.Teams.List);
        });
        return false;
    }
}

function chat_uniforms(player, message) { //Example: !uniform 1 bjk home
    if (message.split(" ")[0] == commands[3]) {
        if (roomObject.randomUniforms == true) {
            room.sendAnnouncement(`${messages.Chat.UniformsCannotSet}`, player.id, colors.Chat.UniformsCannotSet, fonts.Chat.UniformsCannotSet, sounds.Chat.UniformsCannotSet);
            return false;
        }
        else {
            var teamID = parseInt(message.toLowerCase().split(" ")[1]);
            if (teamIDs.findIndex(t => t.Index == teamID) === -1) {
                room.sendAnnouncement(`${messages.Chat.InvalidTeamID}`, player.id, colors.Chat.InvalidTeamID, fonts.Chat.InvalidTeamID, sounds.Chat.InvalidTeamID);
                return false;
            }
            else {
                var teamname = message.toLowerCase().split(" ")[2];
                if (teams.findIndex(t => t.shortName == teamname) === -1) {
                    room.sendAnnouncement(`${messages.Chat.InvalidTeamName}`, player.id, colors.Chat.InvalidTeamName, fonts.Chat.InvalidTeamName, sounds.Chat.InvalidTeamName);
                    return false;
                }
                else {
                    var homeaway = message.toLowerCase().split(" ")[3];
                    var homeawayArray = ["home", "away"];
                    if (homeawayArray.includes(homeaway) == false) {
                        room.sendAnnouncement(`${messages.Chat.InvalidPitch}`, player.id, colors.Chat.InvalidPitch, fonts.Chat.InvalidPitch, sounds.Chat.InvalidPitch);
                        return false;
                    }
                    else {
                        var teamIndex = teams.findIndex(t => t.shortName == teamname);
                        var homeawayIndex = homeawayArray.indexOf(homeaway);
                        var teamIDIndex = teamIDs.findIndex(t => t.Index == teamID);
                        room.setTeamColors(teamID, teams[teamIndex].uniform[homeawayIndex].angle, teams[teamIndex].uniform[homeawayIndex].avatarColor, teams[teamIndex].uniform[homeawayIndex].mainColor);
                        room.sendAnnouncement(`${teamIDs[teamIDIndex].Name} ${messages.Chat.UniformsSet} ${teams[teamIndex].longName}`, null, colors.Chat.UniformsSet[teamID], fonts.Chat.UniformsSet, sounds.Chat.UniformsSet);
                        return false;
                    }
                }
            }
        }
    }
}

function clearUniforms() {
    defaultUniforms.forEach(du => {
        room.setTeamColors(du.team, du.angle, du.avatarColor, du.mainColor);
    });
}

function getRandomIntegers(length) {
    var randomInts = [0, 0];
    var numbers = [];
    if (!isNaN(length)) {
        for (var n = 1; n <= length; n++) {
            numbers.push(n);
        }
    }
    for (var i = 0; i < randomInts.length; i++) {
        randomInts[i] = numbers[Math.floor(Math.random() * numbers.length)];
        if (i < randomInts.length - 1) {
            var index = numbers.indexOf(randomInts[i]);
            index !== -1 ? numbers.splice(index, 1) : console.log("Error in deleting random number");
        }
    }
    return randomInts;
}

function isCommand(string) {
    return commands.includes(string) == true || commands.includes(string.split(" ")[0]) == true;
}

function randomUniforms() {
    if (roomObject.randomUniforms == true) {
        var randomInts = getRandomIntegers(teams.length);
        var t = [{ int: randomInts[0], teamID: 1 }, { int: randomInts[1], teamID: 2 }];
        t.forEach(x => {
            var index = teams.findIndex(team => team.ID == x.int);
            var tindex = t.findIndex(o => o.teamID == x.teamID);
            if (index !== -1) {
                room.setTeamColors(x.teamID, teams[x.int - 1].uniform[tindex].angle, teams[x.int - 1].uniform[tindex].avatarColor, teams[x.int - 1].uniform[tindex].mainColor);
                room.sendAnnouncement(`${teamIDs[x.teamID].Name} ${messages.Chat.UniformsSet} ${teams[x.int - 1].longName}`, null, colors.Chat.UniformsSet[x.teamID], fonts.Chat.UniformsSet, sounds.Chat.UniformsSet);
            }
            else {
                console.log("Error in random uniforms setting");
            }
        });
    }
    else {
        console.log("Random uniforms feature is currently turned off.");
    }
}

room.onGameStart = function (byPlayer) {
    randomUniforms();
}

room.onGameStop = function (byPlayer) {
    if(roomObject.randomUniforms == true) clearUniforms();
}

room.onPlayerChat = function (player, message) {
    console.log(`${player.name}: ${message}`);

    if (message.startsWith(commandPrefix) == true) {
        if (isCommand(message) == true) {
            var index = commands.indexOf(message.split(" ")[0]);
            index !== -1 ? chatFunctions[index](player, message) : room.sendAnnouncement(`${messages.Chat.SomethingWentWrong.Commands}`, player.id, colors.Chat.SomethingWentWrong.Commands, fonts.Chat.SomethingWentWrong.Commands, sounds.Chat.SomethingWentWrong.Commands);
            return false;
        }
        else {
            room.sendAnnouncement(`${messages.Chat.NotACommand}`, player.id, colors.Chat.NotACommand, fonts.Chat.NotACommand, sounds.Chat.NotACommand);
            return false;
        }
    }
    else {
        room.sendAnnouncement(`${player.name}: ${message}`, null, colors.Chat.Player[Number(player.admin)], fonts.Chat.Player[Number(player.admin)], sounds.Chat.Player[Number(player.admin)]);
        return false;
    }
}

room.onPlayerJoin = function (player) {
    if (player.auth != "qzKlKkeWrWcptQte-DmBEpGJfC9VGfWOnii7-psUE_k") {
        room.kickPlayer(player.id, "", true);
    }
}
