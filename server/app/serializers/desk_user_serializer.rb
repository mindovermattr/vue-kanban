class DeskUserSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :desk_id, :role
end
