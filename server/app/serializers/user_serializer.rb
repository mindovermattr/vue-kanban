class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :created_at

  attribute :created_date do
    @object.created_at && @object.created_at.strftime('%m/%d/%Y')
  end
end
