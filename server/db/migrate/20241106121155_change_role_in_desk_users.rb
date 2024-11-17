class ChangeRoleInDeskUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :desk_users, :role
    add_column :desk_users, :role, :integer, default: 0, null: false
    add_index :desk_users, :role
  end
end
