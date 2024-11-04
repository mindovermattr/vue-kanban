class ApplicationController < ActionController::API
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def unprocessable_entity(variable)
    render json: { errors: variable.errors.full_messages }, status: :unprocessable_entity
  end

  private

  def user_not_authorized
    render json: { errors: ["У вас не доступа для этого действия!"] }, status: :unauthorized
  end
end
