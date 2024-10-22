class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :category, :status_id, :period
end
