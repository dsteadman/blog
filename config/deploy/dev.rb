server "deploy-dansteadman", :app, :web, :db, :primary => true

set :deploy_to, "/var/www/#{application}"
