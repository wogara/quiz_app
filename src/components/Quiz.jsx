import {useState, useEffect} from 'react';
import ProgressBar from './ProgressBar.jsx';
import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
const TIMER = 3000;

export default function Quiz(){
    
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    

    useEffect(() => {

        if (!quizIsComplete){

        
            const timer = setTimeout(() =>{
                handleSelectAnswer('timeout');
            },TIMER);

            return () => {
                clearTimeout(timer);
            }
        }
    },[activeQuestionIndex, quizIsComplete])

    if (quizIsComplete){
        return (<div id="summary">
            <img src={quizCompleteImg}/>
            <h2>Quiz Completed!</h2>
        </div>
        );
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() -0.5);

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers,selectedAnswer];
        });
    }

    return (
        <div id='quiz'>
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ProgressBar timer={TIMER} key={activeQuestionIndex}/>
                <ul id="answers">
                    {shuffledAnswers.map((answer)=>(
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        

    )
}