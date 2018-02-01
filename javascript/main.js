/*1 search*/

var UI = {};

UI.EnterPress = function(){

	document.querySelector(".js-search").addEventListener('keyup', function(e){

		var input = document.querySelector("input").value;//grabs the value or what user inputs in search bar
		//if user presses enter. if event(e) and which one, 13 which is enter
		if(e.which === 13) {
			//pushToDOM(input);
			SoundCloudApi.getTrack(input);
		}	
	});
};

UI.EnterPress();

UI.SumbitClick = function(){
	document.querySelector(".js-submit").addEventListener('click', function(){
		var input = document.querySelector("input").value;
		SoundCloudApi.getTrack(input);

	});
};

UI.SumbitClick();

/*2 Query Soundcloud api*/

//acts as  a class but is called an object in javascript
var SoundCloudApi = {};

SoundCloudApi.init = function(){
	SC.initialize({
  		client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
	});
}

SoundCloudApi.init();

SoundCloudApi.getTrack = function(inputValue){
	SC.get('/tracks', {
	  q: inputValue
	}).then(function(tracks) {
	  console.log(tracks);
	  SoundCloudApi.renderTracks(tracks);
	});

}

//wrapped and created the html card p
SoundCloudApi.renderTracks = function(tracks){
	
	
	tracks.forEach(function(track){
		console.log(track.artwork_url);
		
		//card
		var card = document.createElement('div'); //creates a new dive on the fly
		card.classList.add('card');

		//image
		var imageDiv = document.createElement('div');
		imageDiv.classList.add('image');

		var image_img = document.createElement('img');
		image_img.classList.add('image_img');
		image_img.src = track.artwork_url || 'https://i1.sndcdn.com/avatars-000131869186-my9qya-t500x500.jpg' //'http://lorempixel.com/100/100/abstract/';

		
		imageDiv.appendChild(image_img);

		//content
		var content = document.createElement('div');
		content.classList.add('content');

		var header = document.createElement('div');
		header.classList.add('header');
		header.innerHTML = '<a href="' + track.permalink_url + '" target="_blank">' + track.title + '</a>';

		//button
		var button = document.createElement('div');
		button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

		var icon = document.createElement('i');
		icon.classList.add('add', 'icon');

		var buttonText = document.createElement('span');
		buttonText.innerHTML = 'add to playlist';

		//appendChild
		content.appendChild(header);

		button.appendChild(icon);
		button.appendChild(buttonText);

		button.addEventListener('click', function(){
			SoundCloudApi.getEmbed(track.permalink_url);
		});

		card.appendChild(imageDiv);
		card.appendChild(content);
		card.appendChild(button);


		var searchResults = document.querySelector('.js-search-results');
		searchResults.appendChild(card);
		
	});	

};


/*4 Add to playlist and play*/
SoundCloudApi.getEmbed =  function(trackURL){
	console.log("click inside embed");
	SC.oEmbed(trackURL, {
	  auto_play: true
	}).then(function(embed){
	  console.log('oEmbed response: ', embed);


	  var sideBar = document.querySelector('.js-playlist');
	  
	  var box = document.createElement('div');
	  box.innerHTML = embed.html;

	  sideBar.insertBefore(box, sideBar.firstChild);

	  localStorage.setItem("key", sideBar.innerHTML);//basically stores in a key/map


	});
}

var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");

SoundCloudApi.clearPlaylist = function(){
	document.querySelector(".js-clear").addEventListener('click', function(){
		sideBar.innerHTML = localStorage.clear();
	});
};

SoundCloudApi.clearPlaylist();







