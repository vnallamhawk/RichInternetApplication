(function (a1, $, undefined) { 

a1.parsed_array=[];

a1.start = function(hookElementSelection,hook, dataurlForJsonFile) {
	

	a1.parsed_array=[];

	$.ajax({url:dataurlForJsonFile}).success(function(data) {

		parseJSONData(data);
		
		loadvideos(hookElementSelection,hook);
	});
};
//parsing the data
var parseJSONData = function(data) {
	parsed_array=[];	
	
	$.each(data, function(i, val) {
		
		parsed_array.push(val);
		});
}

//loading the videos
var loadvideos=function(maindiv,innerdiv)
{	
		var newArray=[];
		var played=[];
		var watched_videos=[];
		var videos_watched_sort=[];
		var videos_unwatched_sort=[];

	if (localStorage.getItem("store") != null) {
	watched_videos=localStorage.store.split(',');
	}		
			
	//random videos generation		
	//citation
	//the following random number generation was done with the help from the following site
	//http://stackoverflow.com/questions/8378870/generating-unique-random-numbers-integers-between-0-and-x
		random();
		 function random() {
                 var rand = parsed_array.length;
                 myFunction(rand);
                 function myFunction(rand) {
                     var limit = rand,
                         amount = 0,
                         lower_bound = 0,
                         upper_bound = rand-1,
                         unique_random_numbers = [];
                     if (amount > limit) limit = amount; 
                     while (unique_random_numbers.length < limit) {
                         var random_number = Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
                         if (unique_random_numbers.indexOf(random_number) == -1) {
                             unique_random_numbers.push(random_number);
                             iterate(parsed_array[random_number]);
                         }
                     }
                 }
             }
	
	function iterate(val) {	
		if(val.id=='pzxc87asdkjl44h7h')
		{
		maindiv.append('<div id="title"></div>');
		maindiv.append('<video id="mainvid" titl="'+val['name']+'" desc="'+val['description']+'" width="1200" height="180" poster="'+val['thumb-url']+'"  ><source id="id1" src="'+val['content-url']+'" type="video/mp4" /></video>');
		maindiv.append('<div id="description"></div>');
		
			maindiv.append('<div class="control"></div>')
			
			$(".control").append('<input id="submit" type="submit" value=">/||"/>');
			$(".control").append('<div class="topControl"></div>')
			$(".topControl").append('<div class="progress">');
			$(".progress").append('<span class="bufferBar"></span>');
			$(".progress").append('<span class="timeBar"></span>');
			$(".topControl").append('<div class="time">');
			$(".time").append('<span class="current"></span>');
			$(".time").append('<span class="duration"></span>');	
			$(".control").append('<div class="btnControl"></div>')
		}
			
		//pushing the watched videos in the front	
		else
		{
			if(!(jQuery.inArray(val['content-url'], watched_videos)!=-1))
			{
			innerdiv.append('<div class="sub"><img id="'+val['content-url']+'" width="225" height="150" class="sub_imgs"  src="'+val['thumb-url']+'" titl="'+val['name']+'" desc="'+val['description']+'"/>');
			videos_unwatched_sort.push(val);
			}
			else
			{
				videos_watched_sort.push(val);
			}
		}	
		}
		//appending the unwatched videos at the end
		var newArray = $.merge(videos_unwatched_sort, videos_watched_sort);
			$.each(videos_watched_sort, function(i, val) {
			innerdiv.append('<div class="sub"><img id="'+val['content-url']+'" width="225" height="150" class="sub_imgs"  src="'+val['thumb-url']+'" desc="'+val['description']+'" titl="'+val['name']+'" />');
		});
		
		//resuming the videos
		if (localStorage.getItem("seek") != null) {
		var local_src=localStorage.getItem("url_val");
		var local_time=localStorage.getItem("seek");
		var vid=document.getElementById('mainvid');
		$(id1).attr('src',local_src);
		vid.currentTime=local_time;
		vid.load();
		vid.play();
		}	
		
		
		//loading the videos on image click
		$('.sub .sub_imgs').click(function(){
		var idimg = $(this).attr('id');
		var srcimg = $(this).attr('src');
		var vid_title= $(this).attr('titl');
		var vid_desc=$(this).attr('desc');
		$("#title").html(vid_title);
		$('#mainvid source').attr('src', idimg);
		mainvid.load();
		mainvid.play();	
		descbuffer(vid_desc,idimg);	
		playing=$('#mainvid').find('Source:first').attr('src');
		played.push(playing);
		localStorage["store"]=played;
		watched_videos=localStorage.store.split(',');
		});	
		
		function descbuffer(desc,sourc)
		{
			
			$("#mainvid").on('timeupdate', function() {
		var currentPos = mainvid.currentTime;
		var maxduration = mainvid.duration;
		var perc = 100 * currentPos / maxduration;
		localStorage["seek"]=currentPos;
		$('.timeBar').css('width',perc+'%');	
		if(perc>25)
		{
			
			$(".sub").hide();
			$("#mainvid").addClass('fullscreen');
		    $("#description").html(desc);
		    $('.control').css({ 'left': '645px',top:'80%' }) 
			$(".control").append('<input id="reload" type="submit" value="NORMAL" onclick="window.location.reload()"/>');
		}
		});
		}
		
		//looping the videos
		var i=0;
		$("#mainvid").on('ended',function(){
		
		theatreplay(newArray[i]);
		function theatreplay(val){
			var srcimg = val['thumb-url'];
			var idimg = val['content-url'];
                 var desc = val.description;
				 var titl=val.name;
                 var video_full = document.getElementById('mainvid');
                 var id = document.getElementById('id1');
                 $(id).attr('src', idimg);
                 var descrip = document.getElementById('description');
				 descrip.innerHTML=desc;
				 var title=document.getElementById('title');
				 title.innerHTML=titl;
                 video_full.load();
                 video_full.play(); 
			i++;
		}
		
		});
		
		var video_check= document.getElementById('mainvid');
   
		video_check.onloadedmetadata = function() {
		$('.duration').text(mainvid.duration);
		};			
		
		$( "#submit" ).click(function() {
			var video_check= document.getElementById('mainvid');
			var sour= $('#mainvid').find('Source:first').attr('src');
			
		if(video_check.paused) {
		video_check.play();
		 if(sour='http://buffalogrove.sat.iit.edu/Flower_4.mp4')
		{
		var vid_title= $('#mainvid').attr('titl');	
		var vid_desc = $('#mainvid').attr('desc');
		$("#title").html(vid_title);	
		descbuffer(vid_desc);	
		}  
   }
   else 
   { 
      video_check.pause();
		var item=document.getElementById('mainvid').currentTime;
	localStorage["seek"]=item;  
	localStorage["url_val"]=sour;  
	
   }  
});


  $(document).ready(function(){  
	
	//INITIALIZE
	var video = $('#mainvid');

	//display video buffering bar
	//citation
	//The following implementation of buffer bar and timeupdate was done with the help of following site http://www.inwebson.com/html5/custom-html5-video-controls-with-jquery/
	var startBuffer = function() {
		var currentBuffer = video[0].buffered.end(0);
		var maxduration = video[0].duration;
		var perc = 100 * currentBuffer / maxduration;
		$('.bufferBar').css('width',perc+'%');
		if(currentBuffer < maxduration) {
			setTimeout(startBuffer, 500);
		}
	};	
	
	//display current video play time
	video.on('timeupdate', function() {
		var currentPos = video[0].currentTime;
		var maxduration = video[0].duration;
		var perc = 100 * currentPos / maxduration;
		$('.timeBar').css('width',perc+'%');	
	});

});
}



})(window.a1 = window.a1 || {}, jQuery)  

