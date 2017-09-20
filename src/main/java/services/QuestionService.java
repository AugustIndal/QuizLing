package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by August on 20.09.2017.
 */
@Path("/questions/question")
public class QuestionService {
    private static Map<Integer, Question> questions = new HashMap<>();


    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Question getQuestion(@PathParam("id") int questionId) {
        return questions.get(questionId);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Question> getQuestions() {
        List<Question> list = new ArrayList<>();
        list.addAll(questions.values());
        return list;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addQuestion(Question question) {
        questions.put(question.getQuestionId(), question);
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteQuiz(Question question){
        questions.remove(question.getQuestionId());
    }
}
