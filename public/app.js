// https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/MIA.svg

var apiUrl = 'https://feeds.nfl.com/feeds-rs/scores.json';


fetch(apiUrl)
  .then(function(data) {
    // Here you get the data to modify as you please
      console.log(data)
    })
  })
  .catch(function(error) {
    // If there is any error you will catch them here
  });   
