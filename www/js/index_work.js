var app = {
	// Application Constructor
initialize: function() {
	this.bindEvents();
},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
	document.addEventListener('deviceready', this.onDeviceReady, false);
},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
	app.receivedEvent('deviceready');
},
	// Update DOM on a Received Event
receivedEvent: function(id) {
    document.addEventListener("resume", onResume, false);
	
	
	window.plugins.insomnia.keepAwake();
	
	
	///////// PUSH NUOVE ///////
	
	
	var pushNotification;
	var token


	
	pushNotification = window.plugins.pushNotification;
	
	/*if (device.platform == 'android' || device.platform == 'Android' ||
		device.platform == 'amazon-fireos' ) {
		pushNotification.register(successHandler, errorHandler, {"senderID":"12250132047","ecb":"onNotification"});		// required!
	} else {*/
	
	pushNotification.register(
    successHandler,
    errorHandler,
    {
        "senderID":"930697186929",
        "ecb":"onNotification"
    });	// required!
	//}
	

	
	function tokenHandler (result) {
		//$("#app-status-ul").append('<li>token: '+ result +'</li>');
		// Your iOS push server needs to know the token before it can push to this device
		
		testa(result);
		//if (localStorage.getItem("Token") === null || typeof(localStorage.getItem("Token")) == 'undefined' || localStorage.getItem("Token")=="null") {
			
			//return;
		//}
		//else
		//{
			
		
		//}

		
	}
	
	
	function successHandler (result) {
		//$("#app-status-ul").append('<li>success:'+ result +'</li>');
		
		//alert('result = ' + result);
		testa(result);
	}
	
	function errorHandler (error) {
		//$("#app-status-ul").append('<li>error:'+ error +'</li>');
		
		//alert('result = ' + error);
	}
	
	function testa (testo) {
		
		
		setTimeout (function(){
					
		//alert("http://www.msop.it/rides/Check_RegToken.asp?email="+ localStorage.getItem("email") +"&token="+ testo +"&platform=ios")
		//?email="+ localStorage.getItem("email") +"&token="+ testo +"&platform=ios
		
		$.ajax({
			   type:"GET",
			   url:"http://www.msop.it/rides/Check_RegToken.asp",
			   data: {email:localStorage.getItem("email"),token:testo,platform:"android"},
			   contentType: "application/json",
			   json: 'callback',
			   timeout: 7000,
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
			   
			     setTimeout (function(){
					localStorage.setItem("Token", testo);
					//alert(testo);
				}, 500);
			   
			   });
			   
			   },
			   error: function(){
			   
				 //alert("No")
			   
			   },
			   dataType:"json"});
					
		}, 500);
		
		
	}
	
	
	function onNotification(e) {
    //$("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
	

    switch( e.event )
    {
    case 'registered':
        if ( e.regid.length > 0 )
        {
            //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            //console.log("regID = " + e.regid);
			testa (e.regid)
        }
    break;

    case 'message':
        // if this flag is set, this notification happened while we were in the foreground.
        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
        if ( e.foreground )
        {
            //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

            // on Android soundname is outside the payload.
            // On Amazon FireOS all custom attributes are contained within payload
            var soundfile = e.soundname || e.payload.sound;
            // if the notification contains a soundname, play it.
            var my_media = new Media("/android_asset/www/exit.mp3");
    		my_media.play();
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            if ( e.coldstart )
            {
                //$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
				var my_media = new Media("/android_asset/www/exit.mp3");
    			my_media.play();
            }
            else
            {
                //$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
    			var my_media = new Media("/android_asset/www/exit.mp3");
   				my_media.play();
            }
        }

       //$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
           //Only works for GCM
       //$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
       //Only works on Amazon Fire OS
       //$status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
	   
    	var my_media = new Media("/android_asset/www/exit.mp3");
    	my_media.play();
    break;

    case 'error':
        //$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
    break;

    default:
        //$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
		var my_media = new Media("/android_asset/www/exit.mp3");
    	my_media.play();
    break;
  }
}
	
	

	
	/////////////////////////////////////
	
	
	// PUSH NOTIFICATION //
	
	/*window.plugins.PushbotsPlugin.initialize("57275d964a9efaa2798b4567", {"android":{"sender_id":"12250132047"}});
	
	window.plugins.PushbotsPlugin.resetBadge();
	
	
	setTimeout(function() {
			   
		window.plugins.PushbotsPlugin.on("registered", function(token){
			console.log(token);
			alert(token)
		});
			   
		window.plugins.PushbotsPlugin.getRegistrationId(function(token){
			 console.log("Registration Id:" + token);
			alert("Registration Id:" + token)
		});
			   
	}, 1500);*/
	
	//------------//
	

	
	////////////////////////////////////////
	
	//navigator.geolocation.getCurrentPosition(gpsonSuccess, gpsonError, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	//navigator.geolocation.watchPosition(gpsonSuccess, gpsonError, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
	
	
	//ANDROID -------------------------------------------------------
	
	/*document.addEventListener('backbutton', function(e) {
							  navigator.notification.confirm(
															 'Confermi di voler chiudere',  // message
															 onConfirm2,              // callback to invoke with index of button pressed
															 'Logout',            // title
															 'Si,No'      // buttonLabels
															 );
							  }, false);*/
	
	
	//----------------------------------------------------------------
	
	
	//var lat = "41.889191";
	//var lng = "12.492475";
	
	//localStorage.setItem("lat", lat)
	//localStorage.setItem("lng", lng)
	
	
	var email = localStorage.getItem("email");
	
	
	if (localStorage.getItem("email") === null || localStorage.getItem("email")=="null" || typeof(localStorage.getItem("email")) == 'undefined' || localStorage.getItem("email")==0 || localStorage.getItem("email")=="") {
		
		window.location.href = "Login.html";
		
	}
	
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	
	$(".spinner").show();
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
		$('#noconn').hide();
		
		localStorage.setItem("risppass44", "")
		localStorage.setItem("chatpass", "")
		
		$("#imgutente").attr("src","http://www.msop.it/public/rides/"+localStorage.getItem("fotoprof")+"");
		$("#imgfoto").attr("src","http://www.msop.it/public/rides/"+localStorage.getItem("fotoprof")+"");
		
		startgps();
		
		//var lat = localStorage.getItem("lat");
		//var lng = localStorage.getItem("lng");
		
		//var lat = "41.783780";   //  "41.783780" localStorage.getItem("lat")   "41.8786716"
		//var lng = "12.364947";   //  "12.364947" localStorage.getItem("lng")  "12.4790831"
		
		//localStorage.setItem("lat", lat)
		//localStorage.setItem("lng", lng)
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0, so always add + 1
		
		var ora = today.getHours()
		if(ora<10){ora="0"+ora}
		
		var minuti = today.getMinutes();
		if(minuti<10){minuti="0"+minuti}
		
		var secondi = today.getSeconds();
		if(secondi<10){secondi="0"+secondi}
		
		
		var yyyy = today.getFullYear();
		if(dd<10){dd="0"+dd}
		if(mm<10){mm="0"+mm}
		today = dd+'/'+mm+'/'+yyyy;
		
		$("#stamp").html(yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00");
		var ora_cell = yyyy+"-"+mm+"-"+dd+" "+ora+":"+minuti+":00";
		
		localStorage.setItem("ora_cell", ora_cell);
        
        
		$("#nickmio").html("<font color='#000'><b>" + localStorage.getItem("nick") + "</b></font>")
		
		$(".spinner").hide();
		
		localStorage.setItem("scroller","0");
		vediofferte44()
		
		$("#spinner44").show();
        
		/*refreshPos = setInterval(function() {
			controllaofferte()
		}, 7000);*/
		
		
		/*function initialize() {
			var mapProp = {
			center:new google.maps.LatLng(41.783780,12.364947),
			zoom:5,
			mapTypeId:google.maps.MapTypeId.ROADMAP
			};
			var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		}
		
		google.maps.event.addDomListener(window, 'load', initialize);*/
		
	}
	
	else{
		navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		
		
		//window.location.href = "index.html";
		
		
	}

	
	
	//localStorage.setItem("lat", "41.889191")
	//localStorage.setItem("lng", "12.492475")
	
	
	var altezzatbl = getRealContentHeight()-80;
	var height = getRealContentHeight()-80;
	$("#tblhome").attr("height",height);
	$("#tblhome3").attr("height",height);
	
	
	
	if (localStorage.getItem("veicolo") === null || localStorage.getItem("veicolo")=="null" || typeof(localStorage.getItem("veicolo")) == 'undefined' || localStorage.getItem("veicolo")==0 || localStorage.getItem("veicolo")=="") {
		
		localStorage.setItem("veicolo", "6");
		
	}
	
	
	IDPage = getParameterByName('id');
	ODPage = getParameterByName('od');
	
	
	localStorage.setItem("palla1", "0")
	localStorage.setItem("palla2", "0")
	
	if(IDPage!=1){
	  localStorage.setItem("exit", "0")
	}
	
	//$("#tblhome").html('<table id="tblhome" width="90%" height="'+ altezzatbl +'" border="0" valign="center" align="center" class="tabella"><tr height="48%"><td width="100%" align="center"><a id="mappa6" href="#" rel="external"><img src="img/Volante.png" width="120px"></a><p class="testo_sottotitolo">voglio essere autista</p><table><tr><td><table id="profiloperc" class="tabella1"><tr><td><font color="#FFF" size="4" class="testo_bianco">Profilo '+ localStorage.getItem("perc_autista") +'%</font></td></tr></table></td><td><div id="stelleautista"></div></td></tr></table></td></tr><tr height="2%"><td width="70%" align="center"><hr></td></tr><tr height="48%"> <td width="100%" align="center"><a id="mappa7" href="#" rel="external"><img src="img/Valigia.png" width="120px"></a><p class="testo_sottotitolo">voglio essere passeggero</p><table><tr><td><table id="profiloperc2" class="tabella1"><tr><td><font color="#FFF" size="4" class="testo_bianco">Profilo '+ localStorage.getItem("perc_pass") +'%</font></td></tr></table></td><td><div id="stellepass"></div></td></tr></table></td> </tr><tr height="10%"> <td width="100%" align="center"></td></tr></table>')
	
	//$("#tblhome").html('')
	
	$("#nickhome").html(localStorage.getItem("nick"));
	$("#nickhome3").html(localStorage.getItem("nick"));
	
	
	setTimeout(function() {
	  $("#tblhome").fadeIn(1500)
	}, 500);
	
	
	
	//STELLE
	

	
	
	isTabHolded=false;
	

	var map;
	var refreshIntervalId;
	var refreshIntervalId33;
	var refreshPos;
	var prefi2000;
	var item1;
	var item2;
	var item3;
	var variabile;
	
	var nick1;
	var quando1;
	var ora1;
	var partenza1;
	var arrivo1;
	var distanza1;
	var stato1;
	var lat1;
	var lng1;
	var cod1;
	
	var nick2;
	var quando2;
	var ora2;
	var partenza2;
	var arrivo2;
	var distanza2;
	var stato2;
	var lat2;
	var lng2;
	var cod2;
	
	var nick3;
	var quando3;
	var ora3;
	var partenza3;
	var arrivo3;
	var distanza3;
	var stato3;
	var lat3;
	var lng3;
	var cod3;
	
	var muoviti;
	var setGPS;
	localStorage.setItem("setGPS","0")
	localStorage.setItem("muoviti","1")
	
	var watchID = null;
	var watchID2 = null;
	var watchID5 = null;
	
	var myScroll;
	
	setTimeout (function(){
		$("#footer").fadeIn();
	}, 500);
	
	
	$(document).on("tap", "#altro", function(e){
                   
		$("#btnpanel").click();
                   
	});
	
	
	// PER FOTOCAMERA //
	
	$(document).on("tap", "#prendifoto", function(e){
				   
		navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
		targetWidth: 200,
		targetHeight: 200
		});
	});
	
	$(document).on("tap", "#scattafoto", function(e){
				   
				   navigator.camera.getPicture(Successo, onFail, { quality: 30,
											   destinationType: Camera.DestinationType.DATA_URL,
											   encodingType: Camera.EncodingType.PNG,
											   targetWidth: 200,
											   targetHeight: 200
											   });
	});
	
	
	function Successo(imageData) {
		
		localStorage.setItem("Foto1", "data:image/png;base64," + imageData);
		
		var image000 = document.getElementById('imgfoto');
		image000.src = localStorage.getItem("Foto1");
		
		//salvafoto("Sridesv2")
		
	}
	
	
	function onFail(message) {
		navigator.notification.alert(
									 'Nessuna foto archiviata',  // message
									 alertDismissed,         // callback
									 'Foto',            // title
									 'OK'                  // buttonName
									 );
	}
	
	function onPhotoURISuccess(imageURI) {
		// Uncomment to view the image file URI
		// console.log(imageURI);
		// Get image handle
		//
		var largeImage = document.getElementById('imgfoto');
		// Unhide image elements
		//
		largeImage.style.display = 'block';
		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		largeImage.src = imageURI;
	}
	
	function uploadPhoto(imageURI) {
		var largeImage = document.getElementById('imgfoto');
		// Unhide image elements
		//
		largeImage.style.display = 'block';
		// Show the captured photo
		// The inline CSS rules are used to resize the image
		//
		largeImage.src = imageURI;
		
		
		var options = new FileUploadOptions();
		options.fileKey="file";
		
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		
		var params = {};
		params.value1 = localStorage.getItem("nomefoto");
		params.value2 = "param";
		
		options.params = params;
		
		var ft = new FileTransfer();
		ft.upload(imageURI, encodeURI("http://msop.it/uploadrides.php"), win, fail, options);
	}
	
	function win(r) {
		console.log("Code = " + r.responseCode);
		console.log("Response = " + r.response);
		console.log("Sent = " + r.bytesSent);
		//alert(r.response);
		
	}
	
	function fail(error) {
		alert("An error has occurred: Code = " + error);
	}

	/// FINE FOTOCAMERA ///
	
	
	
	$(document).on("tap", "#gofacebook", function(e){
				   
			var ref = window.open('https://m.facebook.com/RideShareApp/?fref=ts', '_system', 'location=no');
				   

	});
	
	
	$(document).on("tap", "#exitapp", function(e){
		
		for(i=0; i<10000; i++)
		{
			window.clearInterval(i);
		}
				   
				   navigator.notification.confirm(
							'Confermi di voler chiudere',  // message
							onConfirm2,              // callback to invoke with index of button pressed
							'Exit',            // title
							'Si,No'      // buttonLabels
					);
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
		
	});
	
	function onConfirm2(button) {
		if(button==1){    //If User selected No, then we just do nothing
			localStorage.setItem("email", "");
			localStorage.setItem("emailpass", "");
			
			for(i=0; i<10000; i++)
			{
				window.clearInterval(i);
		    }
			
			navigator.app.exitApp();
			
			//navigator.device.exitApp();
			
			e.stopImmediatePropagation();
			
			e.preventDefault();
			
			return false;
		}
		
	}
	
	$(document).on("tap", "#navigazione", function(e){
		var lat = localStorage.getItem("lat");
		var lng = localStorage.getItem("lng");
		
		//launchnavigator.navigate([41.782212,12.365780], {
		  //start: ""+ lng +", "+ lat +""
		//};
				   
		launchnavigator.navigate("London, UK", {
			start: "Manchester, UK"
		});
				   
				   
	});
	
	
	$(document).on("tap", "#profiloperc", function(e){
				   
		  var ref = window.open('http://www.purplemiles.com/www/profile.php?id=19&pm=96e79218965eb72c92a549dd5a330112', '_system', 'location=no');
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#profiloperc2", function(e){
				   
		  var ref = window.open('http://www.purplemiles.com/www/profile.php?id=19&pm=96e79218965eb72c92a549dd5a330112', '_system', 'location=no');
				   
	   	  e.stopImmediatePropagation();
				   
		  e.preventDefault();
				   
		  return false;
				   
		  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("touchstart", "#lista", function(e){
				   lista5();
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	$(document).on("touchstart", "#pass1", function(e){
				   richiesta1()
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	$(document).on("touchstart", "#pass2", function(e){
				   richiesta2()
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	$(document).on("touchstart", "#pass3", function(e){
				   richiesta3()
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("touchstart", "#accettatime", function(e){ accetta11() });
	$(document).on("touchstart", "#rifiuta1", function(e){ rifiuta1() });
	
	$(document).on("touchstart", "#accettatime2", function(e){ accetta22() });
	$(document).on("touchstart", "#rifiuta2", function(e){ rifiuta2() });
	
	$(document).on("touchstart", "#accettatime3", function(e){ accetta33() });
	$(document).on("touchstart", "#rifiuta3", function(e){ rifiuta3() });

	
	$(document).on("tap", "#ric1", function(e){
		magia3()
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});

	
	$(document).on("touchstart", "#esci", function(e){

				   $("#pass1").hide();
				   $("#pass2").hide();
				   $("#pass3").hide();
				   $("#esci").hide();
				   
				   $("#blob2").hide();
				   
				   for(i=0; i<10000; i++)
				   {
				     window.clearInterval(i);
				   }
				   
				   resetta1(1);

   });
	
	$(document).on("touchstart", "#btnGPS", function(e){
				   //localStorage.setItem("btnGPS", "1")
				   setGPS = 0;
				   localStorage.setItem("setGPS","0")
				   
				   $("#modificastart").hide();
				   $("#modificastart2").hide();
				   
				   $("#btnGPS").removeClass("custom-btn3").addClass("custom-btnGPS");
				   $("#Modifica").removeClass("custom-btnModifica").addClass("custom-btn3");
				   
				   
				   buttongps();
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("touchstart", "#Modifica", function(e){
				   //localStorage.setItem("btnGPS", "1")
				   setGPS = 1;
				   localStorage.setItem("setGPS","1")
				   
				   
				   document.getElementById("modificastart").value = "";
				   $("#modificastart").show();
				   $("#modificastart2").show();
				   
				   $("#btnGPS").removeClass("custom-btnGPS").addClass("custom-btn3");
				   $("#Modifica").removeClass("custom-btn3").addClass("custom-btnModifica");
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	
	$(document).on("touchstart", "#ritorna", function(e){
		$.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
		
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("touchstart", "#ritorna5", function(e){
				   $.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("touchstart", "#bckimpostazioni", function(e){
                   
		           $.mobile.changePage( "#home", { transition: "slide", changeHash: false, reverse: true });
				   //window.location.href = "index.html";
				   
				   $("#imgutente").attr("src","http://www.msop.it/public/rides/"+localStorage.getItem("fotoprof")+"");
				   $("#imgfoto").attr("src","http://www.msop.it/public/rides/"+localStorage.getItem("fotoprof")+"");
                   
                   vediofferte44();
                   $("#spinner44").show();
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
    
	
	$(document).on("touchstart", "#indietro44", function(e){
			$("#tblchat").hide()
			$.mobile.changePage( "#home", { transition: "slide", changeHash: false, reverse: true });
				   
			for(i=0; i<10000; i++)
			{
				window.clearInterval(i);
			}
				   
				   
			e.stopImmediatePropagation();
				   
			e.preventDefault();
				   
			return false;
			
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
		});
	
	
	$(document).on("touchstart", "#indietro4", function(e){
				   $("#tblchat").hide()
				   $.mobile.changePage( "#home", { transition: "slide", changeHash: false, reverse: true });
				   
				   for(i=0; i<10000; i++)
				   {
				   window.clearInterval(i);
				   }
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
		});
	
	$(document).on("touchstart", "#indietro6", function(e){
				   $("#tblchat").hide()
				   $.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
				   
				   for(i=0; i<10000; i++)
				   {
				   window.clearInterval(i);
				   }
				   
				   resetta1(1);
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
    
	$(document).on("touchstart", "#resetta", function(e){
		window.location.href = "index.html";
	});
	
	
	
	$(document).on("touchstart", "#offripassaggio", function(e){
		window.location.href = "mappass.html";
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	
	$(document).on("touchstart", "#mappa7", function(e){
		window.location.href = "mappass.html";
		
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	
	$(document).on("tap", "#mappa6", function(e){
				   
	  var connectionStatus = false;
	  connectionStatus = navigator.onLine ? 'online' : 'offline';
				   
	  if(connectionStatus=='online'){
		
		resetta1();
	  }
	  else
	  {
		//window.location.href = "index.html";
	  }
				   
	  e.stopImmediatePropagation();
				   
	  e.preventDefault();
				   
	 return false;
				   
	 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   
	});
	
	
	
	$(document).on("tap", "#offerte48", function(e){
				   
		//$.mobile.changePage( "#home44", { transition: "slide", changeHash: false });
				   
		vediofferte44()
		$("#spinner44").show();
				   
		e.stopImmediatePropagation();
				   
		e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	
	$(document).on("touchstart", "#offerte", function(e){
			$.mobile.changePage( "#home2", { transition: "slide", changeHash: false });
				   
				   
			vediofferte()
			$("#spinner2").show();
			
			e.stopImmediatePropagation();
				   
			e.preventDefault();
				   
			return false;
				   
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	

	$(document).on("touchstart", "#impostazioni", function(e){
		$.mobile.changePage( "#home3", { transition: "slide", changeHash: false });
				   
				   var connectionStatus = false;
				   connectionStatus = navigator.onLine ? 'online' : 'offline';
				   
				   if(connectionStatus=='online'){
				   
				      $("#imgfoto").attr("src","http://www.msop.it/public/rides/"+localStorage.getItem("fotoprof")+"");

				   }

				   
                   $("#spinner3").show();
				   $.ajax({
						  type:"GET",
						  url:"http://msop.it/rides/leggi_impostazioni.php?id_autista="+ localStorage.getItem("id_autista") +"",
						  contentType: "application/json",
						  //data: {ID: "Lazio"}, LIMIT 10
						  timeout: 7000,
						  jsonp: 'callback',
						  crossDomain: true,
						  success:function(result){
						  
						  $.each(result, function(i,item){
								 
								 if(item.Token==1){
                                 
                                 if(parseFloat(item.quante)>=0 && parseFloat(item.quante)<=49){
                                    //alert(item.quante)
                                    $("#status1").html("<font color='#000'><b>Esperienza: Decano</b></font>")
                                 }
                                 else if(parseFloat(item.quante)>=49 && parseFloat(item.quante)<=99){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Centurione</font>")
                                 }
                                 else if(parseFloat(item.quante)>=100&& parseFloat(item.quante)<=149){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Centurione Major</font>")
                                 }
                                 else if(parseFloat(item.quante)>=150 && parseFloat(item.quante)<=199){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Tribuno</font>")
                                 }
                                 else if(parseFloat(item.quante)>=200 && parseFloat(item.quante)<=249){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Prefetto </font>")
                                 }
                                 else if(parseFloat(item.quante)>=250 && parseFloat(item.quante)<=349){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Legato</font>")
                                 }
                                 else if(parseFloat(item.quante)>=350 && parseFloat(item.quante)<=499){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Generale</font>")
                                 }
                                 else if(parseFloat(item.quante)>=500){
                                    $("#status1").html("<font color='#000'><b>Esperienza: Imperatore</font>")
                                 }
                                 else{}
								 
								  $("#nickname0").html("<font color='#000'><b>Feed</b> ("+ item.quante +")</font>")
								  $("#credito").html("<font color='#000'>Credito Passeggero: <b>"+ item.credito +" Euro</b></font>")
								 
								  document.getElementById("nome").value = item.nome
								  document.getElementById("cognome").value = item.cognome
								  $("#anno_nascita").append("<option value='"+ item.anno_nascita +"' selected>"+ item.anno_nascita +"</option>")
								  $("#anno_nascita").selectmenu('refresh');
								 
                                  document.getElementById("veicolo").value = item.veicolo
                                  document.getElementById("cell").value = item.cell
                                  document.getElementById("patente").value = item.patente
                                  document.getElementById("patentemese").value = item.patentemese
								 
								 //alert(item.patenteanno)
								 
								 $("#patenteanno").append("<option value='"+ item.patenteanno +"' selected>"+ item.patenteanno +"</option>")
								 $("#patenteanno").selectmenu('refresh');
								 //document.getElementById("patenteanno").value = item.patenteanno
								 
								 if(parseInt(item.rating)==0){
								 $("#stelle0").html("<img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if(parseInt(item.rating)==1){
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==2) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==3) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==4) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==5) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'>")
								 }
                                 
								 
                                 if(item.fumatori=="Si"){
								   var elm = document.getElementById('fumatori');
								   elm.click();
                                 }
                                 
                                 if(item.animali=="Si"){
                                   var elm = document.getElementById('animali');
                                   elm.click();
                                 }

                                 
                                 $("#spinner3").hide();
                                 
								 }
								 else{
								 navigator.notification.alert(
															  'Impossibile elaborare la richiesta.',  // message
															  alertDismissed,         // callback
															  'Attenzione',           // title
															  'Oks'                  // buttonName
															  );
								 
								 }
								 });
						  
						  
						  },
						  error: function(){
						  
						  navigator.notification.alert(
													   'Possibile errore di rete, riprova tra qualche minuto.',  // message
													   alertDismissed,         // callback
													   'Attenzione',           // title
													   'Done'                  // buttonName
													   );
						  
						  },
						  dataType:"jsonp"});
				   
			e.stopImmediatePropagation();
				   
			e.preventDefault();
				   
			return false;
				   
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("touchstart", "#impostazioni2", function(e){
				   $.mobile.changePage( "#home3", { transition: "slide", changeHash: false });
				   
				   $.ajax({
						  type:"GET",
						  url:"http://msop.it/rides/leggi_impostazioni.php?id_autista="+ localStorage.getItem("id_autista") +"",
						  contentType: "application/json",
						  //data: {ID: "Lazio"}, LIMIT 10
						  timeout: 7000,
						  jsonp: 'callback',
						  crossDomain: true,
						  success:function(result){
						  
						  $.each(result, function(i,item){
								 
								 if(item.Token==1){
								 
								 $("#nickname0").html("<font color='#000'><b>Feed</b> ("+ item.quante +")</font>")
								 $("#credito").html("<font color='#000'>Credito Passeggero: <b>"+ item.credito +" Euro</b></font>")
								 document.getElementById("nome").value = item.nome
								 document.getElementById("cognome").value = item.cognome
								 $("#anno_nascita").append("<option value='"+ item.anno_nascita +"' selected>"+ item.anno_nascita +"</option>")
								 $("#anno_nascita").selectmenu('refresh');
								 
								 document.getElementById("veicolo").value = item.veicolo
								 document.getElementById("cell").value = item.cell
								 document.getElementById("patente").value = item.patente
								 document.getElementById("patentemese").value = item.patentemese
								 
								 //alert(item.patenteanno)
								 
								 $("#patenteanno").append("<option value='"+ item.patenteanno +"' selected>"+ item.patenteanno +"</option>")
								 $("#patenteanno").selectmenu('refresh');
								 //document.getElementById("patenteanno").value = item.patenteanno
								 
								 if(parseInt(item.rating)==0){
								 $("#stelle0").html("<img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if(parseInt(item.rating)==1){
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==2) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==3) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==4) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starunselected.png' width='24'>")
								 }
								 else if (parseInt(item.rating)==5) {
								 $("#stelle0").html("<img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'><img src='img/starselected.png' width='24'>")
								 }
								 
								 if(item.fumatori=="Si"){
								 var elm = document.getElementById('fumatori');
								 elm.click();
								 }
								 
								 if(item.animali=="Si"){
								 var elm = document.getElementById('animali');
								 elm.click();
								 }
								 
								 
								 }
								 else{
								 navigator.notification.alert(
															  'Impossibile elaborare la richiesta.',  // message
															  alertDismissed,         // callback
															  'Attenzione',           // title
															  'Oks'                  // buttonName
															  );
								 
								 }
								 });
						  
						  
						  },
						  error: function(){
						  
						  navigator.notification.alert(
													   'Possibile errore di rete, riprova tra qualche minuto.',  // message
													   alertDismissed,         // callback
													   'Attenzione',           // title
													   'Done'                  // buttonName
													   );
						  
						  },
						  dataType:"jsonp"});
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   });
	
	
	
	$(document).on("tap", "#tornareset", function(e){
				   
				   var connectionStatus = false;
				   connectionStatus = navigator.onLine ? 'online' : 'offline';
				   
				   if(connectionStatus=='online'){
				   
				   $("#magia").hide();
				   
				   resetta1(1);
				   }
				   else
				   {
				   window.location.href = "index.html";
				   }
				   
	    e.stopImmediatePropagation();
				   
	    e.preventDefault();
				   
		return false;
				   
		if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   
	});
	
	$(document).on("tap", "#ChiudiXX2", function(e){
				   
				   $("#blobstart").hide();
				   

				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	$(document).on("tap", "#ChiudiXX", function(e){
				   
				   $("#blobstart").show();
				   

				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	
	$(document).on("tap", "#termini", function(e){
				   var ref = window.open('http://www.msop.it/3rides/termini.pdf', '_blank', 'location=no');
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	
	$(document).on("tap", "#mandaemail", function(e){
				   
			window.plugin.email.open({
				to:      "rides.share.app@gmail.com",
				subject: "Contattaci",
				body:    "Richiedi informazioni",
				isHtml:  true
			});
				   
				   
	});
	
	
	$(document).on("tap", "#logout", function(e){
				   navigator.notification.confirm(
												  'Vuoi disconnetterti '+ localStorage.getItem("nick") +'',  // message
												  onConfirm,              // callback to invoke with index of button pressed
												  'Logout',            // title
												  'Conferma,Annulla'      // buttonLabels
												  );
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
				   });
	
	function onConfirm(button) {
		if(button==1){    //If User selected No, then we just do nothing
			localStorage.setItem("email", "");
			localStorage.setItem("emailpass", "");
			localStorage.setItem("patente", "");
			window.location.href = "Login.html";
			
			return;
		}
		/*}else{
			e.preventDefault();
			navigator.app.exitApp();
			
			localStorage.setItem("email", "");
			localStorage.setItem("emailpass", "");
			window.location.href = "Login.html";
			alert(1)
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
		}*/
	}
	
	$(document).on("tap", "#XXX", function(e){
		window.location.href = "index.html";
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("tap", "#XX3", function(e){
		$.mobile.changePage ($("#win2"));
	    resetta1(1);
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("touchstart", "#inizia", function(e){
				   
				   if(localStorage.getItem("setGPS") == 1){
				   
				     if (document.getElementById("modificastart").value == "") {
				         navigator.notification.alert(
												'inserire Indirizzo Valido o usare il GPS',  // message
												alertDismissed,         // callback
												'Indirizzo',            // title
												'OK'                  // buttonName
												);
				   
				         return;
				       }
				   }
				   
				   start();
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	$(document).on("touchstart", "#back3", function(e){
				   
			if (document.getElementById("veicolo").value == "") {
				   navigator.notification.alert(
												'inserire un veicolo',  // message
												alertDismissed,         // callback
												'Veicolo',            // title
												'OK'                  // buttonName
												);
				   return;
			}
				   
				   if (document.getElementById("cell").value == "") {
				   navigator.notification.alert(
												'inserire un cellulare',  // message
												alertDismissed,         // callback
												'Cellulare',            // title
												'OK'                  // buttonName
												);
				   return;
				   }
				   
				   if (document.getElementById("nome").value == "") {
				   navigator.notification.alert(
												'inserire un Nome',  // message
												alertDismissed,         // callback
												'Nome',            // title
												'OK'                  // buttonName
												);
				   return;
				   }
				   
				   if (document.getElementById("cognome").value == "") {
				   navigator.notification.alert(
												'inserire un Cognome',  // message
												alertDismissed,         // callback
												'Cognome',            // title
												'OK'                  // buttonName
												);
				   return;
				   }
                   
                   if (document.getElementById("patente").value == "") {
                     navigator.notification.alert(
                                                'inserire un numero di patente',  // message
                                                alertDismissed,         // callback
                                                'Veicolo',            // title
                                                'OK'                  // buttonName
                                                );
                     return;
                   }
				   
				   if (document.getElementById("patente").value == "0") {
				   navigator.notification.alert(
												'inserire un numero di patente',  // message
												alertDismissed,         // callback
												'Veicolo',            // title
												'OK'                  // buttonName
												);
				   return;
				   }
				   
		
			if (document.getElementById('fumatori').checked) {
				var fumatori = "Si";
			}
			else{
				var fumatori = "No";
			}
				   
			if (document.getElementById('animali').checked) {
				var animali = "Si";
			}
			else{
				var animali = "No";
			}
				   
				   //alert("http://msop.it/rides/check_impostazioni.php?id_autista="+ localStorage.getItem("id_autista") +"&veicolo="+ document.getElementById("veicolo").value +"&fumatori="+ fumatori +"&animali="+ animali +"")
                   
                   localStorage.setItem("patente", document.getElementById("patente").value);
				   
				   if (localStorage.getItem("nomefoto") === null || localStorage.getItem("nomefoto")=="null" || typeof(localStorage.getItem("nomefoto")) == 'undefined' || localStorage.getItem("nomefoto")==0 || localStorage.getItem("nomefoto")=="") {
				   
				       nomefoto = "default.png";
				   
				   }
				   else{
					  nomefoto = localStorage.getItem("nomefoto")+".jpg";
				   }
				   
				   
				   $.ajax({
						  type:"GET",
						  url:"http://msop.it/rides/check_impostazioni.php?id_autista="+ localStorage.getItem("id_autista") +"&veicolo="+ document.getElementById("veicolo").value +"&fumatori="+ fumatori +"&animali="+ animali +"&cell="+ document.getElementById("cell").value +"&patente="+ document.getElementById("patente").value +"&patentemese="+ document.getElementById("patentemese").value +"&patenteanno="+ document.getElementById("patenteanno").value +"&nome="+ document.getElementById("nome").value +"&cognome="+ document.getElementById("cognome").value +"&anno_nascita="+ document.getElementById("anno_nascita").value +"&foto="+ nomefoto +"",
						  contentType: "application/json",
						  //data: {ID: "Lazio"}, LIMIT 10
						  timeout: 7000,
						  jsonp: 'callback',
						  crossDomain: true,
						  success:function(result){
						  
						  $.each(result, function(i,item){
								 
								 if(item.Token==1){
								 
								 localStorage.setItem("fotoprof", nomefoto);
								 
								  navigator.notification.alert(
															  'Modifica eseguita.',  // message
															  alertDismissed,         // callback
															  'Impostazioni',           // title
															  'Ok'                  // buttonName
															  );
								 
								   e.stopImmediatePropagation();
								 
								   e.preventDefault();
								 
								 
								 }
								 else{
								 navigator.notification.alert(
															  'Impossibile elaborare la richiesta.',  // message
															  alertDismissed,         // callback
															  'Attenzione',           // title
															  'Oks'                  // buttonName
															  );
								 
								 }
								 });
						  
						  
						  },
						  error: function(){
						  
						  navigator.notification.alert(
													   'Possibile errore di rete, riprova tra qualche minuto.',  // message
													   alertDismissed,         // callback
													   'Attenzione',           // title
													   'Done'                  // buttonName
													   );
						  
						  },
						  dataType:"jsonp"});
				   
				   
				   
			e.stopImmediatePropagation();
				   
			e.preventDefault();
			
			return false;
				   
			if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	

	
	$(document).on("tap", "#back4", function(e){
		inviopasseggero(3);
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("tap", "#back6", function(e){
				   $("#spinner6").show();
				   
				   inviachat()
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				   
	});
	
	$(document).on("tap", "#xchiudi", function(e){
		chiudix();
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	
	$(document).on("tap", "#gratis", function(e){
		          inviopasseggero(1);
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("tap", "#offerta", function(e){
		           inviopasseggero(2);
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	
	$(document).on("touchstart", "#ricarica", function(e){
		centragps();
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
	});
	

	if(IDPage==1){
		resetta1(1);
	}
	
	$(document).keydown(function (eventObj){
		getKey(eventObj);
    });
	

	
	if(IDPage==2){
		window.location.href = "#win2";
		resetta2();
	}
}
	
}

function gpsonSuccess(position){
	
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;

	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)

	
	//alert()
	
	alert('Latitude: '          + position.coords.latitude          + '\n' +
	 'Longitude: '         + position.coords.longitude         + '\n' +
	 'Altitude: '          + position.coords.altitude          + '\n' +
	 'Accuracy: '          + position.coords.accuracy          + '\n' +
	 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
	 'Heading: '           + position.coords.heading           + '\n' +
	 'Speed: '             + position.coords.speed             + '\n' +
	 'Timestamp: '         + position.timestamp                + '\n');
	
	
	//$("#distanza").html("<span style = 'font-size: 18px;'>"+ position.coords.speed +","+ position.coords.heading  +"</span>");
	
	//var lat = "41.889191";
	//var lng = "12.492475";
	
	
}

function gpsonError(){
	
	navigator.notification.alert(
								 'Possibile errore GPS, assicurati di avere il gps del telefono attivato.',  // message
								 alertDismissed,         // callback
								 'Attenzione',           // title
								 'Done'                  // buttonName
								 );
	
	var lat = "41.889191";
	var lng = "12.492475";
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
}

function chiama(km) {
	alert(km)
}

function CenterControl(controlDiv, map) {
	
	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'transparent';
	controlUI.style.border = '0px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 0px 0px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlUI.style.height = '60px';
	controlUI.style.width = '320px';
	//controlUI.style.display = 'none';
	controlDiv.appendChild(controlUI);
	
	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.lineHeight = '30px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '<br><table width="100%" border="0"><tr><td align="right" colspan="2"><a id="XXX" href="#" rel="external"><img src="img/xx.png" width="35px"></a></td></tr><tr><td align="center" width="25%"><a id="btnGPS" href="#" data-role="button" data-theme="b" class="custom-btnGPS"><font color="#fff"><b>GPS</b></font></a></td><td align="left" width="75%"><a id="Modifica" href="#" data-role="button" data-theme="b" class="custom-btn3"><font color="#fff"><b>Modifica<b></font></a></td></tr></table>';
	controlUI.appendChild(controlText);
	
	//<input id="viale" name="viale" type="text" value="'+ localStorage.getItem("Via") +'">
	//var g = document.createElement('div');
	//g.id ='sopra':
	//controlUI.appendChild(g);
	// Setup the click event listeners: simply set the map to Chicago.
	//controlUI.addEventListener('click', function() {
		//alert();
		//map.setCenter(chicago);
	//});
	
}

function CenterControl2(controlDiv, map) {
	
	// Set CSS for the control border.
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = 'transparent';
	controlUI.style.border = '0px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 0px 0px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlUI.style.height = '60px';
	controlUI.style.width = '320px';
	//controlUI.style.display = 'none';
	controlDiv.appendChild(controlUI);
	
	// Set CSS for the control interior.
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '12px';
	controlText.style.lineHeight = '30px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = '<br><table width="100%" border="0"><tr><td align="right"><a id="XXX" href="index.html" rel="external"><img src="img/xx.png" width="35px"></a></td></tr></table>';
	controlUI.appendChild(controlText);
	
	//<input id="viale" name="viale" type="text" value="'+ localStorage.getItem("Via") +'">
	//var g = document.createElement('div');
	//g.id ='sopra':
	//controlUI.appendChild(g);
	// Setup the click event listeners: simply set the map to Chicago.
	//controlUI.addEventListener('click', function() {
	//alert();
	//map.setCenter(chicago);
	//});
	
}



function onSuccess555(position) {
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	var latlng = new google.maps.LatLng(lat, lng);
	
	marker2.setPosition(latlng);
	
	map.panTo(latlng);
	
}


function onError555(error) {
	//var watchID = navigator.geolocation.watchPosition(onSuccess2, onError3, { timeout: 80000 });
	//navigator.geolocation.watchPosition(onSuccess555, onError565, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
}

function onError565(error) {
	
	//window.location.href = "index.html";
}


function buttongps(){
	
	var watchID15 = navigator.geolocation.getCurrentPosition(onSuccess555, onError555, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	
}



// START GPS

function onSuccess55(position) {
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	
	//alert(lat)
	
}


function onError55(error) {
	//var watchID = navigator.geolocation.watchPosition(onSuccess2, onError3, { timeout: 80000 });
	navigator.geolocation.watchPosition(onSuccess55, onError56, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
}

function onError56(error) {
	
	//window.location.href = "index.html";
}


function startgps(){
	//ATTIVARE
	
	var watchID1 = navigator.geolocation.getCurrentPosition(onSuccess55, onError55, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	
	//var lat = "41.770447";  //  "41.783780"  "41.783780" localStorage.getItem("lat")
	//var lng = "12.373529";  //  "12.364947"  "12.364947" localStorage.getItem("lng")
	//localStorage.setItem("lat", lat);
	//localStorage.setItem("lng", lng);
	
}


// CENTRA MAP ------------------------------

function onSuccess5(position) {
	
	var icon = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
	marker2.setIcon(icon);
	
	var posizione = Math.round(position.coords.heading);
	
	if((posizione > 0)&&(posizione <= 10)){
		var icon = new google.maps.MarkerImage("img_autista/car_010.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 10)&&(posizione <= 20)){
		var icon = new google.maps.MarkerImage("img_autista/car_020.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 20)&&(posizione <= 30)){
		//$("#rispondi").html("<img src='img_autista/car_030.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_030.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 30)&&(posizione <= 40)){
		//$("#rispondi").html("<img src='img_autista/car_040.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_040.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 40)&&(posizione <= 50)){
		//$("#rispondi").html("<img src='img_autista/car_050.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_050.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 50)&&(posizione <= 60)){
		//$("#rispondi").html("<img src='img_autista/car_060.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_060.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 60)&&(posizione <= 70)){
		//$("#rispondi").html("<img src='img_autista/car_070.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_070.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 70)&&(posizione <= 80)){
		//$("#rispondi").html("<img src='img_autista/car_080.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_080.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 80)&&(posizione <= 90)){
		//$("#rispondi").html("<img src='img_autista/car_090.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_090.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 90)&&(posizione <= 100)){
		//$("#rispondi").html("<img src='img_autista/car_100.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_100.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 100)&&(posizione <= 110)){
		//$("#rispondi").html("<img src='img_autista/car_110.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_110.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 110)&&(posizione <= 120)){
		//$("#rispondi").html("<img src='img_autista/car_120.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_120.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 120)&&(posizione <= 130)){
		//$("#rispondi").html("<img src='img_autista/car_130.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_130.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 130)&&(posizione <= 140)){
		//$("#rispondi").html("<img src='img_autista/car_140.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_140.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 140)&&(posizione <= 150)){
		//$("#rispondi").html("<img src='img_autista/car_150.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_150.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 150)&&(posizione <= 160)){
		//$("#rispondi").html("<img src='img_autista/car_160.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_160.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 160)&&(posizione <= 170)){
		//$("#rispondi").html("<img src='img_autista/car_170.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_170.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 170)&&(posizione <= 180)){
		//$("#rispondi").html("<img src='img_autista/car_180.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_180.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 180)&&(posizione <= 190)){
		//$("#rispondi").html("<img src='img_autista/car_190.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_190.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 190)&&(posizione <= 200)){
		//$("#rispondi").html("<img src='img_autista/car_200.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_200.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 200)&&(posizione <= 210)){
		//$("#rispondi").html("<img src='img_autista/car_210.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_210.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 210)&&(posizione <= 220)){
		//$("#rispondi").html("<img src='img_autista/car_220.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_220.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 220)&&(posizione <= 230)){
		//$("#rispondi").html("<img src='img_autista/car_230.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_230.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 230)&&(posizione <= 240)){
		//$("#rispondi").html("<img src='img_autista/car_240.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_240.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 240)&&(posizione <= 250)){
		//$("#rispondi").html("<img src='img_autista/car_250.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_250.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 250)&&(posizione <= 260)){
		//$("#rispondi").html("<img src='img_autista/car_260.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_260.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 260)&&(posizione <= 270)){
		//$("#rispondi").html("<img src='img_autista/car_270.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_270.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 270)&&(posizione <= 280)){
		//$("#rispondi").html("<img src='img_autista/car_280.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_280.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 280)&&(posizione <= 290)){
		//$("#rispondi").html("<img src='img_autista/car_290.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_290.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 290)&&(posizione <= 300)){
		//$("#rispondi").html("<img src='img_autista/car_300.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_300.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 300)&&(posizione <= 310)){
		//$("#rispondi").html("<img src='img_autista/car_310.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_310.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 310)&&(posizione <= 320)){
		//$("#rispondi").html("<img src='img_autista/car_320.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_320.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 320)&&(posizione <= 330)){
		//$("#rispondi").html("<img src='img_autista/car_330.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_330.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 330)&&(posizione <= 340)){
		//$("#rispondi").html("<img src='img_autista/car_340.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_340.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else if((posizione > 340)&&(posizione <= 350)){
		//$("#rispondi").html("<img src='img_autista/car_350.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_350.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	else{
		//$("#rispondi").html("<img src='img_autista/car_000.png'>")
		var icon = new google.maps.MarkerImage("img_autista/car_000.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
	}
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	//var lat = localStorage.getItem("lat");
	//var lng = localStorage.getItem("lng");
	var latlng = new google.maps.LatLng(lat, lng);
	
	marker2.setIcon(icon);
	marker2.setPosition(latlng);
	

	//map.setCenter(latlng);
	map.panTo(latlng);
	
	//alert("seguo")

	
}


function onError5(error) {
	//var watchID = navigator.geolocation.watchPosition(onSuccess2, onError3, { timeout: 80000 });
	navigator.geolocation.watchPosition(onSuccess55, onError5, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
}



function test5(position) {
	
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	//alert("Arrivo")
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	
	//var latlng = new google.maps.LatLng(lat, lng);
	
	//map.panTo(latlng);
}


function centragps(){
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	muoviti = 1;
	
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	var latlng = new google.maps.LatLng(lat, lng);
	
	map.panTo(latlng);
	
	if (watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
	}
	
	setTimeout(function() {
	  muoviti = 1;
	  var watchID = navigator.geolocation.watchPosition(onSuccess2, onError2, {maximumAge:600000, timeout:80000, enableHighAccuracy: true});
	}, 2000);
	
	//CLEAR POSITION

	//var watchID = navigator.geolocation.watchPosition(test5, onError5, {maximumAge:600000, timeout:80000, enableHighAccuracy: true});


}

//--------------------------------------------

function getKey(key){
	if ( key == null ) {
		keycode = event.keyCode;
		
	} else {
		keycode = key.keyCode;
	}
	
	if (keycode ==13){
 
     setTimeout(function() {
		inviopasseggero(3);
	 }, 200);
	
	}
	
}

function cambiap() {
    $('#footer').show();
    $.mobile.changePage ($("#home"));
}

function cambiah() {

    window.location.href = "index.html";
    
}

function nodiv() {
	 alert(22);
	 $("#sopra").hide();
	
}

function sidiv() {

	map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
	
}


function alertDismissed() {
    $(".spinner").hide();
}


function codeLatLng(lati,lngi) {
	var geocoder;
	geocoder = new google.maps.Geocoder();
	//var input = "41.875094, 12.478151";
	//var latlngStr = input.split(',', 2);
	var lat = parseFloat(lati);
	var lng = parseFloat(lngi);
	
	localStorage.setItem("lat", lat)
	localStorage.setItem("lng", lng)
	
	
	var latlng = new google.maps.LatLng(lat, lng);
	var indirizzo;
	var Citta;
	
	geocoder.geocode({'latLng': latlng}, function(results, status) {
					 if (status == google.maps.GeocoderStatus.OK) {
					 
					 
					 if (results[0]) {
					 
					 var viadotto = results[0].formatted_address;
					 
					 var mySplitResult = viadotto.split(",");
					 
					 localStorage.setItem("Via", mySplitResult[0].replace(/[0-9]/g, '').replace('-', ''))
					 
					 indirizzo = results[0].formatted_address
					 
					 //self.document.formia.via.value = mySplitResult[0].replace(/[0-9]/g, '').replace('-', '');
					 
					 
					 $(".spinner").hide();
					 
					 
					 }
					 
					 } else {
					 navigator.notification.alert(
												  'Non riesco a rilevare la tua posizione',  // message
												  alertDismissed,         // callback
												  'Attenzione',            // title
												  'OK'                  // buttonName
												  );
					 
					 $(".spinner").hide();
					 
					 
					 }
					 
					 if(results[1]){
					 
						var cittaa = results[1].formatted_address;
						var mySplitResult1 = cittaa.split(",");
					 
						localStorage.setItem("Citta", mySplitResult1[1].replace(/[0-9]/g, ''))
						
						//self.document.formia.citta.value = mySplitResult1[1].replace(/[0-9]/g, '').trim();
						
						citta = mySplitResult1[1].replace(/[0-9]/g, '')
					 
						//return;
						
					 }
					 
					 
					  document.getElementById("modificastart").value = indirizzo;
					  localStorage.setItem("modificastart", indirizzo)
					  localStorage.setItem("modificastartLAT", latlng)
					 
					 
					 });
	
}

function prendivia() {
	
	if (document.getElementById("modificastart").value == "") {
		navigator.notification.alert(
			'inserire Indirizzo Valido o usare il GPS',  // message
			 alertDismissed,         // callback
			 'Indirizzo',            // title
			 'OK'                  // buttonName
		);
		
	  return;
	}
	
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
	"address": document.getElementById("modificastart").value
	}, function(results) {
		//alert(results[0].geometry.location.lat()); //LatLng
		//alert(results[0].geometry.location.lng());
					 
		localStorage.setItem("lat", results[0].geometry.location.lat())
		localStorage.setItem("lng", results[0].geometry.location.lng())
					 
		resetta1(1);
			 
	});
	
}


function funzioneradar() {
$(function() {
  
  var $rad = $('#rad'),
  $obj = $('.obj'),
  deg = 0,
  rad = 75; //   = 321/2
  
  $obj.each(function(){
            var data = $(this).data(),
            pos = {X:data.x, Y:data.y},
            getAtan = Math.atan2(pos.X-rad, pos.Y-rad),
            getDeg = ~~(-getAtan/(Math.PI/180) + 180);
            $(this).css({left:pos.X, top:pos.Y}).attr('data-atDeg', getDeg);
            });
  
  (function rotate() {
   $rad.css({transform: 'rotate('+ deg +'deg)'});
   $('[data-atDeg='+deg+']').stop().fadeTo(0,1).fadeTo(1700,0.2);
   
   // LOOP
   setTimeout(function() {
              deg = ++deg%360;
              rotate();
              }, 25);
   })();
  });
}

function getRealContentHeight() {
	var header = $.mobile.activePage.find("div[data-role='header']:visible");
	var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
	var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
	var viewport_height = $(window).height();
    
	var content_height = viewport_height - header.outerHeight() ;//footer.outerHeight(); -48
	if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
		content_height -= (content.outerHeight() - content.height());
	}
	
	return content_height;
}

function mappatura() {
    $('#footer').hide();
    
    $("#btn").click();
}

function gps() {
    $("#gps2").click();
}

function verificawifi(){
    $("#verifica").click();
}

function onResume() {
	app.initialize();
	
	/*var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){
	
	setTimeout(function() {
		
		for(i=0; i<10000; i++)
		{
		window.clearInterval(i);
		}
			   
	   resetta1(1);
	}, 200);
		
	}
	else{

	}*/
}

function getDistance(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1);
	var a =
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
	Math.sin(dLon/2) * Math.sin(dLon/2)
	;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}


function resetta1(focus) {
	muoviti = 1;
	
	localStorage.setItem("fatto","0")
	
	//PRESS TO MARKER
	$(function(){
   $(document).bind( "taphold", tapholdHandler );
	  //$( "div.box" ).bind( "taphold", tapholdHandler );
	  localStorage.setItem("tappato", "0")
	  
	  
	  function tapholdHandler( event ){
	  $( event.target ).addClass( "taphold" );
	  isTabHolded=true;
	  localStorage.setItem("tappato", "0")
	  }
	});	//----------------
	
	
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
	
	if(connectionStatus=='online'){

	 if(localStorage.getItem("setGPS") == 0){
	   var watchID11 = navigator.geolocation.getCurrentPosition(onSuccess55, onError3, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
		 
		//var lat = "41.770447";  //  "41.783780"  "41.783780" localStorage.getItem("lat")
		//var lng = "12.373529";  //  "12.364947"  "12.364947" localStorage.getItem("lng")
		 
		//localStorage.setItem("lat", lat)
		//localStorage.setItem("lng", lng)
	 }
	
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	
	var latlng = new google.maps.LatLng(lat, lng, 1);
	
	var $content = $("#win2 div:jqmData(role=content)");
    $content.height (getRealContentHeight());
                                                              
	  var options = {
	  zoom : 13,
	  center : latlng,
	  mapTypeId : google.maps.MapTypeId.ROADMAP,
	  scrollwheel	: false,
	  zoomControl: true
  
	  };
		
	  map = new google.maps.Map($content[0], options);
	
	  $.mobile.changePage ($("#win2"));
	  setTimeout(function() {
		 google.maps.event.trigger(map, "resize");
		 map.setCenter(latlng);
	  }, 1000);

	
	var contentString1 =
	
	'<div class="popup">'+
	'<h2> My Pub</h2>'+
	'<p>Example Strasse n.1</b>'+
	'</div>';
	
	var infowindow = new google.maps.InfoWindow({
												content: contentString1,
												maxWidth: 200,
												maxHeight: 150,
												});
		

		
	$(document).on("touchmove", map, function(e){
		muoviti=0;
	    muoviti=0;
	    muoviti=0;
		muoviti=0;
		muoviti=0;
		muoviti=0;
		muoviti=0;
		muoviti=0;
		muoviti=0;
		muoviti=0;
				   
		// CLEAR WATCH 5
		//navigator.geolocation.clearWatch(watchID5);

	});
		
		
	var beaches = [];
	var markers = [];//some array
	var posizione = 1;
	var distanza = "";
	var numero = "";
	
	beaches.push(['Tua Posizione',lat,lng,1,0,0])
	
	//alert("http://purplemiles.com/www2/check_richiesta_autista.php?email="+ localStorage.getItem("email") +"&lat="+ localStorage.getItem("lat") +"&lng="+ localStorage.getItem("lng") +"&id_autista="+ localStorage.getItem("id_autista") +"");
		
		var myLatLng = new google.maps.LatLng(lat, lng, 1);
		
		var gradi = localStorage.getItem("gradi");
		
		//alert(gradi);
		
		var icon = new google.maps.MarkerImage("img/autista.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		//alert(myLatLng + beach[0])
		
		
		marker2 = new google.maps.Marker ({
										  map : map,
										  icon: icon,
										  optimized: false,
										  position : myLatLng,
										  content:'<div class="popup">Tua Posizione</div>',
										  title: '1',
										  //label: ''+ beach[1] +','+ beach[2] +'',
										  zIndex: 100
										  });
		
		google.maps.event.addListener(marker2, 'click', function() {
									  
									  infowindow.setContent(this.content);
									  infowindow.open(map, this);
									  
									  });
		
		var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
		var iconnn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
		
		// marker1.setMap(null);
		
		
		marker1 = new google.maps.Marker ({
										  map : map,
										  icon: iconn,
										  optimized: false,
										  position : myLatLng,
										  //content:'<div class="popup">'+ beach[0] +'<br>Km'+ beach[5] +'<br><a href="#home3">Cliccami</a></div>',
										  title: '',
										  //label: ''+ beach[1] +','+ beach[2] +'',
										  zIndex: -10
										  });
		
		marker3 = new google.maps.Marker ({
										  map : map,
										  icon: iconn,
										  optimized: false,
										  position : myLatLng,
										  //content:'<div class="popup">'+ beach[0] +'<br>Km'+ beach[5] +'<br><a href="#home3">Cliccami</a></div>',
										  title: '',
										  //label: ''+ beach[1] +','+ beach[2] +'',
										  zIndex: -11
										  });
		
		marker4 = new google.maps.Marker ({
										  map : map,
										  icon: iconnn,
										  optimized: false,
										  position : myLatLng,
										  //content:'<div class="popup">'+ beach[0] +'<br>Km'+ beach[5] +'<br><a href="#home3">Cliccami</a></div>',
										  title: '',
										  //label: ''+ beach[1] +','+ beach[2] +'',
										  zIndex: -12
										  });
		
		marker5 = new google.maps.Marker ({
										  map : map,
										  icon: iconnn,
										  optimized: false,
										  position : myLatLng,
										  //content:'<div class="popup">'+ beach[0] +'<br>Km'+ beach[5] +'<br><a href="#home3">Cliccami</a></div>',
										  title: '',
										  //label: ''+ beach[1] +','+ beach[2] +'',
										  zIndex: -12
										  });
		
		
		
			
			/*INSERT TAP PROLUNGATO*/
			
			google.maps.event.addListener(map, 'click', function(e) {
			   placeMarker(e.latLng, map);
										  
				//codeLatLng2(e.latLng)
										  
			});
			
			
			function placeMarker(position, map) {
				
				if(localStorage.getItem("tappato")=="0"){
				  if(localStorage.getItem("setGPS") == 1){
					if (isTabHolded){
						var icon = new google.maps.MarkerImage("img/autista.png", null, null, new google.maps.Point(30, 30), new google.maps.Size(60,60));
						
						marker2.setMap(null);
						
						marker2 = new google.maps.Marker({
								position: position,
								map: map,
								icon: icon,
								content:'<div class="popup">ORA</div>',
								optimized: false
						});
						
						var myLatLng = position;
						var lat = myLatLng.lat();
						var lng = myLatLng.lng();
						
						codeLatLng(lat,lng);
						
						
						isTabHolded=false
						localStorage.setItem("tappato", "1")
					}
				 }
			   }
			}
			
			//---------------------------
		
	if(focus!=1){
		var centerControlDiv = document.createElement('div');
		centerControlDiv.setAttribute('id', 'sopra');
		var centerControl = new CenterControl(centerControlDiv, map);
		
		centerControlDiv.index = 1;
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
	}

		
	if(focus==1){
		$("#btninizia").hide();
		$("#setGPS").hide();
		$("#Modifica").hide();
		$("#lista").hide();
		
		
		var centerControlDiv2 = document.createElement('div');
		centerControlDiv2.setAttribute('id', 'sopra');
		var centerControl2 = new CenterControl2(centerControlDiv2, map);
		
		centerControlDiv2.index = 1;
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv2);
		
		
		$("#pass1").hide();
		$("#pass2").hide();
		$("#pass3").hide();
		$("#esci").hide();
		$("#blob2").hide();
		
		$("#loading").show();
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_richiesta_autistaV2.php?email="+ localStorage.getItem("email") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==3){
				  $("#pass1").hide();
				  $("#pass2").hide();
				  $("#pass3").hide();
				  }
				  
				  
				  if(item.Token==4){
				  $("#pass1").hide();
				  $("#pass2").hide();
				  $("#pass3").hide();
				  //$("#esci").hide();
				  
				  //resetta1(1);
				  
				  
				  marker1.setMap(null);
				  
				  var isVisible3 = marker3.getVisible();
				  if(isVisible3){
				  marker3.setMap(null);
				  }
				  
				  
				  var isVisible4 = marker4.getVisible();
				  if(isVisible4){
				  marker4.setMap(null);
				  }
				  
				  
				  
				  }
				  
				  
				  distanza = getDistance(lat,lng,item.lat,item.lng).toFixed(1);
				  
				  beaches.push(["<h2>"+item.nick+"</h2><br>"+item.partenza,item.lat,item.lng,posizione,item.rating,item.distanza,item.id_pass])
				  
				  
				if(posizione==1){
				  item1 = item.id_richiesta;
				  
				  nick1 = item.nick
				  quando1 = item.quando
				  ora1 = item.ora
				  partenza1 = item.partenza
				  arrivo1 = item.arrivo
				  distanza1 = item.distanza
				  stato1 = item.stato
				  lng1 = item.lng
				  lat1 = item.lat
				  
				  
				  //$("#pass1").show();
				  //$("#esci").show();
				  if(item.posticipata==1){
					$("#lista").show();
				  }
				  
				  if(item.stato==3){
				  $("#pass1").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass1").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  if(item.stato==1){
				  $("#pass1").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass1").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass1").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass1").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  
				  if(item.accettata==1){
				   $("#pass1").removeClass("custom-pass").addClass("custom-pass2");
				   $("#pass1").removeClass("custom-pass1").addClass("custom-pass2");
				   $("#pass1").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  else{
				   $("#pass1").removeClass("custom-pass").addClass("custom-pass1");
				   $("#pass1").removeClass("custom-pass2").addClass("custom-pass1");
				   $("#pass1").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  
				  }

				  
				  var icon = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,50));
				  var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
				  var iconnn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
				  
						// marker1.setMap(null);
				  var myLatLng1 = new google.maps.LatLng(item.lat,item.lng, 1);
				  
				  marker1 = new google.maps.Marker ({
													map : map,
													icon: iconn,
													optimized: false,
													position : myLatLng1,
													content:'<div class="popup">'+item.nick +'<br>Km'+ item.distanza +'</div>',
													title: '1',
													//label: ''+ beach[1] +','+ beach[2] +'',
													zIndex: -1
													});
				  
				}
				  
				if(posizione==2){
				  item2 = item.id_richiesta;
				  
				  nick2 = item.nick
				  quando2 = item.quando
				  ora2 = item.ora
				  partenza2 = item.partenza
				  arrivo2 = item.arrivo
				  distanza2 = item.distanza
				  stato2 = item.stato
				  lng2 = item.lng
				  lat2 = item.lat
				  
				  //$("#pass2").show();
				  
				  if(item.posticipata==1){
				    $("#lista").show();
				  }
				  
				  if(item.stato==3){
				  $("#pass2").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass2").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  if(item.stato==1){
				  $("#pass2").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass2").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass2").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass2").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  
				  if(item.accettata==1){
				   $("#pass2").removeClass("custom-pass").addClass("custom-pass2");
				   $("#pass2").removeClass("custom-pass1").addClass("custom-pass2");
				   $("#pass2").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  else{
				   $("#pass2").removeClass("custom-pass").addClass("custom-pass1");
				   $("#pass2").removeClass("custom-pass2").addClass("custom-pass1");
				   $("#pass2").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  
				  }

				  
				  var icon = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,50));
				  var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
				  //alert(myLatLng + beach[0] + beach[5])
				  
				  var myLatLng2 = new google.maps.LatLng(item.lat,item.lng, 1);
				  
				  //marker3.setMap(null);
				  
						marker3 = new google.maps.Marker ({
														  map : map,
														  icon: iconn,
														  optimized: false,
														  position : myLatLng2,
														  content:'<div class="popup">'+item.nick +'<br>Km'+ item.distanza +'</div>',
														  title: '2',
														  //label: ''+ beach[1] +','+ beach[2] +'',
														  zIndex: -10
														  });

				  
				}
				  if(posizione==3){
				  item3 = item.id_richiesta;
				  
				  nick3 = item.nick
				  quando3 = item.quando
				  ora3 = item.ora
				  partenza3 = item.partenza
				  arrivo3 = item.arrivo
				  distanza3 = item.distanza
				  stato3 = item.stato
				  lng3 = item.lng
				  lat3 = item.lat
				  
				  //$("#pass3").show();
				  
				  if(item.posticipata==1){
				    $("#lista").show();
				  }
				  
				  if(item.stato==3){
				  $("#pass3").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass3").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  if(item.stato==1){
				  $("#pass3").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass3").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass3").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass3").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  
				  if(item.accettata==1){
				   $("#pass3").removeClass("custom-pass").addClass("custom-pass2");
				   $("#pass3").removeClass("custom-pass1").addClass("custom-pass2");
				   $("#pass3").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  else{
				   $("#pass3").removeClass("custom-pass").addClass("custom-pass1");
				   $("#pass3").removeClass("custom-pass2").addClass("custom-pass1");
				   $("#pass3").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  
				  }
				  
				  var icon = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,50));
				  var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
				  //alert(myLatLng + beach[0] + beach[5])
				  
				  var myLatLng3 = new google.maps.LatLng(item.lat,item.lng, 1);
				  
				  //marker4.setMap(null);
				  marker4 = new google.maps.Marker ({
													map : map,
													icon: iconn,
													optimized: false,
													position : myLatLng3,
													content:'<div class="popup">'+item.nick +'<br>Km'+ item.distanza +'</div>',
													title: '4',
													//label: ''+ beach[1] +','+ beach[2] +'',
													zIndex: -100
													});
				  
				  }

				posizione = (posizione+1);
				  
			});
		   
		   
		   },
		   error: function(){
		   
		   /*navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);*/
		   
		   },
		   dataType:"jsonp"});

	
		//$("#blob1").attr("href", "javascript:alert()");

	   /*var centerControlDiv = document.createElement('div');
	   centerControlDiv.setAttribute('id', 'sopra');
	   var centerControl = new CenterControl(centerControlDiv, map);
	  
	   centerControlDiv.index = 1;
	   map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);*/
		
	  //alert(localStorage.getItem("setGPS"))
		
		
	  if(localStorage.getItem("setGPS") == 0){

	   var watchID = navigator.geolocation.watchPosition(onSuccess2, onError2, {maximumAge:600000, timeout:80000, enableHighAccuracy: true});
		  
	   var lat = localStorage.getItem("lat");
	   var lng = localStorage.getItem("lng");
		  
		var latlng = new google.maps.LatLng(lat, lng);
		map.panTo(latlng);
		  
		//test5()
		  
	  }
	  else{
		  
		  var icon = new google.maps.MarkerImage("img/autista.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		  
		  var lat = localStorage.getItem("lat");
	      var lng = localStorage.getItem("lng");
		  
		  var latlng = new google.maps.LatLng(lat, lng);
		  
		  marker2.setIcon(icon);
		  marker2.setPosition(latlng);
		  
		  map.panTo(latlng);
			
	     //var lat = "41.770447";  //  "41.783780"  "41.783780" localStorage.getItem("lat")
	     //var lng = "12.373529";  //  "12.364947"  "12.364947" localStorage.getItem("lng")
			
	     //localStorage.setItem("lat", lat)
	     //localStorage.setItem("lng", lng)
			
	  }
		
		
		timer()

	}
	
	
	/*INSERT TAP PROLUNGATO*/
	
	//google.maps.event.addListener(map, 'click', function(e) {
		//placeMarker(e.latLng, map);
								  
		//alert(e.latLng);
								  
	//});

	
	/*function placeMarker(position, map) {
		
		if (isTabHolded){
			var icon = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,50));
			marker4 = new google.maps.Marker({
											position: position,
											map: map,
											icon: icon,
											content:'<div class="popup">ORA</div>',
											optimized: false
											});
			
			setTimeout(function() {

					   google.maps.event.addListener(marker4, "tap", function (event) {
										  var latitude2 = this.position.lat();
										  var longitude2 = this.position.lng();
													 
										  infowindow.setContent(this.position);
										  infowindow.open(map, this);
										  //alert(this.position);
										  }); //end addListener
			
					   map.panTo(position);
					   isTabHolded=false;

			}, 300);
		}
	}*/
	
	//---------------------------
		
		
		function onSuccess2(position) {
			
			var icon = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
			marker2.setIcon(icon);
			
			var posizione = Math.round(position.coords.heading);
			
			if((posizione > 0)&&(posizione <= 10)){
				var icon = new google.maps.MarkerImage("img_autista/car_010.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 10)&&(posizione <= 20)){
				var icon = new google.maps.MarkerImage("img_autista/car_020.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 20)&&(posizione <= 30)){
				//$("#rispondi").html("<img src='img_autista/car_030.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_030.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 30)&&(posizione <= 40)){
				//$("#rispondi").html("<img src='img_autista/car_040.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_040.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 40)&&(posizione <= 50)){
				//$("#rispondi").html("<img src='img_autista/car_050.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_050.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 50)&&(posizione <= 60)){
				//$("#rispondi").html("<img src='img_autista/car_060.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_060.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 60)&&(posizione <= 70)){
				//$("#rispondi").html("<img src='img_autista/car_070.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_070.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 70)&&(posizione <= 80)){
				//$("#rispondi").html("<img src='img_autista/car_080.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_080.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 80)&&(posizione <= 90)){
				//$("#rispondi").html("<img src='img_autista/car_090.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_090.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 90)&&(posizione <= 100)){
				//$("#rispondi").html("<img src='img_autista/car_100.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_100.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 100)&&(posizione <= 110)){
				//$("#rispondi").html("<img src='img_autista/car_110.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_110.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 110)&&(posizione <= 120)){
				//$("#rispondi").html("<img src='img_autista/car_120.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_120.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 120)&&(posizione <= 130)){
				//$("#rispondi").html("<img src='img_autista/car_130.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_130.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 130)&&(posizione <= 140)){
				//$("#rispondi").html("<img src='img_autista/car_140.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_140.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 140)&&(posizione <= 150)){
				//$("#rispondi").html("<img src='img_autista/car_150.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_150.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 150)&&(posizione <= 160)){
				//$("#rispondi").html("<img src='img_autista/car_160.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_160.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 160)&&(posizione <= 170)){
				//$("#rispondi").html("<img src='img_autista/car_170.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_170.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 170)&&(posizione <= 180)){
				//$("#rispondi").html("<img src='img_autista/car_180.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_180.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 180)&&(posizione <= 190)){
				//$("#rispondi").html("<img src='img_autista/car_190.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_190.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 190)&&(posizione <= 200)){
				//$("#rispondi").html("<img src='img_autista/car_200.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_200.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 200)&&(posizione <= 210)){
				//$("#rispondi").html("<img src='img_autista/car_210.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_210.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 210)&&(posizione <= 220)){
				//$("#rispondi").html("<img src='img_autista/car_220.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_220.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 220)&&(posizione <= 230)){
				//$("#rispondi").html("<img src='img_autista/car_230.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_230.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 230)&&(posizione <= 240)){
				//$("#rispondi").html("<img src='img_autista/car_240.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_240.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 240)&&(posizione <= 250)){
				//$("#rispondi").html("<img src='img_autista/car_250.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_250.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 250)&&(posizione <= 260)){
				//$("#rispondi").html("<img src='img_autista/car_260.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_260.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 260)&&(posizione <= 270)){
				//$("#rispondi").html("<img src='img_autista/car_270.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_270.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 270)&&(posizione <= 280)){
				//$("#rispondi").html("<img src='img_autista/car_280.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_280.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 280)&&(posizione <= 290)){
				//$("#rispondi").html("<img src='img_autista/car_290.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_290.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 290)&&(posizione <= 300)){
				//$("#rispondi").html("<img src='img_autista/car_300.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_300.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 300)&&(posizione <= 310)){
				//$("#rispondi").html("<img src='img_autista/car_310.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_310.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 310)&&(posizione <= 320)){
				//$("#rispondi").html("<img src='img_autista/car_320.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_320.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 320)&&(posizione <= 330)){
				//$("#rispondi").html("<img src='img_autista/car_330.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_330.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 330)&&(posizione <= 340)){
				//$("#rispondi").html("<img src='img_autista/car_340.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_340.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else if((posizione > 340)&&(posizione <= 350)){
				//$("#rispondi").html("<img src='img_autista/car_350.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_350.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			else{
				//$("#rispondi").html("<img src='img_autista/car_000.png'>")
				var icon = new google.maps.MarkerImage("img_autista/car_000.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			}
			
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
			
			localStorage.setItem("lat", lat)
			localStorage.setItem("lng", lng)
			
			//var lat = localStorage.getItem("lat");
			//var lng = localStorage.getItem("lng");
			var latlng = new google.maps.LatLng(lat, lng);
			
			marker2.setIcon(icon);
			marker2.setPosition(latlng);
			
			if(muoviti==1){
				//map.setCenter(latlng);
				map.panTo(latlng);
			}
			

			//alert(muoviti)
			
	}
        
        function onError2(error) {
            //var watchID = navigator.geolocation.watchPosition(onSuccess2, onError3, { timeout: 80000 });
			navigator.geolocation.watchPosition(onSuccess2, onError3, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
        }
	
        function onError3(error) {
            localStorage.setItem("geostory", "NO")
            
			//window.location.href = "index.html";
        }
		
		
function posizionegps(){

	refreshPos = setInterval(function() {

		var watchID = navigator.geolocation.getCurrentPosition(onSuccess2, onError3, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });

	}, 3000);
}
	
		
function timer(){
	
	refreshIntervalId = setInterval(function() {

									
		//var watchID = navigator.geolocation.getCurrentPosition(onSuccess22, onError3, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
									
	var connectionStatus = false;
	connectionStatus = navigator.onLine ? 'online' : 'offline';
									
	if(connectionStatus=='online'){
									var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
									var lat = localStorage.getItem("lat");
									var lng = localStorage.getItem("lng");
		
									//var lat = "41.770447";  //  "41.783780"  "41.783780" localStorage.getItem("lat")
									//var lng = "12.373529";  //  "12.364947"  "12.364947" localStorage.getItem("lng")
									
									var beaches1 = [];
									var posizione = 1;
									var distanza = "";
									
									$("#loading").hide();
									$("#btnpass").show();

									$("#esci").hide();
									
									beaches1.push(['Tua Posizione',lat,lng,1,0,0,0])
									
									var centromap = new google.maps.LatLng(lat, lng, posizione);
									
									$.ajax({
										   type:"GET",
										   url:"http://purplemiles.com/www2/check_richiesta_autistaV2.php?email="+ localStorage.getItem("email") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"&id_autista="+ localStorage.getItem("id_autista") +"",
										   contentType: "application/json",
										   //data: {ID: "Lazio"}, LIMIT 10
										   timeout: 7000,
										   jsonp: 'callback',
										   crossDomain: true,
										   success:function(result){
											   
											marker1.setIcon(iconn);
											marker3.setIcon(iconn);
											marker4.setIcon(iconn);
										   
										   $.each(result, function(i,item){
												  
												  if(item.Token==3){
												  $("#pass1").hide();
												  $("#pass2").hide();
												  $("#pass3").hide();
												  }
												  
												  
												  if(item.Token==4){
												  $("#pass1").hide();
												  $("#pass2").hide();
												  $("#pass3").hide();
												  $("#esci").hide();
												  
												  //resetta1(1);
												  

												  marker1.setMap(null);
												  
												  var isVisible3 = marker3.getVisible();
												  if(isVisible3){
												  marker3.setMap(null);
												  }
												  
												  
												  var isVisible4 = marker4.getVisible();
												  if(isVisible4){
												  marker4.setMap(null);
												  }
												  
												  
												  
												  }
												  
												  if(item.Token==11){
													 $("#lista").show();
												  }
												  
												  
												  if(item.Token==1){
												  
												  var myLatLng = new google.maps.LatLng(item.lat, item.lng, posizione);
												  
												  distanza = getDistance(lat,lng,item.lat,item.lng).toFixed(1);
												  
												  beaches1.push(["<h2>"+item.nick+"</h2><br>"+item.partenza,item.lat,item.lng,posizione,item.rating,item.distanza,item.id_richiesta])
												  
												  
												  
												  if(posizione==1){
												  item1 = item.id_richiesta;
												  
												  nick1 = item.nick
												  quando1 = item.quando
												  ora1 = item.ora
												  partenza1 = item.partenza
												  arrivo1 = item.arrivo
												  distanza1 = item.distanza
												  stato1 = item.stato
												  lng1 = item.lng
												  lat1 = item.lat
												  cod1 = item.cod_autista
												  
												  if(localStorage.getItem("palla1")!=1){
											   
												     palla1()
												  
											       }
												  
												  
												  /*$(document).on("tap", "#pass1", function(e){
																 //window.location.href = "#index3";
																 
																 
																 //localStorage.setItem("geostory", "NO")
																 for(i=0; i<10000; i++)
																 {
																 window.clearInterval(i);
																 }
																 
																 richiesta1(item.id_richiesta);
																 
																 });*/
												  
												  if(item.posticipata==1){
												    $("#lista").show();
												  }
												  
												  
												 
												  var icon3 = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,40));
												  if(item.stato==3){

												  }
												  
												  if(item.stato==1){
													 var icon3 = new google.maps.MarkerImage("img/marker_arancione_1.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==0){
													var icon3 = new google.maps.MarkerImage("img/marker_fucsia_1.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==2){
													 var icon3 = new google.maps.MarkerImage("img/marker_verde_1.png", null, null, null, new google.maps.Size(40,40));
												  }
												  
												  marker1.setMap(null);

												  marker1 = new google.maps.Marker ({
																					map : map,
																					icon: icon3,
																					optimized: false,
																					position : myLatLng,
																					content:'<div class="popup">'+ item.nick +'<br>Km'+ item.distanza +'<br><a href="#home3">GPS</a></div>',
																					title: item.nick,
																					//label: ''+ beach[1] +','+ beach[2] +'',
																					zIndex: posizione
																					});
												  
												  google.maps.event.addListener(marker1, 'click', function() {
																				
																				infowindow.setContent(this.content);
																				infowindow.open(map, this);
																				
																				});
	
												  
												  
												  $("#pass1").show();
												  $("#pass2").hide();
												  $("#pass3").hide();
												  
												  if(item.stato==3){
												  $("#pass1").removeClass("custom-pass").addClass("custom-pass3");
												  $("#pass1").removeClass("custom-pass1").addClass("custom-pass3");
												  $("#pass1").removeClass("custom-pass2").addClass("custom-pass3");
												  }
												  
												  if(item.stato==1){
												  $("#pass1").removeClass("custom-pass").addClass("custom-pass1");
												  $("#pass1").removeClass("custom-pass2").addClass("custom-pass1");
												  $("#pass1").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  if(item.stato==0){
												  $("#pass1").removeClass("custom-pass1").addClass("custom-pass");
												  $("#pass1").removeClass("custom-pass2").addClass("custom-pass");
												  $("#pass1").removeClass("custom-pass3").addClass("custom-pass");
												  }
												  if(item.stato==2){
												  
												  if(item.accettata==1){
												   $("#pass1").removeClass("custom-pass").addClass("custom-pass2");
												   $("#pass1").removeClass("custom-pass1").addClass("custom-pass2");
												   $("#pass1").removeClass("custom-pass3").addClass("custom-pass2");
												  }
												  else{
												   $("#pass1").removeClass("custom-pass").addClass("custom-pass1");
												   $("#pass1").removeClass("custom-pass2").addClass("custom-pass1");
												   $("#pass1").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  
												  
												   if(item.accettata==0){
												    $("#blob3").show();
												    for(i=0; i<10000; i++)
												    {
												     window.clearInterval(i);
												    }
												  
												    $("#viaaccetta3").html(item.partenza);
												    $("#adaccetta3").html(item.arrivo);
												  
												  function countdown1(minutes) {
												  var seconds = 30;
												  var mins = minutes
												  function tick() {
												  var counter = document.getElementById("timer1");
												  var current_minutes = 0;
												  seconds--;
												  counter.innerHTML =
												  "<font size='5'>"+current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds)+"</font>";
												  if( seconds > 0 ) {
												  setTimeout(tick, 1000);
												  } else {
												  $("#blob3").hide();
												  
												  scadutaofferta(0,item.id_richiesta,item.id_autista)
												  
												  //resetta1(1)
												  //rifiuta1()
												  //alert("finito");
												  //if(mins > 1){
												  
												  // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
												  //setTimeout(function () { countdown(mins - 1); }, 1000);
												  
												  //}
												  }
												  }
												  tick();
												  }
												  
												  countdown1(0);

												  }
												   else{
													$("#blob3").hide();
												   }
												  }
												  
												  
												  
												  }
												  
												  if(posizione==2){
												  item2 = item.id_richiesta;
												  
												  nick2 = item.nick
												  quando2 = item.quando
												  ora2 = item.ora
												  partenza2 = item.partenza
												  arrivo2 = item.arrivo
												  distanza2 = item.distanza
												  stato2 = item.stato
												  lng2 = item.lng
												  lat2 = item.lat
												  cod2 = item.cod_autista
												  
												  /*$(document).on("tap", "#pass2", function(e){
																 //window.location.href = "#index3";
																 
																 //localStorage.setItem("geostory", "NO")
																 
																 for(i=0; i<10000; i++)
																 {
																 window.clearInterval(i);
																 }
																 
																 richiesta2(item.id_richiesta);
																 
																 
																 });*/
												  
												  if(item.posticipata==1){
												    $("#lista").show();
												  }
												  
												  var icon3 = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,40));
												  if(item.stato==3){
												  
												  }
												  
												  if(item.stato==1){
													 var icon3 = new google.maps.MarkerImage("img/marker_arancione_2.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==0){
													var icon3 = new google.maps.MarkerImage("img/marker_fucsia_2.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==2){
													 var icon3 = new google.maps.MarkerImage("img/marker_verde_2.png", null, null, null, new google.maps.Size(40,40));
												  }

												  
												  marker3.setMap(null);
												  
												  marker3 = new google.maps.Marker ({
																					map : map,
																					icon: icon3,
																					optimized: false,
																					position : myLatLng,
																					content:'<div class="popup">'+ item.nick +'<br>Km'+ item.distanza +'<br><a href="#home3">GPS</a></div>',
																					title: item.nick,
																					//label: ''+ beach[1] +','+ beach[2] +'',
																					zIndex: posizione
																					});
												  
												  google.maps.event.addListener(marker3, 'click', function() {
																				
																				infowindow.setContent(this.content);
																				infowindow.open(map, this);
																				
																				});
												  
												  $("#pass2").show();
												  $("#pass3").hide();
												  
												  if(item.stato==3){
												  $("#pass2").removeClass("custom-pass").addClass("custom-pass3");
												  $("#pass2").removeClass("custom-pass1").addClass("custom-pass3");
												  $("#pass2").removeClass("custom-pass2").addClass("custom-pass3");
												  }
												  
												  if(item.stato==1){
												  $("#pass2").removeClass("custom-pass").addClass("custom-pass1");
												  $("#pass2").removeClass("custom-pass2").addClass("custom-pass1");
												  $("#pass2").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  if(item.stato==0){
												  $("#pass2").removeClass("custom-pass1").addClass("custom-pass");
												  $("#pass2").removeClass("custom-pass2").addClass("custom-pass");
												  $("#pass2").removeClass("custom-pass3").addClass("custom-pass");
												  }
												  if(item.stato==2){
												  
												  if(item.accettata==1){
												   $("#pass2").removeClass("custom-pass").addClass("custom-pass2");
												   $("#pass2").removeClass("custom-pass1").addClass("custom-pass2");
												   $("#pass2").removeClass("custom-pass3").addClass("custom-pass2");
												  }
												  else{
												   $("#pass2").removeClass("custom-pass").addClass("custom-pass1");
												   $("#pass2").removeClass("custom-pass2").addClass("custom-pass1");
												   $("#pass2").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  
												  if(item.accettata==0){
												   $("#blob4").show();
												   for(i=0; i<10000; i++)
												   {
												    window.clearInterval(i);
												   }
												  
												  $("#viaaccetta2").html(item.partenza);
												   $("#adaccetta2").html(item.arrivo);
												  
												  function countdown2(minutes) {
												  var seconds = 30;
												  var mins = minutes
												  function tick() {
												  var counter = document.getElementById("timer2");
												  var current_minutes = 0;
												  seconds--;
												  counter.innerHTML =
												  current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
												  if( seconds > 0 ) {
												  setTimeout(tick, 1000);
												  } else {
												  scadutaofferta(0,item.id_richiesta,item.id_autista)
												  $("#blob4").hide();
												  //rifiuta2()
												  //alert("finito");
												  //if(mins > 1){
												  
												  // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
												  //setTimeout(function () { countdown(mins - 1); }, 1000);
												  
												  //}
												  }
												  }
												  tick();
												  }
												  
												  countdown2(0);
												  }
												  else{
												    $("#blob4").hide();
												  }

												     }
												  
												  }
												  
												  if(posizione==3){
												  
												  nick3 = item.nick
												  quando3 = item.quando
												  ora3 = item.ora
												  partenza3 = item.partenza
												  arrivo3 = item.arrivo
												  distanza3 = item.distanza
												  stato3 = item.stato
												  lng3 = item.lng
												  lat3 = item.lat
												  cod3 = item.cod_autista
												  
												  item3 = item.id_richiesta;
												  
												  var icon3 = new google.maps.MarkerImage("img/passeggero.png", null, null, null, new google.maps.Size(30,40));
												  if(item.stato==3){
												  
												  }
												  
												  if(item.stato==1){
													 var icon3 = new google.maps.MarkerImage("img/marker_arancione_3.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==0){
													var icon3 = new google.maps.MarkerImage("img/marker_fucsia_3.png", null, null, null, new google.maps.Size(40,40));
												  }
												  if(item.stato==2){
													 var icon3 = new google.maps.MarkerImage("img/marker_verde_3.png", null, null, null, new google.maps.Size(40,40));
												  }

												  
												  
												  var isVisible4 = marker4.getVisible();
												  if(isVisible4){
												  marker4.setMap(null);
												  }
												  
												  
												  marker4 = new google.maps.Marker ({
																					map : map,
																					icon: icon3,
																					optimized: false,
																					position : myLatLng,
																					content:'<div class="popup">'+ item.nick +'<br>Km'+ item.distanza +'<br><a href="#home3">GPS</a></div>',
																					title: item.nick,
																					//label: ''+ beach[1] +','+ beach[2] +'',
																					zIndex: posizione
																					});
												  
												  google.maps.event.addListener(marker4, 'click', function() {
																				
																				infowindow.setContent(this.content);
																				infowindow.open(map, this);
																				
																				});
												  
												  if(item.posticipata==1){
												    $("#lista").show();
												  }
												  
												  
												  $("#pass3").show();
												  
												  if(item.stato==3){
												  $("#pass3").removeClass("custom-pass").addClass("custom-pass3");
												  $("#pass3").removeClass("custom-pass1").addClass("custom-pass3");
												  $("#pass3").removeClass("custom-pass2").addClass("custom-pass3");
												  }
												  
												  if(item.stato==1){
												  $("#pass3").removeClass("custom-pass").addClass("custom-pass1");
												  $("#pass3").removeClass("custom-pass2").addClass("custom-pass1");
												  $("#pass3").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  if(item.stato==0){
												  $("#pass3").removeClass("custom-pass1").addClass("custom-pass");
												  $("#pass3").removeClass("custom-pass2").addClass("custom-pass");
												  $("#pass3").removeClass("custom-pass3").addClass("custom-pass");
												  }
												  if(item.stato==2){
												  
												  if(item.accettata==1){
												   $("#pass3").removeClass("custom-pass").addClass("custom-pass2");
												   $("#pass3").removeClass("custom-pass1").addClass("custom-pass2");
												   $("#pass3").removeClass("custom-pass3").addClass("custom-pass2");
												  }
												  else{
												   $("#pass3").removeClass("custom-pass").addClass("custom-pass1");
												   $("#pass3").removeClass("custom-pass2").addClass("custom-pass1");
												   $("#pass3").removeClass("custom-pass3").addClass("custom-pass1");
												  }
												  
												  if(item.accettata==0){
												  $("#blob5").show();
												  for(i=0; i<10000; i++)
												  {
												  window.clearInterval(i);
												  }
												  
												  $("#viaaccetta5").html(item.partenza);
												   $("#adaccetta5").html(item.arrivo);
												  
												  function countdown3(minutes) {
												  var seconds = 30;
												  var mins = minutes
												  function tick() {
												  var counter = document.getElementById("timer3");
												  var current_minutes = 0;
												  seconds--;
												  counter.innerHTML =
												  current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
												  if( seconds > 0 ) {
												  setTimeout(tick, 1000);
												  } else {
												  scadutaofferta(0,item.id_richiesta,item.id_autista)
												  $("#blob5").hide();
												  //rifiuta3()
												  //alert("finito");
												  //if(mins > 1){
												  
												  // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
												  //setTimeout(function () { countdown(mins - 1); }, 1000);
												  
												  //}
												  }
												  }
												  tick();
												  }
												  
												  countdown3(0);
												  }
												  else{
												    $("#blob5").hide();
												  }
												  
										
												  
												  }
												  
												  
												  }
												  
												  posizione = (posizione+1);
												  
												  }
												  
												  });

										   },
										   error: function(){
										   
										   
										   },
										   dataType:"jsonp"});
									
									//setTimeout(function() {

										//map.setCenter(centromap);

								    //}, 1000);
			}
	else{
		for(i=0; i<10000; i++)
		{
		 window.clearInterval(i);
		}
													
		timer();									
	}
																		
			}, 8000);
	
	}
		

 }
	
}


function vediofferte(){
	
	//alert()
	
	for(i=0; i<10000; i++)
	{
	 window.clearInterval(i);
	}
	
	
	//alert("http://msop.it/rides/check_richiesta_autistaV4.php?email="+ localStorage.getItem("email") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"&id_autista="+ localStorage.getItem("id_autista") +"&fuso=154&ora_cell="+ localStorage.getItem("ora_cell") +"");
	
    //$("#spinner2").show();
	$.ajax({
	 type:"GET",
	 url:"http://msop.it/rides/check_richiesta_autistaV4.php?email="+ localStorage.getItem("email") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"&id_autista="+ localStorage.getItem("id_autista") +"&fuso=154&ora_cell="+ localStorage.getItem("ora_cell") +"",
	 contentType: "application/json",
	 //data: {ID: "Lazio"}, LIMIT 10
	 timeout: 7000,
	 jsonp: 'callback',
	 crossDomain: true,
	 success:function(result){
	 
	 $("#offerte4").html("");
	 $("#spinner2").hide();
	 
	 $.each(result, function(i,item){
			
	 //alert(item.Token)
	 
	 
	 if(item.Token==1){
			
		if(item.stato==0){
			var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
			
			
			$("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><font color='#000'><div id='linkpass"+ item.id_richiesta +"_"+ item.id_autista +"'><b>"+ item.nick +"</b></div></font></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_pass +"'></div></td></tr><tr><td align='left' colspan='2'><br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo: </b>"+ item.arrivo +"<br><br>&nbsp;&nbsp;<b>Distanza: </b>"+ item.distanza1 +" km<br><br>&nbsp;&nbsp;<b>Prezzo consigliato: </b>"+ Punita +" Euro</td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br></td></tr><tr><td align='center' colspan='2'>targa veicolo</td></tr><tr><td align='center' width='100%' colspan='2'><table align='center'><tr><td align='right' width='10%'><img src='img/targa.png' height='40px'></td><td align='left' width='90%'><input type='text' data-role='none' name='targa' id='targa' value='' placeholder='targa' class='scrivo'></td></tr></table></td></tr><tr><td align='center' colspan='2'><br><a id='accetta"+ item.id_richiesta +"_"+ item.id_pass +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>ACCETTA</font></a>&nbsp;&nbsp;<a id='elimina"+ item.id_richiesta +"_"+ item.id_pass +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>CANCELLA</font></a></td></tr><tr><td align='center' colspan='2'><br></td></tr><tr><td align='center' colspan='2'><br></td></tr></table>");
            
            
             $("#targa").focus(function() {
              for(i=0; i<10000; i++)
                {
                    window.clearInterval(i);
                }
             });
            
            
            $("#targa").blur(function() {
                setTimeout(function() {
                    //alert()
                    vediofferte()
                }, 15000);
            });
            
			
			$(document).on("touchstart", "#elimina"+ item.id_richiesta +"_"+ item.id_pass +"", function(e){
				cancella(item.id_richiesta,item.id_pass)
			    $("#spinner2").show();
				if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
			});
			
			$(document).on("tap", "#accetta"+ item.id_richiesta +"_"+ item.id_pass +"", function(e){
                           
						if (document.getElementById("targa").value == "") {
						   navigator.notification.alert(
								'inserire la targa del veicolo',  // message
								alertDismissed,         // callback
								'Targa',            // title
								'OK'                  // buttonName
							);
                           
                         return;
                        }
                           
                        if (localStorage.getItem("patente") == "0") {
                           navigator.notification.alert(
                                 'inserire un numero di patente valido',  // message
                                   alertDismissed,         // callback
                                    'N.Patente',            // title
                                    'OK'                  // buttonName
                            );
                           
                           return;
                        }
						   
					  //alert(localStorage.getItem("patente"))
						   
					  if (localStorage.getItem("patente") === null || localStorage.getItem("patente")=="null" || localStorage.getItem("patente")=="undefined" || typeof(localStorage.getItem("patente")) == 'undefined' || localStorage.getItem("patente")==0 || localStorage.getItem("patente")=="") {
					
						   navigator.notification.alert(
														'inserire un numero di patente valido',  // message
														alertDismissed,         // callback
														'N.Patente',            // title
														'OK'                  // buttonName
														);
						   
						   return;
					}
						   
						   
				inviopasseggero(1,item.id_richiesta)
				$("#spinner2").show();
				if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
			});
			
			
			if(parseInt(item.rating)==0){
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if(parseInt(item.rating)==1){
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==2) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==3) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==4) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==5) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'>")
			}

			
		
		}
			
		if(item.stato==1){
			var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
			
			$("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><font color='#000'><div id='linkpass"+ item.id_richiesta +"_"+ item.id_pass +"'><b>"+ item.nick +"</b></div></font></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_pass +"'></div></td></tr><tr><td align='left' colspan='2'><br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo: </b>"+ item.arrivo +"<br><br>&nbsp;&nbsp;<b>Distanza: </b>"+ item.distanza1 +" km<br><br>&nbsp;&nbsp;<b>Prezzo consigliato: </b>"+ Punita +" Euro</td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><b>In Attesa di conferma</b></td></tr><tr><td align='center'><br></td></tr><tr><td align='center' colspan='2'><br></td></tr></table>");
			}
			
			if(item.stato==2){
			var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
			
			if(item.pagata=="No"){
			
			  $("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><font color='#000'><div id='linkpass"+ item.id_richiesta +"_"+ item.id_pass +"'><b>"+ item.nick +"</b></div></font></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_pass +"'></div></td></tr><tr><td align='left' colspan='2'><br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo </b>"+ item.arrivo +"<br><br>&nbsp;&nbsp;<b>Distanza: </b>"+ item.distanza1 +" km<br><br>&nbsp;&nbsp;<b>Prezzo consigliato: </b>"+ Punita +" Euro</td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><b>In Attesa di conferma</b></td></tr><tr><td align='center'><br></td></tr><tr><td align='center' colspan='2'><br></td></tr></table>");
			}
			else{
			
			 $("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><font color='#000'><div id='linkpass"+ item.id_richiesta +"_"+ item.id_pass +"'><b>"+ item.nick +"</b></div></font></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_pass +"'></div></td></tr><tr><td align='left' colspan='2'><br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo </b>"+ item.arrivo +"<br><br>&nbsp;&nbsp;<b>Distanza </b>"+ item.distanza1 +" km<br><br>&nbsp;&nbsp;<b>Prezzo consigliato: </b>"+ Punita +" Euro</td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><b>CONFERMATA</b></td></tr><tr><td align='center' colspan='2'><br><a id='telefona"+ item.id_richiesta +"_"+ item.id_pass +"' href='#' ><img src='img/call2.png' height='80'></a></td></tr><tr><td align='center' colspan='2'><br><a id='gps"+ item.id_richiesta +"_"+ item.id_pass +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Percorso GPS</font></a> <a id='rifiuta"+ item.id_richiesta +"_"+ item.id_pass +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a></td></tr><tr><td align='center'><br></td></tr><tr><td align='center' colspan='2'><br></td></tr></table>");
			 }
			
			//<font color='#fff'>CHIAMA PASSEGGERO</font>
			
			$(document).on("touchstart tap", "#gps"+ item.id_richiesta +"_"+ item.id_pass +"", function(e){
						   
				var cordinate = item.lat+","+item.lng;
						   
				window.open("maps:daddr="+ cordinate +"" , '_system');
				//window.open("google.navigation:q="+ item.partenza +"&mode=d" , '_system');
						   
				e.stopImmediatePropagation();
					
				e.preventDefault();
						   
				return false;
						   
			});
			
			
               $(document).on("touchstart", "#rifiuta"+ item.id_richiesta +"_"+ item.id_pass +"", function(e){
                    cancella(item.id_richiesta,item.id_pass)
                    $("#spinner2").show();
                    if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
                });
			}
			
			if(item.stato==3){
			$("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='center' width='100%'>Nessuna richiesta al momento</td></tr></table>")
			}
			
			if(parseInt(item.rating)==0){
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if(parseInt(item.rating)==1){
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==2) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==3) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==4) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'>")
			}
			else if (parseInt(item.rating)==5) {
			$("#stelleautista"+ item.id_richiesta +"_"+ item.id_pass + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'>")
			}
			
			
			$(document).on("touchstart", "#telefona"+ item.id_richiesta +"_"+ item.id_pass + "", function(e){
				
						   
				window.location.href = "tel:+39"+item.cell+"";
						   
				if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
			});


	
	 }
	else{
		$("#offerte4").append("<br><table width='90%' border='0' valign='center' align='center' class='#'><tr><td align='center' width='100%'>Nessuna richiesta al momento</td></tr></table><br><center>")
	}
	 
	 
	 });
	 
	 
	 },
	 error: function(){
	 
	/* navigator.notification.alert(
	 'Possibile errore di rete, riprova tra qualche minuto.',  // message
	 alertDismissed,         // callback
	 'Attenzione',           // title
	 'Done'                  // buttonName
	 );*/
	 
	 vediofferte();
	 
	 },
	 dataType:"jsonp"});
	 
	 
	 
	 refreshPos = setInterval(function() {
	  //ATTIVARE
	  //var watchID = navigator.geolocation.watchPosition(onSuccess55, onError55, {maximumAge:600000, timeout:80000, enableHighAccuracy: true});
							  
	   vediofferte()
	 }, 7000);
	
	
}


function vediofferte44(){
	
	
	for(i=0; i<10000; i++)
	{
		window.clearInterval(i);
	}
	
	
	//alert("http://msop.it/rides/check_richiesta_passeggeroV3.php?email="+ localStorage.getItem("emailpass") +"&id_passeggero="+ localStorage.getItem("id_pass") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"")
	
	
    //$("#spinner44").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_richiesta_passeggeroV3.php?email="+ localStorage.getItem("emailpass") +"&id_passeggero="+ localStorage.getItem("id_pass") +"&latitudine="+ localStorage.getItem("lat") +"&longitudine="+ localStorage.getItem("lng") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   
		   if(localStorage.getItem("risppass44")==JSON.stringify(result)){
		      localStorage.setItem("scroller","1");
		      $("#spinner44").hide();
		   }
		   else{
		     $("#offerte44").html("");
		     $("#spinner44").hide();
			 localStorage.setItem("scroller","0");
		   
		     myScroll = new IScroll('#wrapper', {
				click: true,
				bounce: true
			 });
		   
		   
		    $.each(result, function(i,item){
				  
				  
				  localStorage.setItem("risppass44", JSON.stringify(result))
				  
				  
				  if(item.Token==1){
				  
				  
				  if(item.stato==2){
				  
				  if(item.fumatori=="No"){
				  var fumatori = "<img src='img/nofumatori.png' width='40px'>"
				  }
				  else{
				  var fumatori = "<img src='img/sifumatori.png' width='40px'>"
				  }
				  
				  if(item.animali=="No"){
				  var animali = "<img src='img/nodog.png' width='40px'>"
				  }
				  else{
				  var animali = "<img src='img/sidog.png' width='40px'>"
				  }
				  
				  
				  if(item.accettata==1){
				  var Punita = (Number(item.distanza1).toFixed(2) * 0.10).toFixed(2);
				  
				  if(item.pagata=="No"){
				   var Credito = Number(item.credito).toFixed(2);
				   //alert(Credito)
				   
					  if(Credito<Punita){
				   
				       $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><a id='linkpass' href='' class='linkchat'><font color='#000'>"+ item.nick +"</font></a></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><font color='#cc33cc' size='5'><b><div id='timer2'></div></b></font><br><b>Distanza: </b>"+ item.distanza1 +" km<br><b>Quando: </b>"+ item.quando +",<b>Alle: </b>"+ item.ora +"<br><br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>"+ fumatori +"&nbsp;"+ animali +"</td></tr><tr><td align='center' colspan='2'><br><b>Costo del servizio: </b>"+ Punita +" Euro<br><br><a id='chat"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Paga con PayPal</font></a></td></tr><tr><td align='center' colspan='2'><br><img src='img/CC_Mastercard.jpg' width='50px'> <img src='img/CC_Visa.jpg' width='50px'> <img src='img/CC_PostePay.jpg' width='50px'> <img src='img/CC_VisaElectron.jpg' width='50px'></td></tr><tr><td align='center' colspan='2'><br><a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a></td></tr></table>");
				        //<tr><td align='center'><a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>RIFIUTA</font></a></td></tr>
				      }
				      else{
				   //localStorage.setItem("nuovocredito",Credito);
				   
				   $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><a id='linkpass' href='' class='linkchat'><font color='#000'>"+ item.nick +"</font></a></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><font color='#cc33cc' size='5'><b><div id='timer2'></div></b></font><br><b>Distanza: </b>"+ item.distanza1 +" km<br><b>Rimborso cosigliato: </b>"+ Punita +" Euro<br><b>Quando: </b>"+ item.quando +",<b>Alle: </b>"+ item.ora +"<br><br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>"+ fumatori +"&nbsp;"+ animali +"</td></tr><tr><td align='center' colspan='2'><br>Targa :<b>"+ item.targa +"</b></td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><a id='telefona"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' ><font color='#fff'><img src='img/call2.png' height='80'></a></td></tr><tr><td align='center' colspan='2'><br><a id='gps"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Percorso GPS</font></a> </td></tr><tr><td align='center' colspan='2'><br>Valuta il servizio e <font color='#FF0000'>cancella</font> la richiesta<br><img id='star1"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star2"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star3"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star4"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star5"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'></td></tr></table>");
				   
				   
				   
				   //<a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a>
				   
				   $(document).on("touchstart tap", "#gps"+ item.id_richiesta +"_"+ item.id_autista +"", function(e){
						
						var cordinate = item.lat+","+item.lng;
								  
						window.open("maps:daddr="+ item.partenza +"" , '_system');
						//window.open("google.navigation:q="+ item.partenza +"&mode=d" , '_system');
								  
						e.stopImmediatePropagation();
								  
						e.preventDefault();
								  
						return false;
								  
					});
				   
				   
				   
				   $(document).on("touchstart", "#star1"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								  scriviRec(1,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								  });
				   
				   $(document).on("touchstart", "#star2"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								  scriviRec(2,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								  });
				   
				   $(document).on("touchstart", "#star3"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								  scriviRec(3,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								  });
				   
				   $(document).on("touchstart", "#star4"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								  scriviRec(4,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								  });
				   
				   $(document).on("touchstart", "#star5"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								  scriviRec(5,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
						});
				     }
				   
				  }
				  else
				  {
				  var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
				  
				  $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><a id='linkpass' href='' class='linkchat'><font color='#000'>"+ item.nick +"</font></a></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><font color='#cc33cc' size='5'><b><div id='timer2'></div></b></font><br><b>Distanza: </b>"+ item.distanza1 +" km<br><b>Rimborso cosigliato: </b>"+ Punita +" Euro<br><b>Quando: </b>"+ item.quando +",<b>Alle: </b>"+ item.ora +"<br><br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>"+ fumatori +"&nbsp;"+ animali +"</td></tr><tr><td align='center' colspan='2'><br>Targa :<b>"+ item.targa +"</b></td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><a id='telefona"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' ><font color='#fff'><img src='img/call2.png' height='80'></a></td></tr><tr><td align='center' colspan='2'><br><a id='gps"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Percorso GPS</font></a> </td></tr><tr><td align='center' colspan='2'><br>Valuta il servizio e <font color='#FF0000'>cancella</font> la richiesta<br><img id='star1"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star2"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star3"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star4"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'> <img id='star5"+ item.id_richiesta +"_"+ item.id_autista + "' src='img/starunselected.png' width='45'></td></tr></table>");
				   
				   
				   //<a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a>
				   
				   $(document).on("touchstart tap", "#gps"+ item.id_richiesta +"_"+ item.id_autista +"", function(e){
								  
							var cordinate = item.lat+","+item.lng;
								  
							window.open("maps:daddr="+ cordinate +"" , '_system');
							//window.open("google.navigation:q="+ item.partenza +"&mode=d" , '_system');
								  
							e.stopImmediatePropagation();
								  
							e.preventDefault();
								  
							return false;
								  
					});
				   
				   
				   $(document).on("touchstart", "#star1"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
						scriviRec(1,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				   
				   $(document).on("touchstart", "#star2"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
						scriviRec(2,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				   
				   $(document).on("touchstart", "#star3"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
						scriviRec(3,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				   
				   $(document).on("touchstart", "#star4"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
					   scriviRec(4,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				   
				   $(document).on("touchstart", "#star5"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
						scriviRec(5,item.id_richiesta,item.id_autista);
								  
								  e.stopImmediatePropagation();
								  
								  e.preventDefault();
								  
								  return false;
								  
								  if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				   
				   }
				   }
				  else{
				  $("#offerte44").append("<br><table width='90%' border='1' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><a id='linkpass' href=''class='linkchat'><font color='#000'>"+ item.nick +"</font></a></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><font color='#cc33cc' size='5'><b><div id='timer2'></div></b></font><br><b>Prezzo: </b>"+ item.importo +"<br><b>Quando: </b>"+ item.quando +"<br><b>Ora: </b>"+ item.ora +"<br><br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>Fumatori:<b>"+ item.fumatori +"</b>&nbsp;Animali:<b>"+ item.animali +"</b></td></tr><tr><td align='center' colspan='2'><a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>RIFIUTA</font></a></td></tr></table>");
				  
				  //<a id='accetta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>ACCETTA</font></a>&nbsp;&nbsp;
				  }
				  
				  $(document).on("touchstart", "#accetta"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								 accettaofferta(2,item.id_richiesta,item.id_autista)
								 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								 });
				  
				  $(document).on("touchstart", "#chat"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								 
						       compraCarta(item.id_richiesta,item.id_autista,Punita)
								 
								 //accettaofferta(2,item.id_richiesta,item.id_autista)
								 
						if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				  
				  
				  $(document).on("touchstart", "#rifiuta"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
						accettaofferta(3,item.id_richiesta,item.id_autista)
						if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
					});
				  
				  
				  $(document).on("touchstart", "#telefona"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								 
						window.location.href = "tel:+39"+item.cell+"";
						//window.open('tel:12345678', '_system')
								 
								 
						if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				  });
				  
				  
				  
				  if(parseInt(item.rating)==0){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if(parseInt(item.rating)==1){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==2) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==3) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==4) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==5) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'>")
				  }
				  
				  
				  
				  }
				  
				  if(item.stato==1){
				  var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
				  var Punita2 = (Number(item.distanza1).toFixed(2) * 0.10).toFixed(2);
				   
				  var Credito2 = Number(item.credito).toFixed(2);
				  var Credito = (Number(item.credito).toFixed(2) - Punita2).toFixed(2);
				  localStorage.setItem("nuovocredito",Credito);
				  
				  if(item.fumatori=="No"){
				  var fumatori = "<img src='img/nofumatori.png' width='40px'>"
				  }
				  else{
				  var fumatori = "<img src='img/sifumatori.png' width='40px'>"
				  }
				  
				  if(item.animali=="No"){
				  var animali = "<img src='img/nodog.png' width='40px'>"
				  }
				  else{
				  var animali = "<img src='img/sidog.png' width='40px'>"
				  }
				  
				  
					 $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><a id='linkpass' href=''><font color='#000'>"+ item.nick +"</font></a></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><br><b>Distanza: </b>"+ item.distanza1 +" km<br><b>Costo del servizio: </b>"+ Punita2 +" Euro<b><br><br><b>Rimborso consigliato : </b>"+ Punita +"<br>Quando: </b>"+ item.quando +"<br><b>Ora: </b>"+ item.ora +"<br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"<br><br><b>Crediti Passeggero: </b>"+ Credito2 +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>"+ fumatori +"&nbsp;"+ animali +"</td></tr><tr><td align='center' colspan='2'><br><a id='accetta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>ACCETTA</font></a>&nbsp;&nbsp;<a id='rifiuta"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>RIFIUTA</font></a></td></tr><tr><td align='center'><br></td></tr></table>");
				  
				  $(document).on("touchstart", "#accetta"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								 accettaofferta(2,item.id_richiesta,item.id_autista)
								 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								 });
				  
				  $(document).on("touchstart", "#rifiuta"+ item.id_richiesta +"_"+ item.id_autista + "", function(e){
								 accettaofferta(3,item.id_richiesta,item.id_autista)
								 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								 });
				  
				  if(parseInt(item.rating)==0){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if(parseInt(item.rating)==1){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==2) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==3) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==4) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==5) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'>")
				  }
				  
				  
				  }
				  
				  if(item.stato==0){
				   var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
				   var Punita2 = (Number(item.distanza1).toFixed(2) * 0.10).toFixed(2);

				  if(item.nick==""){
				    $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='center'><b>RICHIESTA</b><br></td></tr><tr><td align='left'><br>&nbsp;&nbsp;<b>Distanza: </b>"+ item.distanza1 +" km<br>&nbsp;&nbsp;<b>Costo del servizio: </b>"+ Punita2 +" Euro<br><br>&nbsp;&nbsp;<b>Rimborso consigliato : </b>"+ Punita +"<br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo </b>"+ item.arrivo +"</td></tr><tr><td align='center'></td></tr><tr><td align='center'><br></td></tr><tr><td align='center'><br><a id='elimina"+ item.id_richiesta +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a></td></tr><tr><td align='center'><br></td></tr></table>");
				  
				    $(document).on("touchstart", "#elimina"+ item.id_richiesta +"", function(e){
								 elimina44(item.id_richiesta)
								 if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
								 });
				  
				  
				  }
				  else{
				   
				  var Punita = (Number(item.distanza1).toFixed(2) * 0.25).toFixed(2);
				  var Punita2 = (Number(item.distanza1).toFixed(2) * 0.10).toFixed(2);
				  
				  if(item.fumatori=="No"){
				  var fumatori = "<img src='img/nofumatori.png' width='40px'>"
				  }
				  else{
				  var fumatori = "<img src='img/sifumatori.png' width='40px'>"
				  }
				  
				  if(item.animali=="No"){
				  var animali = "<img src='img/nodog.png' width='40px'>"
				  }
				  else{
				  var animali = "<img src='img/sidog.png' width='40px'>"
				  }
				  
				  $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='right' width='50%'><font color='#000'><div id='linkpass"+ item.id_richiesta +"_"+ item.id_autista +"'><b>"+ item.nick +"</b></div></font></td><td align='left' width='50%'><div id='stelleautista"+ item.id_richiesta +"_"+ item.id_autista +"'></div></td></tr><tr><td align='left' colspan='2'><br>&nbsp;&nbsp;<b>Distanza: </b>"+ item.distanza1 +" km<br>&nbsp;&nbsp;<b>Costo del servizio: </b>"+ Punita2 +" Euro<br><br>&nbsp;&nbsp;<b>Rimborso consigliato : </b>"+ Punita +"<br>&nbsp;&nbsp;<b>Quando: </b>"+ item.quando +" <b>Ora: </b>"+ item.ora +"<br>&nbsp;&nbsp;<b>Partenza: </b>"+ item.partenza +"<br>&nbsp;&nbsp;<b>Arrivo </b>"+ item.arrivo +"</td></tr><tr><td align='center' colspan='2'><br>Auto:<b>"+ item.veicolo +"</b></td></tr><tr><td align='center' colspan='2'>"+ fumatori +"&nbsp;"+ animali +"</td></tr><tr><td align='center' colspan='2'></td></tr><tr><td align='center' colspan='2'><br><a id='elimina2"+ item.id_richiesta +"_"+ item.id_autista +"' href='#' data-role='button' data-theme='b' class='custom-btn4'><font color='#fff'>Cancella</font></a></td></tr><tr><td align='center' colspan='2'><br></td></tr></table>");
				  }
				  
				  $(document).on("touchstart", "#elimina2"+ item.id_richiesta +"_"+ item.id_autista +"", function(e){
					accettaofferta(3,item.id_richiesta,item.id_autista)
					if ($.browser.iphone || $.browser.ipad) $(this).trigger('click');
				  });
				  
				  
				  if(parseInt(item.rating)==0){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if(parseInt(item.rating)==1){
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==2) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==3) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==4) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starunselected.png' width='18'>")
				  }
				  else if (parseInt(item.rating)==5) {
				  $("#stelleautista"+ item.id_richiesta +"_"+ item.id_autista + "").html("<img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'><img src='img/starselected.png' width='18'>")
				  }
				  
				  
				  
				  
				  }
				  
				  
				  }
				  
				  if(item.Token!=1){
				  $("#offerte44").append("<br><table width='90%' border='0' valign='center' align='center' class='#'><tr><td align='center' width='100%'><font color='#fff'> Nessun passaggio attivo</font></td></tr></table><br><div><img src='img/img.jpg' width='90%' id='contimg'></div>")
				  }
				  
				  });
		   
		   }
		   
           myScroll.refresh();
           $("#spinner44").hide();
		   
		   },
		   error: function(){
		   
            $("#spinner44").hide();
		    /*navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);*/
		   
		   vediofferte44();
		   
		   },
		   dataType:"jsonp"});
	
	

	if(localStorage.getItem("scroller")=="0"){
		/////////SCROLLER///////////////

	
	 
		
		localStorage.setItem("scroller","1");
		
	}
	
	
    setTimeout (function(){
                  
		 myScroll.refresh();
                  
     }, 1000);
		
    

    setTimeout (function(){
                
        myScroll.refresh();
                
    }, 2000);
	
	
	
	refreshPos = setInterval(function() {
		vediofferte44()
	}, 7000);
	
	
}


function scriviRec(score,id_richiesta,id_autista){

        $("#spinner44").show();
		$.ajax({
			   type:"GET",
			   url:"http://msop.it/rides/check_ratingV2.asp",
			   contentType: "application/json",
			   data: {id_autista:id_autista,stelle:score},
			   timeout: 7000,
			   jsonp: 'callback',
			   crossDomain: true,
			   success:function(result){
			   
			   $.each(result, function(i,item){
					navigator.notification.alert(
							'Grazie,recensione effettuata',  // message
							 alertDismissed,         // callback
							 'Attenzione',            // title
							 'Ok'                  // buttonName
					);
					  
					  
                    $("#spinner44").hide();
					accettaofferta(3,id_richiesta,id_autista)
					  
					  
				});
			   
			   
			   },error: function(){
			   
			   $("#spinner44").hide();
               
			   navigator.notification.alert(
											'Possibile errore di rete, riprova tra qualche minuto',  // message
											alertDismissed,         // callback
											'Attenzione',            // title
											'Done'                  // buttonName
											);
			   
			   },
			   dataType:"jsonp"});
	
}



function compraCarta(id_richiesta,id_autista,totale) {
	
	
	var num1 = Math.floor((Math.random() * 20) + 1);
	var num2 = Math.floor((Math.random() * 20) + 1);
	var num3 = Math.floor((Math.random() * 20) + 1);
	var num4 = Math.floor((Math.random() * 20) + 1);
	var num5 = Math.floor((Math.random() * 20) + 1);
	var num6 = Math.floor((Math.random() * 20) + 1);
	var num7 = Math.floor((Math.random() * 20) + 1);
	var num8 = Math.floor((Math.random() * 20) + 1);
	
	transazioneprodotto = id_richiesta+""+num2+""+num3+""+num4+""+num5+""+num6+""+num7+""+num8;
	
	var item_number= transazioneprodotto;
	
	var nome = "";
	var email = localStorage.getItem("email");
	var EmailEsercente = "";
	
	var NomeRegalo = "Trasporto Rides";
	var ordinazione = "Trasporto Rides";
	var Indirizzo = "Address";
	var Telefono = "Tel";
	var amount = totale;
	var amountPunti = 1;
	var OraConsegna = "Ora";
	var Note = id_autista;
	var Richiesta = id_richiesta;
	
	if ((email == "")||(!email)) {
		navigator.notification.alert(
									 'Devi prima effettuare il Login',
									 alertDismissed,
									 'Login',
									 'OK'
									 );
		return;
	}
	
	if (NomeRegalo == "") {
		navigator.notification.alert(
									 'inserire Nome Destinario',
									 alertDismissed,
									 'Nome Destinatario',
									 'OK'
									 );
		return;
	}
	if (Indirizzo == "") {
		navigator.notification.alert(
									 'inserire un indirizzo corretto',
									 alertDismissed,
									 'Indirizzo',
									 'OK'
									 );
		return;
	}
	
	
	if (Telefono == "") {
		navigator.notification.alert(
									 'inserire un telefono valido',
									 alertDismissed,
									 'Telefono',
									 'OK'
									 );
		return;
	}
	
	if (amount == 0) {
		navigator.notification.alert(
									 'Non hai prodotti nel carrello',
									 alertDismissed,
									 'Ordine',
									 'OK'
									 );
		return;
	}
	
	if (OraConsegna == "") {
		navigator.notification.alert(
									 'Non hai inserito un orario di consegna desiderata',
									 alertDismissed,
									 'Ora Consegna',
									 'OK'
									 );
		return;
	}
	
	$(".spinner").show();
	
	
	//email:email,id_prodotto:transazioneprodotto,qta:1,tot:amount,totPunti:amountPunti,transazionemia:transazioneprodotto,NomeProdotto:"Ordine Rides",EmailEsercente:"alessio.niro@gmail.com",idTransazione:"CC",Ordine:ordinazione,Indirizzo:Indirizzo,Telefono:Telefono,OraConsegna:OraConsegna,Note:Note
	
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/Check_TransactionV2.asp",
		   contentType: "application/json",
		   data: {email:email,id_prodotto:transazioneprodotto,qta:1,tot:amount,totPunti:amountPunti,transazionemia:transazioneprodotto,NomeProdotto:"Ordine Rides",EmailEsercente:"alessio.niro@gmail.com",idTransazione:"CC",Ordine:ordinazione,Indirizzo:Indirizzo,Telefono:Telefono,OraConsegna:OraConsegna,Note:Note,Richiesta:id_richiesta},
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  //alert(item.Token)
				  
				  if (item.Token == "1"){
				  
				  var ref = window.open('http://msop.it/rides/wbspaypal.asp?Transprodotto='+ transazioneprodotto +'', '_blank', 'location=no');
				  
				  ref.addEventListener('loadstop', function(event) { if (event.url.match("mobile/close")) { ref.close(); } });
				  
				  }
				  else{
				  navigator.notification.alert(
											   'Possibile errore di rete, riprova tra qualche minuto',  // message
											   alertDismissed,         // callback
											   'Attenzione',            // title
											   'Done'                  // buttonName
											   );
				  }
				  
				  });
		   
		   $(".spinner").hide();
		   
		   },
		   error: function(){
		   $(".spinner").hide();
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto',  // message
										alertDismissed,         // callback
										'Attenzione',            // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
	
	
}


function accettaofferta(id,id_richiesta,id_autista){
	
	//alert("http://purplemiles.com/www2/check_confermapasseggero.php?conferma="+ id +"&id_richiesta="+ id_richiesta +"&id_autista="+ id_autista +"")
	
    $("#spinner44").show();
    
	$("#spinner4").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_confermapasseggero.php?conferma="+ id +"&id_richiesta="+ id_richiesta +"&id_autista="+ id_autista +"&credito="+ localStorage.getItem("nuovocredito") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  
				    vediofferte44()
				  }
				  
				  if(item.Token==2){
				  
				     navigator.notification.alert(
											   'Risulta una richiesta gia in elaborazione.',  // message
											   alertDismissed,         // callback
											   'Attenzione',           // title
											   'OK'                  // buttonName
											   );
				  }
				  
			});
		   
		   $("#spinner4").hide();
		   $("#spinner44").hide();
		   
		   },
		   error: function(){
		   
             $("#spinner4").hide();
             $("#spinner44").hide();
		     navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   
		     vediofferte44()
		   
		   },
		   dataType:"jsonp"});
}



function elimina44(id_richiesta){
	
	
	$("#spinner4").show();
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_elimina.php?id_richiesta="+ id_richiesta +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  
				  $("#spinner4").hide();
				  vediofferte44()
				  }
				  
				  });
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   
		   vediofferte()
		   
		   },
		   dataType:"jsonp"});
}




function scadutaofferta(id,id_richiesta,id_autista){
	
	//alert("Scaduta")
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_confermapasseggeroS1.php?conferma="+ id +"&id_richiesta="+ id_richiesta +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
  
				    resetta1(1)
				  }
				  
			});
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   onResume();
		   
		   },
		   dataType:"jsonp"});
}



function magia2C(utente,pass) {
	
	for(i=0; i<10000; i++)
	{
		window.clearInterval(i);
	}
	
	
	$("#magia").show();
	$("#btninizia").hide();
	$("#btnpass").hide();
	
	
	//posizionegps2();
	
	//var watchID = navigator.geolocation.getCurrentPosition(onSuccess2, onError3, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
	
	var lat = localStorage.getItem("lat");
	var lng = localStorage.getItem("lng");
	
	var posizione = 1;
	var distanza = "";
	
	var centromap = new google.maps.LatLng(lat, lng, posizione);
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_richiesta_autista_id.php?email="+ localStorage.getItem("email") +"&lat="+ localStorage.getItem("lat") +"&lng="+ localStorage.getItem("lng") +"&id_richiesta="+ pass +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  
				  //cambiare icona
				  var icon2a = new google.maps.MarkerImage("img/marker_rosso_1.png", null, null, null, new google.maps.Size(40,40));
				  
				  if(utente==1){
				  var icon2 = new google.maps.MarkerImage("img/marker_rosso_1.png", null, null, null, new google.maps.Size(40,40));
				  stato1 = item.stato
				  localStorage.setItem("id_richietaP1",item.id_richiesta)
				  
				  $("#pass2").hide();
				  $("#pass3").hide();
				  
				  if(item.stato==1){
				  $("#pass1").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass1").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass1").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass1").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  $("#pass1").removeClass("custom-pass").addClass("custom-pass2");
				  $("#pass1").removeClass("custom-pass1").addClass("custom-pass2");
				  $("#pass1").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  if(item.stato==3){
				  $("#pass1").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass1").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass1").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  if(item.stato==1){
				  var icon11 = new google.maps.MarkerImage("img/marker_arancione_3.png", null, null, null, new google.maps.Size(40,40));
				  }
				  if(item.stato==0){
				  var icon11 = new google.maps.MarkerImage("img/marker_fucsia_3.png", null, null, null, new google.maps.Size(40,40));
				  }
				  if(item.stato==2){
				  var icon11 = new google.maps.MarkerImage("img/marker_verde_3.png", null, null, null, new google.maps.Size(40,40));
				  }

				  var dist1 = Math.round(item.distanza1)
				  var dist2 = Math.round(14-Math.log(dist1)/Math.LN2)
				  dist2 = dist2 +1;
				  alert(dist2);
				  
				  map.setZoom(dist2)
				  
				  marker1.setVisible(true);
				  marker1.setIcon(icon11);

				  //marker rosso
				  var latlng5 = new google.maps.LatLng(item.lat1, item.lng1);
				  marker5.setVisible(true);
				  //marker5.setIcon(icon2a);
				  //marker5.setPosition(latlng5);
				  
				  marker5 = new google.maps.Marker ({
													map : map,
													icon: icon2a,
													optimized: false,
													position : latlng5,
													content:'<div class="popup">Arrivo<br>Km'+ item.distanza1 +'</div>',
													title: item.nick,
													zIndex: -19
													});
				  
				  google.maps.event.addListener(marker5, 'click', function() {
												
												infowindow.setContent(this.content);
												infowindow.open(map, this);
												
												});
				  
				  
				  
				  
				  var isVisible3 = marker3.getVisible();
				  if(isVisible3){
				  marker3.setVisible(false);
				  }
				  
				  
				  var isVisible4 = marker4.getVisible();
				  if(isVisible4){
				  marker4.setVisible(false);
				  

				  }
				  
				  
				  
				  }
				  
				  if(utente==2){
				  var icon3a = new google.maps.MarkerImage("img/marker_rosso_2.png", null, null, null, new google.maps.Size(40,40));
				  stato2 = item.stato
				  localStorage.setItem("id_richietaP2",item.id_richiesta)
				  $("#pass1").hide();
				  $("#pass3").hide();
				  $("#pass2").show();
				  
				  if(item.stato==1){
				  $("#pass2").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass2").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass2").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass2").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  $("#pass2").removeClass("custom-pass").addClass("custom-pass2");
				  $("#pass2").removeClass("custom-pass1").addClass("custom-pass2");
				  $("#pass2").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  if(item.stato==3){
				  $("#pass2").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass2").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass2").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  marker1.setVisible(false);
				  
				  marker3.setVisible(true);
				  marker3.setIcon(icon3a);
				  
				  var isVisible4 = marker4.getVisible();
				  if(isVisible4){
				  marker4.setVisible(false);
				  }
				  
				  
				  }
				  
				  if(utente==3){
				  var icon4a = new google.maps.MarkerImage("img/marker_rosso_3.png", null, null, null, new google.maps.Size(40,40));
				  stato3 = item.stato
				  localStorage.setItem("id_richietaP3",item.id_richiesta)
				  $("#pass1").hide();
				  $("#pass2").hide();
				  $("#pass3").show();
				  
				  if(item.stato==1){
				  $("#pass3").removeClass("custom-pass").addClass("custom-pass1");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass1");
				  $("#pass3").removeClass("custom-pass3").addClass("custom-pass1");
				  }
				  if(item.stato==0){
				  $("#pass3").removeClass("custom-pass1").addClass("custom-pass");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass");
				  $("#pass3").removeClass("custom-pass3").addClass("custom-pass");
				  }
				  if(item.stato==2){
				  $("#pass3").removeClass("custom-pass").addClass("custom-pass2");
				  $("#pass3").removeClass("custom-pass1").addClass("custom-pass2");
				  $("#pass3").removeClass("custom-pass3").addClass("custom-pass2");
				  }
				  if(item.stato==3){
				  $("#pass3").removeClass("custom-pass").addClass("custom-pass3");
				  $("#pass3").removeClass("custom-pass1").addClass("custom-pass3");
				  $("#pass3").removeClass("custom-pass2").addClass("custom-pass3");
				  }
				  
				  marker1.setVisible(false);
				  marker3.setVisible(false);
				  
				  marker4.setVisible(true);
				  marker4.setIcon(icon4a);
				  
				  }
				  
				  
				  posizione = (posizione+1);
				  
				  }
				  else{
				  //marker1.setMap(null);
				  }
				  
				  });
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
	
	
	localStorage.setItem("fatto","1")
	
	

	//---------------------------
	
	function posizionegps2(){
		
		refreshPos = setInterval(function() {
			var watchID = navigator.geolocation.getCurrentPosition(onSuccess2, onError3, {timeout: 10000, enableHighAccuracy: false, maximumAge: 0 });
			//onSuccess2();
		}, 3000);
	}
	
	function onSuccess22(position) {
			var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
			var icon = new google.maps.MarkerImage("img/autista.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
			
			marker2.setIcon(iconn);
			
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
			
			localStorage.setItem("lat", lat)
			localStorage.setItem("lng", lng)
			
			//var lat = localStorage.getItem("lat");
			//var lng = localStorage.getItem("lng");
			var latlng = new google.maps.LatLng(lat, lng);
			
			marker2.setIcon(icon);
			marker2.setPosition(latlng);
		
		    if(muoviti==1){
			  map.setCenter(latlng);
			  //alert(muoviti);
		    }
			//map.setCenter(latlng);
			
			//localStorage.setItem("lat", ciao)
            //localStorage.setItem("lng", ciao1)
	}
	
	function onSuccess222(position) {
		
		var iconn = new google.maps.MarkerImage("img/1p.png", null, null, null, new google.maps.Size(1,1));
		//marker2.setIcon(iconn);
		
		var posizione = Math.round(position.coords.heading);
		
		if((posizione > 0)&&(posizione <= 10)){
			var icon = new google.maps.MarkerImage("img_autista/car_010.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 10)&&(posizione <= 20)){
			var icon = new google.maps.MarkerImage("img_autista/car_020.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 20)&&(posizione <= 30)){
			//$("#rispondi").html("<img src='img_autista/car_030.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_030.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 30)&&(posizione <= 40)){
			//$("#rispondi").html("<img src='img_autista/car_040.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_040.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 40)&&(posizione <= 50)){
			//$("#rispondi").html("<img src='img_autista/car_050.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_050.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 50)&&(posizione <= 60)){
			//$("#rispondi").html("<img src='img_autista/car_060.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_060.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 60)&&(posizione <= 70)){
			//$("#rispondi").html("<img src='img_autista/car_070.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_070.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 70)&&(posizione <= 80)){
			//$("#rispondi").html("<img src='img_autista/car_080.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_080.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 80)&&(posizione <= 90)){
			//$("#rispondi").html("<img src='img_autista/car_090.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_090.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 90)&&(posizione <= 100)){
			//$("#rispondi").html("<img src='img_autista/car_100.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_100.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 100)&&(posizione <= 110)){
			//$("#rispondi").html("<img src='img_autista/car_110.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_110.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 110)&&(posizione <= 120)){
			//$("#rispondi").html("<img src='img_autista/car_120.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_120.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 120)&&(posizione <= 130)){
			//$("#rispondi").html("<img src='img_autista/car_130.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_130.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 130)&&(posizione <= 140)){
			//$("#rispondi").html("<img src='img_autista/car_140.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_140.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 140)&&(posizione <= 150)){
			//$("#rispondi").html("<img src='img_autista/car_150.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_150.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 150)&&(posizione <= 160)){
			//$("#rispondi").html("<img src='img_autista/car_160.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_160.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 160)&&(posizione <= 170)){
			//$("#rispondi").html("<img src='img_autista/car_170.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_170.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 170)&&(posizione <= 180)){
			//$("#rispondi").html("<img src='img_autista/car_180.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_180.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 180)&&(posizione <= 190)){
			//$("#rispondi").html("<img src='img_autista/car_190.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_190.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 190)&&(posizione <= 200)){
			//$("#rispondi").html("<img src='img_autista/car_200.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_200.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 200)&&(posizione <= 210)){
			//$("#rispondi").html("<img src='img_autista/car_210.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_210.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 210)&&(posizione <= 220)){
			//$("#rispondi").html("<img src='img_autista/car_220.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_220.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 220)&&(posizione <= 230)){
			//$("#rispondi").html("<img src='img_autista/car_230.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_230.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 230)&&(posizione <= 240)){
			//$("#rispondi").html("<img src='img_autista/car_240.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_240.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 240)&&(posizione <= 250)){
			//$("#rispondi").html("<img src='img_autista/car_250.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_250.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 250)&&(posizione <= 260)){
			//$("#rispondi").html("<img src='img_autista/car_260.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_260.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 260)&&(posizione <= 270)){
			//$("#rispondi").html("<img src='img_autista/car_270.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_270.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 270)&&(posizione <= 280)){
			//$("#rispondi").html("<img src='img_autista/car_280.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_280.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 280)&&(posizione <= 290)){
			//$("#rispondi").html("<img src='img_autista/car_290.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_290.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 290)&&(posizione <= 300)){
			//$("#rispondi").html("<img src='img_autista/car_300.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_300.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 300)&&(posizione <= 310)){
			//$("#rispondi").html("<img src='img_autista/car_310.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_310.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 310)&&(posizione <= 320)){
			//$("#rispondi").html("<img src='img_autista/car_320.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_320.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 320)&&(posizione <= 330)){
			//$("#rispondi").html("<img src='img_autista/car_330.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_330.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 330)&&(posizione <= 340)){
			//$("#rispondi").html("<img src='img_autista/car_340.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_340.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else if((posizione > 340)&&(posizione <= 350)){
			//$("#rispondi").html("<img src='img_autista/car_350.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_350.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		else{
			//$("#rispondi").html("<img src='img_autista/car_000.png'>")
			var icon = new google.maps.MarkerImage("img_autista/car_000.png", null, null, new google.maps.Point(25, 25), new google.maps.Size(50,50));
		}
		
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		
		localStorage.setItem("lat", lat)
		localStorage.setItem("lng", lng)
		
		//var lat = localStorage.getItem("lat");
		//var lng = localStorage.getItem("lng");
		var latlng = new google.maps.LatLng(lat, lng);
		
		marker2.setIcon(icon);
		marker2.setPosition(latlng);
		
		if(muoviti==1){
			map.setCenter(latlng);
			//alert(muoviti);
		}
		

	}
	
	
	function onError2(error) {
		//var watchID = navigator.geolocation.watchPosition(onSuccess2, onError3, { timeout: 80000 });
		navigator.geolocation.watchPosition(onSuccess2, onError3, {timeout: 50000, enableHighAccuracy: false, maximumAge: 0 });
	}
	
	function onError3(error) {
		localStorage.setItem("geostory", "NO")
		
		window.location.href = "index.html";
	}
	
	
}


function magia3() {
	var pass = item1;
	$("#blob").hide();
	//magia(1,pass)
}



function cancella(id){
	
	 $.ajax({
	 type:"GET",
	 url:"http://msop.it/rides/check_cancella.php?id="+ id +"&id_autista="+ localStorage.getItem("id_autista") +"",
	 contentType: "application/json",
	 //data: {ID: "Lazio"}, LIMIT 10
	 timeout: 7000,
	 jsonp: 'callback',
	 crossDomain: true,
	 success:function(result){
	 
	 $.each(result, function(i,item){
		
			if(item.Token==1){
			   // window.location.href = "index.html?id=1";
			
			   /*$("#pass1").hide();
			   $("#pass2").hide();
			   $("#pass3").hide();
			   $("#esci").hide();

			
			$("#btninizia").show();*/
			
			//localStorage.setItem("exitto", "1")
			
			
			for(i=0; i<10000; i++)
			{
			window.clearInterval(i);
			}
			
			//setTimeout(function() {
			//localStorage.setItem("geostory", "NO")
			//clearInterval(refreshIntervalId33);
			//window.location.href = "index.html?id=1";
			//onResume();
			//}, 200);
			
			//window.location.href = "#win2";
			//onDeviceReady();
			
			vediofferte()
			//window.location.href = "map2.html?id=1";
			
			}
			else{
			 navigator.notification.alert(
										 'Impossibile cancellare la richiesta.',  // message
										  alertDismissed,         // callback
										 'Attenzione',           // title
										 'Done'                  // buttonName
										 );

			}
	 });
	 
	 
	 },
	 error: function(){
	 
	 navigator.notification.alert(
	 'Possibile errore di rete, riprova tra qualche minuto.',  // message
	 alertDismissed,         // callback
	 'Attenzione',           // title
	 'Done'                  // buttonName
	 );
	 
	 },
	 dataType:"jsonp"});
	 
}

function casa(){
	window.location.href = "index.html";
	
	}

function start() {
	//chiamo e setto a 1 lo stato dell'autista (ok lavoro)
	
	$("#setGPS").hide();
	$("#Modifica").hide();
	$("#esci").hide();
	
	$("#btninizia").hide();
	$("#loading").show();
	
	if(localStorage.getItem("setGPS") == 1){
	//resetta1(1);
	 prendivia()
	}
	else
	{
	  resetta1(1);
	}
}


function palla1() {
	//chiamo e leggo=1
	if(localStorage.getItem("exit")=="0"){
	  $("#blob").show();
    }
	$("#btninizia").hide();
	
	
	$("#btnpass").show();
	
	localStorage.setItem("palla1", "1")
	localStorage.setItem("exit", "1")
	
}

function palla2() {

	$("#blob3").show();
	$("#btninizia").hide();
	$("#pass2").show();
	
	localStorage.setItem("palla2", "1")
}

function resetta22() {
	//chiamo e leggo=1
	$("#blob").show();
	$("#btninizia").hide();
	$("#btnpass").show();
	
}

function richiesta1() {
	
	$.mobile.changePage( "#home4", { transition: "slide", changeHash: false });
	
	id = item1
	
	$("#risp1").show();
	$("#risp2").hide();
	$("#gps22").hide();
	$("#risp3").hide();
	$("#gps3").hide();
	
	$("#close3").hide();
	$("#close2").hide();
	$("#close1").show();
	
	$("#xchiudi2").hide();
	$("#xchiudi3").hide();
	$("#xchiudi1").show();
	
	$("#code1").hide();
	$("#code1").html("");
	$("#code2").hide();
	$("#code2").html("");
	$("#code3").hide();
	$("#code3").html("");
	
	$("#chat1").hide();
	$("#chat2").hide();
	$("#chat3").hide();
	
	localStorage.setItem("id_richiesta", id)
	
	$("#blob2").show();
	
				  
				  $("#nickhome4").html("<a id='linknick1' href='#' class='noblu'><font color='#fff'>"+ nick1 +"</font></a>");
	
				  localStorage.setItem("id_nick", nick1)
				  $("#nickhome3").html("<font color='#fff'>"+ nick1 +"</font>");
				  
				  $("#quando").html("<b>Data: </b><font color='#cc33cc'>"+ quando1 +"</font>, <b>Ora: </b><font color='#cc33cc'>"+ ora1 +"</font>");
				  
				  $("#Da").html("<b>Da: </b><font color='#cc33cc'>"+ partenza1 +"</font>");
				  
				  $("#Ad").html("<b>A: </b><font color='#cc33cc'>"+ arrivo1 +"</font>");
				  
				  $("#distanza").html("<b>Distanza: </b><font color='#cc33cc'>"+ distanza1 +"</font>");
	
	
	              if(stato1==0){
		            $("#4img").html("<img src='img/1_viola.png' width='30'>");
	              }
	
				  if(stato1!=0){
					$("#risp1").hide();
				  }
	
				  if(stato1==1){
					  $("#4img").html("<img src='img/1_giallo.png' width='30'>");
				  }

				  if(stato1==2){
					  
				   $("#gps1").show();
					  
				   $("#code1").show();
				   $("#code1").html("<b>Codice Commento : " + cod1 + "</b>");
					  
				   $("#chat1").show();
					  
				   $("#risp1").hide();
					  
					  $("#close3").hide();
					  $("#close2").hide();
					  $("#close1").show();
					  
				   $("#4img").html("<img src='img/1_verde.png' width='30'>");
				  
				   $(document).on("tap", "#gps1", function(e){
						
						var addressLongLat = lat1+","+lng1;
	
						window.open("google.navigation:q="+ addressLongLat +"&mode=d" , '_system');
						
						$("#blob2").hide();
								 
						e.stopImmediatePropagation();
								 
						e.preventDefault();
								 
						return false;
								 
				   });
					  
					  $(document).on("tap", "#chat1", function(e){
									 
							chatting(1,id)
									 
							$("#blob2").hide();
									 
							e.stopImmediatePropagation();
									 
							e.preventDefault();
									 
							return false;
									 
						});
					  
				  
				  }
				  else{
					  if(stato1==3){
						  //conteggio dei 30 secondi
					  }
					 
					$("#gps1").hide();
					  
					$("#close1").show();
					$("#close2").hide();
					$("#close3").hide();
					
				  }
	
	
	$("#xchiudi1").show();
	$("#xchiudi2").hide();
	$("#xchiudi3").hide();
	
	$("#xchiudi11").show();
	$("#xchiudi22").hide();
	$("#xchiudi33").hide();
	
	$(document).on("tap", "#linknick1", function(e){
				   
				   //http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida="+localStorage.getItem("id_autista")+"&pm="+localStorage.getItem("md5")+"
				   
				   var ref = window.open('http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida='+localStorage.getItem("id_autista")+'&pm='+localStorage.getItem("md5")+'', '_system', 'location=no');
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   });
	
	
	$(document).on("touchstart", "#xchiudi1", function(e){
				   $.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
		           $("#blob2").hide();
				   magia2C(1,id)
		
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;

	});
	
	$(document).on("touchstart", "#xchiudi11", function(e){
				   
				   $("#blob2").hide();
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
	});

	$(document).on("touchstart", "#close1", function(e){
		$("#pass1").hide();
				   
		$("#blob2").hide();
		cancella(id)
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;

	});
	
	$(document).on("tap", "#risp1", function(e){
				   
				   $.mobile.changePage ($("#home3"));
				   
				   	setTimeout(function() {
						$("#tblrispondi").fadeIn(1500)
					}, 500);
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
	});
	
}

function richiesta2() {
	
	$.mobile.changePage( "#home4", { transition: "slide", changeHash: false });
	
	id = item2
	$("#risp1").hide();
	$("#gps1").hide();
	$("#risp2").show();
	$("#risp3").hide();
	$("#gps3").hide();
	
	$("#code1").hide();
	$("#code1").html("");
	$("#code2").hide();
	$("#code2").html("");
	$("#code3").hide();
	$("#code3").html("");
	
	$("#close3").hide();
	$("#close2").show();
	$("#close1").hide();
	
	$("#chat1").hide();
	$("#chat2").hide();
	$("#chat3").hide();
	
	$("#xchiudi1").hide();
	$("#xchiudi3").hide();
	$("#xchiudi2").show();
	
	localStorage.setItem("id_richiesta", id)
	
	$("#blob2").show();
	
				  
				  $("#nickhome4").html("<font color='#fff'><a id='linknick2' href='#' class='noblu'><font color='#fff'>"+ nick2 +"</font></a></font>");
				  $("#nickhome3").html("<font color='#fff'>"+ nick2 +"</font>");
				  
				   $("#quando").html("<b>Data: </b><font color='#cc33cc'>"+ quando2 +"</font>, <b>Ora: </b><font color='#cc33cc'>"+ ora2 +"</font>");
				  
				  $("#Da").html("<b>Da: </b><font color='#cc33cc'>"+ partenza2 +"</font>");
				  
				  $("#Ad").html("<b>A: </b><font color='#cc33cc'>"+ arrivo2 +"</font>");
				  
				  $("#distanza").html("<b>Distanza: </b><font color='#cc33cc'>"+ distanza2 +"</font>");
	
	
				  if(stato2==0){
					 $("#4img").html("<img src='img/2_viola.png' width='30'>");
				  }
	
				  if(stato2!=0){
					$("#risp2").hide();
				  }
	
				  if(stato2==1){
					 $("#4img").html("<img src='img/2_giallo.png' width='30'>");
				  }
	
				  if(stato2==2){
					  
				   $("#gps22").show();
				   $("#risp2").hide();
					  
				   $("#code2").show();
				   $("#code2").html("<b>Codice Commento : " + cod2 + "</b>");
					  
				   $("#4img").html("<img src='img/2_verde.png' width='30'>");
					  
				   $("#chat2").show();
					  
					  $("#close3").hide();
					  $("#close2").show();
					  $("#close1").hide();
				  
					  $(document).on("tap", "#gps22", function(e){

								 var addressLongLat = lat2+","+lng2;

	                            window.open("google.navigation:q="+ addressLongLat +"&mode=d" , '_system');
	
								 $("#blob2").hide();
								 
								 e.stopImmediatePropagation();
								 
								 e.preventDefault();
								 
								 return false;
								 
						});
					  
					  $(document).on("tap", "#chat2", function(e){
									 
									 chatting(2,id)
									 
									 $("#blob2").hide();
									 
									 e.stopImmediatePropagation();
									 
									 e.preventDefault();
									 
									 return false;
									 
									 });
				  
				  }
				  else{
					$("#rif2").html("Rifiuta");
					  
					  $("#close2").show();
					  $("#close1").hide();
					  $("#close3").hide();
				  }



	
	$("#xchiudi2").show();
	$("#xchiudi1").hide();
	$("#xchiudi3").hide();
	
	$("#xchiudi22").show();
	$("#xchiudi11").hide();
	$("#xchiudi33").hide();
	
	$(document).on("tap", "#linknick2", function(e){
				   
				   //http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida="+localStorage.getItem("id_autista")+"&pm="+localStorage.getItem("md5")+"
				   
				   var ref = window.open('http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida='+localStorage.getItem("id_autista")+'&pm='+localStorage.getItem("md5")+'', '_system', 'location=no');
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   });

	
	$(document).on("touchstart", "#xchiudi2", function(e){
				   $.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
				   $("#blob2").hide();
				   magia2C(2,id)
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   });
	
	$(document).on("touchstart", "#xchiudi22", function(e){
				   
				   $("#blob2").hide();
				   
	});

	$(document).on("touchstart", "#close2", function(e){
	$("#pass2").hide();
	$("#blob2").hide();
	cancella(id)
	
		
	e.stopImmediatePropagation();
		
	e.preventDefault();
		
	return false;
	});
	
	$(document).on("touchstart", "#risp2", function(e){
				   $("#blob2").hide();
				    $.mobile.changePage ($("#home3"));
					
					setTimeout(function() {
						$("#tblrispondi").fadeIn(1500)
					}, 500);
				   
				   });
	
}

function richiesta3() {
	
	$.mobile.changePage( "#home4", { transition: "slide", changeHash: false });
	
	
	id = item3
	$("#risp3").show();
	$("#risp2").hide();
	$("#gps22").hide();
	$("#risp1").hide();
	$("#gps1").hide();
	
	$("#close3").show();
	$("#close2").hide();
	$("#close1").hide();
	
	$("#code1").hide();
	$("#code1").html("");
	$("#code2").hide();
	$("#code2").html("");
	$("#code3").hide();
	$("#code3").html("");
	
	$("#chat1").hide();
	$("#chat2").hide();
	$("#chat3").hide();
	
	$("#xchiudi2").hide();
	$("#xchiudi1").hide();
	$("#xchiudi3").show();
	
	//alert(2)
	localStorage.setItem("id_richiesta", id)
	
	$("#blob2").show();
	

				  $("#nickhome4").html("<font color='#fff'><a id='linknick3' href='#' class='noblu'><font color='#fff'>"+ nick3 +"</font></a></font>");
				  $("#nickhome3").html("<font color='#fff'>"+ nick3 +"</font>");
				  
				   $("#quando").html("<b>Data: </b><font color='#cc33cc'>"+ quando3 +"</font>, <b>Ora: </b><font color='#cc33cc'>"+ ora3 +"</font>");
				  
				  $("#Da").html("<b>Da: </b><font color='#cc33cc'>"+ partenza3 +"</font>");
				  
				  $("#Ad").html("<b>A: </b><font color='#cc33cc'>"+ arrivo3 +"</font>");
				  
				  $("#distanza").html("<b>Distanza: </b><font color='#cc33cc'>"+ distanza3 +"</font>");
	
	if(stato3==0){
		$("#4img").html("<img src='img/3_viola.png' width='30'>");
	}
	
				  if(stato3!=0){
				    $("#risp3").hide();
				  }
	
	if(stato3==1){
		$("#4img").html("<img src='img/3_giallo.png' width='30'>");
	}
	
	
				  if(stato3==2){
				  $("#gps3").show();
				  $("#risp3").hide();
				  $("#code3").show();
					  
				  $("#code3").html("<b>Codice Commento : " + cod3 + "</b>");
				  $("#chat3").show();
					  
				  $("#4img").html("<img src='img/3_verde.png' width='30'>");
				  
				  $("#close3").show();
				  $("#close2").hide();
				  $("#close1").hide();
				  
				  $(document).on("tap", "#gps3", function(e){

						var addressLongLat = lat3+","+lng3;
	
	
	                             window.open("google.navigation:q="+ addressLongLat +"&mode=d" , '_system');
	
								 $("#blob2").hide();
								 
								 e.stopImmediatePropagation();
								 
								 e.preventDefault();
								 
								 return false;
								 
						 });
					  
					  $(document).on("tap", "#chat3", function(e){
									 
									 chatting(3,id)
									 
									 $("#blob2").hide();
									 
									 e.stopImmediatePropagation();
									 
									 e.preventDefault();
									 
									 return false;
									 
									 });
				  
				  }
				  else{
				    $("#rif3").html("Rifiuta");
					  
				  }
				  
				 
	
	
	$("#xchiudi3").show();
	$("#xchiudi2").hide();
	$("#xchiudi1").hide();
	
	$("#xchiudi33").show();
	$("#xchiudi22").hide();
	$("#xchiudi11").hide();
	
	
	$(document).on("tap", "#linknick3", function(e){
				   
				   //http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida="+localStorage.getItem("id_autista")+"&pm="+localStorage.getItem("md5")+"
				   
				   var ref = window.open('http://www.purplemiles.com/www/profilo_passeggero.php?idp=19&ida='+localStorage.getItem("id_autista")+'&pm='+localStorage.getItem("md5")+'', '_system', 'location=no');
				   
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   });

	
	
	$(document).on("touchstart", "#xchiudi3", function(e){
				   $.mobile.changePage( "#win2", { transition: "slide", changeHash: false, reverse: true });
				   $("#blob2").hide();
				   magia2C(3,id)
				   
				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;
				   
				   });
	
	$(document).on("tap", "#xchiudi33", function(e){
			$("#blob2").hide();
				   
		});
	
	$(document).on("tap", "#close3", function(e){
				   $("#pass3").hide();
				   $("#blob2").hide();
				   
				   cancella(id)

				   e.stopImmediatePropagation();
				   
				   e.preventDefault();
				   
				   return false;

				   });
	
	$(document).on("tap", "#risp3", function(e){
				   $("#blob2").hide();
				   $.mobile.changePage ($("#home3"));
				   
				     setTimeout(function() {
						$("#tblrispondi").fadeIn(1500)
					}, 500);

				   });
	
}

function lista5() {
	
	$.mobile.changePage( "#home5", { transition: "slide", changeHash: false });

	$("#nickhome5").html(localStorage.getItem("nick"));
	
	//alert("http://purplemiles.com/www2/check_stato2.php?id_autista="+ localStorage.getItem("id_autista") +"")
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_stato2.php?id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  
				  $("#offerte5").html("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='center'><div class='custom-pass22'><font color='#fff' size='4'>"+ item.nick +"</font></div></tr><tr><td align='left'><font color='#cc33cc' size='5'><b><div id='timer2'></div></b></font><br><b>Prezzo: </b>"+ item.importo +"<br><b>Quando: </b>"+ item.quando +"<br><b>Ora: </b>"+ item.ora +"<br><br><b>Partenza: </b>"+ item.partenza +"<br><b>Arrivo: </b>"+ item.arrivo +"</td></tr></table>");
				  }
				  else{
					 $("#offerte5").html("<br><table width='90%' border='0' valign='center' align='center' class='tabella'><tr><td align='center'><img src='img/Logo.png' width='160px'><br></td></tr><tr><td align='center'>Nessuna Richiesta Posticipata<br></td></tr></table>")
				  }
			});
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   onResume();
		   
		   },
		   dataType:"jsonp"});
	
	
	
	

}

function chatting(pass,id) {
	$("#nickhome6").html(localStorage.getItem("nick"));
	//$("#spinner6").show();
	
	
	for(i=0; i<10000; i++)
	{
		window.clearInterval(i);
	}
	
	
	$.mobile.changePage( "#home6", { transition: "slide", changeHash: false });
	
	setTimeout(function() {
		$("#tblchat").fadeIn(1500)
	}, 500);
	
	
	//alert("http://purplemiles.com/www2/check_stato2.php?id_autista="+ localStorage.getItem("id_autista") +"")
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/leggi_chat.php?id_richiesta="+ localStorage.getItem("id_richiesta") +"&last_id=0",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   if(localStorage.getItem("chatpass")==JSON.stringify(result)){
		   //alert("Uguali")
		   $("#spinner6").hide();
		   }
		   else{
		   $("#offerta6").html("");
		   $("#spinner6").hide();
		   
		   $.each(result, function(i,item){
				  
			   localStorage.setItem("chatpass", JSON.stringify(result))
				  
			   if(item.Token==1){
				  
				  if(item.nick==localStorage.getItem("nick")){
				    //$("#offerta6").append("<br><br><table width='70%' border='0' valign='center' align='left' class='tabella'><tr><td align='center'><div class='custom-pass33'><font color='#fff' size='4'>"+ item.nick +"</font></div></tr><tr><td align='left'><br><b>Mesaggio: </b>"+ item.messaggio +"<br><b>Data: </b>"+ item.data +"</td></tr></table>");
				       $("#offerta6").append("<div class='bubbledLeft'>"+ item.messaggio +"</div>")
				    }
				  else{
					   //$("#offerta6").append("<br><br><table width='70%' border='0' valign='center' align='right' class='tabella'><tr><td align='center'><div class='custom-pass22'><font color='#fff' size='4'>"+ item.nick +"</font></div></tr><tr><td align='left'><br><b>Mesaggio: </b>"+ item.messaggio +"<br><b>Data: </b>"+ item.data +"</td></tr></table>");
				        $("#offerta6").append("<div class='bubbledRight'>"+ item.messaggio +"</div>")
				    }
				  
				}
				  
			});
		   
		   }
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   onResume();
		   
		   },
		   dataType:"jsonp"});
	
	
	refreshPos = setInterval(function() {
		chatting(pass,id)
	}, 5000);
	
	
	
}


function inviachat() {
	var indirizzo = document.getElementById("chattext").value.replace("'", "")
	$("#spinner6").show();
	//alert(localStorage.getItem("id_richiesta"))
	
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/pubblica_chat.php?id_messaggio="+ localStorage.getItem("id_richiesta") +"&nick="+ localStorage.getItem("nick") +"&messaggio="+ indirizzo +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				    document.getElementById("chattext").value="";
					
				  }
				  
				  });
		   
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   onResume();
		   
		   },
		   dataType:"jsonp"});

}


// ACCETTA - RIFIUTA


function accetta11() {
	id = item1
	$("#blob3").hide();
	$("#loading").show();
	$("#esci").hide();
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_accettaautista.php?id="+ id +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				   //alert(item.Token)
				  
				    resetta1(1);
				  
				  }
				  else{
				    navigator.notification.alert(
											   'Richiesta elaborata da altro utente.',  // message
											   alertDismissed,         // callback
											   'Attenzione',           // title
											   'Done'                  // buttonName
											   );
				  
				  }
			});
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	}


function rifiuta1() {
	id = item1
	
	
	$("#blob3").hide();
	cancella(id)
	
}

function accetta22() {
	id = item2
	
	$("#blob4").hide();
	$("#loading").show();
	$("#esci").hide();
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_accettaautista.php?id="+ id +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  //alert(item.Token)
				  
				  resetta1(1);
				  
				  }
				  else{
				    navigator.notification.alert(
											   'Richiesta elaborata da altro utente.',  // message
											   alertDismissed,         // callback
											   'Attenzione',           // title
											   'Done'                  // buttonName
											   );
				  
				  }
				  });
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
	
}

function accetta33() {
	id = item3
	
	$("#blob5").hide();
	$("#loading").show();
	$("#esci").hide();
	
	$.ajax({
		   type:"GET",
		   url:"http://purplemiles.com/www2/check_accettaautista.php?id="+ id +"&id_autista="+ localStorage.getItem("id_autista") +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){
				  //alert(item.Token)
				  
				  resetta1(1);
				  
				  }
				  else{
				    navigator.notification.alert(
											   'Richiesta elaborata da altro utente.',  // message
											   alertDismissed,         // callback
											   'Attenzione',           // title
											   'Done'                  // buttonName
											   );
				  
				  }
				  });
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
	
}



function rifiuta2() {
	id = item2
	
	
	$("#blob4").hide();
	cancella(id)
	
}

function rifiuta3() {
	id = item3
	
	
	$("#blob5").hide();
	cancella(id)
	
}





function inviopasseggero(come,id_richiesta){
	
	if(come==1){
	  var coming = "gratis"
	}
	
	if(come==3){
		if (self.document.formia.soldini.value == "") {
			navigator.notification.alert(
										 'inserire un importo',  // message
										 alertDismissed,         // callback
										 'Pin',            // title
										 'OK'                  // buttonName
										 );
			return;
		}

		
		var coming = self.document.formia.soldini.value;
	}
	
	if(come==2){
		var coming = "offerta";
	}
	
	
	$.ajax({
		   type:"GET",
		   url:"http://msop.it/rides/check_inviopasseggero.php?id="+ id_richiesta +"&note=note&importo="+ coming +"&id_autista="+ localStorage.getItem("id_autista") +"&targa="+ document.getElementById("targa").value +"",
		   contentType: "application/json",
		   //data: {ID: "Lazio"}, LIMIT 10
		   timeout: 7000,
		   jsonp: 'callback',
		   crossDomain: true,
		   success:function(result){
		   
		   $.each(result, function(i,item){
				  
				  if(item.Token==1){

				  
				  vediofferte()
				  
				  e.stopImmediatePropagation();
				  
				  e.preventDefault();
				  
				  
				  }
				  else{
				  navigator.notification.alert(
											   'Impossibile elaborare la richiesta.',  // message
											   alertDismissed,         // callback
											   'Attenzione',           // title
											   'Done'                  // buttonName
											   );
				  
				  }
				  });
		   
		   
		   },
		   error: function(){
		   
		   navigator.notification.alert(
										'Possibile errore di rete, riprova tra qualche minuto.',  // message
										alertDismissed,         // callback
										'Attenzione',           // title
										'Done'                  // buttonName
										);
		   
		   },
		   dataType:"jsonp"});
	
}


function chiudix() {
	
	$("#blob2").hide();
}


function chiudi22(id) {
	
		$("#blob").hide();
}



function regToken() {
	
	if (localStorage.getItem("Token") === null || typeof(localStorage.getItem("Token")) == 'undefined' || localStorage.getItem("Token")=="null") {
		
		return;
	}
	else
	{
		
		$(".spinner").show();
		$.ajax({
			   type:"GET",
			   url:"http://www.msop.it/rides/Check_RegToken.asp?email="+ localStorage.getItem("email") +"&token="+ localStorage.getItem("Token") +"&platform=ios",
			   //data: {token:localStorage.getItem("Token")},
			   contentType: "application/json; charset=utf-8",
			   json: 'callback',
			   timeout: 7000,
			   crossDomain: true,
			   success:function(result){
			   
			   
			   setTimeout (function(){
						   //checkpush()
						   }, 500);
			   
			   },
			   error: function(){
			   
			   
			   $(".spinner").hide();
			   
			   
			   /*navigator.notification.alert(
				'Nessuna Connessione Internet, Riprova Tra Qualche Minuto',  // message
				alertDismissed,         // callback
				'Connessione Internet',            // title
				'OK'                  // buttonName
				);*/
			   
			   
			   },
			   dataType:"json"});
	}
}



function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
						  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						  results = regex.exec(location.search);
						  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
						  }
