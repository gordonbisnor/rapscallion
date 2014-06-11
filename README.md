Rapscallion
===========

Ruby on Rails client side validations

### Add Rapscallion to application.js:

``` javascript
//= require rapscallion/validations
```

### Activate in Javascript:
	$(selector).rapscallion();

#### Options:

- **Change class of error message div**  
  error_message_container_class: "error_messages"

- **Set a class on field with error**  
  field_with_error_class: 'has_error'

- **Set a class on field with success**  
  field_valid_class: 'is_valid'

- **Container for input – used to add and remove error messages**  
  field_container: 'div.input'

- **Event that triggers validation**  
  trigger: 'blur'

eg $('.rapscallion').rapscallion({error_message_container_class: 'errors', field_container: '.field'})

### Add Rapscallion to Gemfile:

``` ruby
gem 'rapscallion'
```

### View example of input tag with Simple Form:

``` haml
.input
  = f.input :username, input_html: {class: 'rapscallion'}
```

### Form tag when validating an existing record (for example to avoid uniqueness validation problems):

``` haml
= simple_form_for @thing, html: {data: {existing_record: @thing.id}} do |f|
```

### Model:

``` ruby
class User < ActiveRecord::Base
	validate :username, presence: true
end
```
