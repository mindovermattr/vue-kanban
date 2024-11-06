class DeskUser < ApplicationRecord
  enum role: { guest: 0, member: 1, owner: 2 }, _suffix: :role

  belongs_to :desk
  belongs_to :user

  validates :user_id, uniqueness: { scope: :desk_id }
  validates :role, presence: true
end
