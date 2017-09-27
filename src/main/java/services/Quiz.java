package services;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.util.List;


/**
 * Created by August on 20.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz implements Serializable{
    @XmlElement(name="questions")
    private List<Question> questions;
    @XmlElement(name="players")
    private List<Player> players;
    @XmlElement(name="qid")
    private int qid;
    @XmlElement(name="name")
    private String name;
    @XmlElement(name="author")
    private String author;
    @XmlElement(name="start")
    private String start;


    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public List<Question> getQuestions() {
        return questions;
    }
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public int getQid() {
        return qid;
    }

    public String getName() {
        return name;
    }

    public String getAuthor(){return author;}

    public String getStart() {
        return start;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public void setAuthor(String author){
        this.author=author;
    }

}
