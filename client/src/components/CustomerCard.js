import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import {
  MIN_30,
  HOUR_1,
  UNLIMIT,
} from "../consts/plans";

const CustomerCard = (props) => {
  const background = () => {
    if (props.plan === MIN_30) {
      const today = new Date();
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (today.getHours() > exitHour) {
        return "warning";
      } else if (
        today.getHours() === exitHour &&
        today.getMinutes() > exitMinute
      ) {
        return "warning";
      }
    }
    if (props.plan === HOUR_1) {
      const today = new Date();
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      if (today.getHours() > exitHour) {
        return "warning";
      } else if (
        today.getHours() === exitHour &&
        today.getMinutes() > exitMinute
      ) {
        return "warning";
      }
    }
    if (props.plan === UNLIMIT) {
      const today = new Date();
      const exitHour = props.exitTime.split(":")[0];
      const exitMinute = props.exitTime.split(":")[1];
      const exitSecond = props.exitTime.split(":")[2];
      if (today.getHours() > exitHour) {
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
