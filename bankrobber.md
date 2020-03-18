
# Bankrobber
[back](index.md)

<img src="img/card.jpeg" width="40%">

This was my first active box on HTB that I was able to root, and it's rated at insane difficulty. So I thought this would be a great place to start my first write-up. This being a box I solved almost 6 months ago, bare with me as I try to remember exactly what I did based on scatterd notes I jotted down.

It took me about a week of late-night excursions in total isolation until I was able to pop it. It's not easy for me to attain free-time due to my obligated daily responsibilities as a father and Security Analyst. So sleep was limited but I was very determined to get this one.

I liked this box a lot because it consisted of vulnerabilities that I already knew how to find and exploit as I was trained by Security Consultants and Senior Penetration Testers the proper methodology to perform a PT. 

The only issue I had was this box required a bot to impersonate an admin's session and the response time for this was just not there, which was a major detour, almost to the point that I gave up. After I climbed that wall, I was able to get initial foothold and eventually rooted within a few days.

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

Before looking at the network stack I always begin with the application layer. So I load up my HTTP proxy/sniffer/injector/fuzzer Burp Suite, the swiss army knife of HTTP testing and surf over to the web site to have a look-see at this Bank's applications and see what she is made of.Free grammar check

So we see here that this is some kind of BitCoin operation. Let's learn more...
![](img/recon.png)

#### Directory/File Enumeration

First I spider with Burp to crawl the site unauthenticated to build a map.
![](img/sitemap.png)

While in my terminal I run `Gobuster` with `Seclists` because I wanted to see the difference.
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

let's do a HTTP packet analysis of the `.php` files with `curl`

`login.php`

```bash
# curl -i -d "username=admin&password=admin" http://10.10.10.154/login.php
HTTP/1.1 302 Found
Date: Tue, 24 Sep 2019 02:49:55 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Location: index.php
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```
`register.php`

```bash
# curl -i -d "username=admin&password=admin" http://10.10.10.154/register.php
HTTP/1.1 302 Found
Date: Tue, 24 Sep 2019 02:51:16 GMT
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
# curl -i -d "username=mother&password=goose" http://10.10.10.154/register.php
HTTP/1.1 302 Found
Date: Tue, 24 Sep 2019 02:53:48 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Location: index.php?msg=User created.
Content-Length: 0
Content-Type: text/html; charset=UTF-8
```

Ok that seemed to work, now let's try to login with our fresh account.
```bash
 # curl -i -d "username=mother&password=goose" http://10.10.10.154/login.php
HTTP/1.1 302 Found
Date: Tue, 24 Sep 2019 02:55:08 GMT
Server: Apache/2.4.39 (Win64) OpenSSL/1.1.1b PHP/7.3.4
X-Powered-By: PHP/7.3.4
Set-Cookie: id=25
Set-Cookie: username=ZGlwc2hpdA%3D%3D
Set-Cookie: password=ZGlwc2hpdA%3D%3D
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

We can try a few basic passwords to attempt to login as admin but failed.
There is no lockout mechnaisms for attempts made.
This sets the stage if all else fails for a Brute Force attacks 
but I was feeling BF is a bit too much Script Kiddie like for an insane box, 
so return to the `login.php` to see what else might we be able to do.

So now I switch over to Burp and Browser.



### Weaponization
Intruder develops malware designed to exploit the vulnerability

### Delivery
Intruder transmits the malware via a phishing email or another medium

### Exploitation
The malware begins executing on the target system

### Installation
The malware installs a backdoor or other ingress accessible to the attacker

### Command and Control
The intruder gains persistent access to the victimâ€™s systems/network

### Actions on Objective
Intruder initiates end goal actions, such as data theft, data corruption, or data destruction
