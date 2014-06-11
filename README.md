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

View example with Simple Form:

``` haml
.input
  = f.input :username, input_html: {class: 'rapscallion'}
```

When validating an existing record (for example to avoid uniqueness validation problems):

``` haml
= simple_form_for @thing, html: {data: {existing_record: @thing.id}} do |f|
```

Model:

``` ruby
class User < ActiveRecord::Base
	validate :username, presence: true
end
```
