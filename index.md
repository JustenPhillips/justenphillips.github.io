<script>
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
</script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<div id="mySidebar" class="sidebar">
<ul>
    <img src="img/avatar.png" class="avatar">
    <h1>Scatterbrain</h1>
    <b>Penetration Tester</b><br><br>
  <i class="material-icons">&#xe55c; </i><font size="5"> USA</font>
<a href="mailto:hack.this.0n3@gmail.com" size="5">
<meta itemprop="email" content="hack.this.0n3@gmail.com">Email</a>
<a href="https://keybase.io/scatterbrain" itemprop="sameAs" rel="nofollow noopener noreferrer" size="5">Keybase</a>
<a href="https://twitter.com/" itemprop="sameAs" rel="nofollow noopener noreferrer" size="5">Twitter</a>
<a href="https://github.com/Scatter-Security" itemprop="sameAs" rel="nofollow noopener noreferrer" size="5">GitHub</a>
    </ul>
</div>
<div class="buttons">
<button class="showButton" id="aButton" onclick="openNav();">☰Menu</button>
<button class="closeButton" id="cButton" onclick="closeNav();">☰Hide</button>
</div>
<div class="content">
<a href="index.html">Home</a><a href="#">Post</a><a href="#">Categories</a><a href="#">Tags</a><a href="#">About</a><a href="#">Affiliates</a>

<br><br><br><img class="img1" src="img/quantum.jpg"/><br>
<h3> Short Bio about Me:</h3>
<p>Hello to the good, the bad, and the beautiful people,</p><br>
<p>Welcome to my page, you have now reached the end of the internet and if you somehow made it here by mistake, it's not too late to hit the `X` in the corner before you get submerged! So a little 'bit' or a 'byte' about me, I make cornball jokes! Oh, and I like to break into things most people claim secure, without malice, for the challenge. If you prefer, you can address me by one of the many handles that I mask my identity with and change almost as often as my underwear. My full-story will soon be available when my new book gets published in 'Nevuary'. Where I am from they might say something like "Game is sold, not told". Unless it's about a hack cause that's the type of knowledge too juicy to withhold!<br><img class="img1" src="img/mars.jpg"/></p>

<hr>
<h2> Write-ups</h2>
<img class="img3" src="img/pwniesLogo.png"/><br>

<table>
  <tr>
    <th>Box</th>
    <th></th> 
    <th>Description</th>
  </tr>
  <tr>
    <td><a href="bankrobber.md"><img class="img2" src="img/card.jpeg"/></a></td>
    <td>Bankrobber</td>
    <td>This is a insane web app box that can be solved with some essential OWASP top 10 knowledge to get a user shell, and some basic binary exploitation to esculate to root.</td>
  </tr>
  <tr>
    <td><img class="img2" src="img/JSON.png"/></td>
    <td>JSON</td>
    <td>This was a medium-difficulty. For the initial shell, you need to identify a vulnerability related to JSON-based deserialization on the website, and by leveraging this issue incorporated with a Bearer: header, you can get a RCE on the box. For the root shell, you can leverage a permissive permission configured for the initial user, <code>SeImpersonatePrivilege</code>, to perform a JuicyPotato exploit to get a SYSTEM shell.</td>
  </tr>
  <tr>
    <td><img class="img2" src="img/JSON.png"/></td>
    <td>Forest</td>
    <td>desciptoion of forest</td>
  </tr>
</table>


<hr>
<p>Hella Secure Corp. © 2020 and beyond</p>
</div>
