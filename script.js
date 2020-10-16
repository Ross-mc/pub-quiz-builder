$(function(){

    //at this stage, we can create a quiz, store the title and store questions and answers. We can finish the quiz and return to the home page. But it does not display previous made quiz
    //when we start a new quiz, data from the old quiz is still showing. I think this has something to do with the way i've set up quiz. It may be better to have the quiz as an object
    //and to have an array of quizzes perhaps...

    class Quiz {
        constructor(title){
            this.title = title;
            this.questionArr = [];
        };
    };

    let frontPageElements = $("#home-header, #quiz-starter");
    let userTitle = $("#user-title");
    let quizQuestion = $(".quiz-question-builder");
    


    function createQuiz(quizTitle){
        const quiz = new Quiz(quizTitle);
        let questionNumber = 1;
        $("body").append(`
            <div class='quiz-question-builder'>
                <h3 class="quiz-title">${quiz.title}</h3>
                <h4 class="question-number">Question Number ${questionNumber}</h4>
                <input type="text" placeholder="Enter your question" class="user-input" id="user-question">
                <input type="text" placeholder="Enter the correct answer" class="user-input" id="user-answer">
                <button class="submit-btn" id="submit-question" type="submit">Submit question</button>                
            </div>`)



        
        

        $("#submit-question").on('click', (function(){            
            let question = $("#user-question").val();
            let answer = $("#user-answer").val();     
            quiz.questionArr.push({ [question]: answer});
            questionNumber++;
            $(".question-number").html(`Question Number ${questionNumber}`);
            $(".user-input").val("");
            console.log(quiz);
            if (questionNumber === 2){
                $(".submit-btn").after('<button class="finish-btn" id="finish-quiz" type="submit">Finish quiz</button>')
                $(".finish-btn").click(function(){
                    $(".quiz-question-builder").fadeOut(400, function(){
                        frontPageElements.fadeIn(400);
                    })
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