

const quizzes = [];


$(function(){

    //at this stage, the user can create multiple quizzes and save them.
    // the next step is to add functionality to edit and play quizzes.
    //to do list includes saving the quizzes to a database and allowing different types of questions such as true/false or multiple choice

    

    const frontPageElements = $("#home-header, #quiz-starter, #user-created-quizzes");
    const userTitle = $("#user-title");


    

    


    function createQuiz(quizTitle){
        
        class Quiz {
            constructor(title){
                this.answerArr = [];
                this.questionArr = [];
                this.title = title;

            };
        };

        $("#user-created-quizzes").empty();
        
        
        quiz = new Quiz();
        quiz.title = quizTitle;
        let questionNumber = 1;
        $("body").append(`
            <div class="quiz-question-builder">
                <h3 class="quiz-title">${quiz.title}</h3>
                <h4 class="question-number">Question Number ${questionNumber}</h4>
                <input type="text" placeholder="Enter your question" class="user-input" id="user-question">
                <input type="text" placeholder="Enter the correct answer" class="user-input" id="user-answer">
                <button class="submit-btn" id="submit-question" type="submit">Submit question</button>                
            </div>`)
            

        $("#submit-question").on('click', (function(){            
            
            let question = $("#user-question").val();
            let answer = $("#user-answer").val();     
            quiz.questionArr.push(question);
            quiz.answerArr.push(answer);
            questionNumber++;
            $(".question-number").html(`Question Number ${questionNumber}`);
            $(".user-input").val("");
            if (questionNumber === 2){
                $(".submit-btn").after('<button class="finish-btn" id="finish-quiz" type="submit">Finish quiz</button>')
                $(".finish-btn").click(function(){
                    $(".finish-btn").remove();
                    quizzes.push(quiz);
                    $(".quiz-question-builder").fadeOut(400, function(){
                        $(".quiz-question-builder").remove();
                        for (let i = 0; i<quizzes.length; i++){
                            $("#user-created-quizzes").append(`
                                <div class="quiz-card" id="${quizzes[i].title}">
                                    <h3 class="quiz-title">${quizzes[i].title}</h3>
                                    <h4 class="num-questions">${quizzes[i].questionArr.length} question(s)</h4>
                                    <button class="completed-btn edit-quiz">Edit Quiz</button>
                                    <button class="completed-btn play-quiz">Play Quiz</button>
                                </div>
                                `)
                        };
                        frontPageElements.fadeIn(400);
                    });
                });
            };
            
        })
    );
        
};


    

    
    

    $("#start-build-submit").click(function(){
        createQuiz(userTitle.val());
        userTitle.val('');
        frontPageElements.fadeOut(400, function(){    
            $(".quiz-question-builder").fadeIn(400).css('display', '');
        }); 
    });

    



});