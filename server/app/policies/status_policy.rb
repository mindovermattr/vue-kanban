class StatusPolicy < ApplicationPolicy
  def initialize(user, record)
    super
    @desk_user = record.desk_users.find_by(user: user) if record.is_a?(Desk)
  end

  def index?
    has_role?(:owner_role?, :member_role?, :guest_role?)
  end

  def create?
    has_role?(:owner_role?)
  end

  def update?
    has_role?(:owner_role?)
  end

  def destroy?
    has_role?(:owner_role?)
  end
end
