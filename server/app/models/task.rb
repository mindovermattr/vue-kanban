class Task < ApplicationRecord
  belongs_to :desk
  belongs_to :status
  belongs_to :category

  validates :name, :body, :period, presence: true
  validate :period_must_be_in_future

  private
  e
  def period_must_be_in_future
    errors.add(:period, "must be in the future") if period <= Date.today
  end
end
