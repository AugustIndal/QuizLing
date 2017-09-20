package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

/**
 * @author nilstes
 */
@Path("/quiz/")
public class QuizService {
    private static Map<Integer, Quiz> quizzes = new HashMap<>();

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("id") int qid) {
        return quizzes.get(qid);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Quiz> getQuizes() {
        List<Quiz> list = new ArrayList<>();
        list.addAll(quizzes.values());
        return list;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void createQuiz(Quiz quiz) {
        quizzes.put(quiz.getQid(), quiz);
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteQuiz(@PathParam("id") int qid){
        quizzes.remove(qid);
    }
}
