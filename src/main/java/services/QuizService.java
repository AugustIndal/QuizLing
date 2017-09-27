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
    private static int quizID = 0;

    @GET
    @Path("/{qid}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("qid") int qid) {
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
        quizID++;
        quiz.setQid(quizID );
        quizzes.put(quiz.getQid(), quiz);
    }

    @PUT
    @Path("/{qid}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateQuiz(@PathParam("qid") int qid){
        if(quizzes.get(qid) != null){
            quizzes.put(qid,quizzes.get(qid));
        }else{
            throw new NotFoundException("NOT FOUND");
        }
    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteQuiz(@PathParam("id") int qid){
        quizzes.remove(qid);
    }
}
