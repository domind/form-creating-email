import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import MyList from './MyList.js';
import { createEmail } from './utils.js';

class App extends Component {
  emptyItem = {
    radio: "", radio2: false, radio3: true,
    email: "", required_field: "", non_mandatory_field: "", textarea: "", additional_field: "", date: "", checkbox2: "", checkbox12State: false, checkbox12Count: 0, others: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      myList: [],
      item: this.emptyItem,
      other: false,
      validated: false,
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeMyListAdd = this.changeMyListAdd.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleChangeOther = this.handleChangeOther.bind(this);
  }

  reset = () => {
    let myList = [];
    this.setState({ myList })
  }

  downloadFile = () => {
    let email = createEmail(this.state.item, this.state.myList, this.state.other)
    const element = document.createElement("a");
    const file = new Blob([email], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "created_email.eml";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      alert("You did not entered all mandatory fields")
    } else {
      event.preventDefault();
      event.stopPropagation();
      this.downloadFile()
    }
    this.setState({ validated: true });
  }

  handleChangeOther(event) {
    if (event.target.checked) {
      this.setState({ other: true })
    }
    else {
      this.setState({ other: false })
    }
  }
  handlePaste(event) {
    const text = event.target.value.split("\n")
    for (let i = 0; i < text.length; i++) {
      let s = text[i].split(/[ ,\t]+/)
      this.state.myList.push({ id: this.state.myList.length + 1, surname: s[1], name: s[0] })
      this.setState({ myList: this.state.myList })
    }
  }

  updateList = (e, index) => {
    const myList = this.state.myList;
    const name = e.target.name
    myList[index][name] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    let x = false;
    let p = this.state.item.checkbox12Count;
    if (e.target.name === "checkbox12")
      if (e.target.checked) {
        x = true; p++; this.setState({ checkbox12Count: this.state.item.checkbox12Count + 1 },
          //  () =>console.log(this.state.item.checkbox12Count)
        )
      }
      else {
        for (let i = 0; i < myList.length; i++) {
          if (myList[i].checkbox12) x = true

        }
        p--;
      }
    this.setState({ myList });
    let item = { ...this.state.item }
    if (e.target.name === "checkbox12") item.checkbox12State = x;
    item.checkbox12Count = p;
    this.setState({ item })


  };

  deleteFromList = (e, index) => {
    const myList = this.state.myList;
    myList.splice(index, 1);
    for (let i = 0; i < myList.length; i++) {
      myList[i].id = i + 1;
    }
    this.setState({
      myList
    });
  };

  changeMyListAdd(event) {
    this.state.myList.push({ id: this.state.myList.length + 1, name: "", rank: "" })
    this.setState({ myList: this.state.myList })
  }

