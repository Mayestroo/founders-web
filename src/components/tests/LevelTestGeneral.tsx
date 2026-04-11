'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTestContext } from '@/context/TestContext';
import { useTranslation } from '@/hooks/useTranslation';

// General English Level Check (45 questions)
const questions = [
  { question: "Manager: Where's Mr Davidson? Assistant: Oh, he's _____ London today.", options: ['in', 'on', 'to', 'at'], answer: 'in' },
  { question: "Shop Assistant: Can I help you? Customer: Yes, I'd like to buy __________ trousers.", options: ['a', 'an', 'this', 'these'], answer: 'these' },
  { question: 'My mother and father ______ both very tall.', options: ['is', "isn't", 'are', "aren't"], answer: 'are' },
  { question: "Ayla: That's a nice table, Sophie! Is it new? Sophie: Oh no, it's my __________ old table.", options: ['mother', 'mothers', "mother's", "mothers'"], answer: "mother's" },
  { question: "Father: Are we ready to go? Daughter: No, Mum can't find ______ hat.", options: ['she', 'his', 'her', 'their'], answer: 'her' },
  { question: "A: ________ you like cats? B: No, I ___________.", options: ['Do / do', "Do / don't", "Does / don't", "Do / doesn't"], answer: "Do / don't" },
  { question: "Mother: Where's that fish? It was on the table. Daughter: Oh no! The cat _______________ it.", options: ['eat', 'eats', 'is eating', 'are eating'], answer: 'is eating' },
  { question: "Alicia: I'm going to the supermarket. Do you want anything? Peter: Can you get __________ milk, please?", options: ['a', 'any', 'some', 'every'], answer: 'some' },
  { question: "Amanda: I like your new sofa. Fahima: Thanks. It's __________ comfortable than the other one we had.", options: ['the most', 'very', 'much', 'more'], answer: 'more' },
  { question: 'Tom got the ____ marks in the class for his home.', options: ['worse', 'worst', 'baddest', 'most bad'], answer: 'worst' },
  { question: "Manisha: What did you do at the weekend? Nicola: I ____________ tennis with my friend on Saturday.", options: ['play', 'played', 'plays', 'playing'], answer: 'played' },
  { question: 'The beach was very crowded ____ Monday.', options: ['in', 'on', 'at', 'to'], answer: 'on' },
  { question: "Wife: Have we got any cheese in the fridge? Husband: No, we haven't. I'm _________________ buy some this afternoon.", options: ['going', 'go to', 'go', 'going to'], answer: 'going to' },
  { question: 'Where ___________ you last Tuesday? I tried to phone you.', options: ['were', 'was', 'are', 'is'], answer: 'were' },
  { question: "Lucas: Do you play the piano, Natasha? Natasha: Well, I __________ play when I was younger, but I can't.", options: ['can', "can't", 'could', "couldn't"], answer: 'could' },
  { question: 'Our teacher speaks English to us ____ so that we can understand her.', options: ['slow', 'slower', 'more slow', 'slowly'], answer: 'slowly' },
  { question: "I ______ the new Batman film yet. Is it any good?", options: ["haven't seen", "didn't see", "don't see", 'am not seen'], answer: "haven't seen" },
  { question: 'Sophie: How long __________ married? Ying Yue: Two years. I met my husband in New York.', options: ['had you got', 'did you get', 'have you been', 'are you being'], answer: 'have you been' },
  { question: 'Which train ____ for when I saw you on the platform on Sunday?', options: ['did you wait', 'were you waiting', 'have you waited', 'are you waiting'], answer: 'were you waiting' },
  { question: "You ____ hurry as we've still got twenty minutes before the film starts.", options: ["mustn't", "can't", 'may not', "needn't"], answer: "mustn't" },
  { question: "Juliana: Do you like Brazilian coffee? Miriodere: No I don't, because it's _________ strong.", options: ['too', 'such', 'much', 'enough'], answer: 'too' },
  { question: 'Daughter: Mum, my computer is broken again. Can you buy me a new one? Mother: Ok, I _____________ buy you tomorrow, but not now.', options: ['will', 'may', 'should', 'would'], answer: 'will' },
  { question: 'My father has been a pilot ____ twenty years and he still loves his job.', options: ['since', 'for', 'until', 'by'], answer: 'for' },
  { question: "I really enjoy ____ new languages and I'd like to learn Italian soon.", options: ['to learn', 'learning', 'learn', 'learned'], answer: 'learning' },
  { question: "_____ people know this but our school has a gym today.", options: ['any', 'A little', 'Few', 'A few'], answer: 'A few' },
  { question: "That's the office ___ my dad works.", options: ['who', 'where', 'that', 'which'], answer: 'where' },
  { question: 'Wife: Advertising is a big business for musicians. Husband: Yes, musicians __________ a lot of money for writing short pieces of music.', options: ['pay', 'paid', 'are paid', 'are paying'], answer: 'are paid' },
  { question: "Could I possibly ___ some money for the bus fare home? I've lost my bag.", options: ['lend', 'owe', 'borrow', 'need'], answer: 'borrow' },
  { question: 'The studio lights went out, while the footballer _________.', options: ['been interviewed', 'was interviewed', 'was being interviewed', 'was interviewing'], answer: 'was being interviewed' },
  { question: "Natalia: My new smartphone doesn't seem to work. Katie: Oh dear! Perhaps you should take it ___________ and ask for a refund.", options: ['up', 'out', 'away', 'back'], answer: 'back' },
  { question: "Shop Assistant: Excuse me, please. Could I get past? Customer: Oh, I'm sorry. I'm getting in the way, __________ I?", options: ["don't", "aren't", "can't", "haven't"], answer: "aren't" },
  { question: "Miriam: Are you coming to my party on Tuesday? Brian: I'm really sorry, but I ________ to take my daughter to the airport.", options: ['must', 'had', 'have', 'having'], answer: 'have' },
  { question: 'Stephen: The concert was fantastic yesterday. You ______________ come. Yuuto: I know. I wanted to, but I had to work late.', options: ['must have', 'could have', 'ought have', 'should have'], answer: 'should have' },
  { question: "Look out for a petrol station because I think we're going to run ___ of petrol soon.", options: ['down', 'out', 'off', 'through'], answer: 'out' },
  { question: "Laura: How was the meeting? Ricardo: It finished late because Victor didn't arrive until 5 pm. He told me he _________ woken up late.", options: ['has', 'had been', 'have', 'had'], answer: 'had' },
  { question: 'Son: I had a bit of a stomachache this morning. Mother: Oh dear! You ____________ eaten that chicken last night.', options: ["wouldn't have", "couldn't have", "mustn't have", "shouldn't have"], answer: "shouldn't have" },
  { question: "Liam: So, your Dad's got a laptop! Cian: Yes, I bought it for him last year – until then he _________________ a typewriter!", options: ['used', 'has used', 'has been using', 'had been using'], answer: 'had been using' },
  { question: "Isabella: The flight is fully booked, so I won't be able to go to Barbados next week. Safia: If you ________________ the ticket sooner, you'd have found a seat.", options: ['had booked', 'were booking', 'booked', 'would have booked'], answer: 'had booked' },
  { question: "I think there isn't anyone at home. They ____________ gone to the school.", options: ['will have', 'should have', 'might have', 'would have'], answer: 'might have' },
  { question: "Sophie: Have they finished interviewing for the manager's position yet? Rafi: No, but they ___________ all the candidates by next Friday.", options: ["won't see", 'would see', "haven't seen", 'will have seen'], answer: 'will have seen' },
  { question: "Andrew: I picked up some of that cat food you wanted. Pedro: Oh good. Once ___________ to these new cat biscuits, they won't want to go back to the other stuff.", options: ["we've switched", "we'll be switching", "we'll have switched", "we've been switched"], answer: "we've switched" },
  { question: 'Assistant: What would you do if you ________ in my position? Manager: Oh, I think I __________ continue.', options: ['was / will be', 'were / will', 'was / had been', 'were / would'], answer: 'were / would' },
  { question: 'David: Did you see the headline this evening? Nicola: Yes – the Prime Minister was ___________ to resign today.', options: ['charged', 'argued', 'struggled', 'forced'], answer: 'forced' },
  { question: 'I _____ for arriving so late but I was caught up in a traffic jam in the town centre.', options: ['sorry', 'regret', 'apologize', 'afraid'], answer: 'apologize' },
  { question: "Daughter: Joanna has been really supportive. I'm so lucky to have her as a friend. Mother: Yes. Just think – if you hadn't sat next to her in class at school, you ________________ so close.", options: ["won't be", "wouldn't be", "wouldn't have been", "aren't"], answer: "wouldn't have been" },
];

