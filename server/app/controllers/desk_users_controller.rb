class DeskUsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!
  before_action :set_desk_user!, except: :index
  before_action :authorize_desk_user!
  after_action :verify_authorized

  def index
    @desk_users = @desk.desk_users
    render json: @desk_users, each_serializer: DeskUserIndexSerializer
  end

  def update
    if @desk_user.update(role_params)
      render json: @desk_user, status: :ok
    else
      render json: { errors: 'Некорректный запрос'}, status: :unprocessable_entity
    end
  end

  def destroy
    render json: { error: 'Некорректный id' }, status: :unprocessable_entity unless @desk_user&.destroy
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_desk_user!
    @desk_user = DeskUser.find_by(id: params[:id])
  end

  def role_params
    params.require(:desk_user).permit(:role)
  end

  def authorize_desk_user!
    authorize(@desk, policy_class: DeskUserPolicy)
  end
end
