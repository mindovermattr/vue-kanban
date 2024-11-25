FactoryBot.define do
  factory :status do
    sequence(:name) { |n| "Status #{n}" }
    association :desk, factory: :desk

    trait :invalid do
      name { nil }
    end
  end
end