export default function LevelTestGeneral() {
  const router = useRouter();
  const { setLevelResult } = useTestContext();
  const { t } = useTranslation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const levelGeneralProgressKey = 'levelGeneralProgressState';

  const formatQuestionText = (text: string): string => {
    const normalizedBlanks = text.replace(/_{2,}/g, '_____');
    return normalizedBlanks.replace(/\s(?=[A-Z][a-zA-Z]+:)/g, '\n');
  };

  const getLevelKey = (finalScore: number): string => {
    if (finalScore <= 12) return 'tests.level_beginner';
    if (finalScore <= 23) return 'tests.level_elementary';
    if (finalScore <= 32) return 'tests.level_pre_intermediate';
    if (finalScore <= 39) return 'tests.level_intermediate';
    if (finalScore <= 45) return 'tests.level_upper_intermediate';
    return 'tests.level_advanced';
  };

  const sendFinalResult = (finalScore: number) => {
    const levelKey = getLevelKey(finalScore);
    
    // Store result in context - store the KEY, not the translated text
    setLevelResult({ score: finalScore, total: questions.length, level: levelKey });
    
    // Store in localStorage as backup
    localStorage.setItem('levelGeneralResult', JSON.stringify({
      score: finalScore,
      total: questions.length,
      level: levelKey,
    }));
  };

  useEffect(() => {
    const savedState = localStorage.getItem(levelGeneralProgressKey);
    if (savedState) {
      const state = JSON.parse(savedState);
      setCurrentQuestion(state.currentQuestion);
      setScore(state.score);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(levelGeneralProgressKey, JSON.stringify({ currentQuestion, score }));
  }, [currentQuestion, score]);

  const handleAnswer = (option: string | null = null) => {
    let nextScore = score;

    if (option) {
      setSelectedOption(option);
      if (option === questions[currentQuestion].answer) {
        nextScore = score + 1;
        setScore(nextScore);
      }
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        sendFinalResult(nextScore);
        router.push('/tests/temperament-general');
      }
    }, 500);
  };

  const handleNext = () => {
    handleAnswer(null);
  };

  return (
    <div className="kids-main pt-28 pb-12">
      <div
        className="flex flex-col items-center justify-center w-[90%] max-w-5xl kids m-auto py-11 px-3 xl:px-10 min-[400px]:w-[80%] md:w-[70%] xl:w-[60%] h-auto rounded-2xl border-2 text-center border-[#EC0000]"
        style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}
      >
        <div className="w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-semibold mb-6 text-gray-900 pl-4">
            <span>{currentQuestion + 1}.</span>{' '}
            <span className="whitespace-pre-line">{formatQuestionText(questions[currentQuestion].question)}</span>
          </h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedOption !== null}
                className={`block w-full py-3 rounded-xl text-lg font-medium transition-all shadow-md ${
                  selectedOption === option ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={selectedOption !== null}
            className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
          >
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
