class AddDesksToCategories < ActiveRecord::Migration[7.1]
  def change
    add_reference :categories, :desk, null: false, foreign_key: true
  end
end
