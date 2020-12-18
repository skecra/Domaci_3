
'use strict';

$(document).ready(function(){


  var totalListings;
  var ajaxpagenumber;
  var title;
  var year;
  var url;
  var data;
  var type;
  var short;


  $("#submit").on("click", function(event){
    event.preventDefault();

    $("#movies").empty();
    
    $("#pagination").remove();

   
    title = $("#search").val();
    year = $("#year").val();
    type = $('#drop').val();
    ajaxpagenumber = 1;
    var apikey = "854d34a8";

    url = "https://www.omdbapi.com/?apikey=" + apikey + "&t=" + title + "&type=" + type;
    data = {
       s: title,
       y: year,
       callback: ""
    };

 
    $.getJSON(url, data, displayResults).fail(ajaxFail);

  }); 



  function displayResults(response){
    var html = "";
    if (response.Response == "False") {
       html += "<li class='no-movies'>";
       html += "Nije pronadjen film: " + $("#search").val() + "</li>";
    } else {
       $.each(response.Search, function(index, movie){
         var poster;
         if (movie.Poster == "N/A"){
           poster = "<i class='material-icons poster-placeholder'>crop_original</i>";
         } else {
           poster = "<img class='movie-poster' src=" + movie.Poster + ">";
         }

         html += "<div class='m-10 row'>";
         html += poster;
         html += "<div class='col-5 font-weight-bold'>Naslov:";
         html += "<div class='row'>";
         html += "<div class='col-4'>Godina:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Datum objavjivanja:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Trajanje:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Reziser:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Glumci:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Radnja:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Broj sezona:</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-5'>Ocjene gledalaca:</div>";
         html += "</div>";
         html += "</div>";
         html += "<div class='col-4'>" + movie.Title;
         html += "<div class='row'>";
         html += "<div class='col-4'>"+ movie.Year + "</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>"+ movie.Released +"</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>" + movie.Runtime +  "</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>"+ movie.Director + "</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>" + movie.Plot + "</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>" + movie.totalSeasons + "</div>";
         html += "</div>";
         html += "<div class='row'>";
         html += "<div class='col-4'>";
         html += "<ul>";
         html += "<li>" +movie.Ratings+ "</li>";
         html += "<li>" +movie.Ratings+ "</li>";
         html += "</ul>";
         html += "</div>";
         html += "</div>";
         html += "</div>";
         html += "</div>";
         html += "<br>";
       });
      
      }


    
    $("#movies").append(html);


    
    totalListings = response.totalResults;
    paginate(totalListings);
  } 




 

  function paginate(){
      var pagesNeeded = Math.ceil(totalListings/10);

      $("body").append("<footer id='pagination'><ul id='paginationlist'></ul></footer>");

      

   updateAjaxCall();
   } 




  function updateAjaxCall(){

      $("#paginationlist li").click(function(){

       
        $("#movies").empty();
      
        $("#pagination").remove();

      
        ajaxpagenumber = parseInt($(this).text());
        title = $("#search").val();
        year = $("#year").val();
        url = "http://www.omdbapi.com/?";
        data = {
           s: title,
           y: year,
           type: "movie",
        };

        $.getJSON(url, data, displayResults).fail(ajaxFail);

      }); 
  } 



  function ajaxFail(jqXHR) {

    var errorhtml = "";
    errorhtml += "<p>Sorry, there was a " + jqXHR.statusText + " error.</p>";

    $("#movies").append(errorhtml);
  }


}); 
