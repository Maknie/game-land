import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import CustomersToday from "./pages/CustomersToday";
import Customers from "./pages/Customers";
import CustomerAdd from "./pages/CustomerAdd";
import CustomerTimesUp from './pages/CustomerTimesUp';
import CustomersMins from './pages/CustomersMins';
import CustomersHour from './pages/CustomersHour';
import CustomersUnlimit from './pages/CustomersUnlimit';
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Route exact path="/" component={CustomersToday} />
        <Route exact path="/available" component={CustomersToday} />
        <Route exact path="/all-time-customers" component={Customers} />
        <Route exact path="/customers-half-hour" component={CustomersMins} />
        <Route exact path="/customers-hour" component={CustomersHour} />
        <Route exact path="/customers-unlimit" component={CustomersUnlimit} />
        <Route exact path="/create-customer" component={CustomerAdd} />
        <Route exact path="/customer-times-up/:id" component={CustomerTimesUp} />
      </Container>
      <Container>
        <Footer/>
      </Container>
    </Router>
  );
}

export default App;
