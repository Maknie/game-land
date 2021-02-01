import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import CustomersToday from "./pages/CustomersToday";
import Customers from "./pages/Customers";
import CustomerAdd from "./pages/CustomerAdd";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Route exact path="/" component={CustomersToday} />
        <Route exact path="/available" component={CustomersToday} />
        <Route exact path="/all-time-customers" component={Customers} />
        <Route exact path="/create-customer" component={CustomerAdd} />
      </Container>
      <Container>
        <Footer/>
      </Container>
    </Router>
  );
}

export default App;
