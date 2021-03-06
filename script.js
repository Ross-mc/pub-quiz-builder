
const quizzes = [];


$(function(){

    //user can now fully edit quizzes, including answers and questions.
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
            <form class="quiz-card quiz-question-builder">
                <h3 class="quiz-title">${quiz.title}</h3>
                <h4 class="question-number">Question Number ${questionNumber}</h4>
                <input type="text" placeholder="Enter your question" class="user-input" id="user-question" minlength="1">
                <input type="text" placeholder="Enter the correct answer" class="user-input" id="user-answer" minlength="1">
                <button class="submit-btn" id="submit-question" type="button">Submit question</button>                
            </form>`)
            
        //user clicks the submit button
        $("#submit-question").on('click', (function(){            
            
            // take the user's input for the question and answer

            let question = $("#user-question").val();
            question.replace("?", "")
            let answer = $("#user-answer").val();

            if (question.length < 1){
                alert("Please enter a question");
                return
            }

            if (answer.length < 1){
                alert("Please enter an answer")
                return
            }

            quiz.questionArr.push(question);//I need to add form validation here
            quiz.answerArr.push(answer);//and form validation here
            questionNumber++;
            $(".question-number").html(`Question Number ${questionNumber}`);//updates the question number
            $(".user-input").val("");//clears our the inputs

            if (questionNumber === 2){//after at least one question has been submit, add the finish quiz button

                $("#submit-question").after('<button class="finish-btn" id="finish-quiz" type="submit">Finish quiz</button>')
                $("#finish-quiz").click(function(){
                    if ($("#user-question").val()!=="" || $("#user-answer").val()!==""){
                        alert('You have not saved the current question!');
                        return
                    } 

                    $("#finish-quiz").remove();//remove the finish button to stop it displaying on home page
                    quizzes.push(quiz);//save the user created quiz to an array of user created quizzes
                    $(".quiz-question-builder").fadeOut(400, function(){

                        $(".quiz-question-builder").remove();
                        for (let i = 0; i<quizzes.length; i++){

                            $("#user-created-quizzes").append(`
                                <div class="quiz-card" id="${quizzes[i].title}">
                                    <h3 class="quiz-title">${quizzes[i].title}</h3>
                                    <h4 class="num-questions" id="${i}-questions">${quizzes[i].questionArr.length} question</h4>
                                    <button class="completed-btn edit-quiz" id="${i}-edit">Edit Quiz</button>
                                    <button class="completed-btn play-quiz" id="${i}-play">Play Quiz</button>
                                </div>
                                `)//This for loop creates a new quiz card for each user created quiz in the current session.
                            if (quizzes[i].questionArr.length > 1){
                                $(".num-questions").text(`${quizzes[i].questionArr.length} questions`)
                            }
                        };
                        frontPageElements.fadeIn(400);
                                                   
                        // function for editing the quiz
                        $(".edit-quiz").click(function(){
                            
                            let clickedID = $(this).attr("id").replace(/\D+/g,'');
                            let currentQuestion = 0;

                            let addBtnClicked = false;

                            $("body").append(`
                            <form class="game-on quiz-card" id="edit-quiz">
                                <h3 class="quiz-title">${quizzes[clickedID].title}</h3>
                                <h4 class="question-number">Question Number ${currentQuestion+1}</h4>
                                <input type="text" value="${quizzes[clickedID].questionArr[currentQuestion]}" class="user-input" id="edit-question" minlength="1">
                                <input type="text" value="${quizzes[clickedID].answerArr[currentQuestion]}" class="user-input" id="edit-answer" minlength="1">
                                <button class="move-btn" id="move-right"><i class="fas fa-angle-right"></i></button>
                                <button class="move-btn" id="move-left"><i class="fas fa-angle-left"></i></button>
                                <button class="submit-btn" id="submit-edited-question" type="button">Save question</button>
                                <button class="submit-btn" id="add-new-question" type="button">Add new question</button>
                                <button class="finish-btn" id="save-quiz" type="button">Save quiz</button>                
                            </form>`);

                            //function for moving between questions in the quiz

                            

                            frontPageElements.fadeOut(400, function(){
                                $(".game-on").fadeIn(400).css('display', '');
                            });

                            $("#add-new-question").click(function(){
                                currentQuestion++;
                                $(".question-number").html(`Question Number ${currentQuestion+1}`);
                                $("#edit-question").val("");                           
                                $("#edit-answer").val("");

                                addBtnClicked = true;

                                

                                //arr.splice(index, 0, item);
                            });
                            // once the user is satisified with edits, by clicking submit it saves the edited question or answer
                            $("#submit-edited-question").click(function(){
                                let question = $("#edit-question").val();
                                question.replace("?", "")
                                let answer = $("#edit-answer").val();

                                if (question.length < 1){
                                    alert("Please enter a question");
                                    return
                                }
                    
                                if (answer.length < 1){
                                    alert("Please enter an answer")
                                    return
                                }
                                
                                if (addBtnClicked === false){
                                    quizzes[clickedID].questionArr[currentQuestion] = question;//I need to add form validation here
                                    quizzes[clickedID].answerArr[currentQuestion] = answer;//I need to add form validation here
                                    currentQuestion++;
                                    $(".question-number").html(`Question Number ${currentQuestion+1}`);//updates the question number
                                    $("#edit-question").val(quizzes[clickedID].questionArr[currentQuestion]);//refreshes the quiz to the next questions                               
                                    $("#edit-answer").val(quizzes[clickedID].answerArr[currentQuestion]);
                                    
                                    if (currentQuestion === quizzes[clickedID].questionArr.length){
                                        $(".game-on").empty().append(`
                                        <p class="user-score">You have finished editing the quiz</p>
                                        <button class="completed-btn" id="return-home" type="submit">Return Home</button>`)
                                        $("#return-home").click(function(){
                                            $(".game-on").fadeOut(400, function(){
                                                frontPageElements.fadeIn(400);
                                                $(this).remove();
                                            })
                                        });
                                    }
                                } else {
                                    quizzes[clickedID].questionArr.splice(currentQuestion, 0, question);
                                    quizzes[clickedID].answerArr.splice(currentQuestion, 0, answer);
                                    currentQuestion++;
                                    $(".question-number").html(`Question Number ${currentQuestion+1}`);
                                    $("#edit-question").val(quizzes[clickedID].questionArr[currentQuestion]);                            
                                    $("#edit-answer").val(quizzes[clickedID].answerArr[currentQuestion]);
                                    $(`#${clickedID}-questions`).html(`${quizzes[clickedID].questionArr.length} question(s)`)
                                } 

                                
                            });

                            

                            $(".move-btn").click(function(){
                                let id = this.id;                     
                                
                                if (id === "move-left"){
                                    if (currentQuestion===0){
                                        alert('You are at the beginning of the quiz')
                                        return;
                                    } else{
                                        currentQuestion--;
                                    }

                                } else {
                                    if (currentQuestion === quizzes[clickedID].questionArr.length-1){
                                        alert('You are at the end of the quiz')
                                        return
                                    } else{
                                        currentQuestion++;
                                    }   
                                };

                                $(".question-number").html(`Question Number ${currentQuestion+1}`);//updates the question number
                                $("#edit-question").val(quizzes[clickedID].questionArr[currentQuestion]);//refreshes the quiz to the next questions                               
                                $("#edit-answer").val(quizzes[clickedID].answerArr[currentQuestion]);


                            })

                            //this function allows the user to click a button to finish editing the quiz early so they dont have to go throw all the questions

                            $("#save-quiz").click(function(){
                                let question = $("#edit-question").val();
                                question.replace("?", "")
                                let answer = $("#edit-answer").val();
                                
                                if (question.length < 1){
                                    alert("Please enter a question");
                                    return
                                }
                    
                                if (answer.length < 1){
                                    alert("Please enter an answer")
                                    return
                                }
                                
                                quizzes[clickedID].questionArr[currentQuestion] = question;//I need to add form validation here
                                quizzes[clickedID].answerArr[currentQuestion] = answer;//I need to add form validation here
                                currentQuestion++;
                                $(".question-number").html(`Question Number ${currentQuestion+1}`);//updates the question number
                                $("#edit-question").val(quizzes[clickedID].questionArr[currentQuestion]);                               
                                $("#edit-answer").val(quizzes[clickedID].answerArr[currentQuestion]);
                                $(".game-on").fadeOut(400, function(){
                                    $(this).remove();
                                    frontPageElements.fadeIn(400);
                                })
                            });
                        });

                        //function allowing the user to play the quiz
                        
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
                                    <button class="guess-btn submit-btn" id="submit-guess" type="submit">Go!</button>
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
                                    <button class="completed-btn" id="return-home" type="submit">Return Home</button>`)
                                    $("#return-home").click(function(){
                                        $(".game-on").fadeOut(400, function(){
                                            frontPageElements.fadeIn(400);
                                            $(this).remove();
                                        })
                                    });
                                }

                                $(".question-number").html(`Question Number ${currentQuestion +1}`)
                                $(".quiz-question").html(`${quizzes[clickedID].questionArr[currentQuestion]}?`)
                                  

                            });

                        });
                    });
                });
            };    
        })
    )};




    

    
    

    $("#start-build-submit").click(function(){

        if (userTitle.val().length < 1){
            alert("Please enter a quiz title");
            return
        };
        
        createQuiz(userTitle.val());
        userTitle.val('');
        frontPageElements.fadeOut(400, function(){    

            $(".quiz-question-builder").fadeIn(400).css('display', '');
        }); 
    });

});