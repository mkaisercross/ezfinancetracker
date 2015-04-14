

$("#Login").click(function() {
  localStorage.setItem("username", $("form.login > input.username").val());
  var date = new Date();
  date.setDate(date.getDate() + 1);
  localStorage.setItem("expirationDate", date);
  if (localStorage.getItem("username") != "") {
    window.location.href = "splash.html"
  }
});