  handleChange(event) {
    var valuex = 0;
    const target = event.target;
    if (target.type === "radio") {
      if (target.id === "radioYes") valuex = true
      else valuex = false
    }
    else
      valuex = target.type === "checkbox" ? target.checked : target.value;
    const value = (typeof valuex === 'string' || valuex instanceof String) ? valuex.replace(/(?:\r\n|\r|\n)/g, '<br/>') : valuex
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item }
      // ,()=> {console.log(this.state.item);  }
    );

  }

  render() {
    const { validated } = this.state;

    return (
      <div className="App" >
        <Container>
          <Row >
            <Col className="Title">
              <h1>PAGE TITLE</h1>
            </Col>
          </Row>
          <Row>
            <p />
          </Row>
          <Form noValidate className="mainForm"
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}>
            <Form.Group controlId="Required_field">
              <Row>

                <Col xs={2}><Form.Label> Required field (subject):</Form.Label></Col>
                <Col xs={3}>
                  <Form.Control
                    required
                    type="text"
                    name="required_field"
                    placeholder="description"
                    onChange={this.handleChange}
                  />
                </Col>
                <Col xs={2}><Form.Label> Non mandatory field:</Form.Label></Col>
                <Col xs={3}><Form.Control type="text" name="non_mandatory_field" placeholder="description" onChange={this.handleChange} /></Col>



              </Row>
            </Form.Group>
            <Form.Group controlId="second">
              <Row>
                <Col xs={2}>
                  <Form.Label>E-mail pick list </Form.Label></Col>
                <Col xs={3}> <Form.Control required name="email" onChange={this.handleChange} as="select">
                  <option value="">Choose...</option>
                  <option value="example@example.com">Example</option>
                  <option value="test@test.com">Test</option>


                </Form.Control></Col>
                <Col xs={2}><Form.Label>Date example</Form.Label></Col>
                <Col xs={3}><Form.Control type="date" name="date" onChange={this.handleChange} /></Col>

              </Row>
            </Form.Group>
            <hr className="line" />
            <Form.Group controlId="Schedule">

              <Row>

                <Col xs={2}><Form.Label>Text area example</Form.Label></Col>
                <Col xs={3}><Form.Control as="textarea" rows="5" name="textarea" onChange={this.handleChange} placeholder="Text here" /></Col>
                <Col xs={7}>
                  <Row>
                    <Col xs={6}>
                      <Form.Label as="legend" >
                        Radio buttons example
      </Form.Label>
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="YES"
                        name="radio"
                        id="radioYes"
                        checked={this.state.item.radio === true}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="NO"
                        checked={this.state.item.radio === false}
                        name="radio"
                        id="radioNo"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6}>
                      <Form.Label as="legend" >
                        Additional field on selection
      </Form.Label>
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="YES"
                        name="radio2"
                        id="radioYes"
                        checked={this.state.item.radio2 === true}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="NO"
                        checked={this.state.item.radio2 === false}
                        name="radio2"
                        id="radioNo"
                        onChange={this.handleChange}
                      />

                    </Col>
                  </Row>
                  <Row>
                    {this.state.item.radio2 ?
                      <Col>
                        <Form.Label>Additional field</Form.Label>
                      </Col> : ""}
                    {this.state.item.radio2 ?
                      <Col>
                        <Form.Control type="text" required placeholder="description" name="additional_field" onChange={this.handleChange} />
                      </Col>
                      : ""}
                  </Row>
                  <Row >
                    <Col xs={6}>
                      <Form.Label as="legend" >Radio controlling checkbox</Form.Label>
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="YES"
                        name="radio3"
                        id="radioYes"
                        checked={this.state.item.radio3 === true}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={2}>
                      <Form.Check
                        type="radio"
                        label="NO"
                        checked={this.state.item.radio3 === false}
                        name="radio3"
                        id="radioNo"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="left"><Col xs={1}></Col><Col>
                    <Form.Check readOnly label="Checkbox controlled by radio" name="checkbox1" checked={this.state.item.radio3 || ""} onChange={this.handleChange} />
                    <Form.Check label="Regular checkbox" name="checkbox2" onChange={this.handleChange} />
                    <Form.Check readOnly label={
                      "Checkbox based on value from Checkbox2 in list below, count: " +
                      this.state.item.checkbox12Count +
                      " tick" +
                      ((this.state.item.checkbox12Count !== 1) ? "s" : "") +
                      "."} checked={(this.state.item.checkbox12State > 0) ? true : false || ""} name="checkbox12State" />
                    <Form.Check label="Checkbox trigering other field" name="other" onChange={this.handleChangeOther} /></Col>
                  </Row>
                  <Row>

                    {this.state.other ? <Col ><Form.Control type="text" name="others" onChange={this.handleChange} placeholder="Other" /></Col> : ""}
                  </Row>
                </Col>
              </Row>
            </Form.Group>
            <hr className="line" />
            <Row>
              <Col xs={1}> <Form.Label>No.</Form.Label></Col>
              <Col xs={2}> <Form.Label>Name</Form.Label></Col>
              <Col xs={3}><Form.Label>Surname </Form.Label></Col>
              <Col xs={2}><Form.Label>Remarks</Form.Label></Col>
              <Col xs={1}><Form.Label>Checkbox</Form.Label></Col>
              <Col xs={2}><Form.Label>Checkbox2</Form.Label></Col>
            </Row>
            <div className="App">
              {this.state.myList.map((person, i) => {
                return (
                  <MyList key={person.id}
                    updateList={e => {
                      this.updateList(e, i);
                    }}
                    deleteFromList={e => {
                      this.deleteFromList(e, i);
                    }}
                    person={this.state.myList[i]}
                    label={person.id}
                  />
                );
              })}
            </div>
            <Row>

              <Col>
                <br />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="success" onClick={this.changeMyListAdd}>Add Record</Button>
              </Col>
            </Row>
            <Row>
              <p><br /></p>
            </Row>
            <Row className="left" >

              <Col xs={4}>
                Import records from text.<br /> Separate name and surname with space, comma or tab.Each record in new line.
              </Col>
              <Col xs={6}>
                <Form.Control as="textarea" placeholder="Paste text here" name="mattersToMaster" onChange={this.handlePaste} rows="3" />
              </Col>
            </Row>

            <hr className="line" />

            <Row>
              <p><br /></p>
            </Row>
            <Row>
              <Col xs={3}>
              </Col>
              <Col xs={3}>  <Button type="submit" >Create email file</Button> </Col>
              <Col xs={3}><Button variant="primary" type="reset" onClick={this.reset}>Reset</Button></Col>
              <Col xs={3}></Col>
            </Row>
            <Row>
              <Col><br /></Col>
            </Row>
            <hr className="line" />
          </Form>
        </Container>
      </div>
    );
  }
}

export default App;
