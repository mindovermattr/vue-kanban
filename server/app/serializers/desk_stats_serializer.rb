class DeskStatsSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :tasks, :statuses, :categories

  attribute :username do
    User.find_by(id: @object.user_id).username
  end
end
