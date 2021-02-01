import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomersToday from "./pages/CustomersToday";
import Customers from "./pages/Customers";
import { Container } from "react-bootstrap";

function App() {
  return (                                                                                        
    <Router>
      <NavBar />
      <Container>
        <Route exact path="/" component={CustomersToday}/>
        <Route exact path="/all-time-customers" component={Customers}/>
      </Container>
    </Router>
  );
}

export default App;
