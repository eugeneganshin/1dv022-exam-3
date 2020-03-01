
export const templateRef_ = document.createElement('template')
templateRef_.innerHTML = `
<div class="container">
  <div class="header"></div>
  <div class="start">
  <h4><b>The quiz game</b></h4>
    <div class="container-start">
        <form id="start-form">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username">
        </form><br>
        <p class="p-inline">Start the quiz </p><button id="start" disabled>Start</button>
    </div>
    <div class="quiz">
        <div class="quiz-question">
          <p id="p-total">Total time: <span id="total-time"></span></p>
          <p id="p-time-left">Time left: <span id="time-left"></span></p>
          <p id="question"></p>
          <input type="text" id="answerInput" /> <button id="answerBtn">Answer</button>
          <div class="btns">

          </div>
        </div>
        <div class="response">
          <p id="message-response"></p><button id="next-question">Next</button>
        </div>
    </div>
    <div class="restart-quiz">
      <p id="p-restart">Try again </p><button id="restart-btn">Restart</button>
    </div>
    <div class="score-board">
      <p id="p-score">Score board:</p>
      <ol id="score-list">
      
      </ol>
      <button id="restart-btn-score">Try again</button>
    </div>
  </div>
</div>

<style>

.container {
  border-radius: 25px 25px 25px 25px;
  z-index: 9;
  min-width: 400px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  padding-bottom: 20px;
}
.header {
  border-radius: 25px 25px 0px 0px;
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
}

.p-inline {
    display: inline;
}

.quiz {
    display: none;
}

#answerInput {
    display: none;
}

#answerBtn {
  display: none;
}

.response {
  display:none;
}

#message-response {
  display: inline;
}

#next-question {
  display: inline;
}

.btns {
    display: none;
}

.restart-quiz {
  display: none;
}

#p-restart {
  display: inline;
}

#restart-btn {
  display: inline;
}

.score-board {
  display: none;
}
</style>
`
