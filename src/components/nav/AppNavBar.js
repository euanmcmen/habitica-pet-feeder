import { Container, Navbar, Nav } from "react-bootstrap";

export const AppNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>"Agreeable Flower" Habitica Pet Food Feeder</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            href="https://habitica.fandom.com/wiki/%22Agreeable_Flower%22_Automatic_Pet_Food_Feeder"
            target="_blank"
          >
            Wiki
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
