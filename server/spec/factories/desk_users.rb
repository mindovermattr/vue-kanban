FactoryBot.define do
  factory :desk_user do
    role { 1 }
    association :desk, factory: :desk
    association :user, factory: :user
  end
end
