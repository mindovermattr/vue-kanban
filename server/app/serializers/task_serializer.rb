class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :body, :category, :status_id, :period, :user_id, :username

  attribute :username do
    User.find_by(id: @object.user_id)&.username
  end
end
