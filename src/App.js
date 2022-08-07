import { useEffect, useState } from "react";
import Game from "./components/Game";
import Intro from "./components/Intro";
import Result from "./components/Result";
import he from 'he';
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [newGame, setNewGame] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  let app;
  let index = count - 1;
  console.log({ count });
  console.log({ answers });
  console.log({ newGame });

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
      .then((res) => res.json())
      .then((result) => {
        setCorrectAnswers(0);
        setQuestions(result);
      });
  }, [newGame]);

  if (count === 0) {
    app = (
      <Intro>
        <button onClick={() => setCount(count + 1)}>BEGIN</button>
      </Intro>
    );
  } else if (count === 11) {
    app = (
      <Result>
        <div>
          <h3>You scored</h3>
          <h3> {correctAnswers} / 10</h3>
        </div>
        <div className="result">
          {questions.results.map((question, i) => {
            if (question.correct_answer.toLowerCase() === String(answers[i])) {
              return (
                <div>
                  <span>+</span>
                  <p>{he.decode(question.question)}</p>
                </div>
              );
            } else {
              return (
                <div>
                  <span>-</span>
                  <p>{he.decode(question.question)}</p>
                </div>
              );
            }
          })}
        </div>

        <button
          onClick={() => {
            setCount(0);
            setAnswers([]);
            setNewGame(newGame + 1);
          }}
        >
          PLAY AGAIN?
        </button>
      </Result>
    );
  } else {
    const handleClick = (value) => {
      if (questions.results[index].correct_answer.toLowerCase() === value) {
        setCorrectAnswers(correctAnswers + 1);
      } else return;
    };

    app = (
      <Game key={newGame}>
        <div>
          <h3>{questions.results[index].category}</h3>
        </div>

        <div>
          <div id="card">
            <p>{he.decode(questions.results[index].question)}</p>
          </div>

          <p>{count} of 10</p>
        </div>
        <div id="answer">
          <button
            className="true"
            onClick={(e) => {
              setCount(count + 1);
              answers.push(true);
              handleClick(e.target.innerText.toLowerCase());
            }}
          >
            TRUE
          </button>
          <button
            className="false"
            onClick={(e) => {
              setCount(count + 1);
              answers.push(false);
              handleClick(e.target.innerText.toLowerCase());
            }}
          >
            FALSE
          </button>
        </div>
      </Game>
    );
  }

  return <div className="App">{app}</div>;
}

export default App;
