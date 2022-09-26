import React, { useEffect, useState } from "react";

//question component is taking the question and onAnswered props from app
function Question({ question, onAnswered }) {
  //this is the state
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    if(timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; //exits early
    }

    const timerId = setTimeout( () => { setTimeRemaining(timeRemaining -1)}, 
    1000);

    return function() {
      clearTimeout(timerId)
    };
  }, [timeRemaining, onAnswered])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
