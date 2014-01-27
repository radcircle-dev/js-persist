

$(window).load(function(){


	//as bad as it is to pollute the global space, we need
	//this variable to be accessible to all functions
	//so basically, YOLO
	var page = 1;




/*============================
	HOME PAGE - ALL POSTS
============================*/
	//call the WP install and get the latest 10 posts
	function yesThisIsWordpress(pageToLoad){
		$.ajax({
			url: 'http://dev.radcircle.com/?json=get_recent_posts&count=10&page=' + pageToLoad,
			dataType: 'jsonp', 
			success: function(data){
				//remove the initial message
				$('#timeline_initialloading').remove();

				//log the data for debugging
				console.log(data);
				console.log("Rendering page " + pageToLoad)

				//set the POSTS node to a variable so we don't have to keep appending it
				var recentposts = data.posts;

				//iterate through the data and append to the screen
				for (var i = 0; i < recentposts.length; i++) {
					$('.timeline').append('<div class="timeline_post col-md-6 needsbg" data-postid="'+i+'"><div class="timeline_post_inner"><div class="timeline_post_inner_title">'+recentposts[i].title+'</div><div class="timeline_post_inner_summary"><p>'+recentposts[i].excerpt+'</p></div></div></div>')
					$('.timeline_post.needsbg').data('thispostsbg', recentposts[i].thumbnail);
					loadBackgrounds(); //load the backgrounds for each one after the post has loaded
					$('.timeline_post').fadeIn(600); //fade each one in as it's loaded
				};
				
			},
			error: function(e){
				//if there is an error, throw an alert
				$('.timeline').html('<div class="panel panel-warning"><div class="panel-danger">There was an error.</div></div>')
				console.log(e);
			}

		})

		
		//increment the page
		page = page + 1;


	};//end yesthisiswordpress()


	//load the background image for each post
	function loadBackgrounds(){
		//the value of this as it comes in is one above the index of the one we wnat to render (allshownposts - 1)
		var allshownposts = $('.timeline_post');
		var bgtorender = allshownposts.length - 1;

		console.log("Rendering backgrounds for post " + bgtorender)
		var thispostsbg = $('.timeline_post').eq(bgtorender).data('thispostsbg');
		//render that shizzit
		$('.timeline_post').eq(bgtorender).css('background-image','url("'+thispostsbg+'")').removeClass('needsbg')
		
	}



	//Load the next set of posts at the bottom if the scrolling thing doesnt work
	$('#homepage_loadmore').click(function(e){
		e.preventDefault();
		yesThisIsWordpress(page);
	})


	
	//once the JS is all ready, call the first function
	yesThisIsWordpress(page);


})