import {useState, useEffect, useCallback} from 'react';
import ProgressBar from './ProgressBar.jsx';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Answers from './Answers.jsx';
const TIMER = 3000;

export default function Quiz(){
    

    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    console.log(userAnswers);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length-1;
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    

    useEffect(() => {

        if (!quizIsComplete && answerState===''){

        
            const timer = setTimeout(() =>{
                handleSelectAnswer('timeout');
            },TIMER);

            return () => {
                clearTimeout(timer);
            }
        }
    },[activeQuestionIndex, quizIsComplete, answerState])

    
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });

        setTimeout(()=>{
            if (selectedAnswer===QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout(()=>{
                setAnswerState('');
            },2000)
        },1000)
    },[activeQuestionIndex])

    if (quizIsComplete){
        return (<div id="summary">
            <img src={quizCompleteImg}/>
            <h2>Quiz Completed!</h2>
        </div>
        );
    }

    return (
        <div id='quiz'>
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ProgressBar answerState={answerState} timer={TIMER} key={'asdf'+activeQuestionIndex}/>
                <Answers key={activeQuestionIndex} onSelect={handleSelectAnswer} answers={QUESTIONS[activeQuestionIndex].answers} selectedAnswer={userAnswers[userAnswers.length-1]} answerState={answerState} />
            </div>
        </div>
        

    )
}