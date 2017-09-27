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
    nickname = getUrlParameter("nick");
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
                var durationS = questions[i].sec;
                duration = questions[i].sec * 1000;
                url = questions[i].url;
                setInterval(function(){
                    if(durationS > 0){
                        $("#timeLeftText").text("Timeleft: "+durationS--+"s");
                    }
                },1000);

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
                if(i === question.length){
                    setTimeout(function(){
                        quiz.players.push(
                            {nickname:nickname, points:points}
                        );

                        $.ajax({
                            url: 'rest/quiz/'+quiz.qid,
                            type: 'PUT',
                            data: JSON.stringify(quiz),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function (result) {
                            }
                        });

                    },duration);
                    setTimeout(function(){

                        $('#scoreModal').modal('show');

                        $.ajax({
                            url: "rest/quiz/" + qid,
                            type: "get",
                            dataType: "json",
                            success: function (data) {
                                var score = data.players;
                                console.log(score);
                                for (var i = 0; i < score.length; i++) {
                                    if (score[i].nickname != null) {
                                        console.log(score[i].nickname);
                                        // Find a <table> element with id="myTable":
                                        var table = document.getElementById("scoreTable");

                                        // Create an empty <tr> element and add it to the 1st position of the table:
                                        var row = table.insertRow(1);

                                        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                                        var cell1 = row.insertCell(0);
                                        var cell2 = row.insertCell(1);

                                        // Add some text to the new cells:
                                        cell1.innerHTML = score[i].nickname;
                                        cell2.innerHTML = score[i].points;
                                        //("#sc"+(i)+"N").html(score[i].nickname);
                                        //$("#sc"+(i)).html(score[i].points);
                                    }
                                }
                            }
                        });

                    },duration+2000)
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
