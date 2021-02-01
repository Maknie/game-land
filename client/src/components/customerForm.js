import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'
import {
  MIN_30,
  HOUR_1,
  UNLIMIT,
  MIN_30_PRICE,
  HOUR_1_PRICE,
  UNLIMIT_PRICE,
} from "../consts/plans";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      name: "",
      givenId: "",
      parentsPhone: "",
      plan: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    if (!this.state.name || !this.state.givenId || !this.state.parentsPhone || !this.state.plan) {
      alert("Пожалуйста, заполните все поля!");
    } else {
      e.preventDefault();
      axios
        .post("http://localhost:5000/customers", this.state)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({
        name: "",
        givenId: "",
        parentsPhone: "",
        plan: "",
      });
      alert("Ребенок записан");
    }
  };

  render() {
    const { name, givenId, parentsPhone } = this.state;

    return (
      <div>
        <form className="" onSubmit={this.submitHandler}>
          <input
          className="form-control mb-4"
            type="text"
            name="name"
            value={name}
            placeholder="Имя ребенка"
            onChange={this.changeHandler}
          />
          <input
          className="form-control mb-4"
            type="number"
            name="givenId"
            value={givenId}
            placeholder="Инд. номер ребенка"
            onChange={this.changeHandler}
          />
          <input
          className="form-control mb-4"
            type="text"
            name="parentsPhone"
            value={parentsPhone}
            placeholder="Номер родителей"
            onChange={this.changeHandler}
          />
          <select className="form-control mb-4" name="plan" onChange={this.changeHandler}>
            <option defaultChecked value={MIN_30}>Выбрать тариф</option>
            <option value={MIN_30}>30 минут - {MIN_30_PRICE}тг</option>
            <option value={HOUR_1}>1 час - {HOUR_1_PRICE}тг</option>
            <option value={UNLIMIT}>Безлимит - {UNLIMIT_PRICE}тг</option>
          </select>
          <Button className="form-control" variant="primary" type="submit">
          Запустить ребенка
          </Button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
