require 'bundler/capistrano'
require 'cape'

default_run_options[:pty] = true
set :application, "dansteadman.com"
set :repository,  "git@github.com:dsteadman/blog.git"
set :scm, :git
set :deploy_via, :remote_cache
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitmodules", ".rvmrc"]

set :keep_releases, 3
ssh_options[:forward_agent] = true

Cape do
  # Create Capistrano recipes for all Rake tasks.
  mirror_rake_tasks
end

set :stages, %w(dev prod)
set :default_stage, "dev"
require 'capistrano/ext/multistage'

set :use_sudo, false
after "deploy", "deploy:cleanup"

