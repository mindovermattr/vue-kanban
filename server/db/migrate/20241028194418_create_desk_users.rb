class CreateDeskUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :desk_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :desk, null: false, foreign_key: true
      t.string :role, default: "member"

      t.timestamps
    end
  end
end
