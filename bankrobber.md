# BankRobber

This was my first active box on HTB that I was able to root, and it's rated at an insane difficulty. So I thought this would be a great place to start for my first write-up. 

Took me about a week of late night excursions in total isolation and focus until I was able to pop it. It's not easy for me to attain free-time due to my obligated daily responsibilities. So sleep was limited but I was very determined to get this one.

I liked this box a lot because it consisted of vulnerabilites that I already knew how to find and exploit as I was trained by Security Consultants and Senior Penetration Testers to do so. Only issue I had was this box required a bot to inpersonate a admin's session and the response time for this was just not there, which was a major detourant and took me a while to notice, almost to the point that I gave up. After I got over that mountain and seen a reaction from my script, I was able to get inital foothold and eventually root it within a few days.

### Reconnaissance

Well, before any PT, you first must know what is the scope of the engagement. What do we already know, we know that this is a Windows host already from the description card and HTB provided the IP address of our target. So we turn to `nmap` a faithful and reliable tool that is almost as old as the internet itself. Then initate a scan and probe all common TCP ports to discover some services to test.
![](decrypt.png)
We see here that HTTP/s web services are available at standard ports 80 and 443, a MYSQL database on standard 3306 as well as a open port on 445 standard SMB which is another way to determine the likelyness this is a Windows machine.

Since the name of the challenge is BankRobber, I think it is pretty safe to assume their is a bank involved. So I load up my HTTP proxy/sniffer/injector/fuzzer Burp Suite,the swiss army knife of HTTP testing and surf over to the web site to have a look-see at this Bank's applications and see what she is made of.
![]()


### Weaponization
Intruder develops malware designed to exploit the vulnerability

### Delivery
Intruder transmits the malware via a phishing email or another medium

### Exploitation
The malware begins executing on the target system

### Installation
The malware installs a backdoor or other ingress accessible to the attacker

### Command and Control
The intruder gains persistent access to the victim’s systems/network

### Actions on Objective
Intruder initiates end goal actions, such as data theft, data corruption, or data destruction
