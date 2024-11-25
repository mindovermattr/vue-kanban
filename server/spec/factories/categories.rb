FactoryBot.define do
  factory :category do
    name { "MyCategory" }
    main_color { "#FFFFFF" }
    accent_color { "#AAAAAA" }
    association :desk, factory: :desk
  end
end
