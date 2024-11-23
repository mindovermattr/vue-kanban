require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:desks).dependent(:destroy) }
  it { should have_many(:desk_users).dependent(:destroy) }
  it { should have_many(:member_desks).through(:desk_users).source(:desk)}

  it { should validate_presence_of :email }
  it { should validate_presence_of :password }
end
