package services;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.io.Serializable;

/**
 * Created by August on 27.09.2017.
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Player implements Serializable {
    @XmlElement(name="nickname")
    private String nickName;

    @XmlElement(name="points")
    private int points;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
