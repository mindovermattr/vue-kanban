class Desk < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy

  validates :name, presence: true
end