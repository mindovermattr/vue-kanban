class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!
  before_action :set_task!, only: [:update, :destroy]
  before_action :authorize_task!
  after_action :verify_authorized
  after_action :publish_task!, only: [:create, :update]

  def index
    @tasks = @desk.tasks
    render json: @tasks
  end

  def create
    @task = @desk.tasks.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      unprocessable_entity(@task)
    end
  end

  def update
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      unprocessable_entity(@task)
    end
  end

  def destroy
    render json: { errors: 'Некорректный id' }, status: :unprocessable_entity unless @task&.destroy
  end

  private

  def publish_task!
    return if @task.errors.any?

    ActionCable.server.broadcast("tasks_channel_#{@desk.id}", TaskSerializer.new(@task).as_json )
  end

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_task!
    @task = Task.find_by(id: params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :body, :category_id, :status_id, :period, :user_id)
  end

  def authorize_task!
    authorize(@desk, policy_class: TaskPolicy)
  end
end
