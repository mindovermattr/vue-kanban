class DeskUser < ApplicationRecord
  ROLES_VALUES = ['owner', 'member', 'guest'].freeze

  belongs_to :desk
  belongs_to :user

  validates :user_id, uniqueness: { scope: :desk_id }
  validates :role, inclusion: { in: ROLES_VALUES }
end
