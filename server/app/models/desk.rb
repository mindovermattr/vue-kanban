class Desk < ApplicationRecord
  belongs_to :user

  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :statuses, dependent: :destroy
  has_many :desk_users, dependent: :destroy
  has_many :users, through: :desk_users
  has_many :invitations, dependent: :destroy

  validates :name, presence: true
end
