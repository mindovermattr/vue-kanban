class DeskStatsSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :tasks_count, :statuses_count, :categories_count

  attribute :tasks_count do
    @object.tasks.count
  end

  attribute :statuses_count do
    @object.statuses.count
  end

  attribute :categories_count do
    @object.categories.count
  end
end
