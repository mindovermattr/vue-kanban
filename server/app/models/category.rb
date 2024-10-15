class Category < ApplicationRecord
  COLOR_REGEX = /#[A-F0-9]{6}\b/

  belongs_to :desk

  has_many :tasks, dependent: :destroy

  validates :name, :main_color, :accent_color, presence: true
  validates :main_color, :accent_color, format: COLOR_REGEX
end
