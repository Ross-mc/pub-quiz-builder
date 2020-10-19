

const quizzes = [];


$(function(){

    //at this stage, the user can create multiple quizzes and save them. The user can play submitted quizzes. A record of the score is kept. Answers are checked against the stored answers. Answers are sanitised with lowercase and removal of whitespace
    // the next step is to add functionality to edit quizzes.
    //to do list includes saving the quizzes to a database and allowing different types of questions such as true/false or multiple choice

    

    const frontPageElements = $("#home-header, #quiz-starter, #user-created-quizzes");
    const userTitle = $("#user-title");


    

    

    //moves the user to the part of the webapp where the quiz is being created
    function createQuiz(quizTitle){
        
        //a blank quiz element that takes the user input from the homepage as the title
        class Quiz {
            constructor(title){
                this.answerArr = [];
                this.questionArr = [];
                this.title = title;
            };
        };

        //remove any created quizzes from the DOM
        $("#user-created-quizzes").empty();
        
        
        quiz = new Quiz();
        quiz.title = quizTitle;
        let questionNumber = 1;
        
        //the HTML for the quiz builder

        $("body").append(`
            <div class="quiz-question-builder">
                <h3 class="quiz-title">${quiz.title}</h3>
                <h4 class="question-number">Question Number ${questionNumber}</h4>
                <input type="text" placeholder="Enter your question" class="user-input" id="user-question">
                <input type="text" placeholder="Enter the correct answer" class="user-input" id="user-answer">
                <button class="submit-btn" id="submit-question" type="submit">Submit question</button>                
            </div>`)
            
        //user clicks the submit button
        $("#submit-question").on('click', (function(){            
            
            // take the user's input for the question and answer

            let question = $("#user-question").val();
            question.replace(/?/g,'')
            let answer = $("#user-answer").val();     
            quiz.questionArr.push(question);//I need to add form validation here
            quiz.answerArr.push(answer);//and form validation here
            questionNumber++;
            $(".question-number").html(`Question Number ${questionNumber}`);//updates the question number
            $(".user-input").val("");//clears our the inputs

            if (questionNumber === 2){//after at least one question has been submit, add the finish quiz button

                $(".submit-btn").after('<button class="finish-btn" id="finish-quiz" type="submit">Finish quiz</button>')
                $(".finish-btn").click(function(){

                    $(".finish-btn").remove();//remove the finish button to stop it displaying on home page
                    quizzes.push(quiz);//save the user created quiz to an array of user created quizzes
                    $(".quiz-question-builder").fadeOut(400, function(){

                        $(".quiz-question-builder").remove();
                        for (let i = 0; i<quizzes.length; i++){

                            $("#user-created-quizzes").append(`
                                <div class="quiz-card" id="${quizzes[i].title}">
                                    <h3 class="quiz-title">${quizzes[i].title}</h3>
                                    <h4 class="num-questions">${quizzes[i].questionArr.length} question(s)</h4>
                                    <button class="completed-btn edit-quiz" id="${i}-edit">Edit Quiz</button>
                                    <button class="completed-btn play-quiz" id="${i}-play">Play Quiz</button>
                                </div>
                                `)//This for loop creates a new quiz card for each user created quiz in the current session.
                        };
                        frontPageElements.fadeIn(400);

                        $(".play-quiz").click(function(){
                            let clickedID = $(this).attr("id").replace(/\D+/g,'');

                            let currentQuestion = 0;

                            let userScore = 0;

                            $("body").append(`
                                <div class="game-on quiz-card">
                                    <h3 class="quiz-title">${quizzes[clickedID].title}</h3>
                                    <h4 class="question-number">Question Number ${currentQuestion +1}</h4>
                                    <p class="quiz-question">${quizzes[clickedID].questionArr[currentQuestion]}?</p>
                                    <input type="text" placeholder="Enter the your guess" class="user-input" id="play-answer">
                                    <button class="guess-btn" id="submit-guess" type="submit">Go!</button>
                                    <p class="user-score">Current Score: ${userScore}/${quizzes[clickedID].questionArr.length}</p>                
                                </div>`)
                            frontPageElements.fadeOut(400, function(){
                                $(".game-on").fadeIn(400).css('display', '');
                            })
                            
                            $("#submit-guess").click(function(){
                                let userGuess = $("#play-answer").val();

                                if (userGuess.toLowerCase().replace(/\s/g,'') === quizzes[clickedID].answerArr[currentQuestion].toLowerCase().replace(/\s/g,'')){
                                    userScore++;
                                    alert('You were correct');
                                    currentQuestion++;
                                } else {
                                    alert(`You were incorrect. The answer was ${quizzes[clickedID].answerArr[currentQuestion]}`);
                                    currentQuestion++;
                                };

                                $("#play-answer").val('');

                                if (currentQuestion === quizzes[clickedID].questionArr.length){
                                    $(".game-on").empty().append(`
                                    <p class="user-score">You scored: ${userScore}/${quizzes[clickedID].questionArr.length}!</p>
                                    <button class="guess-btn" id="return-home" type="submit">Return Home</button>`)
                                    $("#return-home").click(function(){
                                        $(".game-on").fadeOut(400, function(){
                                            frontPageElements.fadeIn(400);
                                            $(this).remove();
                                        })
                                    });
                                }

                                $(".question-number").html(`Question Number ${currentQuestion +1}`)
                                $(".quiz-question").html(`${quizzes[clickedID].questionArr[currentQuestion]}?`)
                                $(".user-score").html(`Final Score: ${userScore}/${quizzes[clickedID].questionArr.length}`)  

                            });

                        });
                    });
                });
            };    
        })
    )};




    

    
    

    $("#start-build-submit").click(function(){

        createQuiz(userTitle.val());
        userTitle.val('');
        frontPageElements.fadeOut(400, function(){    

            $(".quiz-question-builder").fadeIn(400).css('display', '');
        }); 
    });

    



});