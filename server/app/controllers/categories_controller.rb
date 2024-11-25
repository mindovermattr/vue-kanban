class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!
  before_action :set_category!, only: [:update, :destroy]
  before_action :authorize_category!
  after_action :verify_authorized

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
      render json: @category, status: :ok
    else
      unprocessable_entity(@category)
    end
  end

  def destroy
    render json: { error: 'Некорректный id' }, status: :unprocessable_entity unless @category&.destroy
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def set_category!
    @category = Category.find_by(id: params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :main_color, :accent_color)
  end

  def authorize_category!
    authorize(@desk, policy_class: CategoryPolicy)
  end
end
