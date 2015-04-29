

$("#Login").click(function() {
  localStorage.setItem("username", $("form.login > input.username").val());
  var date = new Date();
  date.setDate(date.getDate() + 1);
  localStorage.setItem("expirationDate", date);
  if (localStorage.getItem("username") != "") {
    window.location.href = "splash.html"
  }
});



// keeps footer from moving when virtual keyboard appears
var initialScreenSize = window.innerHeight;
window.addEventListener("resize", function() {
    if(window.innerHeight < initialScreenSize){
        $("footer").hide();
    }
    else{
        $("footer").show();
    }
});