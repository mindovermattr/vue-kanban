class AddDesksToTasks < ActiveRecord::Migration[7.1]
  def change
    add_reference :tasks, :desk, null: false, foreign_key: true
  end
end
