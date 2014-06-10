rapscallion
===========

Ruby on Rails client side validations

application.js:

``` javascript
//= require rapscallion/validations
```

Gemfile:

``` ruby
gem 'rapscallion'
```


Simple Form example:

``` haml
.input
  = f.input :username, input_html: {class: 'rapscallion'}
```

Model:

``` ruby
class User < ActiveRecord::Base
	validate :username, presence: true
end
```
