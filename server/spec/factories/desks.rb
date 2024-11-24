FactoryBot.define do
  factory :desk do
    name { "Test Desk" }
    association :user, factory: :user

    after(:create) do |desk|
      desk.desk_users.create(user: desk.user, role: :owner)
    end
  end
end
