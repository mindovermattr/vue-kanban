module RequestSpecHelper
  def generate_jwt_token(user)
    Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
  end

  def json
    @json ||= JSON.parse(response.body)
  end
end
