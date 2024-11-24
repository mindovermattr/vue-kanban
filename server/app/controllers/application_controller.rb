class ApplicationController < ActionController::API
  include Pundit::Authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def unprocessable_entity(variable)
    render json: { errors: variable.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def user_not_authorized
    render json: { errors: ["У вас нет доступа для этого действия!"] }, status: :forbidden
  end
end
