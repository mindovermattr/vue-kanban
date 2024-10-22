class Desk < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :statuses, dependent: :destroy

  validates :name, presence: true
end
