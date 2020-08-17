import React from "react";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

const MainNav = () => (
  <Navbar bg="dark" variant="dark">
    <Link href="/" passHref>
      <Navbar.Brand>Kitchen CUT</Navbar.Brand>
    </Link>
    <Nav>
      <Link href="/" passHref>
        <Nav.Link>Invoices</Nav.Link>
      </Link>
      <Link href="/locations" passHref>
        <Nav.Link>Locations</Nav.Link>
      </Link>
    </Nav>
  </Navbar>
);

export default MainNav;
