class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :desks, dependent: :destroy
  has_many :desk_users, dependent: :destroy
  has_many :member_desks, through: :desk_users, source: :desk
  has_many :tasks
end
