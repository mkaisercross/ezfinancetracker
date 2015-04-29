


    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      //console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //

      smallImage.src = "data:image/jpeg;base64," + imageData;

      /*$.ajax({
	type: "POST",
	url: "http://45.55.160.70/upload_image.php",
	data: imageURI,
	success: function() {
            $("body").append("<p> success </p>");
        },
        error: function() {
            $("body").append("<p> fail </p>");
        }
      });
      //$("body").append("<p> upload successful </p>");
     */
      var myRequest = new XMLHttpRequest();
      myRequest.open("POST", "http://45.55.160.70/upload_image.php", false);
      myRequest.send(imageData);
      /*$("body").append("<p> upload successful </p>");*/
      $("body").html(myRequest.responseText);      
      /*
      var imgData = JSON.stringify(imageData);
      $.ajax({
	url: "http://45.55.160.70/upload_image.php",
	dataType: 'json',
	data: imageData,
	type: 'POST',
        success: function(data) {
  	  console.log(data);
	}
      });*/

    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      //console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //

      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;

    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
	
	 
    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }
	
