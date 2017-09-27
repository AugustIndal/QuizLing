/**
 * Created by August on 24.09.2017.
 */

$(document).ready(function() {
    var questions;
    var qAuthor;
    var qName;
    var qStart;
    var qid;
    var quiz;
    var timeLeft;
    var qPlayers;
    var nickname;
    var points=0;

    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    qid = getUrlParameter("qid");

    $.ajax({
        url: "rest/quiz/"+qid,
        type: "get",
        dataType: "json",
        success: function(data) {
            quiz = data;
            qName = quiz.name;
            qAuthor = quiz.author;
            questions = quiz.questions;
            qPlayers = quiz.players;
            qStart = Number(quiz.start);
            $("#quizNameH").text(qName);

            var started = false;
            setInterval(function () {
                timeLeft = timeleft(qStart);
                if(timeLeft == null){
                    timeLeft = "Quiz started";
                }
                //Start quiz if time is out
                if( ( qStart-Date.now() <= 0) && !started ) {
                    $("#timeLeftText").text("Quiz started");
                    startQuiz(questions);
                    started = true;
                    console.log(quiz.qid);
                    quiz.players.push(
                        {nickname:nickname, points:points}
                    );
                    console.log("Putting");
                    $.ajax({
                        url: 'rest/quiz/'+quiz.qid,
                        type: 'PUT',
                        data: quiz
                    });
                    //Countdown
                }else if(qStart - Date.now() >= 0){
                    $("#timeLeftText").text("Quiz starts in "+timeLeft);
                }
            },
            1000);
        }
    });

    function startQuiz(questions) {
        var question;
        var ansInd;
        var url;
        var duration = 0;
        //var table = document.getElementById('questionTable');

        var i = 0;

        function waitQuiz(duration){
            var clicked = false;
            setTimeout(function(){
                question = questions[i].question;
                ansInd = questions[i].ansInd;
                duration = questions[i].sec * 1000;
                url = questions[i].url;

                $("#questionHead").html("<strong>"+question+"</strong>");
                $("#qImage").src = url;
                for (var j = 0; j < questions[i].opt.length; j++) {
                    if (questions[i].opt[j] != null) {
                        $("#trOpt"+(j+1)).removeClass();
                        $("#opt"+(j+1)).html(questions[i].opt[j])
                    }
                }


                $('#questionTable').find('tr').click( function(){
                    var index = $(this).index();
                    if(index !==0){
                        if (!clicked) {
                            if (index  === ansInd) {
                                $(this).addClass("table-success");
                                points++;
                            } else {
                                $(this).addClass("table-danger");

                            }
                            clicked = true;
                        }
                    }
                });
                i++;
                if(i < questions.length){
                    waitQuiz(duration);
                }
            },duration)
        }
        waitQuiz(duration);
    }
});




function timeleft(startTime){
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;
    var timeRemaining = (startTime - Date.now());
    if(timeRemaining>0){
        days = Math.floor( timeRemaining / (1000*60*60*24) );
        hours = Math.floor( timeRemaining / (1000*60*60) % 24 );
        minutes = Math.floor( ( timeRemaining / (1000*60) ) % 60 ) ;
        seconds = Math.floor( (timeRemaining / 1000) % 60 );

        if(timeRemaining<0){
            return "Quiz started";
        }

        if(days > 0){
            return days+"d "+hours+"h "+minutes+"m "+seconds+"s";
        }else if(hours > 0){
            return hours+"h "+minutes+"m "+seconds+"s ";
        }else if(minutes > 0){
            return minutes+"m "+seconds+"s ";
        }else if(seconds> 0){
            return seconds+"s ";
        }else
            return 0;
    }

}
