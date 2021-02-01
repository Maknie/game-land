import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Game Land</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to="/all-time-customers">
              <Nav.Link>
                Клиенты за все время
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/available">
              <Nav.Link>
              Клиенты в зале
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/create-customer">
              <Nav.Link>
                Новый клиент
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
