import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Game Land</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <NavDropdown title="Детальнее" id="adminmenu">
              <LinkContainer to="/all-time-customers">
                <NavDropdown.Item>Клиенты за все время</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/customers-half-hour">
                <NavDropdown.Item>Клиенты - 30 минут</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/customers-hour">
                <NavDropdown.Item>Клиенты - 1 час</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/customers-unlimit">
                <NavDropdown.Item>Клиенты - Безлимит</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/available">
              <Nav.Link>Клиенты в зале</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/create-customer">
              <Nav.Link>Новый клиент</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
