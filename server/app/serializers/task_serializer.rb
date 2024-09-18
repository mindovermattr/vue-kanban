class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :category, :status, :period
end
