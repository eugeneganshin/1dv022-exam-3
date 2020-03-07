
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
:host {
  position: absolute;
}
.container {
  border-radius: 8px 8px 2px 2px;
  z-index: 10;
  min-width: 420px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  top:0;
  left: 0px;
  padding-bottom: 20px;
}
.header {
  border-radius: 8px 8px 0px 0px;
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

export const templateChat_ = document.createElement('template')
templateChat_.innerHTML = `
<div class="container">
 <div class="header"><p id="close">x</p></div>
 <div class="container-start">
    <form id="start-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
    </form><br>
    <p id="p-inline">Start chatting </p><button id="start" disabled>Start</button>
  </div>
 <div class="display">
  <ul id="messages">
    <li>hey</li>
    <li>hi</li>
    <li>lol</li>
  </ul>
  <input id="input-msg" type="text">
  <button id="send">Send</button>
 </div>
 <div class="menu"></div>
</div>

<style>
:host {
  position: absolute;
}
.container {
  border-radius: 8px 8px 2px 2px;
  z-index: 10;
  min-width: 420px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  top:0;
  left: 0px;
  padding-bottom: 20px;
}
.header {
  border-radius: 8px 8px 0px 0px;
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
}

#close {
  display: inline;
  margin: 0;
  padding: 0px 20px 0px 0px;
  margin-top: -10px;
  float: right;
  cursor: pointer;
}

.display {
  display: none;
  min-height:200px;
}

.container-start {
  margin-top: 10px;
}

#p-inline {
  display: inline;
}
</style>
`

export const templatePic_ = document.createElement('template')
templatePic_.innerHTML = `
<a href="#"><img src="image/memory-game/0.png" /></>
`
export const templateMem_ = document.createElement('template')
templateMem_.innerHTML = `
<style>
:host {
  position: absolute;
}
img {
  min-width: 50px;
  max-width: 100px;
}
.container {
  border-radius: 8px 8px 2px 2px;
  z-index: 10;
  width: 420px;
  min-height:200px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  top:0;
  left: 0px;
  padding-bottom: 20px;
}
.header {
  border-radius: 8px 8px 0px 0px;
  padding: 10px;
  z-index: auto;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
  
}

#close-btn {
  display: inline;
  margin: 0;
  padding: 0px 20px 0px 0px;
  margin-top: -10px;
  float: right;
  cursor: pointer;
}
}
.display {
  background-color: #2196F3;
}
.hide {
  visibility: hidden;
}
.menu {
  background-color: #2196F3;
  text-align: center;
  position:absolute;
  bottom: 0;
  width:420px;
  border-radius: 0px 0px 2px 2px;
}
</style>
<div class="container">
  <div class="header"><p id="close-btn">x</p></div>
  <div class="display"></div>
  <div class="menu">
    <div id="allButtons">
      <button id="easy">Easy</button>
      <button id="medium">Medium</button>
    </div>
  </div>
</div>
`
