import { NounCategory } from '../types';

interface TemplatesByCategory {
  [key: string]: {
    indefinite: Array<{ sv: string; en: string }>;
    definite: Array<{ sv: string; en: string }>;
    indefinitePlural: Array<{ sv: string; en: string }>;
    definitePlural: Array<{ sv: string; en: string }>;
  };
}

export const templates: TemplatesByCategory = {
  animals: {
    indefinite: [
      { sv: "Jag ser ___ {noun} i parken", en: "I see a {noun} in the park" },
      { sv: "Vi har ___ {noun} hemma", en: "We have a {noun} at home" },
      { sv: "Min granne har ___ {noun}", en: "My neighbor has a {noun}" },
      { sv: "Det finns ___ {noun} i trädgården", en: "There is a {noun} in the garden" },
      { sv: "Jag vill ha ___ {noun}", en: "I want a {noun}" },
      { sv: "Min syster önskar sig ___ {noun}", en: "My sister wishes for a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ springer snabbt", en: "The {noun} runs fast" },
      { sv: "{noun}___ äter mat", en: "The {noun} is eating food" },
      { sv: "{noun}___ sover i sin bädd", en: "The {noun} is sleeping in its bed" },
      { sv: "{noun}___ leker i gräset", en: "The {noun} is playing in the grass" },
      { sv: "{noun}___ gömmer sig under sängen", en: "The {noun} is hiding under the bed" },
      { sv: "{noun}___ följer efter mig", en: "The {noun} follows me" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} här", en: "There are many {noun} here" },
      { sv: "Vi ser några {noun} i skogen", en: "We see some {noun} in the forest" },
      { sv: "De har flera {noun} på gården", en: "They have several {noun} in the yard" },
      { sv: "Jag gillar att mata {noun}", en: "I like feeding {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är vackra", en: "The {noun} are beautiful" },
      { sv: "{noun}___ lever i naturen", en: "The {noun} live in nature" },
      { sv: "{noun}___ kommer varje morgon", en: "The {noun} come every morning" },
      { sv: "{noun}___ behöver mat", en: "The {noun} need food" }
    ]
  },
  furniture: {
    indefinite: [
      { sv: "Vi har köpt ___ {noun}", en: "We have bought a {noun}" },
      { sv: "Det står ___ {noun} i rummet", en: "There is a {noun} in the room" },
      { sv: "Jag behöver ___ {noun} till mitt rum", en: "I need a {noun} for my room" }
    ],
    definite: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ passar perfekt här", en: "The {noun} fits perfectly here" },
      { sv: "{noun}___ är gjord av trä", en: "The {noun} is made of wood" }
    ],
    indefinitePlural: [
      { sv: "Vi har flera {noun}", en: "We have several {noun}" },
      { sv: "De säljer fina {noun}", en: "They sell nice {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är moderna", en: "The {noun} are modern" },
      { sv: "{noun}___ kommer från IKEA", en: "The {noun} are from IKEA" }
    ]
  },
  clothing: {
    indefinite: [
      { sv: "Jag har köpt ___ {noun}", en: "I have bought a {noun}" },
      { sv: "Hon behöver ___ {noun}", en: "She needs a {noun}" },
      { sv: "Jag provar ___ {noun}", en: "I'm trying on a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ passar bra", en: "The {noun} fits well" },
      { sv: "{noun}___ är för stor", en: "The {noun} is too big" },
      { sv: "{noun}___ är i tvätten", en: "The {noun} is in the laundry" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} i affären", en: "There are many {noun} in the store" },
      { sv: "Jag behöver nya {noun}", en: "I need new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ ligger i garderoben", en: "The {noun} are in the closet" },
      { sv: "{noun}___ är på rea", en: "The {noun} are on sale" }
    ]
  },
  food: {
    indefinite: [
      { sv: "Jag äter ___ {noun}", en: "I am eating a {noun}" },
      { sv: "Hon lagar ___ {noun}", en: "She is cooking a {noun}" },
      { sv: "Kan jag få ___ {noun}, tack?", en: "Can I have a {noun}, please?" },
      { sv: "Vi delar ___ {noun}", en: "We are sharing a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ smakar gott", en: "The {noun} tastes good" },
      { sv: "{noun}___ är färsk", en: "The {noun} is fresh" },
      { sv: "{noun}___ är varm", en: "The {noun} is hot" },
      { sv: "{noun}___ kommer från Sverige", en: "The {noun} comes from Sweden" }
    ],
    indefinitePlural: [
      { sv: "De säljer färska {noun}", en: "They sell fresh {noun}" },
      { sv: "Vi köper några {noun}", en: "We are buying some {noun}" },
      { sv: "Jag älskar {noun}", en: "I love {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ ligger i kylen", en: "The {noun} are in the fridge" },
      { sv: "{noun}___ är slut", en: "The {noun} are finished" },
      { sv: "{noun}___ är hemlagade", en: "The {noun} are homemade" }
    ]
  },
  "body parts": {
    indefinite: [
      { sv: "Hon har ont i ___ {noun}", en: "She has pain in a {noun}" },
      { sv: "Läkaren undersöker ___ {noun}", en: "The doctor examines a {noun}" },
      { sv: "Han skadade ___ {noun}", en: "He injured a {noun}" },
      { sv: "Hon har ___ {noun} som värker", en: "She has a {noun} that hurts" },
      { sv: "Jag måste träna ___ {noun}", en: "I need to exercise a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ gör ont", en: "The {noun} hurts" },
      { sv: "{noun}___ är stark", en: "The {noun} is strong" },
      { sv: "{noun}___ läker bra", en: "The {noun} is healing well" },
      { sv: "{noun}___ behöver vila", en: "The {noun} needs rest" },
      { sv: "{noun}___ känns bättre nu", en: "The {noun} feels better now" }
    ],
    indefinitePlural: [
      { sv: "Hon tränar sina {noun}", en: "She exercises her {noun}" },
      { sv: "Barn har små {noun}", en: "Children have small {noun}" },
      { sv: "Vi måste stärka våra {noun}", en: "We must strengthen our {noun}" },
      { sv: "Det är viktigt att stretcha {noun}", en: "It's important to stretch {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är starka", en: "The {noun} are strong" },
      { sv: "{noun}___ behöver vila", en: "The {noun} need rest" },
      { sv: "{noun}___ fungerar bra tillsammans", en: "The {noun} work well together" },
      { sv: "{noun}___ blir trötta efter träning", en: "The {noun} get tired after exercise" }
    ]
  },
  technology: {
    indefinite: [
      { sv: "Jag köpte ___ {noun}", en: "I bought a {noun}" },
      { sv: "Hon använder ___ {noun}", en: "She uses a {noun}" },
      { sv: "Vi behöver ___ {noun}", en: "We need a {noun}" },
      { sv: "Han har ___ {noun}", en: "He has a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ fungerar inte", en: "The {noun} doesn't work" },
      { sv: "{noun}___ är snabb", en: "The {noun} is fast" },
      { sv: "{noun}___ behöver uppdateras", en: "The {noun} needs updating" }
    ],
    indefinitePlural: [
      { sv: "De säljer moderna {noun}", en: "They sell modern {noun}" },
      { sv: "Vi har många {noun}", en: "We have many {noun}" },
      { sv: "Skolan har nya {noun}", en: "The school has new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är dyra", en: "The {noun} are expensive" },
      { sv: "{noun}___ måste lagas", en: "The {noun} need to be repaired" },
      { sv: "{noun}___ är avstängda", en: "The {noun} are turned off" }
    ]
  },
  profession: {
    indefinite: [
      { sv: "Min vän är ___ {noun}", en: "My friend is a {noun}" },
      { sv: "De söker ___ {noun}", en: "They are looking for a {noun}" },
      { sv: "Hon vill bli ___ {noun}", en: "She wants to become a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ arbetar hårt", en: "The {noun} works hard" },
      { sv: "{noun}___ kommer snart", en: "The {noun} is coming soon" },
      { sv: "{noun}___ har semester", en: "The {noun} is on vacation" }
    ],
    indefinitePlural: [
      { sv: "Vi behöver fler {noun}", en: "We need more {noun}" },
      { sv: "Det finns många {noun} här", en: "There are many {noun} here" }
    ],
    definitePlural: [
      { sv: "{noun}___ har möte", en: "The {noun} are having a meeting" },
      { sv: "{noun}___ strejkar idag", en: "The {noun} are on strike today" }
    ]
  },
  vehicles: {
    indefinite: [
      { sv: "Han köpte ___ {noun} förra veckan", en: "He bought a {noun} last week" },
      { sv: "Vi hyr ___ {noun} till semestern", en: "We're renting a {noun} for the vacation" },
      { sv: "Hon kör ___ {noun} till jobbet", en: "She drives a {noun} to work" },
      { sv: "De behöver ___ {noun} till flyttningen", en: "They need a {noun} for the move" },
      { sv: "Jag ser ___ {noun} på vägen", en: "I see a {noun} on the road" },
      { sv: "Min granne har ___ {noun} i garaget", en: "My neighbor has a {noun} in the garage" }
    ],
    definite: [
      { sv: "{noun}___ är snabb", en: "The {noun} is fast" },
      { sv: "{noun}___ behöver repareras", en: "The {noun} needs repair" },
      { sv: "{noun}___ står parkerad utanför", en: "The {noun} is parked outside" },
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ går sönder ofta", en: "The {noun} breaks down often" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} på gatan", en: "There are many {noun} on the street" },
      { sv: "De säljer begagnade {noun}", en: "They sell used {noun}" },
      { sv: "Vi har moderna {noun} i flottan", en: "We have modern {noun} in the fleet" },
      { sv: "Företaget köper nya {noun}", en: "The company is buying new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ måste tvättas", en: "The {noun} need washing" },
      { sv: "{noun}___ står i garaget", en: "The {noun} are in the garage" },
      { sv: "{noun}___ är snabba", en: "The {noun} are fast" },
      { sv: "{noun}___ behöver service", en: "The {noun} need servicing" }
    ]
  },
  school: {
    indefinite: [
      { sv: "Jag behöver ___ {noun} till lektionen", en: "I need a {noun} for the lesson" },
      { sv: "Kan jag låna ___ {noun}?", en: "Can I borrow a {noun}?" },
      { sv: "Hon glömde ___ {noun} hemma", en: "She forgot a {noun} at home" },
      { sv: "Vi ska köpa ___ {noun} till terminen", en: "We will buy a {noun} for the semester" },
      { sv: "Läraren gav mig ___ {noun}", en: "The teacher gave me a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ ligger i ryggsäcken", en: "The {noun} is in the backpack" },
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ är sönder", en: "The {noun} is broken" },
      { sv: "{noun}___ tillhör min klasskamrat", en: "The {noun} belongs to my classmate" },
      { sv: "Var la du {noun}___?", en: "Where did you put the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi behöver nya {noun}", en: "We need new {noun}" },
      { sv: "Skolan har många {noun}", en: "The school has many {noun}" },
      { sv: "Eleverna använder {noun} varje dag", en: "The students use {noun} every day" },
      { sv: "Det finns extra {noun} i skåpet", en: "There are extra {noun} in the cabinet" }
    ],
    definitePlural: [
      { sv: "{noun}___ är på bordet", en: "The {noun} are on the table" },
      { sv: "{noun}___ måste bytas ut", en: "The {noun} need to be replaced" },
      { sv: "{noun}___ tillhör klassrummet", en: "The {noun} belong to the classroom" },
      { sv: "Kan du samla in {noun}___?", en: "Can you collect the {noun}?" }
    ]
  },
  nature: {
    indefinite: [
      { sv: "Det växer ___ {noun} i skogen", en: "A {noun} grows in the forest" },
      { sv: "Jag ser ___ {noun} i parken", en: "I see a {noun} in the park" },
      { sv: "Det står ___ {noun} vid sjön", en: "There is a {noun} by the lake" },
      { sv: "Vi planterade ___ {noun} i trädgården", en: "We planted a {noun} in the garden" },
      { sv: "Han hittade ___ {noun} på stigen", en: "He found a {noun} on the path" }
    ],
    definite: [
      { sv: "{noun}___ är gammalt", en: "The {noun} is old" },
      { sv: "{noun}___ växer snabbt", en: "The {noun} grows quickly" },
      { sv: "{noun}___ ger skugga", en: "The {noun} provides shade" },
      { sv: "{noun}___ har djupa rötter", en: "The {noun} has deep roots" },
      { sv: "{noun}___ är vackert", en: "The {noun} is beautiful" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun} här", en: "There are many {noun} here" },
      { sv: "Vi planterar nya {noun}", en: "We are planting new {noun}" },
      { sv: "De har stora {noun} i parken", en: "They have big {noun} in the park" },
      { sv: "Jag ser flera {noun} på berget", en: "I see several {noun} on the mountain" }
    ],
    definitePlural: [
      { sv: "{noun}___ är höga", en: "The {noun} are tall" },
      { sv: "{noun}___ växer vilt", en: "The {noun} grow wild" },
      { sv: "{noun}___ behöver vatten", en: "The {noun} need water" },
      { sv: "{noun}___ skyddar mot vinden", en: "The {noun} protect against the wind" }
    ]
  },
  weather: {
    indefinite: [
      { sv: "Det kommer ___ {noun}", en: "A {noun} is coming" },
      { sv: "Vi väntar på ___ {noun}", en: "We're waiting for a {noun}" },
      { sv: "Det börjar med ___ {noun}", en: "It starts with a {noun}" },
      { sv: "De förutspår ___ {noun}", en: "They predict a {noun}" },
      { sv: "Det blir ___ {noun} imorgon", en: "There will be a {noun} tomorrow" }
    ],
    definite: [
      { sv: "{noun}___ är kallt", en: "The {noun} is cold" },
      { sv: "{noun}___ fortsätter hela dagen", en: "The {noun} continues all day" },
      { sv: "{noun}___ kommer från norr", en: "The {noun} comes from the north" },
      { sv: "{noun}___ blir kraftigare", en: "The {noun} is getting stronger" },
      { sv: "{noun}___ har slutat", en: "The {noun} has stopped" }
    ],
    indefinitePlural: [
      { sv: "Vi har haft många {noun} i år", en: "We have had many {noun} this year" },
      { sv: "Det kommer flera {noun}", en: "Several {noun} are coming" },
      { sv: "De varnar för kraftiga {noun}", en: "They warn of heavy {noun}" },
      { sv: "Vi får ofta {noun} på hösten", en: "We often get {noun} in autumn" }
    ],
    definitePlural: [
      { sv: "{noun}___ kommer ofta på hösten", en: "The {noun} often come in autumn" },
      { sv: "{noun}___ är ovanligt kraftiga", en: "The {noun} are unusually strong" },
      { sv: "{noun}___ påverkar trafiken", en: "The {noun} affect the traffic" },
      { sv: "{noun}___ har pågått länge", en: "The {noun} have been going on for a long time" }
    ]
  },
  tools: {
    indefinite: [
      { sv: "Jag behöver ___ {noun}", en: "I need a {noun}" },
      { sv: "Han använder ___ {noun}", en: "He is using a {noun}" },
      { sv: "Kan du hämta ___ {noun}?", en: "Can you get a {noun}?" }
    ],
    definite: [
      { sv: "{noun}___ är vass", en: "The {noun} is sharp" },
      { sv: "{noun}___ är trasig", en: "The {noun} is broken" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi har flera {noun}", en: "We have several {noun}" },
      { sv: "De köper nya {noun}", en: "They are buying new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ ligger i lådan", en: "The {noun} are in the drawer" },
      { sv: "{noun}___ behöver repareras", en: "The {noun} need repair" }
    ]
  },
  music: {
    indefinite: [
      { sv: "Hon spelar ___ {noun} i orkestern", en: "She plays a {noun} in the orchestra" },
      { sv: "Jag köpte ___ {noun} på musikaffären", en: "I bought a {noun} at the music store" },
      { sv: "Vi hyrde ___ {noun} till konserten", en: "We rented a {noun} for the concert" },
      { sv: "Han lär sig spela ___ {noun}", en: "He is learning to play a {noun}" },
      { sv: "De behöver ___ {noun} till bandet", en: "They need a {noun} for the band" },
      { sv: "Kan du stämma ___ {noun}?", en: "Can you tune a {noun}?" }
    ],
    definite: [
      { sv: "{noun}___ låter vackert", en: "The {noun} sounds beautiful" },
      { sv: "{noun}___ behöver stämmas", en: "The {noun} needs tuning" },
      { sv: "{noun}___ är handgjord", en: "The {noun} is handmade" },
      { sv: "{noun}___ står i musikrummet", en: "The {noun} is in the music room" },
      { sv: "{noun}___ tillhör skolan", en: "The {noun} belongs to the school" },
      { sv: "Vem spelar på {noun}___?", en: "Who's playing the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "De har fina {noun} i butiken", en: "They have nice {noun} in the store" },
      { sv: "Orkestern har många {noun}", en: "The orchestra has many {noun}" },
      { sv: "Vi säljer begagnade {noun}", en: "We sell used {noun}" },
      { sv: "Skolan köpte nya {noun}", en: "The school bought new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ måste stämmas", en: "The {noun} need tuning" },
      { sv: "{noun}___ låter fantastiskt", en: "The {noun} sound amazing" },
      { sv: "{noun}___ är dyra", en: "The {noun} are expensive" },
      { sv: "{noun}___ används i konserten", en: "The {noun} are used in the concert" }
    ]
  },
  sports: {
    indefinite: [
      { sv: "Jag köpte ___ {noun} igår", en: "I bought a {noun} yesterday" },
      { sv: "Han använder ___ {noun}", en: "He uses a {noun}" },
      { sv: "Vi behöver ___ {noun}", en: "We need a {noun}" },
      { sv: "Hon köpte ___ {noun}", en: "She bought a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ passar perfekt", en: "The {noun} fits perfectly" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "De har många {noun}", en: "They have many {noun}" },
      { sv: "Vi köper nya {noun}", en: "We are buying new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ ligger i väskan", en: "The {noun} are in the bag" },
      { sv: "{noun}___ är dyra", en: "The {noun} are expensive" }
    ]
  },
  office: {
    indefinite: [
      { sv: "Jag behöver ___ {noun} till mötet", en: "I need a {noun} for the meeting" },
      { sv: "Hon köpte ___ {noun} på kontoret", en: "She bought a {noun} at the office" },
      { sv: "Kan du ge mig ___ {noun}?", en: "Can you give me a {noun}?" },
      { sv: "Vi har ___ {noun} i receptionen", en: "We have a {noun} in reception" },
      { sv: "Han använder ___ {noun} för att arbeta", en: "He uses a {noun} to work" }
    ],
    definite: [
      { sv: "{noun}___ är trasig", en: "The {noun} is broken" },
      { sv: "{noun}___ tillhör chefen", en: "The {noun} belongs to the boss" },
      { sv: "{noun}___ står i hörnet", en: "The {noun} is in the corner" },
      { sv: "{noun}___ används ofta", en: "The {noun} is used often" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi behöver nya {noun}", en: "We need new {noun}" },
      { sv: "De har moderna {noun} här", en: "They have modern {noun} here" },
      { sv: "Kontoret har många {noun}", en: "The office has many {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ måste uppdateras", en: "The {noun} need updating" },
      { sv: "{noun}___ är i mötesrummet", en: "The {noun} are in the meeting room" }
    ]
  },
  garden: {
    indefinite: [
      { sv: "Vi behöver ___ {noun} till trädgården", en: "We need a {noun} for the garden" },
      { sv: "Han använder ___ {noun} för att gräva", en: "He uses a {noun} to dig" },
      { sv: "Jag planterar ___ {noun} i rabatten", en: "I'm planting a {noun} in the flowerbed" },
      { sv: "Hon köpte ___ {noun} på plantskolan", en: "She bought a {noun} at the nursery" },
      { sv: "Kan du hämta ___ {noun} från förrådet?", en: "Can you get a {noun} from the shed?" }
    ],
    definite: [
      { sv: "{noun}___ är i förrådet", en: "The {noun} is in the shed" },
      { sv: "{noun}___ behöver vattnas", en: "The {noun} needs watering" },
      { sv: "{noun}___ växer snabbt", en: "The {noun} grows quickly" },
      { sv: "{noun}___ är rostig", en: "The {noun} is rusty" },
      { sv: "Var ställde du {noun}___?", en: "Where did you put the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi har många {noun} i trädgården", en: "We have many {noun} in the garden" },
      { sv: "De säljer fina {noun} här", en: "They sell nice {noun} here" },
      { sv: "Jag behöver nya {noun} till våren", en: "I need new {noun} for spring" },
      { sv: "Han samlar gamla {noun}", en: "He collects old {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ måste rensas", en: "The {noun} need to be cleaned" },
      { sv: "{noun}___ blommar vackert", en: "The {noun} bloom beautifully" },
      { sv: "{noun}___ ligger i garaget", en: "The {noun} are in the garage" },
      { sv: "Kan du vattna {noun}___?", en: "Can you water the {noun}?" }
    ]
  },
  bathroom: {
    indefinite: [
      { sv: "Jag behöver köpa ___ {noun}", en: "I need to buy a {noun}" },
      { sv: "Hon glömde ___ {noun} hemma", en: "She forgot a {noun} at home" },
      { sv: "Vi har ___ {noun} i gästbadrummet", en: "We have a {noun} in the guest bathroom" },
      { sv: "Kan du ge mig ___ {noun}?", en: "Can you give me a {noun}?" },
      { sv: "Han använder ___ {noun} varje morgon", en: "He uses a {noun} every morning" }
    ],
    definite: [
      { sv: "{noun}___ är i skåpet", en: "The {noun} is in the cabinet" },
      { sv: "{noun}___ måste bytas", en: "The {noun} needs to be replaced" },
      { sv: "{noun}___ är ny", en: "The {noun} is new" },
      { sv: "{noun}___ är slut", en: "The {noun} is empty" },
      { sv: "Var ligger {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi har extra {noun} under vasken", en: "We have extra {noun} under the sink" },
      { sv: "De säljer ekologiska {noun}", en: "They sell organic {noun}" },
      { sv: "Jag köper alltid dessa {noun}", en: "I always buy these {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är slut", en: "The {noun} are finished" },
      { sv: "{noun}___ ligger i skåpet", en: "The {noun} are in the cabinet" },
      { sv: "{noun}___ måste tvättas", en: "The {noun} need washing" }
    ]
  },
  hygiene: {
    indefinite: [
      { sv: "Jag behöver ___ {noun}", en: "I need a {noun}" },
      { sv: "Hon köpte ___ {noun}", en: "She bought a {noun}" },
      { sv: "Kan du ge mig ___ {noun}?", en: "Can you give me a {noun}?" }
    ],
    definite: [
      { sv: "{noun}___ är slut", en: "The {noun} is empty" },
      { sv: "{noun}___ ligger i badrummet", en: "The {noun} is in the bathroom" },
      { sv: "Var är {noun}___?", en: "Where is the {noun}?" }
    ],
    indefinitePlural: [
      { sv: "Vi har flera {noun}", en: "We have several {noun}" },
      { sv: "De säljer nya {noun}", en: "They sell new {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är dyra", en: "The {noun} are expensive" },
      { sv: "{noun}___ ligger här", en: "The {noun} are here" }
    ]
  },
  colors: {
    indefinite: [
      { sv: "Jag väljer ___ {noun}", en: "I choose a {noun}" },
      { sv: "Hon använder ___ {noun}", en: "She uses a {noun}" },
      { sv: "Det är ___ {noun}", en: "It is a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ är vacker", en: "The {noun} is beautiful" },
      { sv: "{noun}___ passar bra", en: "The {noun} matches well" },
      { sv: "{noun}___ är stark", en: "The {noun} is strong" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun}", en: "There are many {noun}" },
      { sv: "Vi använder olika {noun}", en: "We use different {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ är harmoniska", en: "The {noun} are harmonious" },
      { sv: "{noun}___ passar ihop", en: "The {noun} go together" }
    ]
  },
  seasons: {
    indefinite: [
      { sv: "Det var ___ {noun} med mycket sol", en: "It was a {noun} with lots of sun" },
      { sv: "Vi hade ___ {noun} full av regn", en: "We had a {noun} full of rain" },
      { sv: "Det kommer ___ {noun} med milda temperaturer", en: "A {noun} with mild temperatures is coming" },
      { sv: "Jag älskar ___ {noun} som denna", en: "I love a {noun} like this" },
      { sv: "Det blir ___ {noun} att minnas", en: "It will be a {noun} to remember" }
    ],
    definite: [
      { sv: "{noun}___ närmar sig", en: "The {noun} is approaching" },
      { sv: "{noun}___ är min favorit", en: "The {noun} is my favorite" },
      { sv: "{noun}___ har varit varm", en: "The {noun} has been warm" },
      { sv: "{noun}___ går mot sitt slut", en: "The {noun} is coming to an end" },
      { sv: "{noun}___ börjar tidigt i år", en: "The {noun} starts early this year" }
    ],
    indefinitePlural: [
      { sv: "Svenska {noun} är unika", en: "Swedish {noun} are unique" },
      { sv: "Vi har varma {noun} nuförtiden", en: "We have warm {noun} nowadays" },
      { sv: "Det kommer flera fina {noun}", en: "Several nice {noun} are coming" },
      { sv: "Jag minns många vackra {noun}", en: "I remember many beautiful {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ blir varmare", en: "The {noun} are getting warmer" },
      { sv: "{noun}___ går snabbt förbi", en: "The {noun} pass by quickly" },
      { sv: "{noun}___ har förändrats", en: "The {noun} have changed" },
      { sv: "{noun}___ är kortare här", en: "The {noun} are shorter here" }
    ]
  },
  abstract: {
    indefinite: [
      { sv: "Det är ___ {noun}", en: "It is a {noun}" },
      { sv: "Vi behöver ___ {noun}", en: "We need a {noun}" },
      { sv: "Hon har ___ {noun}", en: "She has a {noun}" }
    ],
    definite: [
      { sv: "{noun}___ är viktig", en: "The {noun} is important" },
      { sv: "{noun}___ växer", en: "The {noun} grows" },
      { sv: "{noun}___ förändras", en: "The {noun} changes" }
    ],
    indefinitePlural: [
      { sv: "Det finns många {noun}", en: "There are many {noun}" },
      { sv: "Vi ser olika {noun}", en: "We see different {noun}" }
    ],
    definitePlural: [
      { sv: "{noun}___ utvecklas", en: "The {noun} develop" },
      { sv: "{noun}___ är komplexa", en: "The {noun} are complex" }
    ]
  }
};
