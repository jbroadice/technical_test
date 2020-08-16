import { Navbar, Nav } from "react-bootstrap";

const MainNav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Kitchen CUT</Navbar.Brand>
    <Nav>
      <Nav.Link href="#invoices">Invoices</Nav.Link>
      <Nav.Link href="#locations">Locations</Nav.Link>
    </Nav>
  </Navbar>
);

export default MainNav;
