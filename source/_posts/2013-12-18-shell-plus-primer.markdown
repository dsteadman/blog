---
layout: post
title: "shell_plus primer"
date: 2013-12-18 02:33
comments: true
categories: 
---

* Import a model and give it an alias

		from apps.news.models import Article as NewsArticle

* Print all attributes of an object

		authors = article.authors_set.values_list('name', flat=True)

* Get object with all relations

		props = Property.objects.select_related().all()
	
	
	_this will get all properties and join all foreign keys to them so you don't have to hit the database again for a nested relation_   
	[There are Caveats](http://timmyomahony.com/blog/misconceptions-select_related-in-django/)  

* Inspect anything
	
		help(object)
	_pretty prints all stuff about an object_

* Returning collections (as opposed to single records)
	
		Property.objects.filter(p_type="O")

* Inspect the SQL that fetched the queryset  
	[more info](http://stackoverflow.com/questions/4720079/django-query-filter-with-variable-column)

		units = Unit.objects.filter(is_available=True, **{'u_property__p_type':'p_type_abbr'})
		print units.query
		
* The double __ syntax
	
		u_property__p_type == u_property.p_type
		
	_this is equivalent to the '.' in ActiveRecord, which is great for filtering based on assications_
	_NOTE: Make sure to load the associations so you don't trigger an N+1 query_
	
* Pretty Printing in Shell
		
		>>> import pprint
		>>> pp = pprint.PrettyPrinter(indent=4)
		>>> pp.pprint(stuff)
		
* Migrations [docs](http://south.readthedocs.org/en/latest/commands.html)
		
		python manage.py schemamigration <app_name> --auto

