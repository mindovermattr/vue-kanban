class InvitationPolicy < ApplicationPolicy

  def initialize(user, record)
    super
    @desk_user = record.desk_users.find_by(user: user) if record.is_a?(Desk)
  end

  def create?
    has_role?(:owner_role?)
  end

  def accept?
    user.present?
  end
end
