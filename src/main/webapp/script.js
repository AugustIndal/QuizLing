/**
 * Created by August on 23.09.2017.
 */
$(document).ready(function() {

    setInterval(function () {
        $('#myTable').DataTable().ajax.reload();
        },
        1000);

    $('#myTable').DataTable( {
        ajax: {
            url: 'rest/quiz/',
            dataType: "json",
            //Manipulating data from rest
            dataSrc:
                function (json) {
                var return_data = new Array();
                for(var i=0;i< json.length; i++){
                    var startTime = new Date(Number(json[i].start));
                    var timeLeft = timeleft(Number(json[i].start));
                    if(timeLeft == null){
                        timeLeft = "Quiz started/ended";
                    }
                    return_data.push({
                        'qid': json[i].qid,
                        'name'  : json[i].name,
                        'start' : startTime.toString(),
                        'startTime' : timeLeft
                })
                }
                return return_data;
            }
        },
        columns: [
            { data: 'qid' },
            { data: 'name' },
            { data: 'start'},
            { data: 'startTime'}
        ],
        rowId: 'qid',
        select: true
    });



    $("#createQuiz").click(function () {
        var time = $("#quizStart").val();
        var startDate = new Date(time);

        $.ajax({
            url: 'rest/quiz/',
            type: 'POST',
            data: JSON.stringify({
                qid: "1",
                name: $("#quizName").val(),
                author: $("#quizAuthor").val(),
                start : startDate.getTime(),
                questions: [
                    //TODO create questions in loop.
                    {
                        questionId : "1",
                        question : $("#question1").val(),
                        url : $("#url1").val(),
                        sec : $("#sec1").val(),
                        ansInd : $("#correct1").val(),
                        opt :[$("#answer11").val(), $("#answer21").val(), $("#answer31").val(), $("#answer41").val()]
                    },
                    {
                        questionId : "2",
                        question : $("#question2").val(),
                        url : $("#url2").val(),
                        sec : $("#sec2").val(),
                        ansInd : $("#correct2").val(),
                        opt :[$("#answer12").val(), $("#answer22").val(), $("#answer32").val(), $("#answer42").val()]
                    },
                    {
                        questionId : "3",
                        question : $("#question3").val(),
                        url : $("#url3").val(),
                        sec : $("#sec3").val(),
                        ansInd : $("#correct3").val(),
                        opt :[$("#answer13").val(), $("#answer23").val(), $("#answer33").val(), $("#answer43").val()]
                    }
                ]
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                $('#myTable').DataTable().ajax.reload();
            }
        });
    });





    $('#myTable tbody').on('click', 'tr', function () {
        var row = $(this).closest('tr');
        var rowData = $('#myTable').dataTable().fnGetData(row);
        if (rowData === null) return;
        var qid = rowData.qid;
        $('#quizTitle').html(rowData.name);

        $('#clickModal').modal('show');

        $('#startQuiz').click(function () {
            var nickName = $("#nickInput").val()
            if(!nickName){
                alert("Please enter username!")
            }else{
                var mylink = "http://localhost:8080/project/run.html?qid="+qid+"&nick="+nickName;
                window.location.replace(mylink);
            }
        });

        $('#deleteQuiz').on('click',function () {
            $.ajax({
                url: 'rest/quiz/'+qid,
                type: 'DELETE'
            });
        });

    });

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