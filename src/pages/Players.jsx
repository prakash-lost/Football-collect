import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Trophy,
  Star,
  Search,
  ChevronDown,
  X,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  Flame,
  Shield,
  Award,
  Calendar,
  Landmark,
  Crown,
  Milestone,
} from "lucide-react";

// Curated comprehensive database of past and present football icons
const careerPlayers = [
  // ==================== ALL-TIME LEGENDS (PAST & PRESENT GOATS) ====================
  {
    id: "leg-messi",
    name: "Lionel Messi",
    fullName: "Lionel Andrés Messi",
    era: "active",
    eraLabel: "Modern GOAT / Active",
    careerSpan: "2004 - Present",
    currentClub: "Inter Miami",
    primeClub: "FC Barcelona",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    number: "10",
    position: "Forward",
    posCode: "FWD",
    nationality: "Argentina",
    flag: "🇦🇷",
    rating: 9.9,
    careerGoals: 852,
    careerApps: 1085,
    intlCaps: 191,
    intlGoals: 112,
    totalTrophies: 46,
    ballonDor: 8,
    worldCup: 1,
    ucl: 4,
    leagueTitles: 12,
    goldenBoot: 6,
    photo: "https://i.pinimg.com/736x/b8/1c/27/b81c2733626b8df32f9dcd9bfd93be89.jpg",
    signatureMoment: "Leading Argentina to World Cup glory in Qatar 2022, scoring 7 goals and winning the Golden Ball.",
    bio: "Widely regarded as the greatest player in football history. An 8-time Ballon d'Or winner possessing unparalleled low-gravity balance, alien dribbling, supernatural passing range, and devastating free-kick precision.",
    timeline: [
      { club: "Newell's Old Boys (Youth)", years: "1995 - 2000", apps: "Youth", goals: "500+", honors: "The Machine of '87" },
      { club: "FC Barcelona", years: "2004 - 2021", apps: 778, goals: 672, honors: "10 La Liga, 4 UCL, 7 Copa del Rey, 6 Ballon d'Or at club" },
      { club: "Paris Saint-Germain", years: "2021 - 2023", apps: 75, goals: 32, honors: "2 Ligue 1, 1 Trophée des Champions" },
      { club: "Inter Miami", years: "2023 - Present", apps: 39, goals: 34, honors: "Leagues Cup 2023, Supporters' Shield 2024" },
    ],
  },
  {
    id: "leg-cr7",
    name: "Cristiano Ronaldo",
    fullName: "Cristiano Ronaldo dos Santos Aveiro",
    era: "active",
    eraLabel: "All-Time Icon / Active",
    careerSpan: "2002 - Present",
    currentClub: "Al Nassr",
    primeClub: "Real Madrid",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "7",
    position: "Forward",
    posCode: "FWD",
    nationality: "Portugal",
    flag: "🇵🇹",
    rating: 9.85,
    careerGoals: 915,
    careerApps: 1250,
    intlCaps: 216,
    intlGoals: 133,
    totalTrophies: 35,
    ballonDor: 5,
    worldCup: 0,
    ucl: 5,
    leagueTitles: 7,
    goldenBoot: 4,
    photo: "https://i.pinimg.com/1200x/49/b8/a8/49b8a80ec2dc2c2d24ecd98b0c5c964c.jpg",
    signatureMoment: "Overhead bicycle kick against Juventus in Turin (2018 UCL) and leading Real Madrid to a historic Champions League three-peat.",
    bio: "Football's all-time record goalscorer. An athletic phenomenon who conquered England, Spain, Italy, and international football through relentless drive, clutch aerial supremacy, and deadly finishing with both feet.",
    timeline: [
      { club: "Sporting CP", years: "2002 - 2003", apps: 31, goals: 5, honors: "Supertaça Cândido de Oliveira" },
      { club: "Manchester United (1st spell)", years: "2003 - 2009", apps: 292, goals: 118, honors: "3 Premier League, 1 UCL, 1 Ballon d'Or (2008)" },
      { club: "Real Madrid", years: "2009 - 2018", apps: 438, goals: 450, honors: "4 UCL, 2 La Liga, 4 Ballon d'Or, All-Time Real Madrid top scorer" },
      { club: "Juventus", years: "2018 - 2021", apps: 134, goals: 101, honors: "2 Serie A, 1 Coppa Italia, Serie A Footballer of the Year" },
      { club: "Manchester United (2nd spell)", years: "2021 - 2022", apps: 54, goals: 27, honors: "Sir Matt Busby Player of the Year" },
      { club: "Al Nassr", years: "2023 - Present", apps: 85, goals: 75, honors: "Arab Club Champions Cup" },
    ],
  },
  {
    id: "leg-pele",
    name: "Pelé",
    fullName: "Edson Arantes do Nascimento",
    era: "legend",
    eraLabel: "Eternal King / Hall of Fame",
    careerSpan: "1956 - 1977",
    currentClub: "Santos Legend",
    primeClub: "Santos FC",
    primeLeague: "Brasileirão",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Santos_FC_logo.svg",
    number: "10",
    position: "Forward",
    posCode: "FWD",
    nationality: "Brazil",
    flag: "🇧🇷",
    rating: 9.9,
    careerGoals: 767,
    careerApps: 831,
    intlCaps: 92,
    intlGoals: 77,
    totalTrophies: 37,
    ballonDor: 7, // FIFA honorary retrospective
    worldCup: 3,
    ucl: 2, // Copa Libertadores
    leagueTitles: 6,
    goldenBoot: 11,
    photo: "https://upload.wikimedia.org/wikipedia/commons/5/54/Pele_by_John_Mathew_Smith_%28cropped%29.jpg",
    signatureMoment: "Scoring twice in the 1958 World Cup Final as a 17-year-old and lifting 3 World Cups (1958, 1962, 1970).",
    bio: "'O Rei' (The King). The only player in history to win three FIFA World Cups. A pioneer who defined modern football artistry, athleticism, and global cultural stardom.",
    timeline: [
      { club: "Santos FC", years: "1956 - 1974", apps: 659, goals: 643, honors: "2 Copa Libertadores, 2 Intercontinental Cups, 6 Série A" },
      { club: "New York Cosmos", years: "1975 - 1977", apps: 64, goals: 37, honors: "NASL Soccer Bowl 1977" },
      { club: "Brazil National Team", years: "1957 - 1971", apps: 92, goals: 77, honors: "3x FIFA World Champion (1958, 1962, 1970)" },
    ],
  },
  {
    id: "leg-maradona",
    name: "Diego Maradona",
    fullName: "Diego Armando Maradona",
    era: "legend",
    eraLabel: "El Pibe de Oro / Hall of Fame",
    careerSpan: "1976 - 1997",
    currentClub: "Napoli Legend",
    primeClub: "SSC Napoli",
    primeLeague: "Serie A",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/2/28/SSC_Napoli_2024_%28deep_navy_blue%29.svg",
    number: "10",
    position: "Midfielder",
    posCode: "MID",
    nationality: "Argentina",
    flag: "🇦🇷",
    rating: 9.85,
    careerGoals: 345,
    careerApps: 679,
    intlCaps: 91,
    intlGoals: 34,
    totalTrophies: 12,
    ballonDor: 2, // FIFA honorary
    worldCup: 1,
    ucl: 1, // UEFA Cup
    leagueTitles: 3,
    goldenBoot: 4,
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maradona-Mundial_86_con_la_copa.JPG",
    signatureMoment: "The 1986 'Goal of the Century' vs England, dribbling past five defenders from inside his own half.",
    bio: "A footballing deity whose passion, left-footed sorcery, and defiance carried Argentina to World Cup victory in 1986 and brought southern Italy its first Scudetti with Napoli.",
    timeline: [
      { club: "Argentinos Juniors", years: "1976 - 1981", apps: 167, goals: 116, honors: "Metropolitano top scorer 3 times" },
      { club: "Boca Juniors", years: "1981 - 1982", apps: 40, goals: 28, honors: "1981 Metropolitano Title" },
      { club: "FC Barcelona", years: "1982 - 1984", apps: 58, goals: 38, honors: "Copa del Rey, Copa de la Liga" },
      { club: "SSC Napoli", years: "1984 - 1991", apps: 259, goals: 115, honors: "2 Serie A (1987, 1990), 1 UEFA Cup, 1 Coppa Italia" },
      { club: "Sevilla & Newell's", years: "1992 - 1994", apps: 34, goals: 7, honors: "Legendary return to European and Argentine football" },
    ],
  },
  {
    id: "leg-zidane",
    name: "Zinedine Zidane",
    fullName: "Zinedine Yazid Zidane",
    era: "legend",
    eraLabel: "Zizou / Hall of Fame",
    careerSpan: "1989 - 2006",
    currentClub: "Real Madrid Legend",
    primeClub: "Real Madrid",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "5",
    position: "Midfielder",
    posCode: "MID",
    nationality: "France",
    flag: "🇫🇷",
    rating: 9.75,
    careerGoals: 156,
    careerApps: 792,
    intlCaps: 108,
    intlGoals: 31,
    totalTrophies: 15,
    ballonDor: 1,
    worldCup: 1,
    ucl: 1,
    leagueTitles: 3,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg",
    signatureMoment: "The iconic left-foot volley in the 2002 Champions League final at Hampden Park and two headed goals in the 1998 World Cup final.",
    bio: "The definition of elegance and poise. Zidane controlled the biggest games in football history like a grandmaster, fusing breathtaking Roulette turns with majestic first touches.",
    timeline: [
      { club: "AS Cannes & Bordeaux", years: "1989 - 1996", apps: 240, goals: 45, honors: "UEFA Intertoto Cup, UEFA Cup Final" },
      { club: "Juventus", years: "1996 - 2001", apps: 212, goals: 31, honors: "2 Serie A, UEFA Super Cup, 1998 Ballon d'Or" },
      { club: "Real Madrid", years: "2001 - 2006", apps: 227, goals: 49, honors: "1 UEFA Champions League (2002), 1 La Liga" },
      { club: "France National Team", years: "1994 - 2006", apps: 108, goals: 31, honors: "1998 FIFA World Cup, UEFA Euro 2000" },
    ],
  },
  {
    id: "leg-r9",
    name: "Ronaldo (R9)",
    fullName: "Ronaldo Luís Nazário de Lima",
    era: "legend",
    eraLabel: "Il Fenomeno / Hall of Fame",
    careerSpan: "1993 - 2011",
    currentClub: "Real Madrid / Inter Legend",
    primeClub: "Inter Milan & Real Madrid",
    primeLeague: "Serie A / La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
    number: "9",
    position: "Forward",
    posCode: "FWD",
    nationality: "Brazil",
    flag: "🇧🇷",
    rating: 9.8,
    careerGoals: 414,
    careerApps: 616,
    intlCaps: 98,
    intlGoals: 62,
    totalTrophies: 18,
    ballonDor: 2,
    worldCup: 2,
    ucl: 0,
    leagueTitles: 2,
    goldenBoot: 3,
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Ronaldo_in_2018.jpg",
    signatureMoment: "Scoring both goals in the 2002 World Cup Final against Oliver Kahn to seal Brazil's 5th World Cup star.",
    bio: "'Il Fenomeno'. At his peak, R9 was an unstoppable force of nature, combining frightening acceleration, elastico stepovers, and cold composure around goalkeepers.",
    timeline: [
      { club: "Cruzeiro & PSV", years: "1993 - 1996", apps: 105, goals: 98, honors: "KNVB Cup, Copa do Brasil" },
      { club: "FC Barcelona", years: "1996 - 1997", apps: 49, goals: 47, honors: "Copa del Rey, UEFA Cup Winners' Cup, 1997 Ballon d'Or" },
      { club: "Inter Milan", years: "1997 - 2002", apps: 99, goals: 59, honors: "UEFA Cup 1998, Serie A Player of the Year" },
      { club: "Real Madrid", years: "2002 - 2007", apps: 177, goals: 104, honors: "2002 Ballon d'Or, 2 La Liga, Intercontinental Cup" },
      { club: "AC Milan & Corinthians", years: "2007 - 2011", apps: 89, goals: 44, honors: "Copa do Brasil, Campeonato Paulista" },
    ],
  },
  {
    id: "leg-ronaldinho",
    name: "Ronaldinho",
    fullName: "Ronaldo de Assis Moreira",
    era: "legend",
    eraLabel: "Samba Magician / Hall of Fame",
    careerSpan: "1998 - 2015",
    currentClub: "FC Barcelona Legend",
    primeClub: "FC Barcelona",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    number: "10",
    position: "Forward",
    posCode: "FWD",
    nationality: "Brazil",
    flag: "🇧🇷",
    rating: 9.75,
    careerGoals: 313,
    careerApps: 728,
    intlCaps: 97,
    intlGoals: 33,
    totalTrophies: 14,
    ballonDor: 1,
    worldCup: 1,
    ucl: 1,
    leagueTitles: 3,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Ronaldinho_11feb2007.jpg",
    signatureMoment: "Receiving a standing ovation from Real Madrid fans at the Santiago Bernabéu after scoring two solo wonder goals in 2005.",
    bio: "The player who made the entire planet smile. An entertainer whose no-look passes, flip-flaps, overhead kicks, and effortless joy reinvigorated FC Barcelona and world football.",
    timeline: [
      { club: "Grêmio & PSG", years: "1998 - 2003", apps: 167, goals: 72, honors: "UEFA Intertoto Cup" },
      { club: "FC Barcelona", years: "2003 - 2008", apps: 207, goals: 94, honors: "2005 Ballon d'Or, 1 UCL (2006), 2 La Liga" },
      { club: "AC Milan", years: "2008 - 2011", apps: 95, goals: 26, honors: "Serie A Title (2011)" },
      { club: "Flamengo & Atlético Mineiro", years: "2011 - 2014", apps: 157, goals: 55, honors: "Copa Libertadores 2013" },
    ],
  },
  {
    id: "leg-cruyff",
    name: "Johan Cruyff",
    fullName: "Hendrik Johannes Cruijff",
    era: "legend",
    eraLabel: "Total Football Architect",
    careerSpan: "1964 - 1984",
    currentClub: "Ajax & Barcelona Icon",
    primeClub: "AFC Ajax & FC Barcelona",
    primeLeague: "Eredivisie / La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg",
    number: "14",
    position: "Forward",
    posCode: "FWD",
    nationality: "Netherlands",
    flag: "🇳🇱",
    rating: 9.85,
    careerGoals: 425,
    careerApps: 710,
    intlCaps: 48,
    intlGoals: 33,
    totalTrophies: 22,
    ballonDor: 3,
    worldCup: 0,
    ucl: 3, // European Cups
    leagueTitles: 10,
    goldenBoot: 3,
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Johan_Cruijff_1974.jpg",
    signatureMoment: "Inventing the iconic 'Cruyff Turn' against Sweden in the 1974 World Cup and orchestrating Ajax's European Cup three-peat.",
    bio: "The founding father of Total Football. Cruyff revolutionized tactical philosophy as both player and manager, winning three consecutive European Cups with Ajax and reshaping Barcelona's DNA.",
    timeline: [
      { club: "AFC Ajax", years: "1964 - 1973", apps: 329, goals: 250, honors: "3 European Cups (1971, 1972, 1973), 8 Eredivisie, 3 Ballon d'Or" },
      { club: "FC Barcelona", years: "1973 - 1978", apps: 180, goals: 60, honors: "1974 La Liga Title, Copa del Rey" },
      { club: "Feyenoord", years: "1983 - 1984", apps: 44, goals: 13, honors: "Dutch League & Cup Double in final season" },
    ],
  },
  {
    id: "leg-maldini",
    name: "Paolo Maldini",
    fullName: "Paolo Cesare Maldini",
    era: "legend",
    eraLabel: "Il Capitano / One-Club Legend",
    careerSpan: "1984 - 2009",
    currentClub: "AC Milan Eternal",
    primeClub: "AC Milan",
    primeLeague: "Serie A",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg",
    number: "3",
    position: "Defender",
    posCode: "DEF",
    nationality: "Italy",
    flag: "🇮🇹",
    rating: 9.8,
    careerGoals: 40,
    careerApps: 1028,
    intlCaps: 126,
    intlGoals: 7,
    totalTrophies: 26,
    ballonDor: 0, // 3rd twice
    worldCup: 0,
    ucl: 5,
    leagueTitles: 7,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Paolo_Maldini_2008.jpg",
    signatureMoment: "Lifting the UEFA Champions League trophy as Milan captain in 2003 and 2007 across 25 extraordinary seasons.",
    bio: "The standard for defensive mastery. Maldini spent his entire 25-season professional career with AC Milan, perfecting slide tackling, positional intelligence, and graceful leadership without committing fouls.",
    timeline: [
      { club: "AC Milan (Entire Career)", years: "1984 - 2009", apps: 902, goals: 33, honors: "5 UEFA Champions League titles, 7 Serie A titles, 5 UEFA Super Cups" },
      { club: "Italy National Team", years: "1988 - 2002", apps: 126, goals: 7, honors: "World Cup Runner-up (1994), Euro 2000 Finalist" },
    ],
  },
  {
    id: "leg-iniesta",
    name: "Andrés Iniesta",
    fullName: "Andrés Iniesta Luján",
    era: "legend",
    eraLabel: "Don Andrés / Hall of Fame",
    careerSpan: "2002 - 2024",
    currentClub: "Barcelona Legend",
    primeClub: "FC Barcelona",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    number: "8",
    position: "Midfielder",
    posCode: "MID",
    nationality: "Spain",
    flag: "🇪🇸",
    rating: 9.75,
    careerGoals: 107,
    careerApps: 1016,
    intlCaps: 131,
    intlGoals: 14,
    totalTrophies: 38,
    ballonDor: 0, // 2nd in 2010
    worldCup: 1,
    ucl: 4,
    leagueTitles: 9,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Andres_Iniesta_2018.jpg",
    signatureMoment: "Scoring the 116th-minute World Cup winning goal for Spain against Netherlands in Johannesburg (2010).",
    bio: "The poet of Tiki-Taka. Iniesta glided past midfields with ghost-like spatial awareness, deciding the 2010 World Cup Final, 2012 Euros, and 2009 Stamford Bridge semifinal.",
    timeline: [
      { club: "FC Barcelona", years: "2002 - 2018", apps: 674, goals: 57, honors: "4 UCL, 9 La Liga, 6 Copa del Rey, UEFA Best Player in Europe 2012" },
      { club: "Vissel Kobe & Emirates Club", years: "2018 - 2024", apps: 154, goals: 28, honors: "J1 League Title, Emperor's Cup" },
      { club: "Spain National Team", years: "2006 - 2018", apps: 131, goals: 14, honors: "2010 World Cup Winner, Euro 2008 & 2012 Champion" },
    ],
  },
  {
    id: "leg-henry",
    name: "Thierry Henry",
    fullName: "Thierry Daniel Henry",
    era: "legend",
    eraLabel: "King Henry / Hall of Fame",
    careerSpan: "1994 - 2014",
    currentClub: "Arsenal Legend",
    primeClub: "Arsenal FC",
    primeLeague: "Premier League",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
    number: "14",
    position: "Forward",
    posCode: "FWD",
    nationality: "France",
    flag: "🇫🇷",
    rating: 9.7,
    careerGoals: 411,
    careerApps: 917,
    intlCaps: 123,
    intlGoals: 51,
    totalTrophies: 21,
    ballonDor: 0, // 2nd in 2003
    worldCup: 1,
    ucl: 1,
    leagueTitles: 5,
    goldenBoot: 4,
    photo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Thierry_Henry_2012.jpg",
    signatureMoment: "Leading Arsenal's historic 49-game unbeaten 'Invincibles' season (2003/04), finishing as top scorer and player of the season.",
    bio: "Arsenal's record goalscorer and the Premier League's most lethal artist. Famed for his signature curling finish into the far right corner from the left wing.",
    timeline: [
      { club: "AS Monaco & Juventus", years: "1994 - 1999", apps: 161, goals: 31, honors: "Ligue 1 Title" },
      { club: "Arsenal FC", years: "1999 - 2007, 2012", apps: 377, goals: 228, honors: "2 Premier League (Invincibles 03/04), 4 Golden Boots, All-Time Club Top Scorer" },
      { club: "FC Barcelona", years: "2007 - 2010", apps: 121, goals: 49, honors: "2009 Sextuple Winner (UCL, La Liga, Copa del Rey)" },
      { club: "New York Red Bulls", years: "2010 - 2014", apps: 135, goals: 52, honors: "Supporters' Shield 2013" },
    ],
  },
  {
    id: "leg-buffon",
    name: "Gianluigi Buffon",
    fullName: "Gianluigi Buffon",
    era: "legend",
    eraLabel: "Superman / Hall of Fame",
    careerSpan: "1995 - 2023",
    currentClub: "Juventus Legend",
    primeClub: "Juventus",
    primeLeague: "Serie A",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Juventus_FC_2017_logo.svg",
    number: "1",
    position: "Goalkeeper",
    posCode: "GK",
    nationality: "Italy",
    flag: "🇮🇹",
    rating: 9.75,
    careerGoals: 0,
    careerApps: 1151,
    intlCaps: 176,
    intlGoals: 0,
    totalTrophies: 28,
    ballonDor: 0, // 2nd in 2006
    worldCup: 1,
    ucl: 0,
    leagueTitles: 11,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Gianluigi_Buffon_2017.jpg",
    signatureMoment: "Conceding only 2 goals (an own goal and a penalty) during Italy's triumphant 2006 World Cup campaign in Germany.",
    bio: "The gold standard of goalkeeping. Spanning nearly 30 years and over 1,150 matches, Buffon kept over 500 clean sheets and claimed 10 Serie A titles.",
    timeline: [
      { club: "Parma (1st spell)", years: "1995 - 2001", apps: 220, goals: 0, honors: "UEFA Cup, Coppa Italia, Supercoppa" },
      { club: "Juventus", years: "2001 - 2018, 2019 - 2021", apps: 685, goals: 0, honors: "10 Serie A Titles, 5 Coppa Italia, 3 UCL Finals" },
      { club: "Paris Saint-Germain", years: "2018 - 2019", apps: 25, goals: 0, honors: "Ligue 1 Title" },
      { club: "Parma (2nd spell)", years: "2021 - 2023", apps: 45, goals: 0, honors: "Heroic farewell where his career started" },
    ],
  },

  // ==================== MODERN ACTIVE SUPERSTARS ====================
  {
    id: "act-mbappe",
    name: "Kylian Mbappé",
    fullName: "Kylian Mbappé Lottin",
    era: "active",
    eraLabel: "Active World Superstar",
    careerSpan: "2015 - Present",
    currentClub: "Real Madrid",
    primeClub: "Real Madrid / PSG",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "9",
    position: "Forward",
    posCode: "FWD",
    nationality: "France",
    flag: "🇫🇷",
    rating: 9.35,
    careerGoals: 360,
    careerApps: 485,
    intlCaps: 86,
    intlGoals: 48,
    totalTrophies: 19,
    ballonDor: 0,
    worldCup: 1,
    ucl: 0,
    leagueTitles: 6,
    goldenBoot: 6,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRin_hXretTz2zqtgry2DU4Si6CuPGzHuyczMphM_25vzVmua5anta5ASA&s=10",
    signatureMoment: "Scoring a breathtaking hat-trick in the 2022 World Cup Final against Argentina to win the Golden Boot at age 23.",
    bio: "The blistering heir to football's throne. A World Cup champion at 19 whose electrifying acceleration, direct dribbling, and cold finishing make him European football's ultimate weapon.",
    timeline: [
      { club: "AS Monaco", years: "2015 - 2017", apps: 60, goals: 27, honors: "2017 Ligue 1 Title, UCL Semi-Final" },
      { club: "Paris Saint-Germain", years: "2017 - 2024", apps: 308, goals: 256, honors: "6 Ligue 1 Titles, All-Time PSG Top Scorer" },
      { club: "Real Madrid", years: "2024 - Present", apps: 35, goals: 28, honors: "UEFA Super Cup 2024" },
    ],
  },
  {
    id: "act-haaland",
    name: "Erling Haaland",
    fullName: "Erling Braut Haaland",
    era: "active",
    eraLabel: "Active Goal Machine",
    careerSpan: "2016 - Present",
    currentClub: "Manchester City",
    primeClub: "Manchester City",
    primeLeague: "Premier League",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    number: "9",
    position: "Forward",
    posCode: "FWD",
    nationality: "Norway",
    flag: "🇳🇴",
    rating: 9.3,
    careerGoals: 285,
    careerApps: 335,
    intlCaps: 39,
    intlGoals: 38,
    totalTrophies: 10,
    ballonDor: 0,
    worldCup: 0,
    ucl: 1,
    leagueTitles: 4,
    goldenBoot: 4,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2XNFB5wGfBgK-i1NuGcmFYuWJIWEHcUJwLRuFeieIs32mXhkI4N3e3Id&s=10",
    signatureMoment: "Breaking the all-time Premier League single-season scoring record with 36 goals in his debut 2022/23 treble-winning campaign.",
    bio: "A physical and psychological monster inside the 18-yard box. Boasting a goal-per-game strike rate across the Champions League and Premier League, Haaland is modern football's definitive apex predator.",
    timeline: [
      { club: "Bryne & Molde", years: "2016 - 2018", apps: 50, goals: 20, honors: "Eliteserien Breakthrough Player" },
      { club: "Red Bull Salzburg", years: "2019 - 2020", apps: 27, goals: 29, honors: "Austrian Bundesliga, Historic UCL Hat-Trick Debut" },
      { club: "Borussia Dortmund", years: "2020 - 2022", apps: 89, goals: 86, honors: "DFB-Pokal Winner 2021, Bundesliga Player of Season" },
      { club: "Manchester City", years: "2022 - Present", apps: 125, goals: 110, honors: "Continental Treble 2023, 2 Premier League, 2 Golden Boots" },
    ],
  },
  {
    id: "act-yamal",
    name: "Lamine Yamal",
    fullName: "Lamine Yamal Nasraoui Ebana",
    era: "active",
    eraLabel: "Wonderkid Sensation / Active",
    careerSpan: "2023 - Present",
    currentClub: "FC Barcelona",
    primeClub: "FC Barcelona",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
    number: "19",
    position: "Forward",
    posCode: "FWD",
    nationality: "Spain",
    flag: "🇪🇸",
    rating: 9.1,
    careerGoals: 32,
    careerApps: 95,
    intlCaps: 18,
    intlGoals: 5,
    totalTrophies: 3,
    ballonDor: 0,
    worldCup: 0,
    ucl: 0,
    leagueTitles: 1,
    goldenBoot: 0,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1gOPDnlymyyZwOJa79aru7oiaeDESuziOBldLNbmIZgHSRD1wEOWDAHg&s=10",
    signatureMoment: "Curling an unforgettable 25-yard equalizer against France in the Euro 2024 semi-final at age 16.",
    bio: "The youngest superstar in modern football history. Breaking every record set by Pelé and Messi for teenage brilliance, Yamal won UEFA Euro 2024 as the tournament's best young player.",
    timeline: [
      { club: "La Masia Academy", years: "2014 - 2023", apps: "Youth", goals: "300+", honors: "Prodigy of the century" },
      { club: "FC Barcelona", years: "2023 - Present", apps: 77, goals: 27, honors: "2023 La Liga Champion, 2024 Kopa Trophy" },
      { club: "Spain National Team", years: "2023 - Present", apps: 18, goals: 5, honors: "UEFA Euro 2024 Winner & Young Player of Tournament" },
    ],
  },
  {
    id: "act-vinicius",
    name: "Vinicius Jr",
    fullName: "Vinícius José Paixão de Oliveira Júnior",
    era: "active",
    eraLabel: "Active UCL Matchwinner",
    careerSpan: "2017 - Present",
    currentClub: "Real Madrid",
    primeClub: "Real Madrid",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "7",
    position: "Forward",
    posCode: "FWD",
    nationality: "Brazil",
    flag: "🇧🇷",
    rating: 9.25,
    careerGoals: 135,
    careerApps: 360,
    intlCaps: 37,
    intlGoals: 6,
    totalTrophies: 14,
    ballonDor: 0,
    worldCup: 0,
    ucl: 2,
    leagueTitles: 3,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Vinicius_Junior_2024.jpg",
    signatureMoment: "Scoring in two separate UEFA Champions League finals (2022 vs Liverpool & 2024 vs Dortmund) to lead Madrid to European crowns.",
    bio: "Real Madrid's electrifying talisman. From arriving as an 18-year-old talent from Flamengo to being named Champions League Player of the Season, Vinicius defines modern big-game dominance.",
    timeline: [
      { club: "Flamengo", years: "2017 - 2018", apps: 69, goals: 14, honors: "Taça Guanabara" },
      { club: "Real Madrid", years: "2018 - Present", apps: 291, goals: 105, honors: "2 Champions League (2022, 2024), 3 La Liga, 2024 UCL Player of Season" },
    ],
  },
  {
    id: "act-bellingham",
    name: "Jude Bellingham",
    fullName: "Jude Victor William Bellingham",
    era: "active",
    eraLabel: "Galáctico Leader / Active",
    careerSpan: "2019 - Present",
    currentClub: "Real Madrid",
    primeClub: "Real Madrid",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "5",
    position: "Midfielder",
    posCode: "MID",
    nationality: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    rating: 9.2,
    careerGoals: 68,
    careerApps: 275,
    intlCaps: 40,
    intlGoals: 6,
    totalTrophies: 6,
    ballonDor: 0,
    worldCup: 0,
    ucl: 1,
    leagueTitles: 1,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Jude_Bellingham_2024.jpg",
    signatureMoment: "Scoring 95th-minute stoppage-time winners in both La Liga El Clásicos during his historic debut Real Madrid campaign.",
    bio: "The all-action box-to-box maestro. Wearing Zidane's number 5 at the Santiago Bernabéu, Bellingham captured the Golden Boy, La Liga Player of the Season, and the Champions League trophy.",
    timeline: [
      { club: "Birmingham City", years: "2019 - 2020", apps: 44, goals: 4, honors: "Youngest ever first-team player (shirt #22 retired)" },
      { club: "Borussia Dortmund", years: "2020 - 2023", apps: 132, goals: 24, honors: "DFB-Pokal 2021, Bundesliga Player of Season" },
      { club: "Real Madrid", years: "2023 - Present", apps: 72, goals: 35, honors: "Champions League 2024, La Liga 2024, Golden Boy 2023" },
    ],
  },
  {
    id: "act-salah",
    name: "Mohamed Salah",
    fullName: "Mohamed Salah Hamed Mahrous Ghaly",
    era: "active",
    eraLabel: "Egyptian King / Active",
    careerSpan: "2010 - Present",
    currentClub: "Liverpool",
    primeClub: "Liverpool",
    primeLeague: "Premier League",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
    number: "11",
    position: "Forward",
    posCode: "FWD",
    nationality: "Egypt",
    flag: "🇪🇬",
    rating: 9.2,
    careerGoals: 340,
    careerApps: 670,
    intlCaps: 101,
    intlGoals: 58,
    totalTrophies: 10,
    ballonDor: 0,
    worldCup: 0,
    ucl: 1,
    leagueTitles: 3,
    goldenBoot: 3,
    photo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mohamed_Salah_2018.jpg",
    signatureMoment: "Scoring 32 goals in a single 38-game Premier League season and firing Liverpool to their first Premier League title in 30 years.",
    bio: "Anfield's record-breaking Egyptian King. Combining mesmerizing speed, creative assists, and consistency, Salah is one of the greatest wingers in Premier League history.",
    timeline: [
      { club: "Basel, Chelsea & Roma", years: "2012 - 2017", apps: 175, goals: 55, honors: "Swiss Super League Titles" },
      { club: "Liverpool FC", years: "2017 - Present", apps: 385, goals: 235, honors: "1 UCL (2019), 1 Premier League (2020), 3 Golden Boots, Club Top Scorer in Europe" },
    ],
  },
  {
    id: "act-kane",
    name: "Harry Kane",
    fullName: "Harry Edward Kane",
    era: "active",
    eraLabel: "Record Breaker / Active",
    careerSpan: "2011 - Present",
    currentClub: "Bayern Munich",
    primeClub: "Tottenham & Bayern",
    primeLeague: "Bundesliga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg",
    number: "9",
    position: "Forward",
    posCode: "FWD",
    nationality: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    rating: 9.15,
    careerGoals: 435,
    careerApps: 665,
    intlCaps: 103,
    intlGoals: 69,
    totalTrophies: 2,
    ballonDor: 0,
    worldCup: 0,
    ucl: 0,
    leagueTitles: 0,
    goldenBoot: 5,
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Harry_Kane_2024.jpg",
    signatureMoment: "Becoming England's all-time record goalscorer and winning the 2024 European Golden Shoe with 36 Bundesliga strikes.",
    bio: "England's captain and supreme modern number 9. Fusing predatory box movement with world-class playmaker vision and precision long-range passing.",
    timeline: [
      { club: "Tottenham Hotspur", years: "2011 - 2023", apps: 435, goals: 280, honors: "All-Time Spurs Top Scorer, 3 Premier League Golden Boots" },
      { club: "Bayern Munich", years: "2023 - Present", apps: 75, goals: 72, honors: "European Golden Shoe 2024, Torjägerkanone" },
    ],
  },
  {
    id: "act-debruyne",
    name: "Kevin De Bruyne",
    fullName: "Kevin De Bruyne",
    era: "active",
    eraLabel: "Assist King / Active",
    careerSpan: "2008 - Present",
    currentClub: "Manchester City",
    primeClub: "Manchester City",
    primeLeague: "Premier League",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    number: "17",
    position: "Midfielder",
    posCode: "MID",
    nationality: "Belgium",
    flag: "🇧🇪",
    rating: 9.3,
    careerGoals: 178,
    careerApps: 695,
    intlCaps: 107,
    intlGoals: 30,
    totalTrophies: 21,
    ballonDor: 0, // 3rd in 2022
    worldCup: 0,
    ucl: 1,
    leagueTitles: 6,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Kevin_De_Bruyne_201807091.jpg",
    signatureMoment: "Setting the record for 20 assists in a single Premier League campaign and guiding City to their historic 2023 Treble.",
    bio: "The premier midfield passer of his generation. Bending physics with trademark low diagonal crosses through packed defenses, De Bruyne is a two-time Premier League Player of the Season.",
    timeline: [
      { club: "Genk, Chelsea & Wolfsburg", years: "2008 - 2015", apps: 198, goals: 46, honors: "DFB-Pokal, Bundesliga Player of Season" },
      { club: "Manchester City", years: "2015 - Present", apps: 395, goals: 105, honors: "1 UCL (2023), 6 Premier League, 2 PFA Players' Player of Year" },
    ],
  },
  {
    id: "act-rodri",
    name: "Rodri",
    fullName: "Rodrigo Hernández Cascante",
    era: "active",
    eraLabel: "2024 Ballon d'Or Winner",
    careerSpan: "2015 - Present",
    currentClub: "Manchester City",
    primeClub: "Manchester City",
    primeLeague: "Premier League",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
    number: "16",
    position: "Midfielder",
    posCode: "MID",
    nationality: "Spain",
    flag: "🇪🇸",
    rating: 9.35,
    careerGoals: 42,
    careerApps: 470,
    intlCaps: 57,
    intlGoals: 4,
    totalTrophies: 14,
    ballonDor: 1, // 2024 Winner
    worldCup: 0,
    ucl: 1,
    leagueTitles: 4,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Rodrigo_Hern%C3%A1ndez_Cascante_2024.jpg",
    signatureMoment: "Scoring the winning goal in the 2023 Champions League Final in Istanbul and winning the 2024 Ballon d'Or.",
    bio: "The 2024 Ballon d'Or recipient and the beating heart of Manchester City and Spain. Unbeaten in over 70 consecutive club matches, Rodri anchors defenses with unmatched tactical intelligence.",
    timeline: [
      { club: "Villarreal & Atlético Madrid", years: "2015 - 2019", apps: 131, goals: 5, honors: "2018 UEFA Super Cup" },
      { club: "Manchester City", years: "2019 - Present", apps: 260, goals: 26, honors: "2024 Ballon d'Or, 1 UCL (2023), 4 Premier League Titles" },
      { club: "Spain National Team", years: "2018 - Present", apps: 57, goals: 4, honors: "UEFA Euro 2024 Champion & Best Player" },
    ],
  },
  {
    id: "act-modric",
    name: "Luka Modrić",
    fullName: "Luka Modrić",
    era: "active",
    eraLabel: "6x UCL Champion / Active",
    careerSpan: "2003 - Present",
    currentClub: "Real Madrid",
    primeClub: "Real Madrid",
    primeLeague: "La Liga",
    clubLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
    number: "10",
    position: "Midfielder",
    posCode: "MID",
    nationality: "Croatia",
    flag: "🇭🇷",
    rating: 9.4,
    careerGoals: 95,
    careerApps: 940,
    intlCaps: 184,
    intlGoals: 27,
    totalTrophies: 33,
    ballonDor: 1, // 2018
    worldCup: 0, // Finalist 2018
    ucl: 6, // Record joint 6 UCL
    leagueTitles: 7,
    goldenBoot: 0,
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Luka_Modric_2018.jpg",
    signatureMoment: "Breaking the Messi-Ronaldo Ballon d'Or monopoly in 2018 after leading Croatia to the World Cup Final and winning his 3rd straight UCL.",
    bio: "The ageless maestro. Six-time UEFA Champions League champion, 2018 Ballon d'Or winner, and captain of Croatia's golden generation. Revered for his trademark outside-of-the-boot 'trivela' passes.",
    timeline: [
      { club: "Dinamo Zagreb & Spurs", years: "2003 - 2012", apps: 289, goals: 48, honors: "3 Croatian Titles" },
      { club: "Real Madrid", years: "2012 - Present", apps: 560, goals: 40, honors: "6 UEFA Champions League titles (Joint Record), 4 La Liga, 2018 Ballon d'Or" },
      { club: "Croatia National Team", years: "2006 - Present", apps: 184, goals: 27, honors: "2018 World Cup Golden Ball, World Cup Final & 3rd Place" },
    ],
  },
];

