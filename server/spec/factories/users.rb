FactoryBot.define do
  sequence :email do |n|
    "user#{n}@test.com"
  end

  factory :user do
    username { 'test username' }
    email
    password { '12345678' }
    password_confirmation { '12345678' }
  end
end
