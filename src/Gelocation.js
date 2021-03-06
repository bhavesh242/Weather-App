import React from 'react'

class Geolocation extends React.Component{
    state = {
        lat: 0.0,
        long:0.0,
        data: [],
        loading: false,
      }
      componentDidMount(){  
        if ("geolocation" in navigator){
          navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({lat: position.coords.latitude, long: position.coords.longitude});
          });
          this.setState({loading:true});
          fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+this.state.lat+'&lon='+this.state.long+'&units=metric&appid=69c4928e7eaf7c363ff44bf422b8b7e4')
          .then(data=> data.json())
          .then(data=> this.setState({data: data, loading: false})).then(data=> this.props.getData(this.state.data));  
        }
        
      }

      render(){
            
        return (
          <div>
          </div>
        )
      }
}

export default Geolocation;