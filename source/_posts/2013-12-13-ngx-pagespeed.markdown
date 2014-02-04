---
layout: post
title: "installing ngx_pagespeed"
date: 2013-12-13 11:23
comments: true
categories: 
---

I recently gave the ngx_pagespeed module a whirl. Installation was on a RHEL5 server

###RESOURCES

- [Github](1)  
- [Google Developers](2)  
- [Passenger][3] (Building nginx from source with Passenger module)   

**WARNING:** Instructions cite old versions of passenger/nginx. 

- Latest nginx version : [here][6]
- Latest passenger version : gem install passenger

- [NGINX Docs][4] (for installing third party modules)

###Instructions (paraphrasing from above sources)
 
1. Download ngx_pagespeed:  

		$ cd ~
		$ wget https://github.com/pagespeed/ngx_pagespeed/archive/v1.7.30.1-beta.zip
		$ unzip v1.7.30.1-beta.zip # or unzip v1.7.30.1-beta$ cd ngx_pagespeed-1.7.30.1-beta/
		$ wget https://dl.google.com/dl/page-speed/psol/1.7.30.1.tar.gz
		$ tar -xzvf 1.7.30.1.tar.gz # expands to psol/

2. Download and build nginx:

		$ # check http://nginx.org/en/download.html for the latest version
		$ wget http://nginx.org/download/nginx-1.4.3.tar.gz
		$ tar -xvzf nginx-1.4.3.tar.gz3) 

3. Set PASSENGER_NGINX_DIR env variable 

		export PASSENGER_NGINX_DIR=\`passenger-config --root\`/ext/nginx
		
4. Install Passenger gem (compiler uses this to build nginx with the passenger module)  

		$ gem install passenger && gem clean # gem clean to remove older versions of passenger.
 		
5. Set build flags

		$ cd nginx-1.4.3/
		$ ./configure --add-module=$HOME/ngx_pagespeed-1.7.30.1-beta —add-module=$PASSENGER_NGINX_DIR5. 
		
explore more potential modules [here][4]. 

If you add more modules you’ll have to include them with —add-module=XXXX in your ./configure command.
There are more options for ./configure which you’ll have to figure out for your specific build  
	
#####Example: 
__WARNING: Don’t just copy/paste this block!__

		$ ./configure \  
			--prefix=/usr/local \  
			--sbin-path=/usr/local/sbin \  
			--conf-path=/etc/nginx/nginx.conf \  
			--error-log-path=/var/log/nginx/error.log \  
			--http-log-path=/var/log/nginx/access.log \  
			--with-http_ssl_module \  --with-http_gzip_static_module \  
			--add-module=$PASSENGER_NGINX_DIR \  --with-pcre=$PCRE_DIR \  
			--with-http_sub_module


After you get all your modules figured out,
 	
		$ make && make install

Since I already had a version of passenger installed (from source) at /opt/nginx, I shutdown the current nginx `sudo /etc/init.d/nginx stop` moved the entire directory `mv nginx nginx_old` and set the `--prefix=/opt/nginx` build flag. 

After compilation

		mv /opt/nginx/conf /opt/nginx/clean_conf # (our newly built nginx)
		cp -r /opt/nginx_old/conf /opt/nginx

Since we're using the same location, our `/etc/init.d/nginx` script doesn't need to be updated.

### Post-Installation

1. Add [ngx_pagespeed options][5] to your nginx.conf

		pagespeed on;
		pagespeed FileCachePath /var/ngx_pagespeed_cache;  # Use tmpfs for best results.
		
2. In every server block where pagespeed is enabled add:

		# Ensure requests for pagespeed optimized resources go to the pagespeed
		# handler and no extraneous headers get set.

		location ~ "\.pagespeed\.([a-z]\.)?[a-z]{2}\.[^.]{10}\.[^.]+" { add_header "" ""; }
		location ~ "^/ngx_pagespeed_static/" { }
		location ~ "^/ngx_pagespeed_beacon$" { }
		location /ngx_pagespeed_statistics { allow 127.0.0.1; deny all; }
		location /ngx_pagespeed_global_statistics { allow 127.0.0.1; deny all; }
		location /ngx_pagespeed_message { allow 127.0.0.1; deny all; }
		location /pagespeed_console { allow 127.0.0.1; deny all; }
		

To confirm that the module is loaded, fetch a page and check that you see the X-Page-Speed header:

		$ curl -I 'http://localhost:8050/some_page/' | grep X-Page-Speed # => X-Page-Speed: 1.7.30.1-...

[1]: https://github.com/pagespeed/ngx_pagespeed
[2]: https://developers.google.com/speed/pagespeed/module/build_ngx_pagespeed_from_source
[3]: http://extralogical.net/articles/howto-compile-nginx-passenger.html
[4]: http://wiki.nginx.org/3rdPartyModules
[5]: https://github.com/pagespeed/ngx_pagespeed#how-to-use
[6]: http://nginx.org/en/download.html
