var permissions = "read_stream,user_status,user_likes,user_friends,export_stream"

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
    var indices = [];

    while(indices.length < Math.min(9, map['length'])){
        var rand = Math.random() % map['length'];
        if (!(rand in indices)){
            indices.push(rand);
        }
    }
    var i = 0;
    //var names = [];
    var names = '';
    FB.api('/me?fields=first_name', function(data){
        names += data.first_name +'/'
    });
    //Acknowledge that if I were really programming, things might be different
    for (var name in map){
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
    faceLibsHttpRequest(url, names, requestSuccess, requestFailure);
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
