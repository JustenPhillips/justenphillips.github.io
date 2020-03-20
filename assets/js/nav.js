function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("aButton").style.visibility="hidden";
  document.getElementById("cButton").style.visibility="visible";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("aButton").style.visibility="visible";
  document.getElementById("cButton").style.visibility="hidden";
}
