import { WeatherService } from './../../services/weather.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ISearchResult } from '../../models/IWeatherData.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    @ViewChild('searchInput') searchInput;
    searchResults: ISearchResult[];
    @Output() selectedCity=new EventEmitter();

    constructor(
        private weatherService: WeatherService,
    ) { }
    ngOnInit() {
    }

    search(term) {
        /*
            CHALLENGE
                - if user has typed something in the input field,
                  call weatherService.searchLocation() with the searched term
                  and assign the results to searchResults array
                  
                - if input field is empty, clear the searResults array
        */
       if(term == ''){
        this.searchResults=null;
        
    }   else
    {
         this.weatherService.searchLocation(term)
         .subscribe(
            (resp) => {
            //  console.log(resp.body[0]);
              this.searchResults = resp;
              console.log(this.searchResults.length);
              
            });   
        }
                
   }

    selectedLocation(cityDetails: ISearchResult) {
        /*
            CHALLENGE
              After user clicked on a city name from the search results, this function should be called.
              This function should perform the following actions
              - make the input field empty
              - clear all the results
              - send the cityid (woeid) to the parent component (AppComponent)

        */
            console.log('abcd');
            this.searchInput = null;
            this.searchResults = null;
            this.selectedCity.emit(cityDetails.woeid);
    }
    
}
