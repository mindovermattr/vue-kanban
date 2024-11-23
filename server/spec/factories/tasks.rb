FactoryBot.define do
  factory :task do
    name { "Test Task" }
    body { "Test description" }
    period { Date.today + 1 } # Указываем период в будущем
    association :desk, factory: :desk
  end
end
