class Status < ApplicationRecord
  belongs_to :desk

  has_many :tasks

  validates :name, presence: true
  validates :name, uniqueness: { scope: :desk_id, message: 'Name has already been taken' }
end
