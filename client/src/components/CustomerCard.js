import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MIN_30, HOUR_1, UNLIMIT } from "../consts/plans";

const CustomerCard = (props) => {
  const background = () => {
    const today = new Date();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();
    currentHour = ("0" + currentHour).slice(-2);
    currentMinute = ("0" + currentMinute).slice(-2);
    const exitDate = new Date(props.date); // НЕ ВРЕМЯ ПОКИДАНИЯ, А ДАТА
    if (
      today.getDay() > exitDate.getDay() ||
      today.getMonth() > exitDate.getMonth()
    ) {
      return "warning";
    }

    if (props.plan === MIN_30) {
      const today = new Date();
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (currentHour > exitHour) {
        return "warning";
      }
      if (currentHour === exitHour) {
        if (currentMinute > exitMinute) {
          return "warning";
        }
      }
    }
    if (props.plan === HOUR_1) {
      const today = new Date();
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (currentHour > exitHour) {
        return "warning";
      } else if (
        currentHour === exitHour &&
        currentMinute > exitMinute
      ) {
        return "warning";
      }
    }
    return "success";
  };
  return (
    <Card className="text-center mb-3" bg={background()} text="light">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
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
              <br /> <b>{props.plan} </b>
            </Col>
          </Row>
        </Card.Text>
        <Button variant="danger">Ребенок покинул зал</Button>
      </Card.Body>
      <Card.Footer>{props.date}</Card.Footer>
    </Card>
  );
};
export default CustomerCard;
