FactoryBot.define do
  factory :status do
    name { 'Test Status' }
    association :desk, factory: :desk
  end
end
