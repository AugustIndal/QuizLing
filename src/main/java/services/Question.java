package services;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by August on 20.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Question implements Serializable {
    @XmlElement(name="questionId")
    private int questionId;

    @XmlElement(name="sec")
    private int sec;

    @XmlElement(name="opt")
    private List<String> opt = new ArrayList<>();

    @XmlElement(name="ansInd")
    int index;

    @XmlElement(name="question")
    private String question;

    @XmlElement(name="url")
    private String url;

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOpt() {
        return opt;
    }

    public void setOpt(List<String> opt) {
        this.opt = opt;
    }

    public int getSec() {
        return sec;
    }

    public void setSec(int sec) {
        this.sec = sec;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setAnsInd(int i){
        this.index = i;
    }
    public int getAnsInd(int i){
        return index;
    }
}
