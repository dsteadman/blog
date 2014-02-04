---
layout: post
title: "Installing Oracle InstantClient on OSX"
date: 2013-12-14 01:09
comments: true
categories: 
---

This was done on Mac OSX 10.9 Mavericks using XCode 5.0.2. Some parts paraphrased from [here](http://www.cs.utexas.edu/~mitra/csSpring2012/cs327/cx_mac.html)

###Download and prepare Oracle Instant Client

[Download](http://www.oracle.com/technetwork/topics/intel-macsoft-096467.html) Instant client and SDK
  
- instantclient-basiclite-macos.x64-11.2.0.3.0.zip (25,674,645 bytes)
- instantclient-sdk-macos.x64-11.2.0.3.0.zip (460,550 bytes)

**NOTE :**  They both unzip to the same file name. Depending on which order you unzip in you'll get two directories called 
`instantclient_11_2` and `instantclient_11_2 2`. Rename them to something less confusing. I renamed to `instantclient` and `instantclient_sdk` respectively.

Create environment variables in .bashrc || .zshrc || .profile || .wherever

		export ORACLE_HOME=/Users/[your-username]/oracle/instantclient_11_2
		export DYLD_LIBRARY_PATH=$ORACLE_HOME
		export LD_LIBRARY_PATH=$ORACLE_HOME
		$ source ~/.bashrc
		$ echo $ORACLE_HOME # => /Users/[your-username]/oracle/instantclient_11_2

###Download and prepare cx_Oracle

Download cx_Oracle [Source Code only](http://prdownloads.sourceforge.net/cx-oracle/cx_Oracle-5.1.2.tar.gz?download) package. (version 5.1.2 as of this writing)

Other versions can be found [here](http://cx-oracle.sourceforge.net/)

		$ tar xf cx_Oracle-5.1.2.tar.gz # => yields cx_Oracle-5.1.2/
		$ cp -r instantclient_sdk/sdk/include cx_Oracle-5.1.2
		$ cd cx_Oracle-5.1.2 # should have all the *.c files from sdk in here

If you open any of these files you'll notice that headers follow the <angles> format for includes (`#include <whatever.c>`). Mavericks/XCode uses the clang compiler, which requires double-quoted includes (`#include "whatever.c"`), so we need to do a global find/replace on all the required C files, changing include lines to this format. I used TextMates search/replace feature.

**FIND :** include <(.*)>  
**REPLACE :** include "$1"

		$ python setup.py build install








		
 


