import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Card, Navbar, Nav, NavItem, Row, Col, Grid } from 'react-bootstrap';

const logo = () => {
    return (
        <Navbar.Brand className="logo">
            <Link to="/">
                <img src="/static/images/logo-transparent.svg" alt="hackspot logo"/>
            </Link>
        </Navbar.Brand>
    )
}

const Header = () => {
    return (
        <div>
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    {logo()}
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav pullRight>
                        <Form>
                            <Row>
                                <Col xs={8}>
                                <input type="text" class="form-control mb-2 mr-sm-2" id="zip" placeholder="Zipcode" />
                                <input type="text" class="form-control mb-2 mr-sm-2" id="distance" placeholder="Max Distance (Mi)" />
                                <div class="form-group mb-2 mr-sm-2">
                                    <select id="inputState" class="form-control">
                                        <option selected>2018</option>
                                        <option>2019</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-dark btn-sm mb-2">Map</button>
                                </Col>
                            </Row>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;