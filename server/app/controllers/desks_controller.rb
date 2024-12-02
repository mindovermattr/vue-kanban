class DesksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!, only: [:update, :destroy]
  before_action :authorize_desk!
  after_action :verify_authorized

  def index
    @desks = current_user.member_desks
    render json: @desks, each_serializer: DeskStatsSerializer
  end

  def create
    @desk = current_user.desks.new(desk_params)

    if @desk.save
      @desk.desk_users.create(user: current_user, role: :owner)
      render json: @desk, status: :created, location: @desk
    else
      unprocessable_entity(@desk)
    end
  end

  def update
    if @desk.update(desk_params)
      render json: @desk, status: :ok, location: @desk
    else
      unprocessable_entity(@desk)
    end
  end

  def destroy
    render json: { errors: 'Некорректный id' }, status: :unprocessable_entity unless @desk&.destroy
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:id])
  end

  def authorize_desk!
    authorize(@desk || Desk)
  end

  def desk_params
    params.require(:desk).permit(:name)
  end
end
