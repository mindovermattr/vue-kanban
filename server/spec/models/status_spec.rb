require 'rails_helper'

RSpec.describe Status, type: :model do
  it { should belong_to :desk }

  it { should have_many(:tasks).dependent(:destroy) }
  it { should validate_presence_of :name }
end
