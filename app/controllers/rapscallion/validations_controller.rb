module Rapscallion

	class ValidationsController < ::ApplicationController
		
		def create
			klass = params[:klass].camelize.constantize

			if params[:existing_record].present?
				item = klass.find(params[:existing_record])
			else
				item = klass.new
			end

			field = params[:attr]
			value = params[:field_val]
			item.send("#{field}=", value)
			item.valid?
			errors = item.errors[field].uniq

			if !field.match(/_confirmation/).nil?
				field_to_confirm_against = field.gsub('_confirmation', '')
				x = params[field_to_confirm_against.to_sym]
				
				errors = ["doesn't match confirmation"]  unless value == x
			end

			render json: errors.to_json
			
			rescue => e
				logger.info "ERROR: #{e}"
		end

	end

end