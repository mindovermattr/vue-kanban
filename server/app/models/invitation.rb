class Invitation < ApplicationRecord
  belongs_to :desk

  before_create :generate_token
  before_create :set_expiration

  validates :token, uniqueness: true
  validates :max_uses, numericality: { greater_than: 0 }
  validates :uses, numericality: { greater_than_or_equal_to: 0 }

  def is_relevant?
    expires_at.future? && uses < max_uses
  end

  def use!
    increment!(:uses)
  end

  private

  def generate_token
    self.token = SecureRandom.hex(10)
  end

  def set_expiration
    self.expires_at = 3.days.from_now
  end
end
