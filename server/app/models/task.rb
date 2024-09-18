class Task < ApplicationRecord
  validates :name, :body, :period, :status, presence: true
end
