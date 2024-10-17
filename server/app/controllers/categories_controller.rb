class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk, only: [:index, :create]
  before_action :set_category, only: [:update, :destroy]

  def index
    @categories = @desk.categories
    render json: @categories
  end

  def create
    @category = @desk.categories.new(category_params)

    if @category.save
      render json: @category, status: :created
    else
      unprocessable_entity(@category)
    end
  end

  def update
    if @category.update(category_params)
      render json: @category, status: :created
    else
      unprocessable_entity(@category)
    end
  end

  def destroy
    if @category
      @category.destroy
    else
      render json: { error: 'Некорректный id' }, status: :bad_request
    end
  end

  private

  def set_desk
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_category
    @category = Category.find_by(id: params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :main_color, :accent_color)
  end
end
