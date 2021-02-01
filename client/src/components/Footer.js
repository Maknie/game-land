import { Button } from "react-bootstrap";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Footer = () => {
  return (
    <Navbar className="glass" expand="lg" variant="light" bg="light" fixed="bottom">
      <Container>
        <LinkContainer to="/create-customer">
          <Button className="m-auto">
            Записать нового клиента
          </Button>
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default Footer;
