FactoryBot.define do
  factory :category do
    name { "MyCategory" }
    main_color { "#FFFFFF" }
    accent_color { "#AAAAAA" }
    association :desk, factory: :desk

    trait :invalid do
      name { nil }
    end
  end
end
