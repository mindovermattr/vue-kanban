require 'rails_helper'

RSpec.describe Task, type: :model do

  let(:task) { build(:task, period: Date.yesterday) }

  it { should belong_to(:desk) }
  it { should belong_to(:status) }
  it { should belong_to(:category) }
  it { should belong_to(:user).optional }

  it { should validate_presence_of :name }
  it { should validate_presence_of :body }
  it { should validate_presence_of :period }

  describe 'custom validations' do
    it 'is invalid if period is in the past' do
      task.validate
      expect(task.errors[:period]).to include('must be in the future')
    end
  end
end
