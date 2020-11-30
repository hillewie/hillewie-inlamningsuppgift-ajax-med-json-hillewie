/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */

/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=2020
*
*/
function getanswer(){
  let url = 'http://www.omdbapi.com/?apikey=df23ef2';
  let userInput = document.getElementById("userinput").value;
  let type = document.getElementById("select-type").value;
  url += '&s=' + userInput;
  
   if (type.trim() != "Type") { // trimmar innehållet
     url += '&type=' + type;  
  } 
   console.log(url)
 
   fetch(url)
   .then((response) => {
       if (!response.ok) {
           throw new Error('Somethings wrong with your request');
       }
       return response.text();
   })
   .then((data) => {
     var output = JSON.parse(data);
     document.getElementById("result").innerHTML = ''; // nollställer sökningen
 
     for (var movie of output['Search']) { //loopar genom hämtade url med användarens sökning
       getMovie(movie)
     }
     
   })
   .catch((error) => { //fångar fel
       console.log(error);
   })

 function getMovie(input) {
   let showResult = document.getElementById("result");
   let htmlResult = //html skrukturen för varje film hämtning
   `<div class="row">
        <img src="${input.Poster}">
        <h2>${input.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Year released:</strong>${input.Year}</li>
            <li class="list-group-item"><strong>Type:</strong>${input.Type}</li>
            <li class="list-group-item"><strong>Imdb ID:</strong>${input.imdbID}</li>
            <li class="list-group-item"><strong>IMDB page:</strong><a href='https://www.imdb.com/title/${input.imdbID}/' target='_blank'> Home page</a></li>
          </ul>
  </div>`;

   showResult.innerHTML += htmlResult;
 }
}