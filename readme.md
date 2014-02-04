# dansteadman.com

Running Octopress ([Docs](http://octopress.org/docs/blogging/))

Rake tasks:

		rake new_post["title"] # create a new post named "title"
		rake new_page[super-awesome] # create a new page
		rake new_page[super-awesome/page.html] # specify custom template name
		rake watch      # Watches source/ and sass/ for changes and regenerates
		rake preview    # Watches, and mounts a webserver at http://localhost:4000
				
Special Markup:

		<!-- more --> # Truncate a post on index.html, adding a "Continue ->" link
		
Deploying : 

		rake generate   # If you haven't generated your blog yet
		rake deploy     # Syncs your blog via ssh

[more on deploying](http://octopress.org/docs/deploying/rsync/)



	
