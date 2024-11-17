class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!
  before_action :set_task!, only: [:update, :destroy]
  before_action :authorize_task!
  after_action :verify_authorized

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
      render json: @task, status: :created
    else
      unprocessable_entity(@task)
    end
  end

  def destroy
    if @task
      @task.destroy
    else
      render json: { error: 'Некорректный id' }, status: :bad_request
    end
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_task!
    @task = Task.find_by(id: params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :body, :category_id, :status_id, :period)
  end

  def authorize_task!
    authorize(@desk, policy_class: TaskPolicy)
  end
end
