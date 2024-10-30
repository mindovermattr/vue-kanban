class CreateInvitations < ActiveRecord::Migration[7.1]
  def change
    create_table :invitations do |t|
      t.string :token, null: false
      t.integer :max_uses, default: 1, null: false
      t.integer :uses, default: 0, null: false
      t.references :desk, null: false, foreign_key: true
      t.datetime :expires_at

      t.timestamps
    end
    add_index :invitations, :token, unique: true
  end
end
