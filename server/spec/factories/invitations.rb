FactoryBot.define do
  factory :invitation do
    max_uses { 1 }
    uses { 0 }
    token { 'test-token' }

    association :desk, factory: :desk

    trait :invalid do
      max_uses { nil }
    end
  end
end
