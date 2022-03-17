import { Container, Navbar, Nav } from "react-bootstrap";

export const AppNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Habitica Pet Feeder</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#go-to-my-wiki">About this app</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
