module Rapscallion

	class ValidationsController < ::ApplicationController

		eval %[skip_filter #{_process_action_callbacks.select { |c|
	  	[:before, :after, :around].include? c.kind }.collect{|c|
	    c.filter.inspect}.join(", ")
	  }]

		def create
			klass = params[:klass].camelize.constantize
			item = params[:existing_record].present? ? klass.find(params[:existing_record]) : klass.new
			field = params[:attr]
			value = params[:field_val]
			item.send("#{field}=", value)
			item.valid?
			errors = item.errors[field].uniq
			errors = check_confirmation_field_match(field, value) if !field.match(/_confirmation/).nil?
			render json: errors.to_json
			rescue => e
				logger.info "ERROR: #{e}"
		end # end create

		def check_confirmation_field_match(field, value)
			field_to_confirm_against = field.gsub('_confirmation', '')
			value == params['confirmation_field'] ? [] : ["doesn't match confirmation"]   
		end
		private :check_confirmation_field_match

	end # end ValidationsController

end # end Rapscallion module