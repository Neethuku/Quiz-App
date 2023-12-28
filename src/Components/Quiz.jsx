import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
  const totalQuestions = data.length;

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [showScore, setShowScore] = useState(false);
  let [selectedOption, setSelectedOption] = useState(null);

  const checkAnswer = (e, ans) => {
    if (lock === false) {
      const selectedOption = e.target;
      if (question.ans === ans) {
        selectedOption.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        selectedOption.classList.add('wrong');
      }
      setLock(true);
    }
  };

  const handleOptionClick = (e, ans) => {
    setSelectedOption(ans);
  };

  const next = () => {
    if (index === totalQuestions - 1) {
      setShowScore(true);
      return;
    }

    if (selectedOption !== null) {
      const options = document.querySelectorAll('.container li');
      options.forEach((option) => {
        option.classList.remove('correct', 'wrong');
      });

      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      setSelectedOption(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {showScore ? (
        <div>
          <h2>Your Score: {score} out of {totalQuestions}</h2>
          <button onClick={reset}>Reset</button>
        </div>
      ) : (
        <div>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              onClick={(e) => {
                handleOptionClick(e, 1);
                checkAnswer(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              onClick={(e) => {
                handleOptionClick(e, 2);
                checkAnswer(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              onClick={(e) => {
                handleOptionClick(e, 3);
                checkAnswer(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              onClick={(e) => {
                handleOptionClick(e, 4);
                checkAnswer(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next} disabled={selectedOption === null}>
            Next
          </button>
          <div className='index'>
            {index + 1} of {totalQuestions} questions
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
