# BankRobber

This was my first active box on HTB that I was able to root, and it's rated at an insane difficulty. So I thought this would be a great start to publish my first write-up. Took me about a week of late night excursions in total isolation and focus until I was able to pop it. It's not easy for me to attain free-time due to my obligated daily responsibilities. So sleep was limited as I was very determined to get this one.

I liked this box a lot because it consisted of vulnerabilites that I already knew how to find and exploit. Only issue I had was this box required a bot to inpersonate a admin session and the response time for this was not there, which was a major detourant and took me a while to notice, that I almost gave up. After I got over that mountain I was able to get inital foothold and eventually root within a few days.

### Reconnaissance

Well, before any PT, you first must know what is the scope of the engagement. We know that this is a Windows host already from the description card. HTB provided the IP address of our target. We can now run `nmap` a good old faithful tool that is almost as old as the internet itself. We set it to initate a scan and probe common TCP ports to discover some services to test.
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
