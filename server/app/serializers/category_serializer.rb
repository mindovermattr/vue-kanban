class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :main_color, :accent_color
end
