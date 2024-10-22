class Status < ApplicationRecord
  belongs_to :desk

  has_many :tasks, dependent: :destroy

  validates :name, presence: true
  validates :name, uniqueness: { scope: :desk_id }
end
