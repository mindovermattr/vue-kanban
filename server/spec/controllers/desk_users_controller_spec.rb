require 'rails_helper'

describe 'DeskUsers', type: :request do
  let(:user) { create(:user) }
  let(:desk) { create(:desk, user: user) }
  let!(:desk_user) { desk.desk_users.first }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe "GET /desks/:desk_id/desk_users" do
    let(:other_user) { create(:user) }
    let!(:other_desk_user) { create(:desk_user, user: other_user, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/desk_users" }

    before do
      get api_path, headers: headers
    end

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of desk_users' do
      expect(json.size).to eq 2
    end

    it 'returns all public fields of desk_users' do
      desk_user_response = json.find { |item| item['id'] == desk_user.id }
      %w[id user_id desk_id role].each do |attr|
        expect(desk_user_response[attr]).to eq desk_user.send(attr).as_json
      end
    end
  end

  describe 'PUT /desks/:desk_id/desk_users/:id' do
    let(:api_path) { "/desks/#{desk.id}/desk_users/#{desk_user.id}" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, desk_user: { role: :owner } } }

      it 'updates the desk_user' do
        put api_path, params: valid_params, headers: headers

        expect(desk_user.reload.role).to eq 'owner'
      end

      it 'returns 200 status' do
        put api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, desk_user: { role: '' } } }

      it 'does not update the desk_user' do
        put api_path, params: invalid_params, headers: headers

        expect(desk_user.reload.role).not_to eq ''
      end

      it 'returns 422 status' do
        put api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns error messages' do
        put api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include "Некорректный запрос"
      end
    end
  end

  describe 'DELETE /desks/:desk_id/desk_users/:id' do
    let(:api_path) { "/desks/#{desk.id}/desk_users/#{desk_user.id}" }
    let(:invalid_path) { "/desks/#{desk.id}/desk_users/#{desk_user.id + 1}" }

    context 'when the desk_user presence' do
      it 'deletes the task' do
        expect do
          delete api_path, headers: headers
        end.to change(DeskUser, :count).by(-1)
      end

      it 'returns 204 status' do
        delete api_path, headers: headers

        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the desk_user does not exist' do

      it 'does not delete any record' do
        expect { delete invalid_path, headers: headers }.not_to change(DeskUser, :count)
      end

      it 'returns 422 status' do
        delete invalid_path, headers: headers

        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns an error message' do
        delete invalid_path, headers: headers
        expect(json['error']).to eq('Некорректный id')
      end
    end
  end
end
