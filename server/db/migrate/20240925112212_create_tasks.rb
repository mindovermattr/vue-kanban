class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :body, null: false
      t.references :category, null: false, foreign_key: true
      t.string :status, null: false
      t.date :period, null: false

      t.timestamps
    end
  end
end