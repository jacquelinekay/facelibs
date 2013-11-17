var passage = "CHAPTER XII             Alice's Evidence   'Here!' cried Alice, quite forgetting in the flurry of the moment how large she had grown in the last few minutes, and she jumped up in such a hurry that she tipped over the jury-box with the edge of her skirt, upsetting all the jurymen on to the heads of the crowd below, and there they lay sprawling about, reminding her very much of a globe of goldfish she had accidentally upset the week before.  'Oh, I BEG your pardon!' she exclaimed in a tone of great dismay, and began picking them up again as quickly as she could, for the accident of the goldfish kept running in her head, and she had a vague sort of idea that they must be collected at once and put back into the jury-box, or they would die.  'The trial cannot proceed,' said the King in a very grave voice, 'until all the jurymen are back in their proper places--ALL,' he repeated with great emphasis, looking hard at Alice as he said do.  Alice looked at the jury-box, and saw that, in her haste, she had put the Lizard in head downwards, and the poor little thing was waving its tail about in a melancholy way, being quite unable to move. She soon got it out again, and put it right; 'not that it signifies much,' she said to herself; 'I should think it would be QUITE as much use in the trial one way up as the other.'  As soon as the jury had a little recovered from the shock of being upset, and their slates and pencils had been found and handed back to them, they set to work very diligently to write out a history of the accident, all except the Lizard, who seemed too much overcome to do anything but sit with its mouth open, gazing up into the roof of the court.  'What do you know about this business?' the King said to Alice.  'Nothing,' said Alice.  'Nothing WHATEVER?' persisted the King.  'Nothing whatever,' said Alice.  'That's very important,' the King said, turning to the jury. They were just beginning to write this down on their slates, when the White Rabbit interrupted: 'UNimportant, your Majesty means, of course,' he said in a very respectful tone, but frowning and making faces at him as he spoke.  'UNimportant, of course, I meant,' the King hastily said, and went on to himself in an undertone,  'important--unimportant--unimportant--important--' as if he were trying which word sounded best.  Some of the jury wrote it down 'important,' and some 'unimportant.' Alice could see this, as she was near enough to look over their slates; 'but it doesn't matter a bit,' she thought to herself.  At this moment the King, who had been for some time busily writing in his note-book, cackled out 'Silence!' and read out from his book, 'Rule Forty-two. ALL PERSONS MORE THAN A MILE HIGH TO LEAVE THE COURT.'  Everybody looked at Alice.  'I'M not a mile high,' said Alice.  'You are,' said the King.  'Nearly two miles high,' added the Queen.  'Well, I shan't go, at any rate,' said Alice: 'besides, that's not a regular rule: you invented it just now.'  'It's the oldest rule in the book,' said the King.  'Then it ought to be Number One,' said Alice.  The King turned pale, and shut his note-book hastily. 'Consider your verdict,' he said to the jury, in a low, trembling voice.  'There's more evidence to come yet, please your Majesty,' said the White Rabbit, jumping up in a great hurry; 'this paper has just been picked up.'  'What's in it?' said the Queen.  'I haven't opened it yet,' said the White Rabbit, 'but it seems to be a letter, written by the prisoner to--to somebody.'  'It must have been that,' said the King, 'unless it was written to nobody, which isn't usual, you know.'  'Who is it directed to?' said one of the jurymen.  'It isn't directed at all,' said the White Rabbit; 'in fact, there's nothing written on the OUTSIDE.' He unfolded the paper as he spoke, and added 'It isn't a letter, after all: it's a set of verses.'  'Are they in the prisoner's handwriting?' asked another of the jurymen.  'No, they're not,' said the White Rabbit, 'and that's the queerest thing about it.' (The jury all looked puzzled.)  'He must have imitated somebody else's hand,' said the King. (The jury all brightened up again.)  'Please your Majesty,' said the Knave, 'I didn't write it, and they can't prove I did: there's no name signed at the end.'  'If you didn't sign it,' said the King, 'that only makes the matter worse. You MUST have meant some mischief, or else you'd have signed your name like an honest man.'  There was a general clapping of hands at this: it was the first really clever thing the King had said that day.  'That PROVES his guilt,' said the Queen.  'It proves nothing of the sort!' said Alice. 'Why, you don't even know what they're about!'  'Read them,' said the King.  The White Rabbit put on his spectacles. 'Where shall I begin, please your Majesty?' he asked.  'Begin at the beginning,' the King said gravely, 'and go on till you come to the end: then stop.'  These were the verses the White Rabbit read:--     'They told me you had been to her,     And mentioned me to him:    She gave me a good character,     But said I could not swim.".split(" ");

