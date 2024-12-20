class DeskPolicy < ApplicationPolicy

  def initialize(user, record)
    super
    @desk_user = record.desk_users.find_by(user: user) if record.is_a?(Desk)
  end

  def index?
    user.present?
  end

  def create?
    user.present?
  end

  def update?
    has_role?(:owner_role?, :member_role?)
  end

  def destroy?
    has_role?(:owner_role?)
  end
end
