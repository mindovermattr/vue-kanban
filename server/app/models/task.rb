class Task < ApplicationRecord
  belongs_to :desk
  belongs_to :status
  belongs_to :category
  belongs_to :user, optional: true

  validates :name, :body, :period, presence: true
  validate :period_must_be_in_future

  private

  def period_must_be_in_future
    return if period.blank?

    errors.add(:period, "must be in the future") if period <= Date.today
  end
end
