import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Badge } from '@/components/ui/badge';

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
  hints: {
    structural: string;    // Hint about sentence structure
    grammar: string;       // Hint about grammar rules
    vocabulary: string;    // Hint about word usage and meaning
  };
  grammarTip?: string;    
}

type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Define exercises array first
const exercises: Exercise[] = [
    {
        id: '1',
        difficulty: 'beginner',
        correctSentence: 'Jag tycker om att lära mig svenska',
        alternativeAnswers: [
          'Jag tycker om att lära svenska',
        ],
        translation: 'I like to learn Swedish',
        hints: {
          structural: 'Subject (Jag) + verb phrase (tycker om) + infinitive construction (att lära)',
          grammar: 'Particle verbs like "tycker om" keep their particles next to the verb in normal word order',
          vocabulary: '"Tycker om" is a particle verb meaning "like", "lära sig" is a reflexive verb meaning "to learn"'
        },
        grammarTip: 'With reflexive verbs like "lära sig", the reflexive pronoun (mig) is optional in some cases',
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
        hints: {
          structural: 'Possessive (Min) + noun (katt) + verb (är) + adjectives (svart och vit)',
          grammar: 'Unlike English, Swedish adjectives don\'t change form when used with "och"',
          vocabulary: '"Min" is the possessive form used with en-words like "katt". "Och" means "and"'
        },
        grammarTip: 'The order of coordinated adjectives is flexible in this case',
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
        difficulty: 'intermediate',
        correctSentence: 'Det börjar bli kallt ute på kvällarna',
        translation: 'It\'s starting to get cold outside in the evenings',
        hints: {
          structural: 'Impersonal subject (Det) + verb phrase (börjar bli) + adjective (kallt) + adverbs (ute, på kvällarna)',
          grammar: '"Börjar bli" is a double verb construction where both verbs are in present tense',
          vocabulary: '"Ute" means "outside", "på kvällarna" is a fixed expression meaning "in the evenings"'
        },
        grammarTip: 'Time expressions can move to the front for emphasis, but this triggers inversion',
        wordTiles: [
          { id: 'word-1', text: 'Det' },
          { id: 'word-2', text: 'börjar' },
          { id: 'word-3', text: 'bli' },
          { id: 'word-4', text: 'kallt' },
          { id: 'word-5', text: 'ute' },
          { id: 'word-6', text: 'på' },
          { id: 'word-7', text: 'kvällarna' },
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
        hints: {
          structural: 'Main clause order: Subject + Verb + Object + Place\nOR\nPlace + Verb + Subject + Object', 
          grammar: 'Indefinite form uses "en/ett" + adjective + noun. Location phrases can move to emphasize different parts of the sentence',
          vocabulary: '"Hon" means "she", "läser" means "reads", "en" means "a", "intressant" means "interesting", "bok" means "book", "på" means "at", "biblioteket" means "library"'
        },
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
        hints: {
          structural: 'Subject + ska + main verb (infinitive) + destination + time',
          grammar: 'Future tense construction with "ska" requires infinitive form of main verb',
          vocabulary: '"Ska" indicates planned future, "resa" means "to travel", "nästa sommar" means "next summer"'
        },
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
        hints: {
          structural: 'Subject with preposition phrase + verb + adverb + adjective',
          grammar: 'Adjective "god" agrees with en-word "mat"',
          vocabulary: '"Maten" means "the food", "mycket" means "very"'
        },
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
        hints: {
          structural: 'Complex structure with three parts: concessive clause (Trots att...), main clause with reflexive verb (bestämde oss för), and infinitive phrase (att gå ut)',
          grammar: 'Reflexive verb "bestämma sig för" requires reflexive pronoun matching the subject. Infinitive phrase uses "att" + base verb form',
          vocabulary: '"Trots att" means "despite/although", "bestämma sig för" means "to decide to", "gå ut" means "to go out"'
        },
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
        hints: {
          structural: 'If-clause (Om + subject + hade + object) + main clause (skulle + subject + verb + reflexive)',
          grammar: 'Present/future unreal conditional uses "hade" in if-clause and "skulle" in main clause',
          vocabulary: '"Fler" means "more" (for countable nouns), "skulle" expresses "would"'
        },
        grammarTip: 'This is a present/future unreal conditional. Compare with English "If I had... I would..."',
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
        hints: {
          structural: 'Subject with relative clause + main verb in perfect tense + object',
          grammar: 'Relative pronoun "som" connects the main clause with the relative clause',
          vocabulary: '"Recensioner" means "reviews", "har fått" means "has received"'
        },
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
        hints: {
          structural: 'Subject (Vädret) + verb (är) + adjective + time adverb',
          grammar: 'Adjective "vackert" agrees with ett-word "väder"',
          vocabulary: '"Vädret" means "the weather", "vackert" means "beautiful"'
        },
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
        hints: {
          structural: 'Subject + verb + object + time expression',
          grammar: 'Time expressions with "på" are used for recurring times',
          vocabulary: '"På morgonen" means "in the morning", "dricker" means "drinks"'
        },
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
        hints: {
          structural: 'Subject + verb + preposition + reflexive possessive + adjective + noun',
          grammar: 'Use "sina" (not "deras") when the owner is the subject of the sentence',
          vocabulary: '"Leker" means "play/are playing", "leksaker" means "toys"'
        },
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
        hints: {
          structural: 'Subject + modal verb + main verb + object + temporal clause',
          grammar: 'Modal verb "måste" is followed by infinitive without "att"',
          vocabulary: '"Måste" means "must", "stänga" means "to close", "fönstret" means "the window"'
        },
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
        alternativeAnswers: ['Jag kan prata svenska även om jag inte förstår allt'],
        translation: 'Even though I don\'t understand everything, I can speak Swedish',
        hints: {
          structural: 'Subordinate clause (Även om...) + main clause OR main clause + subordinate clause',
          grammar: 'When "även om" clause comes first, the main clause follows V2 rule',
          vocabulary: '"Även om" means "even though/although", "förstår" is present tense of "förstå" (understand)'
        },
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
        hints: {
          structural: 'Ju + comparative phrase + desto + comparative phrase with inversion',
          grammar: 'Both parts use present tense even for general truths. Second part requires inversion',
          vocabulary: '"Övar" is present tense of "öva" (practice), "blir" means "becomes"'
        },
        grammarTip: 'Notice how "verkar" affects word order in the second clause',
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
      {
        id: '16',
        difficulty: 'beginner',
        correctSentence: 'Jag gillar att laga mat',
        alternativeAnswers: ['Att laga mat gillar jag'],
        translation: 'I like to cook',
        hints: {
          structural: 'Subject + verb + infinitive phrase OR infinitive phrase + verb + subject',
          grammar: 'Infinitive marker "att" is required before "laga" when used as object',
          vocabulary: '"Gillar" means "like", "laga mat" is a fixed phrase meaning "to cook"'
        },
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
        alternativeAnswers: ['I parken springer hennes hund'],
        translation: 'Her dog runs in the park',
        hints: {
          structural: 'Subject (Hennes hund) + verb + location OR Location + verb + subject',
          grammar: 'When location comes first, verb must come before subject (V2 rule)',
          vocabulary: '"Hennes" is possessive "her", "springer" means "runs/is running"'
        },
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
        alternativeAnswers: ['Förut har han aldrig varit i Danmark'],
        translation: 'He has never been to Denmark before',
        hints: {
          structural: 'Subject + auxiliary + negation + main verb + location + time',
          grammar: 'Negation (aldrig) must come between auxiliary (har) and main verb (varit)',
          vocabulary: '"Aldrig" means "never", "förut" means "before", "varit" is supine of "vara"'
        },
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
        alternativeAnswers: ['I staden finns det många fina caféer'],
        translation: 'There are many nice cafes in the city',
        hints: {
          structural: 'Existential "det finns" + adjectives + noun + location',
          grammar: 'Adjectives (fina) must agree with the plural indefinite noun (caféer)',
          vocabulary: '"Det finns" means "there is/are", "många" means "many"'
        },
        grammarTip: 'The phrase "det finns" is used to express existence, similar to "there is/are"',
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
        alternativeAnswers: ['Jag skulle ha kommit tidigare hade jag vetat det'],
        translation: 'If I had known that, I would have come earlier',
        hints: {
          structural: 'Inverted conditional clause + modal verb clause with perfect infinitive',
          grammar: 'Omitting "om" requires inversion in the conditional clause (hade jag instead of jag hade)',
          vocabulary: '"Vetat" is supine of "veta" (know), "tidigare" means "earlier"'
        },
        grammarTip: 'This is a past unreal conditional - both clauses use past perfect forms',
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
        alternativeAnswers: ['Desto svårare blir det ju längre man väntar'],
        translation: 'The longer you wait, the harder it becomes',
        hints: {
          structural: 'Ju + comparative + subject + verb + desto + comparative + verb + subject',
          grammar: 'This structure requires inversion in the second part (blir det)',
          vocabulary: '"Längre" means "longer", "svårare" means "harder", "väntar" means "wait"'
        },
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
        alternativeAnswers: ['Igår kväll undrade hon vem som hade ringt'],
        translation: 'She wondered who had called last night',
        hints: {
          structural: 'Main clause + indirect question with "som" + time expression',
          grammar: '"Som" is required when "vem" is the subject of the indirect question',
          vocabulary: '"Undrade" means "wondered", "ringt" is supine of "ringa" (to call)'
        },
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
        hints: {
          structural: 'Subject + verb + adjective + noun',
          grammar: 'Adjective (röd) comes between article (en/ett) and noun (bil)',
          vocabulary: '"Röd" means "red", "bil" means "car"'
        },
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
        hints: {
          structural: 'Definite form with adjective uses "den/det" + adjective + noun with definite ending',
          grammar: 'Double definiteness: den/det + adjective + noun-en/et',
          vocabulary: '"Köpte" means "bought", "gröna" means "green", "klänningen" means "dress"'
        },
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
        hints: {
          structural: 'Modal verb "brukar" indicates habit/routine',
          grammar: 'With time expressions, "klockan" is used for specific times',
          vocabulary: '"Brukar" means "usually", "middag" means "dinner"'
        },
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
        hints: {
          structural: 'Participle construction with "utan att ha + supine"',
          grammar: 'The participle phrase can come first or last, affecting word order',
          vocabulary: '"Utan" means "without", "ätit" is supine of "äta" (to eat), "frukost" means "breakfast"'
        },
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
        hints: {
          structural: 'Correlative conjunction "antingen...eller"',
          grammar: 'With "antingen...eller", "så" is often added before the second clause',
          vocabulary: '"Antingen" means "either", "regnar" means "rains", "snö" means "snow"'
        },
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
        hints: {
          structural: 'Another "ju...desto" construction with multiple clauses',
          grammar: 'Notice how "man" is repeated in both clauses as the generic subject',
          vocabulary: '"Fler" means "more", "böcker" means "books", "läser" means "read", "lär" means "learn"'
        },
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
        hints: {
          structural: 'Neuter noun (rum) requires "mitt" and "stort"',
          grammar: 'Adjectives with neuter nouns end in -t (stor → stort, ljus → ljust)',
          vocabulary: '"Mitt" means "my", "rum" means "room", "stort" means "big", "ljus" means "bright"'
        },
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
        hints: {
          structural: 'Numbers come before adjectives',
          grammar: 'Adjectives are in plural form when describing plural nouns (små not liten)',
          vocabulary: '"De" means "they", "har" means "have", "tre" means "three", "små" means "small", "hundar" means "dogs"'
        },
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
        hints: {
          structural: 'Double verb construction with modal verb (måste ha)',
          grammar: 'Use "sina" (not hennes) because the subject owns the keys',
          vocabulary: '"Hon" means "she", "måste" means "must", "ha" means "have", "glömt" means "forgot", "sina" means "her", "nycklar" means "keys", "hemma" means "at home"'
        },
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
        hints: {
          structural: 'Relative clause with "som" after "någon"',
          grammar: 'In relative clauses, "som" is used for both who/which/that',
          vocabulary: '"Jag" means "I", "känner" means "know", "någon" means "someone", "som" means "who/which/that", "talar" means "speaks", "flytande" means "fluent", "svenska" means "Swedish"'
        },
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
        hints: {
          structural: 'Past perfect conditional without "om"',
          grammar: 'When omitting "om", invert "hade" and subject in the condition',
          vocabulary: '"Hade" means "had", "det" means "it", "inte" means "not", "varit" means "been", "för" means "for", "regnet" means "rain", "skulle" means "would", "vi" means "we", "ha" means "have", "gått" means "gone", "ut" means "out"'
        },
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
        hints: {
          structural: 'Complex comparative with "ju...desto" and reflexive verb',
          grammar: 'Notice how "verkar" affects word order in the second clause',
          vocabulary: '"Ju" means "the more", "lär" means "learn", "mig" means "me", "desto" means "so", "svårare" means "harder", "verkar" means "seems", "det" means "it", "bli" means "become"'
        },
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
        hints: {
          structural: 'Passive construction with alternative formulations',
          grammar: 'Both impersonal ("det sägs att") and personal ("sägs vara") constructions are possible',
          vocabulary: '"Det" means "it", "sägs" means "is said", "svenskar" means "Swedes", "är" means "are", "reserverade" means "reserved", "men" means "but", "hjälpsamma" means "helpful"'
        },
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
        hints: {
          structural: 'Time expression can be at the beginning or end',
          grammar: 'When time expression is first, verb must be second (V2 rule)',
          vocabulary: '"Jag" means "I", "äter" means "eat", "frukost" means "breakfast", "varje" means "every", "morgon" means "morning"'
        },
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
        hints: {
          structural: 'Definite form with adjective uses "den/det" + adjective + noun',
          grammar: 'Color adjectives must agree with the noun in definiteness (blå → blåa)',
          vocabulary: '"Den" means "the", "blåa" means "blue", "bilen" means "car", "är" means "is", "min" means "mine"'
        },
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
        hints: {
          structural: 'Modal verb (skulle) + infinitive (vilja) + main verb',
          grammar: 'Double infinitive construction: skulle + vilja + beställa',
          vocabulary: '"Jag" means "I", "skulle" means "would", "vilja" means "like to", "beställa" means "order", "en" means "a", "kopp" means "cup", "kaffe" means "coffee"'
        },
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
        hints: {
          structural: 'Indirect question with "varför" - no inversion needed',
          grammar: 'In indirect questions, word order is different from direct questions',
          vocabulary: '"Hon" means "she", "undrar" means "wonders", "varför" means "why", "tåget" means "train", "är" means "is", "försenat" means "delayed", "idag" means "today"'
        },
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
        hints: {
          structural: 'Starting with "inte förrän" causes inversion in main clause',
          grammar: 'When starting with negative expression, main clause uses inverted word order',
          vocabulary: '"Inte" means "not", "förrän" means "until", "hon" means "she", "kom" means "came", "hem" means "home", "insåg" means "realized", "sitt" means "her", "misstag" means "mistake"'
        },
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
        hints: {
          structural: 'Another "ju...desto" construction with direction',
          grammar: 'Comparative with direction uses -re ending (kall → kallare)',
          vocabulary: '"Ju" means "the more", "längre" means "further", "norrut" means "north", "man" means "man", "åker" means "goes", "desto" means "so", "kallare" means "colder", "blir" means "becomes", "det" means "it"'
        },
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
        hints: {
          structural: 'Subordinate clause with "oavsett vad som"',
          grammar: '"Som" is required when "vad" is the subject of the subordinate clause',
          vocabulary: '"Oavsett" means "no matter", "vad" means "what", "som" means "what", "händer" means "happens", "kommer" means "will come", "jag" means "I", "att" means "that", "stödja" means "support", "dig" means "you"'
        },
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
        hints: {
          structural: 'Modal verb (vill) + ha + object with description',
          grammar: 'Compound nouns (jordgubb+smak) are written as one word in Swedish',
          vocabulary: '"Jag" means "I", "vill" means "want", "ha" means "have", "en" means "a", "glass" means "ice cream", "med" means "with", "jordgubbsmak" means "strawberry flavor"'
        },
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
        hints: {
          structural: 'Adjective (gammalt) agrees with neuter noun (hus)',
          grammar: 'Possessive pronouns (hennes) don\'t change form based on the noun',
          vocabulary: '"Hennes" means "her", "syster" means "sister", "bor" means "lives", "i" means "in", "ett" means "a", "gammalt" means "old", "hus" means "house"'
        },
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
        hints: {
          structural: 'Impersonal construction with "det tar"',
          grammar: 'Numbers don\'t affect the form of time units (minuter)',
          vocabulary: '"Det" means "it", "tar" means "takes", "tjugo" means "twenty", "minuter" means "minutes", "att" means "to", "gå" means "walk", "till" means "to", "stationen" means "station"'
        },
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
        hints: {
          structural: 'Double definiteness with adjective (det lilla kaféet)',
          grammar: 'Definite form needs both "det" and "-et" when there\'s an adjective',
          vocabulary: '"Vi" means "we", "brukar" means "usually", "träffas" means "meet", "på" means "at", "det" means "the", "lilla" means "small", "kaféet" means "café"'
        },
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
        hints: {
          structural: 'Expression "såvitt" with subjective opinion',
          grammar: 'Negation "inte" comes after the verb in main clauses',
          vocabulary: '"Såvitt" means "as far as I know", "jag" means "I", "vet" means "know", "kommer" means "will come", "hon" means "she", "inte" means "not", "på" means "at", "festen" means "party"'
        },
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
        hints: {
          structural: 'Correlative conjunction with "antingen...eller"',
          grammar: 'Reflexive verb "skynda sig" changes form to match subject (oss with vi)',
          vocabulary: '"Antingen" means "either", "måste" means "must", "skynda" means "hurry", "oss" means "us", "eller" means "or", "så" means "so", "missar" means "miss", "tåget" means "train"'
        },
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
        hints: {
          structural: 'Complex comparative with "ju...desto" and infinitive',
          grammar: 'The infinitive marker "att" is used before the verb "lyckas"',
          vocabulary: '"Ju" means "the more", "tidigare" means "earlier", "vi" means "we", "börjar" means "start", "desto" means "so", "större" means "greater", "chans" means "chance", "har" means "have", "att" means "to", "lyckas" means "succeed"'
        },
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
        hints: {
          structural: 'Future tense with "ska" + time expression',
          grammar: 'Use "mina" (not "min") with plural nouns (vänner)',
          vocabulary: '"Jag" means "I", "ska" means "will", "träffa" means "meet", "mina" means "my", "vänner" means "friends", "ikväll" means "tonight"'
        },
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
        hints: {
          structural: 'Definite form of "katt" is "katten"',
          grammar: 'Common nouns take -en/-n ending in definite form',
          vocabulary: '"Katten" means "the cat", "sover" means "sleeps", "på" means "on", "soffan" means "couch"'
        },
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
        hints: {
          structural: 'Future perfect with "har redan" + supine',
          grammar: 'Word order changes when starting with "när"-clause',
          vocabulary: '"Hon" means "she", "har" means "has", "redan" means "already", "lagat" means "made", "middagen" means "dinner", "när" means "when", "vi" means "we", "kommer" means "will come", "hem" means "home"'
        },
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
        hints: {
          structural: 'Subjunctive mood with "önskar att"',
          grammar: 'Use past tense (var) after "önskar att" for present wishes',
          vocabulary: '"Jag" means "I", "önskar" means "wish", "att" means "that", "det" means "it", "var" means "was", "sommar" means "summer", "nu" means "now"'
        },
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
        hints: {
          structural: 'Past perfect conditional with "hade bara"',
          grammar: 'Inversion in first clause when omitting "om"',
          vocabulary: '"Hade" means "had", "bara" means "only", "vågat" means "dared", "skulle" means "would", "ha" means "have", "pratat" means "talked", "med" means "with", "henne" means "her"'
        },
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
        hints: {
          structural: 'Cleft sentence with "det är...som"',
          grammar: 'This construction emphasizes the time aspect (när man blir äldre)',
          vocabulary: '"Det" means "it", "är" means "is", "först" means "first", "när" means "when", "man" means "you", "blir" means "become", "äldre" means "older", "som" means "that", "man" means "you", "förstår" means "understand"'
        },
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
        hints: {
          structural: 'Complex comparative with "ju...desto" and verb "verkar"',
          grammar: 'Notice how "verkar" affects word order in second clause',
          vocabulary: '"Ju" means "the more", "mer" means "more", "jag" means "I", "tänker" means "think", "på" means "about", "det" means "it", "desto" means "so", "konstigare" means "stranger", "verkar" means "seems"'
        },
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
        hints: {
          structural: 'Location can be at the beginning or end',
          grammar: 'Definite form of "kök" is "köket" (-et ending for neuter nouns)',
          vocabulary: '"Vi" means "we", "äter" means "eat", "frukost" means "breakfast", "i" means "in", "köket" means "kitchen"'
        },
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
        hints: {
          structural: 'Possessive + plural noun + verb + objects',
          grammar: 'Possessive "min" becomes "mina" with plural nouns',
          vocabulary: '"Mina" means "my", "barn" means "children", "gillar" means "like", "glass" means "ice cream", "och" means "and", "choklad" means "chocolate"'
        },
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
        hints: {
          structural: 'Modal verb (kunde) + negation (inte) + main verb (komma)',
          grammar: 'Negation "inte" comes after the first verb in main clauses',
          vocabulary: '"Han" means "he", "kunde" means "could", "inte" means "not", "komma" means "come", "för" means "because", "att" means "that", "sjuk" means "sick"'
        },
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
        hints: {
          structural: 'Double definiteness (den + -a) with adjective',
          grammar: 'Passive voice formed with -s ending (repareras)',
          vocabulary: '"Den" means "the", "gamla" means "old", "bilen" means "car", "behöver" means "needs", "repareras" means "repaired", "snart" means "soon"'
        },
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
        hints: {
          structural: 'Subjunctive mood with "vore" (were)',
          grammar: '"Vore" is the subjunctive form of "vara" used in hypotheticals',
          vocabulary: '"Vore" means "were", "det" means "it", "inte" means "not", "för" means "for", "regnet" means "rain", "skulle" means "would", "vi" means "we", "ha" means "have", "picknick" means "picnic", "idag" means "today"'
        },
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
        hints: {
          structural: 'Imperative construction with "låt oss"',
          grammar: '"Låt oss" is a common way to make suggestions in Swedish',
          vocabulary: '"Låt oss" means "let us", "säga" means "say", "att" means "that", "du" means "you", "vinner" means "win", "på" means "on", "lotteriet" means "lottery"'
        },
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
        hints: {
          structural: 'Concessive clause with "än"',
          grammar: 'The construction "hur...än" means "no matter how"',
          vocabulary: '"Hur" means "how", "mycket" means "much", "pengar" means "money", "än" means "even", "du" means "you", "har" means "have", "räcker" means "is enough", "det" means "it", "aldrig" means "never"'
        },
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
        hints: {
          structural: 'Modal verb (behöver) + infinitive (köpa)',
          grammar: 'Adjective "nya" agrees with plural noun "skor"',
          vocabulary: '"Jag" means "I", "behöver" means "need", "köpa" means "buy", "nya" means "new", "skor" means "shoes"'
        },
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
        hints: {
          structural: 'Existential "det finns" construction',
          grammar: '"Många" is used with countable nouns in plural form',
          vocabulary: '"Det" means "there", "finns" means "is", "många" means "many", "böcker" means "books", "på" means "on", "bordet" means "table"'
        },
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
        hints: {
          structural: 'Indirect question with "om" (if/whether)',
          grammar: 'Particle verb "kommer ihåg" keeps particles together in subordinate clauses',
          vocabulary: '"Jag" means "I", "undrar" means "wonder", "om" means "if/whether", "han" means "he", "kommer" means "comes", "ihåg" means "remembers", "mötet" means "meeting"'
        },
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
        hints: {
          structural: 'Past habit with "brukade" + time clause',
          grammar: '"Brukade" indicates a past habit or repeated action',
          vocabulary: '"Hon" means "she", "brukade" means "used to", "spela" means "play", "piano" means "piano", "när" means "when", "hon" means "she", "var" means "was", "yngre" means "younger"'
        },
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
        hints: {
          structural: 'Complex comparative with "ju...desto"',
          grammar: 'Generic "man" is used in both clauses for general statements',
          vocabulary: '"Ju" means "the more", "mer" means "more", "man" means "one", "reser" means "travels", "desto" means "so", "förstår" means "understands", "andra" means "other", "kulturer" means "cultures"'
        },
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
        hints: {
          structural: 'Past perfect conditional without "om"',
          grammar: 'Inversion in condition clause when "om" is omitted',
          vocabulary: '"Hade" means "had", "jag" means "I", "inte" means "not", "varit" means "been", "så" means "so", "trött" means "tired", "skulle" means "would", "jag" means "I", "ha" means "have", "följt" means "followed", "med" means "with"'
        },
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
        hints: {
          structural: 'Impersonal construction with particle verb',
          grammar: 'Reflexive "sin" refers back to generic "man" as subject',
          vocabulary: '"Det" means "it", "är" means "is", "viktigt" means "important", "att" means "to", "man" means "one", "tar" means "takes", "hand" means "care", "om" means "of", "sin" means "one\'s", "hälsa" means "health"'
        },
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
      },
      {
        id: '72',
        difficulty: 'beginner',
        correctSentence: 'Vi äter frukost i köket',
        translation: 'We eat breakfast in the kitchen',
        hints: {
          structural: 'Subject + verb + object + location',
          grammar: 'Location phrases typically come at the end of the sentence',
          vocabulary: '"Vi" means "we", "äter" means "eat", "frukost" means "breakfast", "i" means "in", "köket" means "kitchen"'
        },
        grammarTip: 'Location phrases typically come at the end of the sentence',
        wordTiles: [
          { id: 'word-1', text: 'Vi' },
          { id: 'word-2', text: 'äter' },
          { id: 'word-3', text: 'frukost' },
          { id: 'word-4', text: 'i' },
          { id: 'word-5', text: 'köket' },
        ],
      },
      {
        id: '73',
        difficulty: 'beginner',
        correctSentence: 'Mitt rum har två fönster',
        translation: 'My room has two windows',
        hints: {
          structural: 'Possessive + noun + verb + number + object',
          grammar: 'Numbers come before the noun they modify',
          vocabulary: '"Mitt" means "my", "rum" means "room", "har" means "has", "två" means "two", "fönster" means "windows"'
        },
        grammarTip: 'Numbers come before the noun they modify',
        wordTiles: [
          { id: 'word-1', text: 'Mitt' },
          { id: 'word-2', text: 'rum' },
          { id: 'word-3', text: 'har' },
          { id: 'word-4', text: 'två' },
          { id: 'word-5', text: 'fönster' },
        ],
      },
      {
        id: '74',
        difficulty: 'beginner',
        correctSentence: 'De spelar fotboll på helgerna',
        translation: 'They play football on weekends',
        hints: {
          structural: 'Subject + verb + object + time expression',
          grammar: 'Use "på" with recurring time expressions like "helgerna" (weekends)',
          vocabulary: '"De" means "they", "spelar" means "play", "fotboll" means "football", "på" means "on", "helgerna" means "weekends"'
        },
        grammarTip: 'Use "på" with recurring time expressions like "helgerna" (weekends)',
        wordTiles: [
          { id: 'word-1', text: 'De' },
          { id: 'word-2', text: 'spelar' },
          { id: 'word-3', text: 'fotboll' },
          { id: 'word-4', text: 'på' },
          { id: 'word-5', text: 'helgerna' },
        ],
      },
      {
        id: '75',
        difficulty: 'beginner',
        correctSentence: 'Bussen kommer om fem minuter',
        translation: 'The bus comes in five minutes',
        hints: {
          structural: 'Subject + verb + time expression with "om"',
          grammar: '"Om" is used for future time expressions, similar to "in" in English',
          vocabulary: '"Bussen" means "the bus", "kommer" means "comes", "om" means "in", "fem" means "five", "minuter" means "minutes"'
        },
        grammarTip: '"Om" is used for future time expressions, similar to "in" in English',
        wordTiles: [
          { id: 'word-1', text: 'Bussen' },
          { id: 'word-2', text: 'kommer' },
          { id: 'word-3', text: 'om' },
          { id: 'word-4', text: 'fem' },
          { id: 'word-5', text: 'minuter' },
        ],
      },
      {
        id: '76',
        difficulty: 'beginner',
        correctSentence: 'Den röda bilen står utanför huset',
        translation: 'The red car is parked outside the house',
        hints: {
          structural: 'Article + adjective + noun + verb + location',
          grammar: 'Adjectives must agree with the noun they modify',
          vocabulary: '"Den" means "the", "röda" means "red", "bilen" means "car", "står" means "stands", "utanför" means "outside", "huset" means "house"'
        },
        grammarTip: 'Adjectives must agree with the noun they modify',
        wordTiles: [
          { id: 'word-1', text: 'Den' },
          { id: 'word-2', text: 'röda' },
          { id: 'word-3', text: 'bilen' },
          { id: 'word-4', text: 'står' },
          { id: 'word-5', text: 'utanför' },
          { id: 'word-6', text: 'huset' },
        ],
      },
      {
        id: '77',
        difficulty: 'beginner',
        correctSentence: 'Kan du öppna dörren tack',
        translation: 'Can you open the door please',
        hints: {
          structural: 'Modal verb + subject + main verb + object',
          grammar: 'Modal verb "kan" comes first in questions, but this is a polite request form',
          vocabulary: '"Kan" means "can", "du" means "you", "öppna" means "open", "dörren" means "door", "tack" means "please"'
        },
        grammarTip: 'Modal verb "kan" comes first in questions, but this is a polite request form',
        wordTiles: [
          { id: 'word-1', text: 'Kan' },
          { id: 'word-2', text: 'du' },
          { id: 'word-3', text: 'öppna' },
          { id: 'word-4', text: 'dörren' },
          { id: 'word-5', text: 'tack' },
        ],
      },
      {
        id: '78',
        difficulty: 'beginner',
        correctSentence: 'Vi ses imorgon klockan tre',
        translation: 'We will see each other tomorrow at three',
        hints: {
          structural: 'Subject + reflexive verb + time expressions',
          grammar: '"Ses" is a reflexive verb meaning "to see each other"',
          vocabulary: '"Vi" means "we", "ses" means "to see each other", "imorgon" means "tomorrow", "klockan" means "at", "tre" means "three"'
        },
        grammarTip: '"Ses" is a reflexive verb meaning "to see each other"',
        wordTiles: [
          { id: 'word-1', text: 'Vi' },
          { id: 'word-2', text: 'ses' },
          { id: 'word-3', text: 'imorgon' },
          { id: 'word-4', text: 'klockan' },
          { id: 'word-5', text: 'tre' },
        ],
      },
      {
        id: '79',
        difficulty: 'beginner',
        correctSentence: 'Vill du ha lite kaffe',
        translation: 'Would you like some coffee',
        hints: {
          structural: 'Modal verb + subject + main verb + object',
          grammar: '"Vill ha" is a common phrase meaning "would like"',
          vocabulary: '"Vill" means "would", "du" means "you", "ha" means "have", "lite" means "some", "kaffe" means "coffee"'
        },
        grammarTip: '"Vill ha" is a common phrase meaning "would like"',
        wordTiles: [
          { id: 'word-1', text: 'Vill' },
          { id: 'word-2', text: 'du' },
          { id: 'word-3', text: 'ha' },
          { id: 'word-4', text: 'lite' },
          { id: 'word-5', text: 'kaffe' },
        ],
      },
      {
        id: '80',
        difficulty: 'beginner',
        correctSentence: 'Solen skiner idag också',
        translation: 'The sun is shining today too',
        hints: {
          structural: 'Subject + verb + time + adverb',
          grammar: '"Också" typically comes at the end of the sentence',
          vocabulary: '"Solen" means "the sun", "skiner" means "is shining", "idag" means "today", "också" means "too"'
        },
        grammarTip: '"Också" typically comes at the end of the sentence',
        wordTiles: [
          { id: 'word-1', text: 'Solen' },
          { id: 'word-2', text: 'skiner' },
          { id: 'word-3', text: 'idag' },
          { id: 'word-4', text: 'också' },
        ],
      },
      {
        id: '81',
        difficulty: 'beginner',
        correctSentence: 'Tåget går från spår fem',
        translation: 'The train departs from track five',
        hints: {
          structural: 'Subject + verb + preposition + location',
          grammar: 'Numbers after nouns don\'t change form',
          vocabulary: '"Tåget" means "the train", "går" means "goes", "från" means "from", "spår" means "track", "fem" means "five"'
        },
        grammarTip: 'Numbers after nouns don\'t change form',
        wordTiles: [
          { id: 'word-1', text: 'Tåget' },
          { id: 'word-2', text: 'går' },
          { id: 'word-3', text: 'från' },
          { id: 'word-4', text: 'spår' },
          { id: 'word-5', text: 'fem' },
        ],
      },
      {
        id: '82',
        difficulty: 'intermediate',
        correctSentence: 'Jag skulle vilja beställa en kopp kaffe tack',
        translation: 'I would like to order a cup of coffee please',
        hints: {
          structural: 'Polite request using "skulle vilja" + infinitive',
          grammar: '"Skulle vilja" is more formal/polite than "vill ha"',
          vocabulary: '"Jag" means "I", "skulle" means "would", "vilja" means "like", "beställa" means "order", "en" means "a", "kopp" means "cup", "kaffe" means "coffee", "tack" means "please"'
        },
        grammarTip: '"Skulle vilja" is more formal/polite than "vill ha"',
        wordTiles: [
          { id: 'word-1', text: 'Jag' },
          { id: 'word-2', text: 'skulle' },
          { id: 'word-3', text: 'vilja' },
          { id: 'word-4', text: 'beställa' },
          { id: 'word-5', text: 'en' },
          { id: 'word-6', text: 'kopp' },
          { id: 'word-7', text: 'kaffe' },
          { id: 'word-8', text: 'tack' },
        ],
      },
      {
        id: '83',
        difficulty: 'intermediate',
        correctSentence: 'Hon undrar varför tåget är försenat idag',
        translation: 'She wonders why the train is delayed today',
        hints: {
          structural: 'Main clause + question word + subordinate clause',
          grammar: 'In subordinate clauses after "varför", the word order is subject + verb',
          vocabulary: '"Hon" means "she", "undrar" means "wonders", "varför" means "why", "tåget" means "the train", "är" means "is", "försenat" means "delayed", "idag" means "today"'
        },
        grammarTip: 'In subordinate clauses after "varför", the word order is subject + verb',
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
      {
        id: '84',
        difficulty: 'intermediate',
        correctSentence: 'Mina grannar brukar lyssna på hög musik',
        translation: 'My neighbors usually listen to loud music',
        hints: {
          structural: 'Subject + "brukar" + infinitive + object',
          grammar: '"Brukar" indicates habitual action, similar to "usually" in English',
          vocabulary: '"Mina" means "my", "grannar" means "neighbors", "brukar" means "usually", "lyssna" means "listen", "på" means "on", "hög" means "loud", "musik" means "music"'
        },
        grammarTip: '"Brukar" indicates habitual action, similar to "usually" in English',
        wordTiles: [
          { id: 'word-1', text: 'Mina' },
          { id: 'word-2', text: 'grannar' },
          { id: 'word-3', text: 'brukar' },
          { id: 'word-4', text: 'lyssna' },
          { id: 'word-5', text: 'på' },
          { id: 'word-6', text: 'hög' },
          { id: 'word-7', text: 'musik' },
        ],
      },
      {
        id: '85',
        difficulty: 'intermediate',
        correctSentence: 'Jag känner någon som kan hjälpa dig',
        translation: 'I know someone who can help you',
        hints: {
          structural: 'Main clause + relative clause with "som"',
          grammar: '"Som" is used as both "who" and "that" in relative clauses',
          vocabulary: '"Jag" means "I", "känner" means "know", "någon" means "someone", "som" means "who" or "that", "kan" means "can", "hjälpa" means "help", "dig" means "you"'
        },
        grammarTip: '"Som" is used as both "who" and "that" in relative clauses',
        wordTiles: [
          { id: 'word-1', text: 'Jag' },
          { id: 'word-2', text: 'känner' },
          { id: 'word-3', text: 'någon' },
          { id: 'word-4', text: 'som' },
          { id: 'word-5', text: 'kan' },
          { id: 'word-6', text: 'hjälpa' },
          { id: 'word-7', text: 'dig' },
        ],
      },
      {
        id: '86',
        difficulty: 'intermediate',
        correctSentence: 'Det börjar bli kallt ute på kvällarna',
        translation: 'It\'s starting to get cold outside in the evenings',
        hints: {
          structural: 'Impersonal construction with "det" + double verb',
          grammar: '"Börjar bli" is a common verb combination for gradual changes',
          vocabulary: '"Det" means "it", "börjar" means "is starting", "bli" means "to get", "kallt" means "cold", "ute" means "outside", "på" means "on", "kvällarna" means "in the evenings"'
        },
        grammarTip: '"Börjar bli" is a common verb combination for gradual changes',
        wordTiles: [
          { id: 'word-1', text: 'Det' },
          { id: 'word-2', text: 'börjar' },
          { id: 'word-3', text: 'bli' },
          { id: 'word-4', text: 'kallt' },
          { id: 'word-5', text: 'ute' },
          { id: 'word-6', text: 'på' },
          { id: 'word-7', text: 'kvällarna' },
        ],
      },
      {
        id: '87',
        difficulty: 'intermediate',
        correctSentence: 'Var snäll och stäng av din mobiltelefon',
        translation: 'Please turn off your mobile phone',
        hints: {
          structural: 'Polite request using "var snäll och"',
          grammar: '"Var snäll och" is a formal way to say "please" with commands',
          vocabulary: '"Var" means "please", "snäll" means "kind", "och" means "and", "stäng" means "turn off", "av" means "off", "din" means "your", "mobiltelefon" means "mobile phone"'
        },
        grammarTip: '"Var snäll och" is a formal way to say "please" with commands',
        wordTiles: [
          { id: 'word-1', text: 'Var' },
          { id: 'word-2', text: 'snäll' },
          { id: 'word-3', text: 'och' },
          { id: 'word-4', text: 'stäng' },
          { id: 'word-5', text: 'av' },
          { id: 'word-6', text: 'din' },
          { id: 'word-7', text: 'mobiltelefon' },
        ],
      },
      {
        id: '88',
        difficulty: 'intermediate',
        correctSentence: 'Han lovade att komma tillbaka snart',
        translation: 'He promised to come back soon',
        hints: {
          structural: 'Main verb + infinitive construction with "att"',
          grammar: 'After "lovade", use "att" + infinitive',
          vocabulary: '"Han" means "he", "lovade" means "promised", "att" means "to", "komma" means "to come", "tillbaka" means "back", "snart" means "soon"'
        },
        grammarTip: 'After "lovade", use "att" + infinitive',
        wordTiles: [
          { id: 'word-1', text: 'Han' },
          { id: 'word-2', text: 'lovade' },
          { id: 'word-3', text: 'att' },
          { id: 'word-4', text: 'komma' },
          { id: 'word-5', text: 'tillbaka' },
          { id: 'word-6', text: 'snart' },
        ],
      },
      {
        id: '89',
        difficulty: 'intermediate',
        correctSentence: 'Jag behöver någon att prata med',
        translation: 'I need someone to talk to',
        hints: {
          structural: 'Main clause + infinitive marker + preposition',
          grammar: 'Unlike English, the preposition "med" can come at the end',
          vocabulary: '"Jag" means "I", "behöver" means "need", "någon" means "someone", "att" means "to", "prata" means "talk", "med" means "with"'
        },
        grammarTip: 'Unlike English, the preposition "med" can come at the end',
        wordTiles: [
          { id: 'word-1', text: 'Jag' },
          { id: 'word-2', text: 'behöver' },
          { id: 'word-3', text: 'någon' },
          { id: 'word-4', text: 'att' },
          { id: 'word-5', text: 'prata' },
          { id: 'word-6', text: 'med' },
        ],
      },
      {
        id: '90',
        difficulty: 'intermediate',
        correctSentence: 'Det finns inget att göra här',
        translation: 'There is nothing to do here',
        hints: {
          structural: 'Existential "det finns" + negative + infinitive',
          grammar: '"Det finns" is used for "there is/are", with "inget" as the negative',
          vocabulary: '"Det" means "there", "finns" means "is/are", "inget" means "nothing", "att" means "to", "göra" means "to do", "här" means "here"'
        },
        grammarTip: '"Det finns" is used for "there is/are", with "inget" as the negative',
        wordTiles: [
          { id: 'word-1', text: 'Det' },
          { id: 'word-2', text: 'finns' },
          { id: 'word-3', text: 'inget' },
          { id: 'word-4', text: 'att' },
          { id: 'word-5', text: 'göra' },
          { id: 'word-6', text: 'här' },
        ],
      },
      {
        id: '91',
        difficulty: 'intermediate',
        correctSentence: 'Vi måste skynda oss för att hinna',
        translation: 'We must hurry to make it in time',
        hints: {
          structural: 'Modal verb + reflexive verb + purpose clause',
          grammar: '"För att" introduces a purpose clause, "hinna" means "to make it in time"',
          vocabulary: '"Vi" means "we", "måste" means "must", "skynda" means "hurry", "oss" means "us", "för" means "for", "att" means "to", "hinna" means "to make it in time"'
        },
        grammarTip: '"För att" introduces a purpose clause, "hinna" means "to make it in time"',
        wordTiles: [
          { id: 'word-1', text: 'Vi' },
          { id: 'word-2', text: 'måste' },
          { id: 'word-3', text: 'skynda' },
          { id: 'word-4', text: 'oss' },
          { id: 'word-5', text: 'för' },
          { id: 'word-6', text: 'att' },
          { id: 'word-7', text: 'hinna' },
        ],
      },
      {
        id: '92',
        difficulty: 'beginner',
        correctSentence: 'Kan du hjälpa mig med läxorna',
        translation: 'Can you help me with the homework',
        hints: {
          structural: 'Question word order: Modal verb (Kan) + subject (du) + main verb (hjälpa)',
          grammar: 'In questions with modal verbs, the modal verb comes first, followed by the subject',
          vocabulary: '"Kan" means "can", "du" means "you", "hjälpa" means "help", "mig" means "me", "med" means "with", "läxorna" means "homework"'
        },
        grammarTip: 'In questions with modal verbs, the modal verb comes first, followed by the subject',
        wordTiles: [
          { id: 'word-1', text: 'Kan' },
          { id: 'word-2', text: 'du' },
          { id: 'word-3', text: 'hjälpa' },
          { id: 'word-4', text: 'mig' },
          { id: 'word-5', text: 'med' },
          { id: 'word-6', text: 'läxorna' },
        ],
      },
      {
        id: '93',
        difficulty: 'intermediate',
        correctSentence: 'Eftersom det snöar tar jag bussen idag',
        alternativeAnswers: ['Jag tar bussen idag eftersom det snöar'],
        translation: 'Since it\'s snowing, I\'m taking the bus today',
        hints: {
          structural: 'Subordinate clause with "eftersom" can come first or last',
          grammar: 'When "eftersom" clause comes first, main clause follows V2 rule. When it comes last, no word order change needed',
          vocabulary: '"Eftersom" means "since", "det" means "it", "snöar" means "snowing", "tak" means "bus", "idag" means "today"'
        },
        grammarTip: 'When "eftersom" clause comes first, main clause follows V2 rule. When it comes last, no word order change needed',
        wordTiles: [
          { id: 'word-1', text: 'Eftersom' },
          { id: 'word-2', text: 'det' },
          { id: 'word-3', text: 'snöar' },
          { id: 'word-4', text: 'tar' },
          { id: 'word-5', text: 'jag' },
          { id: 'word-6', text: 'bussen' },
          { id: 'word-7', text: 'idag' },
        ],
      },
      {
        id: '94',
        difficulty: 'advanced',
        correctSentence: 'Hade jag vetat det skulle jag ha gjort annorlunda',
        translation: 'Had I known that, I would have done differently',
        hints: {
          structural: 'Past perfect conditional without "om"',
          grammar: 'When omitting "om", the auxiliary verb "hade" comes first. This is a more formal/literary style',
          vocabulary: '"Hade" means "had", "jag" means "I", "vetat" means "known", "det" means "that", "skulle" means "would", "jag" means "I", "ha" means "have", "gjort" means "done", "annorlunda" means "differently"'
        },
        grammarTip: 'When omitting "om", the auxiliary verb "hade" comes first. This is a more formal/literary style',
        wordTiles: [
          { id: 'word-1', text: 'Hade' },
          { id: 'word-2', text: 'jag' },
          { id: 'word-3', text: 'vetat' },
          { id: 'word-4', text: 'det' },
          { id: 'word-5', text: 'skulle' },
          { id: 'word-6', text: 'jag' },
          { id: 'word-7', text: 'ha' },
          { id: 'word-8', text: 'gjort' },
          { id: 'word-9', text: 'annorlunda' },
        ],
      },
      {
        id: '95',
        difficulty: 'advanced',
        correctSentence: 'Ju längre man väntar desto svårare blir det',
        alternativeAnswers: ['Desto svårare blir det ju längre man väntar'],
        translation: 'The longer one waits, the harder it becomes',
        hints: {
          structural: 'Comparative correlation with "ju ... desto"',
          grammar: 'This construction always uses present tense, even when talking about general truths',
          vocabulary: '"Ju" means "the more", "längre" means "longer", "man" means "one", "väntar" means "waits", "desto" means "the more", "svårare" means "harder", "blir" means "becomes", "det" means "it"'
        },
        grammarTip: 'This construction always uses present tense, even when talking about general truths',
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
        id: '96',
        difficulty: 'advanced',
        correctSentence: 'Låt bli att röra mina saker är du snäll',
        translation: 'Please don\'t touch my things',
        hints: {
          structural: 'Imperative with "låt bli" + infinitive',
          grammar: '"Låt bli" is a fixed expression meaning "refrain from". "Är du snäll" softens the command',
          vocabulary: '"Låt" means "please", "bli" means "refrain from", "att" means "to", "röra" means "touch", "mina" means "my", "saker" means "things", "är" means "is", "du" means "you", "snäll" means "kind"'
        },
        grammarTip: '"Låt bli" is a fixed expression meaning "refrain from". "Är du snäll" softens the command',
        wordTiles: [
          { id: 'word-1', text: 'Låt' },
          { id: 'word-2', text: 'bli' },
          { id: 'word-3', text: 'att' },
          { id: 'word-4', text: 'röra' },
          { id: 'word-5', text: 'mina' },
          { id: 'word-6', text: 'saker' },
          { id: 'word-7', text: 'är' },
          { id: 'word-8', text: 'du' },
          { id: 'word-9', text: 'snäll' },
        ],
      },
      {
        id: '97',
        difficulty: 'advanced',
        correctSentence: 'Det är först när man förlorar något som man förstår dess värde',
        translation: 'It\'s only when you lose something that you understand its value',
        hints: {
          structural: 'Cleft sentence with relative clause',
          grammar: 'This is a "det är först... som" construction, emphasizing the temporal aspect. Note the word order in the relative clause',
          vocabulary: '"Det" means "it", "är" means "is", "först" means "first", "när" means "when", "man" means "one", "förlorar" means "lose", "något" means "something", "som" means "that", "förstår" means "understand", "dess" means "its", "värde" means "value"'
        },
        grammarTip: 'This is a "det är först... som" construction, emphasizing the temporal aspect. Note the word order in the relative clause',
        wordTiles: [
          { id: 'word-1', text: 'Det' },
          { id: 'word-2', text: 'är' },
          { id: 'word-3', text: 'först' },
          { id: 'word-4', text: 'när' },
          { id: 'word-5', text: 'man' },
          { id: 'word-6', text: 'förlorar' },
          { id: 'word-7', text: 'något' },
          { id: 'word-8', text: 'som' },
          { id: 'word-9', text: 'man' },
          { id: 'word-10', text: 'förstår' },
          { id: 'word-11', text: 'dess' },
          { id: 'word-12', text: 'värde' },
        ],
      },
      {
        id: '98',
        difficulty: 'advanced',
        correctSentence: 'Vore det inte för regnet skulle vi ha picknick',
        translation: 'If it weren\'t for the rain, we would have a picnic',
        hints: {
          structural: 'Subjunctive with "vore" in conditional',
          grammar: '"Vore" is the subjunctive form of "vara", used in hypotheticals. It\'s more formal than "skulle vara"',
          vocabulary: '"Vore" means "if it were not for", "det" means "it", "inte" means "not", "för" means "for", "regnet" means "rain", "skulle" means "would", "vi" means "we", "ha" means "have", "picknick" means "picnic"'
        },
        grammarTip: '"Vore" is the subjunctive form of "vara", used in hypotheticals. It\'s more formal than "skulle vara"',
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
        ],
      },
      {
        id: '99',
        difficulty: 'advanced',
        correctSentence: 'Hur mycket han än försöker lyckas han aldrig',
        translation: 'No matter how much he tries, he never succeeds',
        hints: {
          structural: 'Concessive clause with "än"',
          grammar: 'The "hur ... än" construction expresses "no matter how". Note the inverted word order in the main clause',
          vocabulary: '"Hur" means "no matter how", "mycket" means "much", "han" means "he", "än" means "even", "försöker" means "tries", "lyckas" means "succeeds", "aldrig" means "never"'
        },
        grammarTip: 'The "hur ... än" construction expresses "no matter how". Note the inverted word order in the main clause',
        wordTiles: [
          { id: 'word-1', text: 'Hur' },
          { id: 'word-2', text: 'mycket' },
          { id: 'word-3', text: 'han' },
          { id: 'word-4', text: 'än' },
          { id: 'word-5', text: 'försöker' },
          { id: 'word-6', text: 'lyckas' },
          { id: 'word-7', text: 'han' },
          { id: 'word-8', text: 'aldrig' },
        ],
      },
      {
        id: '100',
        difficulty: 'advanced',
        correctSentence: 'Det sägs att våren kommer tidigt i år',
        translation: 'It is said that spring is coming early this year',
        hints: {
          structural: 'Passive construction with "sägs" + att-clause',
          grammar: 'The s-passive is common in formal/written Swedish. The att-clause keeps normal word order',
          vocabulary: '"Det" means "it", "sägs" means "is said", "att" means "that", "våren" means "spring", "kommer" means "comes", "tidigt" means "early", "i" means "in", "år" means "year"'
        },
        grammarTip: 'The s-passive is common in formal/written Swedish. The att-clause keeps normal word order',
        wordTiles: [
          { id: 'word-1', text: 'Det' },
          { id: 'word-2', text: 'sägs' },
          { id: 'word-3', text: 'att' },
          { id: 'word-4', text: 'våren' },
          { id: 'word-5', text: 'kommer' },
          { id: 'word-6', text: 'tidigt' },
          { id: 'word-7', text: 'i' },
          { id: 'word-8', text: 'år' },
        ],
      },
      {
        id: '101',
        difficulty: 'advanced',
        correctSentence: 'Inte förrän hon kom hem insåg hon misstaget',
        translation: 'Not until she came home did she realize the mistake',
        hints: {
          structural: 'Inverted word order with "inte förrän"',
          grammar: 'When starting with "inte förrän", the main clause must have inverted word order (verb before subject)',
          vocabulary: '"Inte" means "not", "förrän" means "until", "hon" means "she", "kom" means "came", "hem" means "home", "insåg" means "realized", "hon" means "she", "misstaget" means "mistake"'
        },
        grammarTip: 'When starting with "inte förrän", the main clause must have inverted word order (verb before subject)',
        wordTiles: [
          { id: 'word-1', text: 'Inte' },
          { id: 'word-2', text: 'förrän' },
          { id: 'word-3', text: 'hon' },
          { id: 'word-4', text: 'kom' },
          { id: 'word-5', text: 'hem' },
          { id: 'word-6', text: 'insåg' },
          { id: 'word-7', text: 'hon' },
          { id: 'word-8', text: 'misstaget' },
        ],
      },
      {
        id: '102',
        difficulty: 'advanced',
        correctSentence: 'Såvitt jag vet har ingen löst problemet än',
        translation: 'As far as I know, no one has solved the problem yet',
        hints: {
          structural: 'Epistemic phrase with "såvitt" + present perfect',
          grammar: '"Såvitt" introduces a reservation about the speaker\'s knowledge. Main clause follows V2 rule',
          vocabulary: '"Såvitt" means "as far as I know", "jag" means "I", "vet" means "know", "har" means "has", "ingen" means "no", "löst" means "solved", "problemet" means "problem", "än" means "yet"'
        },
        grammarTip: '"Såvitt" introduces a reservation about the speaker\'s knowledge. Main clause follows V2 rule',
        wordTiles: [
          { id: 'word-1', text: 'Såvitt' },
          { id: 'word-2', text: 'jag' },
          { id: 'word-3', text: 'vet' },
          { id: 'word-4', text: 'har' },
          { id: 'word-5', text: 'ingen' },
          { id: 'word-6', text: 'löst' },
          { id: 'word-7', text: 'problemet' },
          { id: 'word-8', text: 'än' },
        ],
      },
    ];

const SentenceBuilder: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userSentence, setUserSentence] = useState<WordTile[]>([]);
  const [availableWords, setAvailableWords] = useState<WordTile[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('beginner');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Add at the top of the component, after the state declarations:
  const difficultyLevels: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];

  // Add this function to get the count of exercises per difficulty
  const getExerciseCount = (difficulty: DifficultyLevel) => {
    return exercises.filter(ex => ex.difficulty === difficulty).length;
  };

  useEffect(() => {
    loadExercise();
  }, [selectedDifficulty]);

  const loadExercise = () => {
    const filteredExercises = exercises.filter(ex => ex.difficulty === selectedDifficulty);
    const randomExercise = filteredExercises[Math.floor(Math.random() * filteredExercises.length)];
    setCurrentExercise(randomExercise);
    if (randomExercise) {
      setAvailableWords([...randomExercise.wordTiles].sort(() => Math.random() - 0.5));
      setUserSentence([]);
      setFeedback('');
      setShowHint(false);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destId = result.destination.droppableId;
    
    const newAvailableWords = [...availableWords];
    const newUserSentence = [...userSentence];

    const sourceArray = sourceId === 'sentence' ? newUserSentence : newAvailableWords;
    const destArray = destId === 'sentence' ? newUserSentence : newAvailableWords;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    const [movedItem] = sourceArray.splice(sourceIndex, 1);
    destArray.splice(destIndex, 0, movedItem);

    if (destId === 'sentence') {
      setUserSentence(newUserSentence);
      setAvailableWords(newAvailableWords);
    } else {
      setAvailableWords(newAvailableWords);
      setUserSentence(newUserSentence);
    }
  };

  const checkSentence = () => {
    try {
      const userSentenceText = userSentence.map(word => word.text).join(' ');
      const isCorrect = userSentenceText === currentExercise?.correctSentence || 
                       currentExercise?.alternativeAnswers?.includes(userSentenceText);
      
      if (isCorrect) {
        setFeedback('Correct! Well done! 🎉');
      } else {
        setFeedback(`Not quite right. The correct answer is: "${currentExercise?.correctSentence}"`);
      }
    } catch (err) {
      console.error('Error checking sentence:', err);
    }
  };

  const resetExercise = () => {
    if (currentExercise) {
      setAvailableWords([...currentExercise.wordTiles].sort(() => Math.random() - 0.5));
      setUserSentence([]);
      setFeedback('');
      setShowHint(false);
    }
  };

  const handleNextExercise = () => {
    loadExercise();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Difficulty</h3>
        </div>
        <div className="flex justify-center gap-4">
          {difficultyLevels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`px-4 py-2 rounded-md capitalize flex items-center gap-2 ${
                selectedDifficulty === level
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{level}</span>
              <Badge
                variant={selectedDifficulty === level ? "white" : "secondary"}
                className={`ml-1 ${
                  selectedDifficulty === level ? 'bg-white text-blue-600' : 'bg-gray-200'
                }`}
              >
                {getExerciseCount(level)}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {currentExercise && (
        <>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">{currentExercise.translation}</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={resetExercise}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Reset
              </button>
            </div>
          </div>

          {showHint && currentExercise && (
            <div className="mb-6 space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg space-y-3">
                {currentExercise.hints && (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-yellow-800 whitespace-nowrap">Structure:</span>
                      <p className="text-yellow-700">{currentExercise.hints.structural}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-yellow-800 whitespace-nowrap">Grammar:</span>
                      <p className="text-yellow-700">{currentExercise.hints.grammar}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-yellow-800 whitespace-nowrap">Vocabulary:</span>
                      <p className="text-yellow-700">{currentExercise.hints.vocabulary}</p>
                    </div>
                  </>
                )}
              </div>
              {currentExercise.grammarTip && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Tip: </span>
                    {currentExercise.grammarTip}
                  </p>
                </div>
              )}
            </div>
          )}

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700 mb-2">Build your sentence:</p>
                <Droppable droppableId="sentence" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[60px] flex flex-wrap gap-2 p-4 bg-white rounded-md border-2 border-dashed border-blue-200"
                    >
                      {userSentence.map((word, index) => (
                        <Draggable key={word.id} draggableId={word.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md"
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

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">Available words:</p>
                <Droppable droppableId="words" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-wrap gap-2 p-4 bg-white rounded-md"
                    >
                      {availableWords.map((word, index) => (
                        <Draggable key={word.id} draggableId={word.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md"
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
            </div>
          </DragDropContext>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={checkSentence}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Check Answer
            </button>
            {feedback && (
              <button
                onClick={handleNextExercise}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next Question
              </button>
            )}
          </div>

          {feedback && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              feedback.includes('Correct') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {feedback}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SentenceBuilder;