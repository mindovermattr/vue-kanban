class CreateStatuses < ActiveRecord::Migration[7.1]
  def change
    create_table :statuses do |t|
      t.string :name, null: false
      t.references :desk, null: false, foreign_key: true
      t.timestamps
    end
  end
end