var indices = ["Alice 2, 9, 193, 198, 505, 621","William","Bill 524","Don","Hare","Dinah","Hatter","Gryphon 175 209 459 863 173 837 904 941 91 211 279 590","Which 277 694 921","Queen 514 510 657 195"];

var permissions = "read_stream,user_status,user_likes,user_friends,export_stream"

var status = false;

function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}
 
    throw new Error("Could not create HTTP request object.");
}

function faceLibsHttpRequest(url, input, success, failure) {
    //var request = makeHttpObject();
    var request = new XMLHttpRequest();
    
    //if("withCredentials" in request){
        request.open('GET', url, true);
        request.responseType = "text"
        request.setRequestHeader('facelibs-request', input);
        //request.setRequestHeader('protocol', '');
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200 || request.status == 400)
                    success(request.responseText);
                else if (failure )
                    failure(request.status, request.statusText);
            }
        };
    /*} else if(typeof XDomainRequest != "undefined"){
        request = new XDomainRequest();
        request.setRequestHeader('facelibs-request', input);
        request.open('GET', url);
        request.onload = function(data){
            console.log("apparently successful")
            success(request.responseText)
        }
    } else {
        failure(0, "Derped up");
        return;
    }*/
    console.log(request);
    
    request.send();
    /*request.onreadystatechange = */
}

function requestSuccess(response){
    console.log("Request success: " + response)
}
function requestFailure(stat, statusText){
    console.log("Request failure: " + statusText);
}

function logoutFunction(){
    console.log("Goodbye");
    FB.logout(function(response) {
        // Person is now logged out
        alert("You are now logged out :(");
        location.reload();
    });
}

function handleHttpFailure(statustype, statusText){
  console.log("Got failure status " + statustype + ": " + statusText)
}

function parseResponse(response){
    //console.log(response);
    //TODO: Don't hardcode this dumbass
    var map = {};
    map['length'] = 0;
    for (var i = 0; i < 50; i++){
        if (response.data[i].likes != undefined &&
            response.data[i].likes.data != undefined){
            var likearr = response.data[i].likes.data;
            for (var j = 0; j < likearr.length; j++){
                if(likearr[j] != undefined && likearr[j].name != undefined){
                    var name = likearr[j].name;
                    if (map[name] == undefined){
                        map[name] = 1;
                        map['length'] += 1;
                        console.log(name);
                    } else {
                        map[name] += 1;
                    }
                }
                
            }
        }
    }
    
    //Randomly select 10 people, proportional to how frequently they liked posts
    var nameindices = [];

    while(nameindices.length < Math.min(9, map['length'])){
        var rand = Math.random() % map['length'];
        if (!(rand in nameindices)){
            nameindices.push(rand);
        }
    }
    var names = [];
    FB.api('/me?fields=first_name', function(data){
        //names += data.first_name +'/';
        names.push(data.first_name);
    });
    var k = 0;
    for(var name in map){
    if (name != 'length'){
            if (k in indices){ 
                names.push(name);
            }
            k++;
        }
    }
    console.log(names);
    //passage = passage.split(" ");
    for (var i = 0; i < indices.length; i++){
        //parse the string
        var foo = indices[i].split(" ");
        console.log(foo);
        for (var j = 1; j < foo.length; j++){
            passage[Number(foo[j])] = names[i];
        }
    }
    output = passage.join(" ");
    document.getElementById("storybox").innerHtml = output;
    console.log(output);

    //Acknowledge that if I were really programming, things might be different
    /*for (var name in map){
        if (name != 'length'){
            if (i in indices){ 
                names+= name+'/';
            }
            i++;
        }
    }
    console.log(names)

    //Um put them in a string and an HTTP request I guess
    //NOTE: THIS IS THE OTHER EC2 INSTANCE
    url = "ec2-54-226-78-114.compute-1.amazonaws.com:80"
    faceLibsHttpRequest(url, names, requestSuccess, requestFailure);*/
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : 438476956258780,
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
});

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 

FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      status = true;
      console.log(response);
      runApp(response);
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
       FB.login(function(response) {
          // handle the response
          console.log(response);
          status = false;
          runApp(response);
      }, {scope:permissions});
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login(function(response) {
          // handle the response
          console.log(response);
          unhide('logoutclass');
          runApp(response);
          status = true;
      }, {scope:permissions});
    }
  });
};

// Load the SDK asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This runApp() function is only called in those cases. 
function runApp(response) {
    //make an HTTP request to get posts
    if(response.authResponse){
        console.log("accepted requested permissoins");
    }
    FB.api('/me/permissions', function(data){
            console.log(data);
        });
    FB.api(
        '/me/statuses?fields=likes.fields(name)&limit=50'
        , parseResponse
    );
}

// hide logout button if logged out
/*function hideLogout(status) {
  if (status === false) {

  }
}*/



