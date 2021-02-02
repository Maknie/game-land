import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MIN_30, HOUR_1 } from "../consts/plans";

const CustomerCard = (props) => {
  const [exitTimeCome, setExitTimeCome] = useState(false);
  const [background, setBackground] = useState("success");

  const backgroundFunc = () => {
    const today = new Date();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();
    currentHour = ("0" + currentHour).slice(-2);
    currentMinute = ("0" + currentMinute).slice(-2);
    const exitDate = new Date(props.date); // НЕ ВРЕМЯ ПОКИДАНИЯ, А ДАТА
    if (props.isTimedOut) {
      setExitTimeCome(false)
      setBackground("warning");
      return;
    }
    if (
      today.getDay() > exitDate.getDay() ||
      today.getMonth() > exitDate.getMonth()
    ) {
      setExitTimeCome(true);
      setBackground("warning");
      return;
    }

    if (props.plan === MIN_30) {
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (currentHour > exitHour) {
        setExitTimeCome(true);
        setBackground("warning");
        return;
      }
      if (currentHour === exitHour) {
        if (currentMinute > exitMinute) {
          setExitTimeCome(true);
          setBackground("warning");
          return;
        }
      }
    }
    if (props.plan === HOUR_1) {
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (currentHour > exitHour) {
        setExitTimeCome(true);
        setBackground("warning");
        return;
      } else if (currentHour === exitHour && currentMinute > exitMinute) {
        setExitTimeCome(true);
        setBackground("warning");
        return;
      }
    }
    
    setExitTimeCome(false);
    setBackground("success")
    return;
  };

  useEffect(() => {
    backgroundFunc()
    setInterval(function() {
      backgroundFunc()
  }, 60 * 1000);
  }, [])

  return (
    <Card className="text-center mb-3" bg={background} text="light">
      <Card.Body>
        <Card.Title>
          {props.name} 
          {exitTimeCome ? (<h3 className="colRed">Время вышло!!!</h3>) : (<></>)}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col className="bgGlass">
              <i>Номер ребенка: </i>
              <br /> <b>{props.givenId}</b>
            </Col>
            <Col>
              <i>Номер родителей: </i>
              <br /> <b>{props.parentsPhone}</b>
            </Col>
          </Row>
          <Row>
            <Col>
              <i>Вход:</i>
              <br /> <b> {props.enterTime}</b>
            </Col>
            <Col className="bgGlass">
              <i>Покидание:</i>
              <br /> <b> {props.exitTime}</b>
            </Col>
          </Row>
          <Row>
            <Col className="bgGlass">
              {" "}
              <i>Тариф: </i>
              <br />{" "}
              <b>
                {props.plan === HOUR_1
                  ? "1 час"
                  : props.plan === MIN_30
                  ? "30 минут"
                  : "Безлимит"}{" "}
              </b>
            </Col>
          </Row>
        </Card.Text>
        <Button disabled={props.isTimedOut} variant="danger">
          <LinkContainer
            disabled={props.isTimedOut}
            to={`/customer-times-up/${props.id}`}
          >
            <Nav.Link className="colWhote">Ребенок покинул зал</Nav.Link>
          </LinkContainer>
        </Button>
      </Card.Body>
      <Card.Footer>{props.date}</Card.Footer>
    </Card>
  );
};
export default CustomerCard;
