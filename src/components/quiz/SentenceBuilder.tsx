import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface WordTile {
  id: string;
  text: string;
}

interface Exercise {
  id: string;
  correctSentence: string;
  alternativeAnswers?: string[];
  wordTiles: WordTile[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  translation?: string;
  hint?: string;
  grammarTip?: string;
}

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

const exercises: Exercise[] = [
  // Beginner level exercises
  {
    id: '1',
    difficulty: 'beginner',
    correctSentence: 'Jag tycker om att lära mig svenska',
    alternativeAnswers: [
      'Jag tycker om att lära svenska',
    ],
    translation: 'I like to learn Swedish',
    hint: 'Start with subject (Jag) + verb phrase (tycker om) + infinitive construction (att lära)',
    grammarTip: 'The phrase "tycker om" is a particle verb meaning "like". With reflexive verbs like "lära sig", the reflexive pronoun (mig) is optional in some cases',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'tycker' },
      { id: 'word-3', text: 'om' },
      { id: 'word-4', text: 'att' },
      { id: 'word-5', text: 'lära' },
      { id: 'word-6', text: 'mig' },
      { id: 'word-7', text: 'svenska' },
    ],
  },
  {
    id: '2',
    difficulty: 'beginner',
    correctSentence: 'Min katt är svart och vit',
    alternativeAnswers: [
      'Min katt är vit och svart',
    ],
    translation: 'My cat is black and white',
    hint: 'Structure: Possessive (Min) + noun (katt) + verb (är) + adjectives (svart och vit)',
    grammarTip: 'Unlike English, Swedish adjectives don\'t change form when used with "och". Also, the order of coordinated adjectives is flexible',
    wordTiles: [
      { id: 'word-1', text: 'Min' },
      { id: 'word-2', text: 'katt' },
      { id: 'word-3', text: 'är' },
      { id: 'word-4', text: 'svart' },
      { id: 'word-5', text: 'och' },
      { id: 'word-6', text: 'vit' },
    ],
  },
  {
    id: '3',
    difficulty: 'beginner',
    correctSentence: 'Jag bor i Stockholm nu',
    alternativeAnswers: [
      'Nu bor jag i Stockholm',
    ],
    translation: 'I live in Stockholm now',
    hint: 'You can either start with subject (Jag) or time expression (Nu). Remember V2 rule!',
    grammarTip: 'V2 rule means the verb must be in second position. Compare:\n1. Jag (1) bor (2) i Stockholm nu\n2. Nu (1) bor (2) jag i Stockholm',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'bor' },
      { id: 'word-3', text: 'i' },
      { id: 'word-4', text: 'Stockholm' },
      { id: 'word-5', text: 'nu' },
    ],
  },

  // Intermediate level exercises
  {
    id: '4',
    difficulty: 'intermediate',
    correctSentence: 'Hon läser en intressant bok på biblioteket',
    alternativeAnswers: [
      'På biblioteket läser hon en intressant bok',
    ],
    translation: 'She reads an interesting book at the library',
    hint: 'Main clause order: Subject + Verb + Object + Place\nOR\nPlace + Verb + Subject + Object',
    grammarTip: 'Indefinite form uses "en/ett" + adjective + noun. Location phrases can move to emphasize different parts of the sentence',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'läser' },
      { id: 'word-3', text: 'en' },
      { id: 'word-4', text: 'intressant' },
      { id: 'word-5', text: 'bok' },
      { id: 'word-6', text: 'på' },
      { id: 'word-7', text: 'biblioteket' },
    ],
  },
  {
    id: '5',
    difficulty: 'intermediate',
    correctSentence: 'Vi ska resa till Norge nästa sommar',
    translation: 'We will travel to Norway next summer',
    hint: 'Future tense structure: Subject + ska + main verb (infinitive) + destination + time',
    grammarTip: '"Ska" is used for planned future actions. The main verb after "ska" is always in infinitive form (without "att")',
    wordTiles: [
      { id: 'word-1', text: 'Vi' },
      { id: 'word-2', text: 'ska' },
      { id: 'word-3', text: 'resa' },
      { id: 'word-4', text: 'till' },
      { id: 'word-5', text: 'Norge' },
      { id: 'word-6', text: 'nästa' },
      { id: 'word-7', text: 'sommar' },
    ],
  },
  {
    id: '6',
    difficulty: 'intermediate',
    correctSentence: 'Maten i restaurangen var mycket god',
    translation: 'The food in the restaurant was very good',
    hint: 'Think about adjective placement',
    wordTiles: [
      { id: 'word-1', text: 'Maten' },
      { id: 'word-2', text: 'i' },
      { id: 'word-3', text: 'restaurangen' },
      { id: 'word-4', text: 'var' },
      { id: 'word-5', text: 'mycket' },
      { id: 'word-6', text: 'god' },
    ],
  },

  // Advanced level exercises
  {
    id: '7',
    difficulty: 'advanced',
    correctSentence: 'Trots att det regnade mycket bestämde vi oss för att gå ut',
    translation: 'Despite the heavy rain, we decided to go out',
    hint: 'Complex structure:\n1. Concessive clause (Trots att...)\n2. Main clause with reflexive verb (bestämde oss för)\n3. Infinitive phrase (att gå ut)',
    grammarTip: 'Reflexive verbs like "bestämma sig för" require the reflexive pronoun to match the subject (vi → oss). The particle "för" stays with the verb',
    wordTiles: [
      { id: 'word-1', text: 'Trots' },
      { id: 'word-2', text: 'att' },
      { id: 'word-3', text: 'det' },
      { id: 'word-4', text: 'regnade' },
      { id: 'word-5', text: 'mycket' },
      { id: 'word-6', text: 'bestämde' },
      { id: 'word-7', text: 'vi' },
      { id: 'word-8', text: 'oss' },
      { id: 'word-9', text: 'för' },
      { id: 'word-10', text: 'att' },
      { id: 'word-11', text: 'gå' },
      { id: 'word-12', text: 'ut' },
    ],
  },
  {
    id: '8',
    difficulty: 'advanced',
    correctSentence: 'Om jag hade mer tid skulle jag lära mig fler språk',
    translation: 'If I had more time, I would learn more languages',
    hint: 'Conditional sentence structure:\n1. If-clause: Om + subject + hade + object\n2. Main clause: skulle + subject + verb + reflexive',
    grammarTip: 'This is a present/future unreal conditional. Use "hade" in if-clause and "skulle" in main clause. Compare with English "If I had... I would..."',
    wordTiles: [
      { id: 'word-1', text: 'Om' },
      { id: 'word-2', text: 'jag' },
      { id: 'word-3', text: 'hade' },
      { id: 'word-4', text: 'mer' },
      { id: 'word-5', text: 'tid' },
      { id: 'word-6', text: 'skulle' },
      { id: 'word-7', text: 'jag' },
      { id: 'word-8', text: 'lära' },
      { id: 'word-9', text: 'mig' },
      { id: 'word-10', text: 'fler' },
      { id: 'word-11', text: 'språk' },
    ],
  },
  {
    id: '9',
    difficulty: 'advanced',
    correctSentence: 'Den nya filmen som kom igår har fått bra recensioner',
    translation: 'The new movie that came out yesterday has received good reviews',
    hint: 'Relative clause with "som"',
    wordTiles: [
      { id: 'word-1', text: 'Den' },
      { id: 'word-2', text: 'nya' },
      { id: 'word-3', text: 'filmen' },
      { id: 'word-4', text: 'som' },
      { id: 'word-5', text: 'kom' },
      { id: 'word-6', text: 'igår' },
      { id: 'word-7', text: 'har' },
      { id: 'word-8', text: 'fått' },
      { id: 'word-9', text: 'bra' },
      { id: 'word-10', text: 'recensioner' },
    ],
  },

  // Additional Beginner Exercises
  {
    id: '10',
    difficulty: 'beginner',
    correctSentence: 'Vädret är vackert idag',
    translation: 'The weather is beautiful today',
    hint: 'Start with the subject (Vädret)',
    wordTiles: [
      { id: 'word-1', text: 'Vädret' },
      { id: 'word-2', text: 'är' },
      { id: 'word-3', text: 'vackert' },
      { id: 'word-4', text: 'idag' },
    ],
  },
  {
    id: '11',
    difficulty: 'beginner',
    correctSentence: 'Han dricker kaffe på morgonen',
    translation: 'He drinks coffee in the morning',
    hint: 'Time expression comes at the end',
    wordTiles: [
      { id: 'word-1', text: 'Han' },
      { id: 'word-2', text: 'dricker' },
      { id: 'word-3', text: 'kaffe' },
      { id: 'word-4', text: 'på' },
      { id: 'word-5', text: 'morgonen' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '12',
    difficulty: 'intermediate',
    correctSentence: 'Barnen leker med sina nya leksaker',
    translation: 'The children are playing with their new toys',
    hint: 'Remember possessive reflexive (sina)',
    grammarTip: 'Use "sina" (not "deras") when the owner is the subject of the sentence',
    wordTiles: [
      { id: 'word-1', text: 'Barnen' },
      { id: 'word-2', text: 'leker' },
      { id: 'word-3', text: 'med' },
      { id: 'word-4', text: 'sina' },
      { id: 'word-5', text: 'nya' },
      { id: 'word-6', text: 'leksaker' },
    ],
  },
  {
    id: '13',
    difficulty: 'intermediate',
    correctSentence: 'Du måste stänga fönstret när det regnar',
    translation: 'You must close the window when it rains',
    hint: 'Modal verb (måste) + main verb (stänga)',
    wordTiles: [
      { id: 'word-1', text: 'Du' },
      { id: 'word-2', text: 'måste' },
      { id: 'word-3', text: 'stänga' },
      { id: 'word-4', text: 'fönstret' },
      { id: 'word-5', text: 'när' },
      { id: 'word-6', text: 'det' },
      { id: 'word-7', text: 'regnar' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '14',
    difficulty: 'advanced',
    correctSentence: 'Även om jag inte förstår allt kan jag prata svenska',
    alternativeAnswers: [
      'Jag kan prata svenska även om jag inte förstår allt',
    ],
    translation: 'Even though I don\'t understand everything, I can speak Swedish',
    hint: 'The subordinate clause can come before or after the main clause',
    grammarTip: 'With "även om" in the middle, no word order change is needed in the second clause',
    wordTiles: [
      { id: 'word-1', text: 'Även' },
      { id: 'word-2', text: 'om' },
      { id: 'word-3', text: 'jag' },
      { id: 'word-4', text: 'inte' },
      { id: 'word-5', text: 'förstår' },
      { id: 'word-6', text: 'allt' },
      { id: 'word-7', text: 'kan' },
      { id: 'word-8', text: 'jag' },
      { id: 'word-9', text: 'prata' },
      { id: 'word-10', text: 'svenska' },
    ],
  },
  {
    id: '15',
    difficulty: 'advanced',
    correctSentence: 'Ju mer man övar desto bättre blir man',
    translation: 'The more you practice, the better you become',
    hint: 'Correlative construction with "ju ... desto"',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'mer' },
      { id: 'word-3', text: 'man' },
      { id: 'word-4', text: 'övar' },
      { id: 'word-5', text: 'desto' },
      { id: 'word-6', text: 'bättre' },
      { id: 'word-7', text: 'blir' },
      { id: 'word-8', text: 'man' },
    ],
  },

  // Additional Beginner Exercises
  {
    id: '16',
    difficulty: 'beginner',
    correctSentence: 'Jag gillar att laga mat',
    alternativeAnswers: [
      'Att laga mat gillar jag'  // Inverted for emphasis
    ],
    translation: 'I like to cook',
    hint: 'Start with subject (Jag) or "att" phrase for emphasis',
    grammarTip: 'When starting with "att" phrase, remember V2 rule: verb (gillar) must be second',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'gillar' },
      { id: 'word-3', text: 'att' },
      { id: 'word-4', text: 'laga' },
      { id: 'word-5', text: 'mat' },
    ],
  },
  {
    id: '17',
    difficulty: 'beginner',
    correctSentence: 'Hennes hund springer i parken',
    alternativeAnswers: [
      'I parken springer hennes hund'
    ],
    translation: 'Her dog runs in the park',
    hint: 'Location can be at the beginning or end',
    grammarTip: 'Possessive pronouns (hennes) come before the noun they modify',
    wordTiles: [
      { id: 'word-1', text: 'Hennes' },
      { id: 'word-2', text: 'hund' },
      { id: 'word-3', text: 'springer' },
      { id: 'word-4', text: 'i' },
      { id: 'word-5', text: 'parken' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '18',
    difficulty: 'intermediate',
    correctSentence: 'Han har aldrig varit i Danmark förut',
    alternativeAnswers: [
      'Förut har han aldrig varit i Danmark'
    ],
    translation: 'He has never been to Denmark before',
    hint: 'Negation (aldrig) comes after first verb in perfect tense',
    grammarTip: 'In perfect tense, place "aldrig" between auxiliary (har) and main verb (varit)',
    wordTiles: [
      { id: 'word-1', text: 'Han' },
      { id: 'word-2', text: 'har' },
      { id: 'word-3', text: 'aldrig' },
      { id: 'word-4', text: 'varit' },
      { id: 'word-5', text: 'i' },
      { id: 'word-6', text: 'Danmark' },
      { id: 'word-7', text: 'förut' },
    ],
  },
  {
    id: '19',
    difficulty: 'intermediate',
    correctSentence: 'Det finns många fina caféer i staden',
    alternativeAnswers: [
      'I staden finns det många fina caféer'
    ],
    translation: 'There are many nice cafes in the city',
    hint: 'Use "det finns" for "there are/is", adjective before noun',
    grammarTip: 'Adjectives (fina) must agree with the noun (caféer) in number and definiteness',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'finns' },
      { id: 'word-3', text: 'många' },
      { id: 'word-4', text: 'fina' },
      { id: 'word-5', text: 'caféer' },
      { id: 'word-6', text: 'i' },
      { id: 'word-7', text: 'staden' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '20',
    difficulty: 'advanced',
    correctSentence: 'Hade jag vetat det skulle jag ha kommit tidigare',
    alternativeAnswers: [
      'Jag skulle ha kommit tidigare hade jag vetat det'
    ],
    translation: 'If I had known that, I would have come earlier',
    hint: 'Past perfect conditional - notice word order in both clauses',
    grammarTip: 'In conditional perfect, "hade" inverts with subject in if-clause when "om" is omitted',
    wordTiles: [
      { id: 'word-1', text: 'Hade' },
      { id: 'word-2', text: 'jag' },
      { id: 'word-3', text: 'vetat' },
      { id: 'word-4', text: 'det' },
      { id: 'word-5', text: 'skulle' },
      { id: 'word-6', text: 'jag' },
      { id: 'word-7', text: 'ha' },
      { id: 'word-8', text: 'kommit' },
      { id: 'word-9', text: 'tidigare' },
    ],
  },
  {
    id: '21',
    difficulty: 'advanced',
    correctSentence: 'Ju längre man väntar desto svårare blir det',
    alternativeAnswers: [
      'Desto svårare blir det ju längre man väntar'
    ],
    translation: 'The longer you wait, the harder it becomes',
    hint: 'Comparative correlation with "ju...desto"',
    grammarTip: 'This structure always follows the pattern: ju + comparative ... desto + comparative',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'längre' },
      { id: 'word-3', text: 'man' },
      { id: 'word-4', text: 'väntar' },
      { id: 'word-5', text: 'desto' },
      { id: 'word-6', text: 'svårare' },
      { id: 'word-7', text: 'blir' },
      { id: 'word-8', text: 'det' },
    ],
  },
  {
    id: '22',
    difficulty: 'advanced',
    correctSentence: 'Hon undrade vem som hade ringt igår kväll',
    alternativeAnswers: [
      'Igår kväll undrade hon vem som hade ringt'
    ],
    translation: 'She wondered who had called last night',
    hint: 'Indirect question with "som" as subject marker',
    grammarTip: 'In indirect questions, "som" is required when "who/vem" is the subject of the question',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'undrade' },
      { id: 'word-3', text: 'vem' },
      { id: 'word-4', text: 'som' },
      { id: 'word-5', text: 'hade' },
      { id: 'word-6', text: 'ringt' },
      { id: 'word-7', text: 'igår' },
      { id: 'word-8', text: 'kväll' },
    ],
  },
  {
    id: '23',
    difficulty: 'beginner',
    correctSentence: 'Jag har en röd bil',
    alternativeAnswers: [
      'En röd bil har jag'
    ],
    translation: 'I have a red car',
    hint: 'Adjective (röd) comes between article and noun',
    grammarTip: 'Indefinite article (en/ett) matches the noun\'s gender',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'har' },
      { id: 'word-3', text: 'en' },
      { id: 'word-4', text: 'röd' },
      { id: 'word-5', text: 'bil' },
    ],
  },
  {
    id: '24',
    difficulty: 'beginner',
    correctSentence: 'Det är ett stort hus',
    alternativeAnswers: [
      'Ett stort hus är det'
    ],
    translation: 'It is a big house',
    hint: 'Neuter nouns use "ett" and "-t" ending for adjectives',
    grammarTip: 'Adjectives agree with neuter nouns by adding -t (stor → stort)',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'är' },
      { id: 'word-3', text: 'ett' },
      { id: 'word-4', text: 'stort' },
      { id: 'word-5', text: 'hus' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '25',
    difficulty: 'intermediate',
    correctSentence: 'Hon köpte den gröna klänningen igår',
    alternativeAnswers: [
      'Igår köpte hon den gröna klänningen'
    ],
    translation: 'She bought the green dress yesterday',
    hint: 'Definite form with adjective uses "den/det" + adjective + noun with definite ending',
    grammarTip: 'Double definiteness: den/det + adjective + noun-en/et',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'köpte' },
      { id: 'word-3', text: 'den' },
      { id: 'word-4', text: 'gröna' },
      { id: 'word-5', text: 'klänningen' },
      { id: 'word-6', text: 'igår' },
    ],
  },
  {
    id: '26',
    difficulty: 'intermediate',
    correctSentence: 'Vi brukar äta middag klockan sex',
    alternativeAnswers: [
      'Klockan sex brukar vi äta middag'
    ],
    translation: 'We usually eat dinner at six o\'clock',
    hint: 'Modal verb "brukar" indicates habit/routine',
    grammarTip: 'With time expressions, "klockan" is used for specific times',
    wordTiles: [
      { id: 'word-1', text: 'Vi' },
      { id: 'word-2', text: 'brukar' },
      { id: 'word-3', text: 'äta' },
      { id: 'word-4', text: 'middag' },
      { id: 'word-5', text: 'klockan' },
      { id: 'word-6', text: 'sex' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '27',
    difficulty: 'advanced',
    correctSentence: 'Utan att ha ätit frukost gick hon till jobbet',
    alternativeAnswers: [
      'Hon gick till jobbet utan att ha ätit frukost'
    ],
    translation: 'Without having eaten breakfast, she went to work',
    hint: 'Participle construction with "utan att ha + supine"',
    grammarTip: 'The participle phrase can come first or last, affecting word order',
    wordTiles: [
      { id: 'word-1', text: 'Utan' },
      { id: 'word-2', text: 'att' },
      { id: 'word-3', text: 'ha' },
      { id: 'word-4', text: 'ätit' },
      { id: 'word-5', text: 'frukost' },
      { id: 'word-6', text: 'gick' },
      { id: 'word-7', text: 'hon' },
      { id: 'word-8', text: 'till' },
      { id: 'word-9', text: 'jobbet' },
    ],
  },
  {
    id: '28',
    difficulty: 'advanced',
    correctSentence: 'Antingen regnar det eller så är det snö',
    alternativeAnswers: [
      'Det regnar antingen eller så är det snö'
    ],
    translation: 'Either it rains or it snows',
    hint: 'Correlative conjunction "antingen...eller"',
    grammarTip: 'With "antingen...eller", "så" is often added before the second clause',
    wordTiles: [
      { id: 'word-1', text: 'Antingen' },
      { id: 'word-2', text: 'regnar' },
      { id: 'word-3', text: 'det' },
      { id: 'word-4', text: 'eller' },
      { id: 'word-5', text: 'så' },
      { id: 'word-6', text: 'är' },
      { id: 'word-7', text: 'det' },
      { id: 'word-8', text: 'snö' },
    ],
  },
  {
    id: '29',
    difficulty: 'advanced',
    correctSentence: 'Ju fler böcker man läser desto mer lär man sig',
    alternativeAnswers: [
      'Desto mer lär man sig ju fler böcker man läser'
    ],
    translation: 'The more books you read, the more you learn',
    hint: 'Another "ju...desto" construction with multiple clauses',
    grammarTip: 'Notice how "man" is repeated in both clauses as the generic subject',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'fler' },
      { id: 'word-3', text: 'böcker' },
      { id: 'word-4', text: 'man' },
      { id: 'word-5', text: 'läser' },
      { id: 'word-6', text: 'desto' },
      { id: 'word-7', text: 'mer' },
      { id: 'word-8', text: 'lär' },
      { id: 'word-9', text: 'man' },
      { id: 'word-10', text: 'sig' },
    ],
  },

  // Additional Beginner Exercises
  {
    id: '30',
    difficulty: 'beginner',
    correctSentence: 'Mitt rum är stort och ljust',
    alternativeAnswers: [
      'Stort och ljust är mitt rum'
    ],
    translation: 'My room is big and bright',
    hint: 'Neuter noun (rum) requires "mitt" and "stort"',
    grammarTip: 'Adjectives with neuter nouns end in -t (stor → stort, ljus → ljust)',
    wordTiles: [
      { id: 'word-1', text: 'Mitt' },
      { id: 'word-2', text: 'rum' },
      { id: 'word-3', text: 'är' },
      { id: 'word-4', text: 'stort' },
      { id: 'word-5', text: 'och' },
      { id: 'word-6', text: 'ljust' },
    ],
  },
  {
    id: '31',
    difficulty: 'beginner',
    correctSentence: 'De har tre små hundar',
    alternativeAnswers: [
      'Tre små hundar har de'
    ],
    translation: 'They have three small dogs',
    hint: 'Numbers come before adjectives',
    grammarTip: 'Adjectives are in plural form when describing plural nouns (små not liten)',
    wordTiles: [
      { id: 'word-1', text: 'De' },
      { id: 'word-2', text: 'har' },
      { id: 'word-3', text: 'tre' },
      { id: 'word-4', text: 'små' },
      { id: 'word-5', text: 'hundar' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '32',
    difficulty: 'intermediate',
    correctSentence: 'Hon måste ha glömt sina nycklar hemma',
    alternativeAnswers: [
      'Sina nycklar måste hon ha glömt hemma'
    ],
    translation: 'She must have forgotten her keys at home',
    hint: 'Double verb construction with modal verb (måste ha)',
    grammarTip: 'Use "sina" (not hennes) because the subject owns the keys',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'måste' },
      { id: 'word-3', text: 'ha' },
      { id: 'word-4', text: 'glömt' },
      { id: 'word-5', text: 'sina' },
      { id: 'word-6', text: 'nycklar' },
      { id: 'word-7', text: 'hemma' },
    ],
  },
  {
    id: '33',
    difficulty: 'intermediate',
    correctSentence: 'Jag känner någon som talar flytande svenska',
    alternativeAnswers: [
      'Någon som talar flytande svenska känner jag'
    ],
    translation: 'I know someone who speaks fluent Swedish',
    hint: 'Relative clause with "som" after "någon"',
    grammarTip: 'In relative clauses, "som" is used for both who/which/that',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'känner' },
      { id: 'word-3', text: 'någon' },
      { id: 'word-4', text: 'som' },
      { id: 'word-5', text: 'talar' },
      { id: 'word-6', text: 'flytande' },
      { id: 'word-7', text: 'svenska' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '34',
    difficulty: 'advanced',
    correctSentence: 'Hade det inte varit för regnet skulle vi ha gått ut',
    alternativeAnswers: [
      'Vi skulle ha gått ut hade det inte varit för regnet'
    ],
    translation: 'If it hadn\'t been for the rain, we would have gone out',
    hint: 'Past perfect conditional without "om"',
    grammarTip: 'When omitting "om", invert "hade" and subject in the condition',
    wordTiles: [
      { id: 'word-1', text: 'Hade' },
      { id: 'word-2', text: 'det' },
      { id: 'word-3', text: 'inte' },
      { id: 'word-4', text: 'varit' },
      { id: 'word-5', text: 'för' },
      { id: 'word-6', text: 'regnet' },
      { id: 'word-7', text: 'skulle' },
      { id: 'word-8', text: 'vi' },
      { id: 'word-9', text: 'ha' },
      { id: 'word-10', text: 'gått' },
      { id: 'word-11', text: 'ut' },
    ],
  },
  {
    id: '35',
    difficulty: 'advanced',
    correctSentence: 'Ju mer jag lär mig desto svårare verkar det bli',
    alternativeAnswers: [
      'Desto svårare verkar det bli ju mer jag lär mig'
    ],
    translation: 'The more I learn, the harder it seems to become',
    hint: 'Complex comparative with "ju...desto" and reflexive verb',
    grammarTip: 'Notice how "verkar" affects word order in the second clause',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'mer' },
      { id: 'word-3', text: 'jag' },
      { id: 'word-4', text: 'lär' },
      { id: 'word-5', text: 'mig' },
      { id: 'word-6', text: 'desto' },
      { id: 'word-7', text: 'svårare' },
      { id: 'word-8', text: 'verkar' },
      { id: 'word-9', text: 'det' },
      { id: 'word-10', text: 'bli' },
    ],
  },
  {
    id: '36',
    difficulty: 'advanced',
    correctSentence: 'Det sägs att svenskar är reserverade men hjälpsamma',
    alternativeAnswers: [
      'Svenskar sägs vara reserverade men hjälpsamma'
    ],
    translation: 'It is said that Swedes are reserved but helpful',
    hint: 'Passive construction with alternative formulations',
    grammarTip: 'Both impersonal ("det sägs att") and personal ("sägs vara") constructions are possible',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'sägs' },
      { id: 'word-3', text: 'att' },
      { id: 'word-4', text: 'svenskar' },
      { id: 'word-5', text: 'är' },
      { id: 'word-6', text: 'reserverade' },
      { id: 'word-7', text: 'men' },
      { id: 'word-8', text: 'hjälpsamma' },
    ],
  },
  {
    id: '37',
    difficulty: 'beginner',
    correctSentence: 'Jag äter frukost varje morgon',
    alternativeAnswers: [
      'Varje morgon äter jag frukost'
    ],
    translation: 'I eat breakfast every morning',
    hint: 'Time expression can be at the beginning or end',
    grammarTip: 'When time expression is first, verb must be second (V2 rule)',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'äter' },
      { id: 'word-3', text: 'frukost' },
      { id: 'word-4', text: 'varje' },
      { id: 'word-5', text: 'morgon' },
    ],
  },
  {
    id: '38',
    difficulty: 'beginner',
    correctSentence: 'Den blåa bilen är min',
    alternativeAnswers: [
      'Min är den blåa bilen'
    ],
    translation: 'The blue car is mine',
    hint: 'Definite form with adjective uses "den/det" + adjective + noun',
    grammarTip: 'Color adjectives must agree with the noun in definiteness (blå → blåa)',
    wordTiles: [
      { id: 'word-1', text: 'Den' },
      { id: 'word-2', text: 'blåa' },
      { id: 'word-3', text: 'bilen' },
      { id: 'word-4', text: 'är' },
      { id: 'word-5', text: 'min' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '39',
    difficulty: 'intermediate',
    correctSentence: 'Jag skulle vilja beställa en kopp kaffe',
    alternativeAnswers: [
      'En kopp kaffe skulle jag vilja beställa'
    ],
    translation: 'I would like to order a cup of coffee',
    hint: 'Modal verb (skulle) + infinitive (vilja) + main verb',
    grammarTip: 'Double infinitive construction: skulle + vilja + beställa',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'skulle' },
      { id: 'word-3', text: 'vilja' },
      { id: 'word-4', text: 'beställa' },
      { id: 'word-5', text: 'en' },
      { id: 'word-6', text: 'kopp' },
      { id: 'word-7', text: 'kaffe' },
    ],
  },
  {
    id: '40',
    difficulty: 'intermediate',
    correctSentence: 'Hon undrar varför tåget är försenat idag',
    alternativeAnswers: [
      'Idag undrar hon varför tåget är försenat'
    ],
    translation: 'She wonders why the train is delayed today',
    hint: 'Indirect question with "varför" - no inversion needed',
    grammarTip: 'In indirect questions, word order is different from direct questions',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'undrar' },
      { id: 'word-3', text: 'varför' },
      { id: 'word-4', text: 'tåget' },
      { id: 'word-5', text: 'är' },
      { id: 'word-6', text: 'försenat' },
      { id: 'word-7', text: 'idag' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '41',
    difficulty: 'advanced',
    correctSentence: 'Inte förrän hon kom hem insåg hon sitt misstag',
    alternativeAnswers: [
      'Hon insåg inte sitt misstag förrän hon kom hem'
    ],
    translation: 'Not until she came home did she realize her mistake',
    hint: 'Starting with "inte förrän" causes inversion in main clause',
    grammarTip: 'When starting with negative expression, main clause uses inverted word order',
    wordTiles: [
      { id: 'word-1', text: 'Inte' },
      { id: 'word-2', text: 'förrän' },
      { id: 'word-3', text: 'hon' },
      { id: 'word-4', text: 'kom' },
      { id: 'word-5', text: 'hem' },
      { id: 'word-6', text: 'insåg' },
      { id: 'word-7', text: 'hon' },
      { id: 'word-8', text: 'sitt' },
      { id: 'word-9', text: 'misstag' },
    ],
  },
  {
    id: '42',
    difficulty: 'advanced',
    correctSentence: 'Ju längre norrut man åker desto kallare blir det',
    alternativeAnswers: [
      'Desto kallare blir det ju längre norrut man åker'
    ],
    translation: 'The further north you go, the colder it gets',
    hint: 'Another "ju...desto" construction with direction',
    grammarTip: 'Comparative with direction uses -re ending (kall → kallare)',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'längre' },
      { id: 'word-3', text: 'norrut' },
      { id: 'word-4', text: 'man' },
      { id: 'word-5', text: 'åker' },
      { id: 'word-6', text: 'desto' },
      { id: 'word-7', text: 'kallare' },
      { id: 'word-8', text: 'blir' },
      { id: 'word-9', text: 'det' },
    ],
  },
  {
    id: '43',
    difficulty: 'advanced',
    correctSentence: 'Oavsett vad som händer kommer jag att stödja dig',
    alternativeAnswers: [
      'Jag kommer att stödja dig oavsett vad som händer'
    ],
    translation: 'No matter what happens, I will support you',
    hint: 'Subordinate clause with "oavsett vad som"',
    grammarTip: '"Som" is required when "vad" is the subject of the subordinate clause',
    wordTiles: [
      { id: 'word-1', text: 'Oavsett' },
      { id: 'word-2', text: 'vad' },
      { id: 'word-3', text: 'som' },
      { id: 'word-4', text: 'händer' },
      { id: 'word-5', text: 'kommer' },
      { id: 'word-6', text: 'jag' },
      { id: 'word-7', text: 'att' },
      { id: 'word-8', text: 'stödja' },
      { id: 'word-9', text: 'dig' },
    ],
  },
  {
    id: '44',
    difficulty: 'beginner',
    correctSentence: 'Jag vill ha en glass med jordgubbsmak',
    alternativeAnswers: [
      'En glass med jordgubbsmak vill jag ha'
    ],
    translation: 'I want an ice cream with strawberry flavor',
    hint: 'Modal verb (vill) + ha + object with description',
    grammarTip: 'Compound nouns (jordgubb+smak) are written as one word in Swedish',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'vill' },
      { id: 'word-3', text: 'ha' },
      { id: 'word-4', text: 'en' },
      { id: 'word-5', text: 'glass' },
      { id: 'word-6', text: 'med' },
      { id: 'word-7', text: 'jordgubbsmak' },
    ],
  },
  {
    id: '45',
    difficulty: 'beginner',
    correctSentence: 'Hennes syster bor i ett gammalt hus',
    alternativeAnswers: [
      'I ett gammalt hus bor hennes syster'
    ],
    translation: 'Her sister lives in an old house',
    hint: 'Adjective (gammalt) agrees with neuter noun (hus)',
    grammarTip: 'Possessive pronouns (hennes) don\'t change form based on the noun',
    wordTiles: [
      { id: 'word-1', text: 'Hennes' },
      { id: 'word-2', text: 'syster' },
      { id: 'word-3', text: 'bor' },
      { id: 'word-4', text: 'i' },
      { id: 'word-5', text: 'ett' },
      { id: 'word-6', text: 'gammalt' },
      { id: 'word-7', text: 'hus' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '46',
    difficulty: 'intermediate',
    correctSentence: 'Det tar tjugo minuter att gå till stationen',
    alternativeAnswers: [
      'Att gå till stationen tar tjugo minuter'
    ],
    translation: 'It takes twenty minutes to walk to the station',
    hint: 'Impersonal construction with "det tar"',
    grammarTip: 'Numbers don\'t affect the form of time units (minuter)',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'tar' },
      { id: 'word-3', text: 'tjugo' },
      { id: 'word-4', text: 'minuter' },
      { id: 'word-5', text: 'att' },
      { id: 'word-6', text: 'gå' },
      { id: 'word-7', text: 'till' },
      { id: 'word-8', text: 'stationen' },
    ],
  },
  {
    id: '47',
    difficulty: 'intermediate',
    correctSentence: 'Vi brukar träffas på det lilla kaféet',
    alternativeAnswers: [
      'På det lilla kaféet brukar vi träffas'
    ],
    translation: 'We usually meet at the small café',
    hint: 'Double definiteness with adjective (det lilla kaféet)',
    grammarTip: 'Definite form needs both "det" and "-et" when there\'s an adjective',
    wordTiles: [
      { id: 'word-1', text: 'Vi' },
      { id: 'word-2', text: 'brukar' },
      { id: 'word-3', text: 'träffas' },
      { id: 'word-4', text: 'på' },
      { id: 'word-5', text: 'det' },
      { id: 'word-6', text: 'lilla' },
      { id: 'word-7', text: 'kaféet' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '48',
    difficulty: 'advanced',
    correctSentence: 'Såvitt jag vet kommer hon inte på festen',
    alternativeAnswers: [
      'Hon kommer inte på festen såvitt jag vet'
    ],
    translation: 'As far as I know, she\'s not coming to the party',
    hint: 'Expression "såvitt" with subjective opinion',
    grammarTip: 'Negation "inte" comes after the verb in main clauses',
    wordTiles: [
      { id: 'word-1', text: 'Såvitt' },
      { id: 'word-2', text: 'jag' },
      { id: 'word-3', text: 'vet' },
      { id: 'word-4', text: 'kommer' },
      { id: 'word-5', text: 'hon' },
      { id: 'word-6', text: 'inte' },
      { id: 'word-7', text: 'på' },
      { id: 'word-8', text: 'festen' },
    ],
  },
  {
    id: '49',
    difficulty: 'advanced',
    correctSentence: 'Antingen måste vi skynda oss eller så missar vi tåget',
    alternativeAnswers: [
      'Vi måste skynda oss annars missar vi tåget'
    ],
    translation: 'Either we must hurry or we\'ll miss the train',
    hint: 'Correlative conjunction with "antingen...eller"',
    grammarTip: 'Reflexive verb "skynda sig" changes form to match subject (oss with vi)',
    wordTiles: [
      { id: 'word-1', text: 'Antingen' },
      { id: 'word-2', text: 'måste' },
      { id: 'word-3', text: 'vi' },
      { id: 'word-4', text: 'skynda' },
      { id: 'word-5', text: 'oss' },
      { id: 'word-6', text: 'eller' },
      { id: 'word-7', text: 'så' },
      { id: 'word-8', text: 'missar' },
      { id: 'word-9', text: 'vi' },
      { id: 'word-10', text: 'tåget' },
    ],
  },
  {
    id: '50',
    difficulty: 'advanced',
    correctSentence: 'Ju tidigare vi börjar desto större chans har vi att lyckas',
    alternativeAnswers: [
      'Desto större chans har vi att lyckas ju tidigare vi börjar'
    ],
    translation: 'The earlier we start, the better chance we have to succeed',
    hint: 'Complex comparative with "ju...desto" and infinitive',
    grammarTip: 'The infinitive marker "att" is used before the verb "lyckas"',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'tidigare' },
      { id: 'word-3', text: 'vi' },
      { id: 'word-4', text: 'börjar' },
      { id: 'word-5', text: 'desto' },
      { id: 'word-6', text: 'större' },
      { id: 'word-7', text: 'chans' },
      { id: 'word-8', text: 'har' },
      { id: 'word-9', text: 'vi' },
      { id: 'word-10', text: 'att' },
      { id: 'word-11', text: 'lyckas' },
    ],
  },
  {
    id: '51',
    difficulty: 'beginner',
    correctSentence: 'Jag ska träffa mina vänner ikväll',
    alternativeAnswers: [
      'Ikväll ska jag träffa mina vänner'
    ],
    translation: 'I will meet my friends tonight',
    hint: 'Future tense with "ska" + time expression',
    grammarTip: 'Use "mina" (not "min") with plural nouns (vänner)',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'ska' },
      { id: 'word-3', text: 'träffa' },
      { id: 'word-4', text: 'mina' },
      { id: 'word-5', text: 'vänner' },
      { id: 'word-6', text: 'ikväll' },
    ],
  },
  {
    id: '52',
    difficulty: 'beginner',
    correctSentence: 'Katten sover på soffan',
    alternativeAnswers: [
      'På soffan sover katten'
    ],
    translation: 'The cat is sleeping on the couch',
    hint: 'Definite form of "katt" is "katten"',
    grammarTip: 'Common nouns take -en/-n ending in definite form',
    wordTiles: [
      { id: 'word-1', text: 'Katten' },
      { id: 'word-2', text: 'sover' },
      { id: 'word-3', text: 'på' },
      { id: 'word-4', text: 'soffan' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '53',
    difficulty: 'intermediate',
    correctSentence: 'Hon har redan lagat middagen när vi kommer hem',
    alternativeAnswers: [
      'När vi kommer hem har hon redan lagat middagen'
    ],
    translation: 'She will have already made dinner when we come home',
    hint: 'Future perfect with "har redan" + supine',
    grammarTip: 'Word order changes when starting with "när"-clause',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'har' },
      { id: 'word-3', text: 'redan' },
      { id: 'word-4', text: 'lagat' },
      { id: 'word-5', text: 'middagen' },
      { id: 'word-6', text: 'när' },
      { id: 'word-7', text: 'vi' },
      { id: 'word-8', text: 'kommer' },
      { id: 'word-9', text: 'hem' },
    ],
  },
  {
    id: '54',
    difficulty: 'intermediate',
    correctSentence: 'Jag önskar att det var sommar nu',
    alternativeAnswers: [
      'Nu önskar jag att det var sommar'
    ],
    translation: 'I wish it was summer now',
    hint: 'Subjunctive mood with "önskar att"',
    grammarTip: 'Use past tense (var) after "önskar att" for present wishes',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'önskar' },
      { id: 'word-3', text: 'att' },
      { id: 'word-4', text: 'det' },
      { id: 'word-5', text: 'var' },
      { id: 'word-6', text: 'sommar' },
      { id: 'word-7', text: 'nu' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '55',
    difficulty: 'advanced',
    correctSentence: 'Hade jag bara vågat skulle jag ha pratat med henne',
    alternativeAnswers: [
      'Jag skulle ha pratat med henne hade jag bara vågat'
    ],
    translation: 'If only I had dared, I would have talked to her',
    hint: 'Past perfect conditional with "hade bara"',
    grammarTip: 'Inversion in first clause when omitting "om"',
    wordTiles: [
      { id: 'word-1', text: 'Hade' },
      { id: 'word-2', text: 'jag' },
      { id: 'word-3', text: 'bara' },
      { id: 'word-4', text: 'vågat' },
      { id: 'word-5', text: 'skulle' },
      { id: 'word-6', text: 'jag' },
      { id: 'word-7', text: 'ha' },
      { id: 'word-8', text: 'pratat' },
      { id: 'word-9', text: 'med' },
      { id: 'word-10', text: 'henne' },
    ],
  },
  {
    id: '56',
    difficulty: 'advanced',
    correctSentence: 'Det är först när man blir äldre som man förstår',
    alternativeAnswers: [
      'Man förstår först när man blir äldre'
    ],
    translation: 'It\'s only when you get older that you understand',
    hint: 'Cleft sentence with "det är...som"',
    grammarTip: 'This construction emphasizes the time aspect (när man blir äldre)',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'är' },
      { id: 'word-3', text: 'först' },
      { id: 'word-4', text: 'när' },
      { id: 'word-5', text: 'man' },
      { id: 'word-6', text: 'blir' },
      { id: 'word-7', text: 'äldre' },
      { id: 'word-8', text: 'som' },
      { id: 'word-9', text: 'man' },
      { id: 'word-10', text: 'förstår' },
    ],
  },
  {
    id: '57',
    difficulty: 'advanced',
    correctSentence: 'Ju mer jag tänker på det desto konstigare verkar det',
    alternativeAnswers: [
      'Desto konstigare verkar det ju mer jag tänker på det'
    ],
    translation: 'The more I think about it, the stranger it seems',
    hint: 'Complex comparative with "ju...desto" and verb "verkar"',
    grammarTip: 'Notice how "verkar" affects word order in second clause',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'mer' },
      { id: 'word-3', text: 'jag' },
      { id: 'word-4', text: 'tänker' },
      { id: 'word-5', text: 'på' },
      { id: 'word-6', text: 'det' },
      { id: 'word-7', text: 'desto' },
      { id: 'word-8', text: 'konstigare' },
      { id: 'word-9', text: 'verkar' },
      { id: 'word-10', text: 'det' },
    ],
  },
  {
    id: '58',
    difficulty: 'beginner',
    correctSentence: 'Vi äter frukost i köket',
    alternativeAnswers: [
      'I köket äter vi frukost'
    ],
    translation: 'We eat breakfast in the kitchen',
    hint: 'Location can be at the beginning or end',
    grammarTip: 'Definite form of "kök" is "köket" (-et ending for neuter nouns)',
    wordTiles: [
      { id: 'word-1', text: 'Vi' },
      { id: 'word-2', text: 'äter' },
      { id: 'word-3', text: 'frukost' },
      { id: 'word-4', text: 'i' },
      { id: 'word-5', text: 'köket' },
    ],
  },
  {
    id: '59',
    difficulty: 'beginner',
    correctSentence: 'Mina barn gillar glass och choklad',
    alternativeAnswers: [
      'Glass och choklad gillar mina barn'
    ],
    translation: 'My children like ice cream and chocolate',
    hint: 'Possessive + plural noun + verb + objects',
    grammarTip: 'Possessive "min" becomes "mina" with plural nouns',
    wordTiles: [
      { id: 'word-1', text: 'Mina' },
      { id: 'word-2', text: 'barn' },
      { id: 'word-3', text: 'gillar' },
      { id: 'word-4', text: 'glass' },
      { id: 'word-5', text: 'och' },
      { id: 'word-6', text: 'choklad' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '60',
    difficulty: 'intermediate',
    correctSentence: 'Han kunde inte komma för att han var sjuk',
    alternativeAnswers: [
      'För att han var sjuk kunde han inte komma'
    ],
    translation: 'He couldn\'t come because he was sick',
    hint: 'Modal verb (kunde) + negation (inte) + main verb (komma)',
    grammarTip: 'Negation "inte" comes after the first verb in main clauses',
    wordTiles: [
      { id: 'word-1', text: 'Han' },
      { id: 'word-2', text: 'kunde' },
      { id: 'word-3', text: 'inte' },
      { id: 'word-4', text: 'komma' },
      { id: 'word-5', text: 'för' },
      { id: 'word-6', text: 'att' },
      { id: 'word-7', text: 'han' },
      { id: 'word-8', text: 'var' },
      { id: 'word-9', text: 'sjuk' },
    ],
  },
  {
    id: '61',
    difficulty: 'intermediate',
    correctSentence: 'Den gamla bilen behöver repareras snart',
    alternativeAnswers: [
      'Snart behöver den gamla bilen repareras'
    ],
    translation: 'The old car needs to be repaired soon',
    hint: 'Double definiteness (den + -a) with adjective',
    grammarTip: 'Passive voice formed with -s ending (repareras)',
    wordTiles: [
      { id: 'word-1', text: 'Den' },
      { id: 'word-2', text: 'gamla' },
      { id: 'word-3', text: 'bilen' },
      { id: 'word-4', text: 'behöver' },
      { id: 'word-5', text: 'repareras' },
      { id: 'word-6', text: 'snart' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '62',
    difficulty: 'advanced',
    correctSentence: 'Vore det inte för regnet skulle vi ha picknick idag',
    alternativeAnswers: [
      'Vi skulle ha picknick idag vore det inte för regnet'
    ],
    translation: 'If it weren\'t for the rain, we would have a picnic today',
    hint: 'Subjunctive mood with "vore" (were)',
    grammarTip: '"Vore" is the subjunctive form of "vara" used in hypotheticals',
    wordTiles: [
      { id: 'word-1', text: 'Vore' },
      { id: 'word-2', text: 'det' },
      { id: 'word-3', text: 'inte' },
      { id: 'word-4', text: 'för' },
      { id: 'word-5', text: 'regnet' },
      { id: 'word-6', text: 'skulle' },
      { id: 'word-7', text: 'vi' },
      { id: 'word-8', text: 'ha' },
      { id: 'word-9', text: 'picknick' },
      { id: 'word-10', text: 'idag' },
    ],
  },
  {
    id: '63',
    difficulty: 'advanced',
    correctSentence: 'Låt oss säga att du vinner på lotteriet',
    alternativeAnswers: [
      'Om vi säger att du vinner på lotteriet'
    ],
    translation: 'Let\'s say that you win the lottery',
    hint: 'Imperative construction with "låt oss"',
    grammarTip: '"Låt oss" is a common way to make suggestions in Swedish',
    wordTiles: [
      { id: 'word-1', text: 'Låt' },
      { id: 'word-2', text: 'oss' },
      { id: 'word-3', text: 'säga' },
      { id: 'word-4', text: 'att' },
      { id: 'word-5', text: 'du' },
      { id: 'word-6', text: 'vinner' },
      { id: 'word-7', text: 'på' },
      { id: 'word-8', text: 'lotteriet' },
    ],
  },
  {
    id: '64',
    difficulty: 'advanced',
    correctSentence: 'Hur mycket pengar än du har räcker det aldrig',
    alternativeAnswers: [
      'Det räcker aldrig hur mycket pengar än du har'
    ],
    translation: 'No matter how much money you have, it\'s never enough',
    hint: 'Concessive clause with "än"',
    grammarTip: 'The construction "hur...än" means "no matter how"',
    wordTiles: [
      { id: 'word-1', text: 'Hur' },
      { id: 'word-2', text: 'mycket' },
      { id: 'word-3', text: 'pengar' },
      { id: 'word-4', text: 'än' },
      { id: 'word-5', text: 'du' },
      { id: 'word-6', text: 'har' },
      { id: 'word-7', text: 'räcker' },
      { id: 'word-8', text: 'det' },
      { id: 'word-9', text: 'aldrig' },
    ],
  },

  // Additional Beginner Exercises
  {
    id: '65',
    difficulty: 'beginner',
    correctSentence: 'Jag behöver köpa nya skor',
    alternativeAnswers: [
      'Nya skor behöver jag köpa'
    ],
    translation: 'I need to buy new shoes',
    hint: 'Modal verb (behöver) + infinitive (köpa)',
    grammarTip: 'Adjective "nya" agrees with plural noun "skor"',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'behöver' },
      { id: 'word-3', text: 'köpa' },
      { id: 'word-4', text: 'nya' },
      { id: 'word-5', text: 'skor' },
    ],
  },
  {
    id: '66',
    difficulty: 'beginner',
    correctSentence: 'Det finns många böcker på bordet',
    alternativeAnswers: [
      'På bordet finns det många böcker'
    ],
    translation: 'There are many books on the table',
    hint: 'Existential "det finns" construction',
    grammarTip: '"Många" is used with countable nouns in plural form',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'finns' },
      { id: 'word-3', text: 'många' },
      { id: 'word-4', text: 'böcker' },
      { id: 'word-5', text: 'på' },
      { id: 'word-6', text: 'bordet' },
    ],
  },

  // Additional Intermediate Exercises
  {
    id: '67',
    difficulty: 'intermediate',
    correctSentence: 'Jag undrar om han kommer ihåg mötet',
    alternativeAnswers: [
      'Om han kommer ihåg mötet undrar jag'
    ],
    translation: 'I wonder if he remembers the meeting',
    hint: 'Indirect question with "om" (if/whether)',
    grammarTip: 'Particle verb "kommer ihåg" keeps particles together in subordinate clauses',
    wordTiles: [
      { id: 'word-1', text: 'Jag' },
      { id: 'word-2', text: 'undrar' },
      { id: 'word-3', text: 'om' },
      { id: 'word-4', text: 'han' },
      { id: 'word-5', text: 'kommer' },
      { id: 'word-6', text: 'ihåg' },
      { id: 'word-7', text: 'mötet' },
    ],
  },
  {
    id: '68',
    difficulty: 'intermediate',
    correctSentence: 'Hon brukade spela piano när hon var yngre',
    alternativeAnswers: [
      'När hon var yngre brukade hon spela piano'
    ],
    translation: 'She used to play piano when she was younger',
    hint: 'Past habit with "brukade" + time clause',
    grammarTip: '"Brukade" indicates a past habit or repeated action',
    wordTiles: [
      { id: 'word-1', text: 'Hon' },
      { id: 'word-2', text: 'brukade' },
      { id: 'word-3', text: 'spela' },
      { id: 'word-4', text: 'piano' },
      { id: 'word-5', text: 'när' },
      { id: 'word-6', text: 'hon' },
      { id: 'word-7', text: 'var' },
      { id: 'word-8', text: 'yngre' },
    ],
  },

  // Additional Advanced Exercises
  {
    id: '69',
    difficulty: 'advanced',
    correctSentence: 'Ju mer man reser desto mer förstår man andra kulturer',
    alternativeAnswers: [
      'Desto mer förstår man andra kulturer ju mer man reser'
    ],
    translation: 'The more one travels, the more one understands other cultures',
    hint: 'Complex comparative with "ju...desto"',
    grammarTip: 'Generic "man" is used in both clauses for general statements',
    wordTiles: [
      { id: 'word-1', text: 'Ju' },
      { id: 'word-2', text: 'mer' },
      { id: 'word-3', text: 'man' },
      { id: 'word-4', text: 'reser' },
      { id: 'word-5', text: 'desto' },
      { id: 'word-6', text: 'mer' },
      { id: 'word-7', text: 'förstår' },
      { id: 'word-8', text: 'man' },
      { id: 'word-9', text: 'andra' },
      { id: 'word-10', text: 'kulturer' },
    ],
  },
  {
    id: '70',
    difficulty: 'advanced',
    correctSentence: 'Hade jag inte varit så trött skulle jag ha följt med',
    alternativeAnswers: [
      'Jag skulle ha följt med hade jag inte varit så trött'
    ],
    translation: 'If I hadn\'t been so tired, I would have come along',
    hint: 'Past perfect conditional without "om"',
    grammarTip: 'Inversion in condition clause when "om" is omitted',
    wordTiles: [
      { id: 'word-1', text: 'Hade' },
      { id: 'word-2', text: 'jag' },
      { id: 'word-3', text: 'inte' },
      { id: 'word-4', text: 'varit' },
      { id: 'word-5', text: 'så' },
      { id: 'word-6', text: 'trött' },
      { id: 'word-7', text: 'skulle' },
      { id: 'word-8', text: 'jag' },
      { id: 'word-9', text: 'ha' },
      { id: 'word-10', text: 'följt' },
      { id: 'word-11', text: 'med' },
    ],
  },
  {
    id: '71',
    difficulty: 'advanced',
    correctSentence: 'Det är viktigt att man tar hand om sin hälsa',
    alternativeAnswers: [
      'Att man tar hand om sin hälsa är viktigt'
    ],
    translation: 'It is important to take care of one\'s health',
    hint: 'Impersonal construction with particle verb',
    grammarTip: 'Reflexive "sin" refers back to generic "man" as subject',
    wordTiles: [
      { id: 'word-1', text: 'Det' },
      { id: 'word-2', text: 'är' },
      { id: 'word-3', text: 'viktigt' },
      { id: 'word-4', text: 'att' },
      { id: 'word-5', text: 'man' },
      { id: 'word-6', text: 'tar' },
      { id: 'word-7', text: 'hand' },
      { id: 'word-8', text: 'om' },
      { id: 'word-9', text: 'sin' },
      { id: 'word-10', text: 'hälsa' },
    ],
  }
];

