class CreateInvitations < ActiveRecord::Migration[7.1]
  def change
    create_table :invitations do |t|
      t.string :token, null: false
      t.references :desk, null: false, foreign_key: true
      t.references :user, null: true, foreign_key: true # User who invited
      t.datetime :expires_at

      t.timestamps
    end
    add_index :invitations, :token, unique: true
  end
end
