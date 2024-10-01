class TasksController < ApplicationController

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      unprocessable_entity(@task)
    end
  end

  def update
    @task = Task.find_by(id: params[:id])

    if @task.update(task_params)
      render json: @task, status: :created, location: @task
    else
      unprocessable_entity(@task)
    end
  end

  def destroy
    @task = Task.find_by(id: params[:id])

    if @task
      @task.destroy
    else
      render json: { error: 'Некорректный id' }, status: :bad_request
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :body, :category_id, :status, :period)
  end
end
