package services;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;


/**
 * Created by August on 20.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz implements Serializable{
    @XmlElement(name="questions")
    private List<Question> questions;
    @XmlElement(name="qid")
    private int qid;
    @XmlElement(name="name")
    private String navn;
    @XmlElement(name="start")
    private LocalDateTime start;

    public List<Question> getQuestions() {
        return questions;
    }
    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public int getQid() {
        return qid;
    }

    public String getNavn() {
        return navn;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

}
