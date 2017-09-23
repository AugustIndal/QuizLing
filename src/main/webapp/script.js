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
            dataSrc: '',
            dataType: "json"
        },
        columns: [
            { data: 'qid' },
            { data: 'name' }
        ]
    });

    $("#createQuiz").click(function () {
        $.ajax({
            url: 'rest/quiz/',
            type: 'POST',
            data: JSON.stringify({
                qid: $("#quizId").val(),
                name: $("#quizName").val(),
                questions: [
                    {
                        questionId : $("#questionId").val(),
                        question : $("#question").val(),
                        sec : $("#sec").val(),
                        opt :[],
                        svarInd : ($("#rikigsvar").val() - 1)
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

});
