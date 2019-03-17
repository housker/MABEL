import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  constructor() { }


// ---------- TO POPULATE UI (Map popup dropdown, and comparison graph with toggle different views) -----------

  getSuggestions() {
    // returns top suggestions (what is likely to create greatest profit)
    // figure out how to handle livestock in such a way is incorporated into crop rotation, but keeping in mind that hilly terrains are generally not suitable for tractors, so farmers put livestock on them
    // allPlants.filter(soil).filter(climate).map(yield).sort(price).s;ice(0, 8)
  }

  getPopular() {
    // returns most popular commodities for the region, purely based on users' plots
  }

  getUsers() {
    // returns the commodities the user has plotted for him/herself
  }

  adjustRanking() {
    // triggered when user selects commodity not in top seven.
    // It might have been lower ranking because of history, expected yield, or price. If so, no adjustment needed.
    // (in future, potentially incorporate this feedback into yield prediction)
    // If, however, it was not included because it was disqualified altogether, 
    // add the geocordinate's soil type to list of soils commodity is capable of growing in
    // and add the climate region to the list of climates the commodity is capable of growing in
  }




}
