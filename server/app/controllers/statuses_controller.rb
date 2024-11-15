class StatusesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!
  before_action :set_status!, only: [:update, :destroy]
  before_action :authorize_status!
  after_action :verify_authorized


  def index
    @statuses = @desk.statuses
    render json: @statuses
  end

  def create
    @status = @desk.statuses.new(status_params)

    if @status.save
      render json: @status, status: :created
    else
      unprocessable_entity(@status)
    end
  end

  def update
    if @status.update(status_params)
      render json: @status, status: :created
    else
      unprocessable_entity(@task)
    end
  end

  def destroy
    if @status
      @status.destroy
    else
      render json: { error: 'Некорректный id' }, status: :bad_request
    end
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_status!
    @status = Status.find_by(id: params[:id])
  end

  def status_params
    params.require(:status).permit(:name)
  end

  def authorize_status!
    authorize(@desk, policy_class: StatusPolicy)
  end
end
