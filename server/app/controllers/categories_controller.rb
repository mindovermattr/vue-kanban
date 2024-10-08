class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @categories = Category.all
    render json: @categories
  end

  def create
    @category = Category.new(category_params)

    if @category.save
      render json: @category, status: :created, location: @category
    else
      unprocessable_entity(@category)
    end
  end

  def update
    @category = Category.find_by(id: params[:id])

    if @category.update(category_params)
      render json: @category, status: :created, location: @category
    else
      unprocessable_entity(@category)
    end
  end

  def destroy
    @category = Category.find_by(id: params[:id])

    if @category
      @category.destroy
    else
      render json: { error: 'Некорректный id' }, status: :bad_request
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :main_color, :accent_color)
  end
end