export function SentenceBuilder() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userSentence, setUserSentence] = useState<WordTile[]>([]);
  const [availableWords, setAvailableWords] = useState<WordTile[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('beginner');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      loadExercise();
    } catch (err) {
      setError('Failed to load exercise. Please try again.');
    }
  }, [selectedDifficulty]);

  const loadExercise = () => {
    const difficultyExercises = exercises.filter(ex => ex.difficulty === selectedDifficulty);
    if (difficultyExercises.length === 0) {
      throw new Error('No exercises available for selected difficulty');
    }

    // Get current exercise ID to avoid repeating the same exercise
    const currentId = currentExercise?.id;
    
    // Filter out the current exercise from possible choices
    const availableExercises = difficultyExercises.filter(ex => ex.id !== currentId);
    
    // If we've used all exercises, reset the pool
    const exercisePool = availableExercises.length > 0 ? availableExercises : difficultyExercises;
    
    // Use Fisher-Yates shuffle for better randomization
    const shuffledExercises = [...exercisePool].sort(() => Math.random() - 0.5);
    const randomExercise = shuffledExercises[0];

    setCurrentExercise(randomExercise);
    
    // Shuffle the word tiles using Fisher-Yates shuffle
    const shuffledWords = [...randomExercise.wordTiles];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    
    setAvailableWords(shuffledWords);
    setUserSentence([]);
    setFeedback('');
    setShowHint(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Same list movement
      const items = Array.from(
        source.droppableId === 'available' ? availableWords : userSentence
      );
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      if (source.droppableId === 'available') {
        setAvailableWords(items);
      } else {
        setUserSentence(items);
      }
    } else {
      // Moving between lists
      const sourceItems = Array.from(
        source.droppableId === 'available' ? availableWords : userSentence
      );
      const destItems = Array.from(
        destination.droppableId === 'available' ? availableWords : userSentence
      );
      
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setAvailableWords(source.droppableId === 'available' ? sourceItems : destItems);
      setUserSentence(source.droppableId === 'available' ? destItems : sourceItems);
    }
  };

  const checkSentence = (): void => {
    try {
      const userSentenceText = userSentence.map(word => word.text).join(' ');
      const isCorrect = userSentenceText === currentExercise?.correctSentence || 
                       currentExercise?.alternativeAnswers?.includes(userSentenceText);
      
      if (isCorrect) {
        setFeedback('Correct! Well done! 🎉');
      } else {
        setFeedback('Not quite right. Try again!');
      }
    } catch (err) {
      setError('Failed to check sentence. Please try again.');
    }
  };

  const handleNextExercise = (): void => {
    try {
      loadExercise();
    } catch (err) {
      setError('Failed to load next exercise. Please try again.');
    }
  };

  const resetExercise = (): void => {
    try {
      if (currentExercise) {
        setAvailableWords([...currentExercise.wordTiles].sort(() => Math.random() - 0.5));
        setUserSentence([]);
        setFeedback('');
        setShowHint(false);
      }
    } catch (err) {
      setError('Failed to reset exercise. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="text-red-600 p-4 text-center">
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            loadExercise();
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sentence Builder</h2>
        <p className="text-gray-600">Drag and drop the words to build the correct sentence</p>
        
        {/* Difficulty selector */}
        <div className="mt-4 flex justify-center gap-2">
          {(['beginner', 'intermediate', 'advanced'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={`px-4 py-2 rounded-lg ${
                selectedDifficulty === difficulty
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>

        {currentExercise?.translation && (
          <p className="mt-4 text-gray-600">Translation: {currentExercise.translation}</p>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Sentence building area */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">Your Sentence:</h3>
          <Droppable droppableId="sentence" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[80px] flex flex-wrap gap-2 p-4 bg-white rounded-lg border-2 border-dashed ${
                  snapshot.isDraggingOver ? 'border-blue-500' : 'border-blue-300'
                }`}
              >
                {userSentence.map((word, index) => (
                  <Draggable key={word.id} draggableId={word.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-blue-500 text-white px-3 py-2 rounded-lg ${
                          snapshot.isDragging ? 'opacity-50' : ''
                        }`}
                      >
                        {word.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Available words */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Available Words:</h3>
          <Droppable droppableId="available" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`flex flex-wrap gap-2 p-4 bg-white rounded-lg ${
                  snapshot.isDraggingOver ? 'bg-gray-50' : ''
                }`}
              >
                {availableWords.map((word, index) => (
                  <Draggable key={word.id} draggableId={word.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-gray-200 px-3 py-2 rounded-lg cursor-move ${
                          snapshot.isDragging ? 'opacity-50' : ''
                        }`}
                      >
                        {word.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Controls and feedback */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex gap-4">
          <button
            onClick={checkSentence}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Check Sentence
          </button>
          <button
            onClick={resetExercise}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Reset
          </button>
          {currentExercise?.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          )}
          {feedback && (
            <button
              onClick={handleNextExercise}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Next Exercise →
            </button>
          )}
        </div>
        {showHint && currentExercise?.hint && (
          <div className="text-yellow-600 space-y-2">
            <div className="font-medium">
              Hint: {currentExercise.hint}
            </div>
            {currentExercise.grammarTip && (
              <div className="text-sm border-t border-yellow-200 pt-2 mt-2">
                Grammar Tip: {currentExercise.grammarTip}
              </div>
            )}
          </div>
        )}
        {feedback && (
          <div className={`text-lg font-semibold ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </div>
        )}
        {feedback.includes('Correct') && (
          <div className="text-sm text-gray-600 animate-bounce mt-2">
            Click "Next Exercise" to continue →
          </div>
        )}
      </div>
    </div>
  );
} 