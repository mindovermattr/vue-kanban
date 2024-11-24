require 'rails_helper'

RSpec.describe Desk, type: :model do
  it { should belong_to :user }

  it { should have_many(:tasks).dependent(:destroy) }
  it { should have_many(:categories).dependent(:destroy) }
  it { should have_many(:statuses).dependent(:destroy) }
  it { should have_many(:desk_users).dependent(:destroy) }
  it { should have_many(:users).through(:desk_users) }
  it { should have_many(:invitations).dependent(:destroy) }

  it { should validate_presence_of :name }
end
