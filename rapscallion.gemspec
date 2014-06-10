$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "rapscallion/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "rapscallion"
  s.version     = Rapscallion::VERSION
  s.authors     = ["Gordon Isnor"]
  s.email       = ["gordonbisnor@gmail.com"]
  s.homepage    = "http://www.github.com/gordonbisnor/rapscallion"
  s.summary     = "Rails client side validations"
  s.description = "Rails client side validations"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.17"
  # s.add_dependency "jquery-rails"

  s.add_development_dependency "sqlite3"
end