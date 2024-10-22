class ChangeTasksForStatuses < ActiveRecord::Migration[7.1]
  def change
    remove_column :tasks, :status
    add_reference :tasks, :status, null: false, foreign_key: true
  end
end
