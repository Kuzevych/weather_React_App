import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

class App extends React.Component {

    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        error: undefined,
    };

   gettingWeather = async (event) => {
       event.preventDefault();
       const API_KEY = "8ee84ef191c24dd0a40f9dda6261a0cf";
       const city = event.target.city.value;
       if(city){
           const apiUrl = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
           const data = await apiUrl.json();
            console.log(data);

           this.setState({
               temp: data.main.temp,
               city: data.name,
               country: data.sys.country,
               pressure: data.main.pressure,
               error: undefined
           });
       } else {
           this.setState({
               temp: undefined,
               city: undefined,
               country: undefined,
               pressure: undefined,
               error: 'Введіть назву міста'
           });
       }
   };
      render() {
         return(
             <div className='wrapper'>
                 <div className="main">
                     <div className="container">
                         <div className="row">
                             <div className='col-sm-5 info'>
                                 <Info/>
                             </div>
                             <div className='col-sm-7 form'>
                                 <Form weatherMethod={this.gettingWeather}/>
                                 <Weather
                                     temp={this.state.temp}
                                     city={this.state.city}
                                     country={this.state.country}
                                     pressure={this.state.pressure}
                                     error={this.state.error}
                                 />
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         );
      }
};

export default App;