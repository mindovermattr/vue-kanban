class CreateCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.string :main_color, null: false
      t.string :accent_color, null: false

      t.timestamps
    end
  end
end
