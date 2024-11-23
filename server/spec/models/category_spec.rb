require 'rails_helper'

RSpec.describe Category, type: :model do
  it { should belong_to(:desk) }

  it { should have_many(:tasks).dependent(:destroy) }

  it { should validate_presence_of :name }
  it { should validate_presence_of :main_color }
  it { should validate_presence_of :accent_color }
  it { should allow_value('#AAAAAA').for(:main_color) }
  it { should allow_value('#AAAAAA').for(:accent_color) }
end
