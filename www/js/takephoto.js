


    $('#loading').css("display", "none");

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //

    $(".content").on("click", "#capture-photo", function() {
        capturePhoto();        
        $('#choose-capture-type').css("display", "none");

    });

    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }



    function getEditModeHtml() {
      var editModeHtml = 
	'<form id="login" class="pure-form pure-form-stacked login" action="splash.html" method="pre">' +
	  '<fieldset>' +
	    '<label for="store_name">Store Name</label>' +
	    '<input class="store_name" type="text" name="" required value="" >' +
	    '<label for="purchase_date">Purchase Date</label>' +
	    '<input class="purchase_date" type="text" name="" required value="" >' +
	    '<style>' +
		'.editModeItem { margin-left: 10px; float: left; clear: right;}' +
		'.editModeItem label { float: left; clear: left;}' +
		'.editModeItem input { float: left; }' +
	    '</style>' +
	    '<label for="">Item </label>' +
	    '<div class="editModeItem" style="margin-left: 20px;">' +
	      '<table class="pure-table pure-table-horizontal">' +
      	         '<tbody>' +
		  '<tr>' +
		    '<td><label for="item-name">Name</label></td>' +
		    '<td><input class="item-name" type="text" name="" required value="" ></td>' +
		  '</tr>' +
		  '<tr>' +
		    '<td><label for="item-price">Price</label></td>' +
		    '<td><input class="item-price" type="text" name="" required value="" ></td>' +
		  '</tr>' +
		  '<tr>' +
		    '<td><label for="item-category">Category</label></td>' +
		    '<td><input class="item-category" type="text" name="" required value="" ></td>' +
		  '</tr>' +
		'</tbody>' +
	      '</table>' +
	    '</div>' +
	    '<label for="">Subtotal</label>' +
	    '<input class="subtotal" type="text" name="" required value="" >' +
	    '<label for="">Tax</label>' +
	    '<input class="tax" type="text" name="" required value="" >' +
	    '<label for="">Total</label>' +
	    '<input class="total" type="text" name="" required value="" >' +
	    '<button id="Login" class="pure-button pure-button-primary float-left submit-button" >Confirm Data</button>' +
	  '</fieldset>' +
	'</form>';
      return editModeHtml
    }


    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      //console.log(imageData);
      $('#loading').css("display", "block");
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
      $('#loading').css("display", "none");
      $(".content").append($.parseHTML(getEditModeHtml()));
      $(".content").append($.parseHTML(myRequest.responseText));
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
	
