class Task < ApplicationRecord
  STATUS_VALUES = ['noStatus', 'needDone', 'inProgress', 'testing', 'done']

  validates :name, :body, :period, :status, presence: true
  validates :status, inclusion: { in: STATUS_VALUES }
end
