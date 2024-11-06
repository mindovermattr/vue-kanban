class DeskPolicy < ApplicationPolicy

  def index?
    record.desk_users.find_by(user: user, role: %w[owner member guest]).present?
  end

  def create?
    user.present?
  end

  def update?
    record.desk_users.find_by(user: user, role: %w[owner member]).present?
  end

  def destroy?
    record.desk_users.find_by(user: user, role: 'owner').present?
  end
end
