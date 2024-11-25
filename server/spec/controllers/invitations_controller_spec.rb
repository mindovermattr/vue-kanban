# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'Invitations', type: :request do
  let(:user) { create(:user) }
  let(:desk) { create(:desk, user: user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'POST /desks/:desk_id/invitations' do
    let(:api_path) { "/desks/#{desk.id}/invitations" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, invitation: attributes_for(:invitation) } }

      it 'creates a new invitation' do
        expect do
          post api_path, params: valid_params, headers: headers
        end.to change(Invitation, :count).by(1)
      end

      it 'returns 201 status' do
        post api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, invitation: attributes_for(:invitation, :invalid) } }

      it 'does not create a invitation' do
        expect do
          post api_path, params: invalid_params, headers: headers
        end.not_to change(Invitation, :count)
      end

      it 'returns 422 status' do
        post api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(422)
      end

      it 'returns error messages' do
        post api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include 'Max uses is not a number'
      end
    end
  end

  describe 'GET /invitations/:token/accept' do
    pending 'todo'
  end
end
