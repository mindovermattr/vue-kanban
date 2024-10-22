class AddIndexForStatusesToDesk < ActiveRecord::Migration[7.1]
  def change
    add_index :statuses, [:desk_id, :name], unique: true
  end
end
