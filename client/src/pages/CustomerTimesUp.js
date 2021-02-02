import axios from "axios";
import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";

const CustomerTimesUp = ({ match }) => {
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    const timehasUp = async () => {
        let confirmation = window.confirm("Уверены что ребенок покинул корт?");
        if (confirmation) {
          axios
            .post(`http://localhost:5000/customers/timeout/${match.params.id}`, {
              isTimedOut: "true",
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      timehasUp()
  }, [match]);
  
  if (!isDeleted) {
    return <Loader />;
  } else {
    return <div>Deleted</div>;
  }
};

export default CustomerTimesUp;
