import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class FindCity extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitCity();
  }

  render(){
    return (
      <Form>
          <Form.Group >
            <Form.Label>
              Location Name
            </Form.Label>
            <Form.Control type="text" onChange={this.props.updateCity} />
            <Button  onClick={this.handleSubmit} >Explore!</Button>
          </Form.Group>
        </Form>
    )
  }
}

export default FindCity;