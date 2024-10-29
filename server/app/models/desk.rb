class Desk < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :desk_users, dependent: :destroy
  has_many :users, through: :desk_users
  has_many :invitations

  validates :name, presence: true
end
