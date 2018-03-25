// short hand for $(document).ready();
$(function() {
    
    //clear text data
    $("#clear").on("click", function(e){
    	e.preventDefault();
    	$("#article-section").val("");
    })

    //searches for articles
    $("#submit").on("click", function(e){
    	e.preventDefault();
    	//stores user input to variables
    	var searchTerm = $("#search-term").val().trim();
    	var count = $("#number-articles").val().trim();
    	var startDate = $("#start-year").val().trim();
		var endDate = $("#end-year").val().trim(); 	
		// will submit form if search term and count is valid
		if (searchTerm !== "" && count > 0 && count <= 10){
			var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
			//updates query url with user input
			url += '?' + $.param({
			  'api-key': "2e4c8d8b26f645c480a757aaa715c096",
			  'q': searchTerm,
			  'sort': "newest"
			});

			//adds start/end date if user provided valid values
			if (startDate !== "" && typeof startDate === "number" && startDate.length === 8 ){
				url += '?' + $.param({
			  		'begin_date': startDate
				});
			}

			if (endDate !== "" && typeof endDate === "number" && endDate.length === 8){
				url += '?' + $.param({
			  		'end_date': endDate
				});
			}

			$.ajax({
			  url: url,
			  method: 'GET',
			}).done(function(result) {
			  var response = result.response;

			  // dynamicly add the articles to webpage
			  for (let i = 0; i < count; i++){

			  	// creates new div
			  	var newDiv = $("<div>");
			  	$(newDiv).attr("class", "jumbotron text-left");

			  	// adds title section
			  	var title = $("<h3>");
			  	$(title).text("Title: " + response.docs[i].headline.main);
			  	$(newDiv).append(title);

			  	// adds author section
			  	var author = $("<h5>");
			  	$(author).text(response.docs[i].byline.original);
			  	$(newDiv).append(author);

			  	// adds published date
			  	var published = $("<h5>");
			  	$(published).text("Published: " + response.docs[i].pub_date);
			  	$(newDiv).append(published);

			  	// adds snippet of article
			  	var snippet = $("<h4>");
			  	$(snippet).text("Snippet: " + response.docs[i].snippet);
			  	$(newDiv).append(snippet);

			  	// adds link to article
			  	var link = $("<a>");
			  	$(link).text("Article Link: " + response.docs[i].web_url);
			  	$(link).attr("href", response.docs[i].web_url);
			  	// opens another tab for the article
			  	$(link).attr("target", "_blank");
			  	$(newDiv).append(link);
			  	
			  	// adds the new div to #article-section
			  	$("#article-section").append(newDiv);

			  }

			}).fail(function(err) {
			  throw err;
			});

	    	//clears user text
	    	$(".form-control").val("");
		}
	})		
});