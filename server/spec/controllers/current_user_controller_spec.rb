# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'CurrentUser', type: :request do
  let!(:user) { create(:user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'GET /current_user' do
    let(:api_path) { "/current_user" }

    before { get api_path, headers: headers }

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns all public fields of user' do
      %w[id username email].each do |attr|
        expect(json[attr]).to eq user.send(attr).as_json
      end
    end
  end
end