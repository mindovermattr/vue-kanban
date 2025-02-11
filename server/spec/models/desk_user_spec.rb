require 'rails_helper'

RSpec.describe DeskUser, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:desk) }

  it { should validate_presence_of :role }
end
