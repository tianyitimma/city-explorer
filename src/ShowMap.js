import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class ShowMap extends React.Component {
  
  render() {
    return(
      <Modal show={this.props.showMap} onHide={this.props.closeMap}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.location.display_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: '28rem' }}>
            <Card.Img variant="top" src={this.props.map} />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeMap}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }
}

export default ShowMap;

