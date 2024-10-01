class ApplicationController < ActionController::API
  def unprocessable_entity(variable)
    render json: { errors: variable.errors.full_messages }, status: :unprocessable_entity
  end
end
