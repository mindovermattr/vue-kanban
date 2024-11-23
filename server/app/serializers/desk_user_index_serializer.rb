class DeskUserIndexSerializer < ActiveModel::Serializer
  attributes :id, :username, :user_id, :desk_id, :role

  attribute :username do
    User.find_by(id: @object.user_id).username
  end
end
