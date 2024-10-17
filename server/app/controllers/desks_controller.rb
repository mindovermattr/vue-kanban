class DesksController < ApplicationController
  before_action :authenticate_user!

  def index
    @desks = current_user.desks
    render json: @desks
  end

  def create
    @desk = current_user.desks.new(desk_params)

    if @desk.save
      render json: @desk, status: 201, location: @desk
    else
      unprocessable_entity(@desk)
    end
  end

  def update
    @desk = Desk.find_by(id: params[:id])

    if @desk && current_user.desks.include?(@desk)
      @desk.update(desk_params)
      render json: @desk, status: :created, location: @desk
    else
      render json: { error: 'Некорректный запрос или недостаточно прав' }, status: :bad_request
    end
  end

  def destroy
    @desk = Desk.find_by(id: params[:id])

    if @desk && current_user.desks.include?(@desk)
      @desk.destroy
    else
      render json: { error: 'Некорректный id или недостаточно прав' }, status: :bad_request
    end
  end

  private

  def desk_params
    params.require(:desk).permit(:name)
  end
end
