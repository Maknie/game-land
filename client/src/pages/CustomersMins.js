import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import CustomerCard from "../components/CustomerCard";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { MIN_30 } from '../consts/plans'

const CustomersToday = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`http://localhost:5000/customers/${MIN_30}`);
      const data = await res.json();
      console.log(data);
      setCustomers(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="CustomersToday">
        <h3 className="text-center mb-3">Все клиенты c тарифом "30 минут"</h3>
        <Row>
          {customers.map((customer) => (
            <Col key={customer._id} sm={12} md={6} lg={4} xl={3}>
              <CustomerCard
                id={customer._id}
                name={customer.name}
                parentsPhone={customer.parentsPhone}
                givenId={customer.givenId}
                enterTime={customer.enterTime}
                exitTime={customer.exitTime}
                plan={customer.plan}
                date={customer.date}
                isTimedOut={customer.isTimedOut}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
};

export default CustomersToday;
