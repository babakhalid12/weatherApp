import { ICityWeather } from './../models/IWeatherData.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWeatherRawData } from '../models/IWeatherRawData.interface';
import { ISearchResult, IWeatherData } from '../models/IWeatherData.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com';


  searchLocation(term): Observable<ISearchResult[]> {
    /*
      CHALLANGE
       - get list of cities based on the searched string
       sample url: baseUrl/api/location/search/?query=paris
    */
   return this.http.get<ISearchResult[]>(this.baseUrl + '/api/location/search/?query=' + term);
     
 
  }

 
  getCityDetails(woeid): Observable<IWeatherData> {
    /*
      woeid is the city id(number).
      you can use below sample url to fetch the city weather details
      sample url : baseUrl/api/location/111111
    */

    /*
      CHALLENGE
       - fetch the city weather data
       - transform the received data to required "IWeatherData" format using transformRawData() func
    */
   return this.http.get<IWeatherRawData>(this.baseUrl + '/api/location/' + woeid)
   .pipe(map( (resp:IWeatherRawData) => this.transformRawData(resp)  
  ));
   

  }

  transformRawData(rawData: IWeatherRawData) {
    const transformedWeather: Array<ICityWeather> = [];
   console.log(rawData);
    rawData.consolidated_weather.forEach(function(obj) {
      const date = rawData.consolidated_weather[0].applicable_date;
      const temperature = rawData.consolidated_weather[0].the_temp;
      const weather_name = rawData.consolidated_weather[0].weather_state_name;
      const weather_image = `data:image/jpeg;base64,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`;

      transformedWeather.push({ date,temperature,weather_name,weather_image} as ICityWeather);
    });

    return {
      city: rawData.title,
      country: rawData.parent.title,
      weather: transformedWeather
  

    };
  }
}





