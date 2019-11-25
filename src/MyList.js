import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class myList extends Component {
    render() {
        return (
            <Row>
                <Col xs={1}><Form.Label column >{this.props.person.id + "."}</Form.Label></Col>
                <Col xs={2}> <Form.Control type="text" required name="name" value={this.props.person.name || ""} onChange={this.props.updateList} placeholder="Name" /></Col>
                <Col xs={3}><Form.Control type="text" required name="surname" value={this.props.person.surname || ""} onChange={this.props.updateList} placeholder="Surname" /></Col>
                <Col xs={2}><Form.Control as="textarea" rows="1" name="remarks" value={this.props.person.remarks || ""} onChange={this.props.updateList} placeholder="Remarks" /></Col>
                <Col xs={1}> <Form.Check name="checkbox11" checked={this.props.person.checkbox11 || ""} onChange={this.props.updateList} /></Col>
                <Col xs={2}>  <Form.Check name="checkbox12" checked={this.props.person.checkbox12 || ""} onChange={this.props.updateList} /></Col>
                <Col xs={1} > <Button variant="danger" onClick={this.props.deleteFromList || ""}>Delete</Button></Col>
            </Row>
        )
    }
}

export default myList