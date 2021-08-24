/* required variables */
const start_btn = document.querySelector(".start_btn")
const info_box = document.querySelector(".info_box")
const quit_btn = info_box.querySelector(".info_btn .quit")
const continue_btn = document.querySelector(".continue")
const quiz_box = document.querySelector(".quiz_box")
const timer_count = document.querySelector(".timer .timer_sec")
const timeOff = document.querySelector(".timer .timer_text")

const option_list = document.querySelector(".option_list")

// when start button clicked
start_btn.addEventListener("click", function () {
     info_box.classList.add("activeinfo");
})

// when exit buton clicked
quit_btn.addEventListener("click", function () {
     info_box.classList.remove("activeinfo");
})

// when continue button clicked
continue_btn.addEventListener("click", function () {
     info_box.classList.remove("activeinfo");
     quiz_box.classList.add("activeQuiz");
     showQuestions(0);
     queCount(1);
     startTimer(10);
})

let que_counter = 0;
let queNumb = 1;
let counter;
let timeValue = 10;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box")
const restart_btn = result_box.querySelector(".buttons .continue")
const quit_button_end = result_box.querySelector(".buttons .quit")

restart_btn.onclick = () => {
     window.location.reload();
}

quit_button_end.onclick = () => {
     window.location.reload();
}

// when next button clicked
next_btn.addEventListener("click", function () {
     if (que_counter < questions.length - 1) {
          que_counter++;
          queNumb++;
          showQuestions(que_counter);
          queCount(queNumb)
          clearInterval(counter)
          startTimer(timeValue)
          next_btn.style.display = "none";
          timeOff.textContent = "Time Left"
     } else {
          clearInterval(counter)
          console.log("Question completed!")
          showResult();
     }
})

//getting questions
function showQuestions(index) {
     const que_text = document.querySelector(".que_text")
     let que_tag = '<span>' + questions[index].number + ". " + questions[index].question + '</span>'
     let option_tag = '<div class="option">' + questions[index].option[0] + '<span></span></div>'
          + '<div class="option">' + questions[index].option[1] + '<span></span></div>'
          + '<div class="option">' + questions[index].option[2] + '<span></span></div>'
          + '<div class="option">' + questions[index].option[3] + '<span></span></div>'
     que_text.innerHTML = que_tag;
     option_list.innerHTML = option_tag;
     const option = option_list.querySelectorAll(".option")
     for (let i = 0; i < option.length; i++) {
          option[i].setAttribute("onclick", "optionSelected(this)")
     }
}

function optionSelected(answer) {
     clearInterval(counter)
     let userans = answer.textContent;
     let correctAns = questions[que_counter].answer;
     let allOptions = option_list.children.length;
     if (userans == correctAns) {
          userScore += 1;
          console.log(userScore);
          answer.classList.add("correct")
          console.log("Correct!!!")
     } else {
          answer.classList.add("incorrect")
          console.log("Wrong!!!")

          // select correct
          for (let i = 0; i < allOptions; i++) {
               if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct")
               }
          }
     }

     // once user select a option, disable others
     for (let i = 0; i < allOptions; i++) {
          option_list.children[i].classList.add("disabled")
     }
     next_btn.style.display = "block";
}

function showResult() {
     info_box.classList.remove("activeinfo");
     quiz_box.classList.remove("activeQuiz");
     result_box.classList.add("activeResult");
     const scoreText = result_box.querySelector(".score")

     let scoreTag = '<span>You got<p>&nbsp; '+ userScore +'</p>&nbsp; out of &nbsp;<p>'+ questions.length +' </p></span>';
     scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
     counter = setInterval(timer, 1000);
     function timer() {
          timer_count.textContent = time;
          time--;
          if (time < 0) {
               clearInterval(counter)
               timer_count.textContent = "00"
               timeOff.textContent = "Time Off"
               
               let correctAns = questions[que_counter].answer;
               let allOptions = option_list.children.length;

               for (let i = 0; i < allOptions; i++) {
                    if (option_list.children[i].textContent == correctAns) {
                         option_list.children[i].setAttribute("class", "option correct")
                    }
                    
               }

               for (let i = 0; i < allOptions; i++) {
                    option_list.children[i].classList.add("disabled")
               }
               next_btn.style.display = "block";
          }
     }
}

function queCount(index) {
     const bottom_ques_count = document.querySelector(".que_count")
     let TotalQuesCountTag = '<span>' + index + '</span>of<span>' + questions.length + '</span>Questions';
     bottom_ques_count.innerHTML = TotalQuesCountTag;
}