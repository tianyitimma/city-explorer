import React from 'react';
import Movie from './Movie';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Movies extends React.Component {
  render() {
    return (
      <div className='movie-list'>
        <Modal show={this.props.showMovies} onHide={this.props.closeMovies}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
        
          {this.props.movies.length && this.props.movies.map((movie, idx) => {
            return <Movie key={idx} movie={movie} />
          })}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeMovies}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Movies;