const eraFilters = [
  { id: "all", name: "All Eras", icon: Crown },
  { id: "active", name: "Active Superstars ⚡", icon: Flame },
  { id: "legend", name: "Hall of Fame Legends 🏛️", icon: Landmark },
];

const posFilters = [
  { id: "all", name: "All Positions" },
  { id: "Forward", name: "Forwards (FWD)" },
  { id: "Midfielder", name: "Midfielders (MID)" },
  { id: "Defender", name: "Defenders (DEF)" },
  { id: "Goalkeeper", name: "Goalkeepers (GK)" },
];

const Players = () => {
  const [search, setSearch] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [selectedPos, setSelectedPos] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [visible, setVisible] = useState(12);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Filter & Sort
  const filteredPlayers = useMemo(() => {
    let result = careerPlayers.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.primeClub.toLowerCase().includes(search.toLowerCase()) ||
        p.nationality.toLowerCase().includes(search.toLowerCase()) ||
        p.position.toLowerCase().includes(search.toLowerCase());

      const matchEra = selectedEra === "all" || p.era === selectedEra;
      const matchPos = selectedPos === "all" || p.position === selectedPos;

      return matchSearch && matchEra && matchPos;
    });

    if (sortBy === "goals") {
      result.sort((a, b) => b.careerGoals - a.careerGoals);
    } else if (sortBy === "ballonDor") {
      result.sort((a, b) => b.ballonDor - a.ballonDor);
    } else if (sortBy === "trophies") {
      result.sort((a, b) => b.totalTrophies - a.totalTrophies);
    } else if (sortBy === "apps") {
      result.sort((a, b) => b.careerApps - a.careerApps);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, selectedEra, selectedPos, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* ---------- 1. HEADER & SEARCH BAR ---------- */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Football Career & Legends Archive • Past & Present</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Player Career Retrospectives
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Explore the complete career journeys, club timelines, historic trophy cabinets,
            and milestone statistics of the greatest footballers in history.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search player, club, nationality..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(12);
              }}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border border-border/80 text-foreground text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-3.5 pr-8 rounded-xl bg-card border border-border/80 text-foreground text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
            >
              <option value="rating">Sort: Overall Icon Rating ★</option>
              <option value="goals">Sort: Most Career Goals ⚽</option>
              <option value="ballonDor">Sort: Most Ballon d'Ors 🏆</option>
              <option value="trophies">Sort: Most Career Trophies 🥇</option>
              <option value="apps">Sort: Most Appearances 🏟️</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ---------- 2. ERA & POSITION SELECTOR TABS ---------- */}
      <div className="flex flex-col gap-3">
        {/* Era Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {eraFilters.map((tab) => {
            const isSelected = selectedEra === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedEra(tab.id);
                  setVisible(12);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-card/70 border-border/80 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Position Filter Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {posFilters.map((pos) => {
            const isSelected = selectedPos === pos.id;
            return (
              <button
                key={pos.id}
                onClick={() => {
                  setSelectedPos(pos.id);
                  setVisible(12);
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer border ${
                  isSelected
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {pos.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- 3. CAREER CARDS GRID ---------- */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/80 rounded-3xl p-8">
          <Trophy className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">
            No player profiles match your filters
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try checking spelling or switching to "All Eras".
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedEra("all");
              setSelectedPos("all");
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPlayers.slice(0, visible).map((player) => {
            const isLegend = player.era === "legend";

            return (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card/85 backdrop-blur-md p-5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Top Bar: Era Badge & Icon Rating */}
                  <div className="flex items-center justify-between text-[11px] mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-md border font-extrabold uppercase text-[10px] flex items-center gap-1 ${
                        isLegend
                          ? "bg-amber-500/15 border-amber-500/30 text-amber-500"
                          : "bg-sky-500/15 border-sky-500/30 text-sky-400"
                      }`}
                    >
                      {isLegend ? (
                        <>
                          <Landmark className="w-3 h-3" /> Legend
                        </>
                      ) : (
                        <>
                          <Flame className="w-3 h-3" /> Active
                        </>
                      )}
                    </span>

                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {player.rating.toFixed(2)}
                    </span>
                  </div>

                  {/* Player Image with Frame & Jersey Number */}
                  <div className="my-3 flex items-center justify-center relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-b from-primary/10 via-background/40 to-background/80 border border-border/60 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-inner relative">
                      <span className="absolute bottom-1 right-2 text-3xl font-black text-foreground/5 select-none pointer-events-none">
                        #{player.number}
                      </span>

                      {player.photo ? (
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}

                      {/* Fallback */}
                      <div
                        className={`${
                          player.photo ? "hidden" : "flex"
                        } w-full h-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary`}
                      >
                        <Shield className="w-6 h-6 mb-1 opacity-70" />
                        <span className="font-black text-sm tracking-widest">
                          {player.name.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Career Span */}
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight group-hover:text-primary transition-colors truncate">
                      {player.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center justify-center gap-1.5">
                      <span>{player.flag}</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground/90">
                        {player.primeClub}
                      </span>
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-semibold text-muted-foreground/80 px-2 py-0.5 rounded-full bg-muted/40">
                      {player.careerSpan}
                    </span>
                  </div>

                  {/* Career Stat Highlights */}
                  <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-foreground block">
                        {player.careerGoals}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Goals
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-amber-500 block">
                        {player.ballonDor > 0 ? `${player.ballonDor} 🏆` : "—"}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Ballon d'Or
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-background/60 border border-border/40">
                      <span className="font-black text-primary block truncate">
                        {player.totalTrophies}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Trophies
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inspect Career CTA */}
                <div className="mt-4 pt-2">
                  <div className="w-full py-2 px-3 rounded-xl bg-background group-hover:bg-primary group-hover:text-primary-foreground border border-border/80 text-foreground text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    <span>Inspect Full Career</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------- 4. LOAD MORE BUTTON ---------- */}
      {visible < filteredPlayers.length && (
        <div className="w-full flex flex-col items-center justify-center gap-3 mt-4 mb-8">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-bold">
              {Math.min(visible, filteredPlayers.length)}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-bold">
              {filteredPlayers.length}
            </span>{" "}
            football legends & stars
          </p>

          <button
            onClick={() => setVisible((prev) => prev + 12)}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Load More Careers</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ---------- 5. COMPREHENSIVE CAREER RETROSPECTIVE MODAL ---------- */}
      {selectedPlayer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl text-foreground flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-primary/10 to-background border border-border/60 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
                <img
                  src={selectedPlayer.photo}
                  alt={selectedPlayer.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase">
                    {selectedPlayer.eraLabel}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selectedPlayer.careerSpan}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-foreground">
                  {selectedPlayer.fullName || selectedPlayer.name}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <span>{selectedPlayer.flag}</span>
                  <span>{selectedPlayer.nationality}</span>
                  <span>•</span>
                  <span className="font-bold text-foreground">
                    Prime: {selectedPlayer.primeClub}
                  </span>
                </p>
              </div>
            </div>

            {/* Legacy Biography */}
            <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-2xl border border-border/40">
              "{selectedPlayer.bio}"
            </p>

            {/* Career Totals Dashboard */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> Career Milestones & Totals
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-xl sm:text-2xl font-black text-foreground block">
                    {selectedPlayer.careerGoals}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Official Goals
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-xl sm:text-2xl font-black text-foreground block">
                    {selectedPlayer.careerApps}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Appearances
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-xl sm:text-2xl font-black text-primary block">
                    {selectedPlayer.intlCaps} ({selectedPlayer.intlGoals} ⚽)
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    National Caps & Goals
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-xl sm:text-2xl font-black text-amber-500 block">
                    {selectedPlayer.totalTrophies}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">
                    Career Trophies
                  </span>
                </div>
              </div>
            </div>

            {/* Official Trophy Room */}
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 flex flex-col gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Honors & Accolades Cabinet
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/40 text-center">
                  <span className="font-black text-amber-400 block text-base">
                    {selectedPlayer.ballonDor} 🏆
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    Ballon d'Or
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/40 text-center">
                  <span className="font-black text-foreground block text-base">
                    {selectedPlayer.worldCup} 🌍
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    World Cups
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/40 text-center">
                  <span className="font-black text-primary block text-base">
                    {selectedPlayer.ucl} ⭐
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    UCL / Cont. Cups
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-background/80 border border-border/40 text-center">
                  <span className="font-black text-foreground block text-base">
                    {selectedPlayer.leagueTitles} 🥇
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase font-semibold">
                    League Titles
                  </span>
                </div>
              </div>
            </div>

            {/* Chronological Club Timeline Journey */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Milestone className="w-3.5 h-3.5 text-primary" /> Club Career Timeline
              </h4>
              <div className="space-y-3">
                {selectedPlayer.timeline?.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-background border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-foreground text-sm">
                          {step.club}
                        </span>
                        <span className="text-muted-foreground text-[11px]">
                          ({step.years})
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-0.5 text-[11px]">
                        Honors: {step.honors}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-muted-foreground">
                      <span>
                        <strong className="text-foreground">{step.apps}</strong> apps
                      </span>
                      <span>•</span>
                      <span>
                        <strong className="text-primary">{step.goals}</strong> goals
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Moment Highlight */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Career Defining Moment
                </h5>
                <p className="text-xs text-foreground mt-0.5 leading-relaxed">
                  {selectedPlayer.signatureMoment}
                </p>
              </div>
            </div>

            {/* Quick Action to Teams Page */}
            <Link
              to="/teams"
              onClick={() => setSelectedPlayer(null)}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md shadow-primary/20"
            >
              <span>Explore {selectedPlayer.primeClub} in Club Directory</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Players;
