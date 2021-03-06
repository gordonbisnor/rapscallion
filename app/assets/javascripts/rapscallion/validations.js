/* 
    
    Rapscallion
    Ruby on Rails Client Side Validations
    Author: Gordon B. Isnor
    http://www.github.com/gordonbisnor/rapscallion
    http://blog.isnorcreative.com/2014/06/10/rapscallion.html

*/

(function ($) {

  $.fn.rapscallion = function (options) {

    var settings = $.extend({

      /* error messages will be shown in a div set the class for that here */
      error_message_container_class: "error_messages",

      /* fields with errors will get a class to indicate errors, change that class name here */
      field_with_error_class: 'has_error',

      /* valid fields will get a class to indicate success, change that class name here */
      field_valid_class: 'is_valid',

      /* error messages will be remove from input container, eg closest(:selector), set that here */
      field_container: 'div.input',

      /* event that triggers validation */
      trigger: 'blur onSelect'

    }, options);

    return this.each(function () {

      $(this).on(settings.trigger, function () {

        /* the input in question */
        var el = $(this);

        /* the form */
        var form = el.closest('form');

        /* model reference from field name eg user from user[username] */
        var klass = el.prop('name').replace(/\[.*\]/, '');

        /* field name eg username from user[username] */
        var attr = el.prop('id').replace(klass + "_", '');

        /* field value */
        var field_val = el.val();

        /* set up basic hash for validation */
        validation_data = {klass: klass, attr: attr, field_val: field_val};

        /* 
        confirmation fields are special cases, and add the field to confirm for 
        eg password and password_confirmation
        */
        if (attr.match(/(.*)_confirmation/) !== undefined) {
          var confirmation_field = attr.replace('_confirmation', '');
          var confirmation_value = form.find('#' + klass + "_" + confirmation_field).val();
        }

        validation_data['confirmation_field'] = confirmation_value;

        /* existing record? */
        if (form.data('existing-record') !== undefined) {
          validation_data['existing_record'] = form.data('existing-record');
        }

        /* do ajax request */
        $.ajax({
          type: "POST",
          url: '/rapscallion',
          dataType: 'json',
          data: validation_data,

          success: function (data) {

            /* remove existing error messages */
            el.closest(settings.field_container).find('.' + settings.error_message_container_class + ', .errors, .error').remove();

            /* if no errors present field is valid, add is_valid css class */
            if (data.length === 0) {
              console.log('is valid');
              el.removeClass(settings.field_with_error_class).addClass(settings.field_valid_class);

            /* if error present field is not valid, add has_error class to input, and error messages after input */
            } else {
              /* cycle through json response adding errors for each */
              $.each(data, function (key, val) {
                el.after('<div class="' + settings.error_message_container_class + '">' + val + '</div>');
                el.removeClass(settings.field_valid_class).addClass(settings.field_with_error_class);
              });
            } /* end if errors or not */

          } /* end success */

        }); /* end ajax */


      });


    });


  };
}(jQuery));
