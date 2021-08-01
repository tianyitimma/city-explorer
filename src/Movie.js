import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class Movie extends React.Component {
  render() {
    return (
      <div className="movie-details">
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>The movie title: {this.props.movie.title}</Card.Title>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${this.props.movie.image_url}`} />
            <Card.Text>
              {this.props.movie.overview}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Movie;
