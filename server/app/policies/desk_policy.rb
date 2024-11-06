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
    @desk_user.owner_role? || @desk_user.member_role?
  end

  def destroy?
    @desk_user.owner_role?
  end
end
