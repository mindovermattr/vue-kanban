class DeskPolicy < ApplicationPolicy
  def update?
    user_is_owner_or_member?
  end

  def destroy?
    user_is_owner?
  end

  def invite?
    user_is_owner?
  end

  private

  def user_is_owner?
    record.desk_users.find_by(user: user, role: 'owner').present?
  end

  def user_is_owner_or_member?
    record.desk_users.find_by(user: user, role: %w[owner member]).present?
  end
end
