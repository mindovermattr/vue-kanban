class Task < ApplicationRecord
  STATUS_VALUES = ['noStatus', 'needDone', 'inProgress', 'testing', 'done']

  belongs_to :category

  validates :name, :body, :period, :status, presence: true
  validates :status, inclusion: { in: STATUS_VALUES }
  validate :period_must_be_in_future

  private

  def period_must_be_in_future
    errors.add(:period, "must be in the future") if period <= Date.today
  end
end
