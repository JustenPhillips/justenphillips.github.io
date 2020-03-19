# ./Scatterbrain
----

### Short Bio about Me:
Hello to the good, the bad, and the beautiful people,

Welcome to my page, you have now reached the end of the internet and if you somehow made it here by mistake, it's not too late to hit the `X` in the corner before you get submerged! So a little 'bit' or a 'byte' about me, I make cornball jokes! Oh, and I like to break into things most people claim secure, without malice, for the challenge. If you prefer, you can address me by one of the many handles that I mask my identity with and change almost as often as my underwear. My full-story will soon be available when my new book gets published in 'Nevuary'. Where I am from they might say something like "Game is sold, not told". Unless it's about a hack cause that's the type of knowledge too juicy to withhold!

----

## Write-ups
This is where I will be posting my write-ups for my digital adventures on [Hack the box](https://hackthebox.eu)

**Bankrobber**

This is a insane web app box that can be solved with some essential OWASP top 10 knowledge to get a user shell, and some basic binary exploitation to esculate to root.

[<img src="img/card.jpeg" width="60%">](bankrobber.md) 
 
**JSON**

This was a medium-difficulty. For the initial shell, you need to identify a vulnerability related to JSON-based deserialization on the website, and by leveraging this issue incorporated with a Bearer: header, you can get a RCE on the box. For the root shell, you can leverage a permissive permission configured for the initial user, `SeImpersonatePrivilege`, to perform a JuicyPotato exploit to get a SYSTEM shell.

[<img src="img/JSON.png" width="60%">]() 

----

Hella Secure Corp. © 2020 and beyond  
 
