import React from "react";

export default function Intro({ children }) {
  return (
    <div className="game">
      <div>
        <h3>Welcome to the Trivia Challenge!</h3>
      </div>

      <div>
        <p>You will be presented with 10 True of False questions.</p>
      </div>

      <div>
        <p>Can you score 100%?</p>
      </div>

      <div>{children}</div>
    </div>
  );
}
