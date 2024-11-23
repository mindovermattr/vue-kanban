require 'rails_helper'

RSpec.describe Invitation, type: :model do
  it { should belong_to :desk }

  it { should validate_numericality_of(:max_uses).is_greater_than(0) }
  it { should validate_numericality_of(:uses).is_greater_than_or_equal_to(0) }
end
