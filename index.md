<div class="col-sm-3 sidebar hidden-xs" style="background: url(https://bobbelderbos.com/assets/binary_wallpaper.jpg) no-repeat center center !important; height: 1600px;">
		<!-- sidebar.html -->
<header class="sidebar-header" role="banner">
	<a href="/">
		<img src="https://www.gravatar.com/avatar/e1d159796a39ce2eafe4b40e9b8f9871?s=150" class="img-circle">
	</a>
</header>


<div id="bio" class="text-center">

  <p>Software Developer, Pythonista, Data Geek, Student of Life.</p>

  <ul id="sbLinks">
    <li><i class="fa fa-info-circle"></i> <a href="/guide">__init__</a></li>
	  <li><i class="fa fa-archive"></i> <a href="/archive">Blog</a></li>
    <li><i class="fa fa-book"></i> <a href="/books">Books</a></li>
  </ul>
</div>


<div id="contact-list" class="text-center">
	<ul class="list-unstyled list-inline">
		
	 <li>
			<a class="btn btn-default btn-sm" href="https://twitter.com/bbelderbos" target="_blank">
				<i class="fa fa-twitter fa-lg"></i>
			</a>
		</li>
		
		
		<li>
			<a class="btn btn-default btn-sm" href="https://github.com/bbelderbos" target="_blank">
				<i class="fa fa-github-alt fa-lg"></i>
			</a>
		</li>
		
		<li>
			<a class="btn btn-default btn-sm" title="PyBites blog" href="https://pybit.es" target="_blank">
				<i class="fa icon-python fa-lg-ow"></i>
			</a>
		</li>
	</ul>
	<ul id="contact-list-secondary" class="list-unstyled list-inline" style="display: none;">
		<li>
			<a class="btn btn-default btn-sm" href="/feed.xml" target="_blank">
				<i class="fa fa-rss fa-lg"></i>
			</a>
		</li>
		
		<li>
			<a class="btn btn-default btn-sm" href="https://linkedin.com/in/bbelderbos" target="_blank">
				<i class="fa fa-linkedin fa-lg"></i>
			</a>
		</li>
		<li>
			<a class="btn btn-default btn-sm" href="https://www.facebook.com/groups/1305028816183522" target="_blank">
				<i class="fa fa-facebook fa-lg"></i>
			</a>
		</li>
		
	</ul>
</div>

<hr class="softDivider">

<div id="ninjaWidget">
  <a href="https://codechalleng.es/via/bob" target="_blank"><img src="https://codechalleng.es/static/img/honors/ninja_widget.png" alt="Learn Python, Earn PyBites Ninja Belts"></a>
</div>
<!-- sidebar.html end -->

	</div>


# Scatterbrain

### Short Bio about Me:
Hello to the good, the bad, and the beautiful people,

Welcome to my page, you have now reached the end of the internet and if you somehow made it here by mistake, it's not too late to hit the `X` in the corner before you get submerged! So a little 'bit' or a 'byte' about me, I make cornball jokes! Oh, and I like to break into things most people claim secure, without malice, for the challenge. If you prefer, you can address me by one of the many handles that I mask my identity with and change almost as often as my underwear. My full-story will soon be available when my new book gets published in 'Nevuary'. Where I am from they might say something like "Game is sold, not told". Unless it's about a hack cause that's the type of knowledge too juicy to withhold!

## Write-ups
This is where I will be posting my write-ups for my digital adventures on [Hack the box](https://hackthebox.eu)

****

**Bankrobber**

This is a insane web app box that can be solved with some essential OWASP top 10 knowledge to get a user shell, and some basic binary exploitation to esculate to root.

[<img src="img/card.jpeg" width="60%">](bankrobber.md) 

----

**JSON**

This was a medium-difficulty. For the initial shell, you need to identify a vulnerability related to JSON-based deserialization on the website, and by leveraging this issue incorporated with a Bearer: header, you can get a RCE on the box. For the root shell, you can leverage a permissive permission configured for the initial user, `SeImpersonatePrivilege`, to perform a JuicyPotato exploit to get a SYSTEM shell.

[<img src="img/JSON.png" width="60%">]() 

----

Hella Secure Corp. © 2020 and beyond  
 
