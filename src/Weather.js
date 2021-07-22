import React from 'react';

class Weather extends React.Component{
  render() {
    return(
      
      this.props.forecast.map((data, idx) => {
        return <div key={idx}>
          
            <p>{data.date}</p>
            <p>{data.description}</p>
          
          </div>
        
      })
  
    )
  }
}



export default Weather;

