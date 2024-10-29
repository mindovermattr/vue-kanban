class Invitation < ApplicationRecord
  belongs_to :desk
  belongs_to :user, optional: true

  before_create :generate_token
  before_create :set_expiration

  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  def is_relevant?
    expires_at >= Time.now
  end

  private

  def generate_token
    self.token = SecureRandom.hex(10)
  end

  def set_expiration
    self.expires_at = 7.days.from_now
  end
end
