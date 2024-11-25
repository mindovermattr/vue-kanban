# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'Statuses', type: :request do
  let(:user) { create(:user) }
  let(:desk) { create(:desk, user: user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'GET /desks/:desk_id/statuses' do
    let!(:statuses) { create_list(:status, 3, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/statuses" }

    before { get api_path, headers: headers }

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of statuses' do
      expect(json).not_to be_empty
      expect(json.size).to eq 3
    end

    it 'returns all public fields of statuses' do
      %w[id name].each do |attr|
        expect(json.first[attr]).to eq statuses.first.send(attr).as_json
      end
    end
  end

  describe 'POST /desks/:desk_id/statuses' do
    let(:api_path) { "/desks/#{desk.id}/statuses" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, status: attributes_for(:status) } }

      it 'creates a new status' do
        expect do
          post api_path, params: valid_params, headers: headers
        end.to change(Status, :count).by(1)
      end

      it 'returns 201 status' do
        post api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, status: attributes_for(:status, :invalid) } }

      it 'does not create a status' do
        expect do
          post api_path, params: invalid_params, headers: headers
        end.not_to change(Status, :count)
      end

      it 'returns 422 status' do
        post api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns error messages' do
        post api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include "Name can't be blank"
      end
    end
  end

  describe 'PUT /desks/:desk_id/statuses/:id' do
    let(:status) { create(:status, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/statuses/#{status.id}" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, status: { name: 'Updated Name' } } }

      it 'updates the status' do
        put api_path, params: valid_params, headers: headers

        expect(status.reload.name).to eq 'Updated Name'
      end

      it 'returns 200 status' do
        put api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, status: { name: '' } } }

      it 'does not update the status' do
        put api_path, params: invalid_params, headers: headers

        expect(status.reload.name).not_to eq ''
      end

      it 'returns 422 status' do
        put api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns error messages' do
        put api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include "Name can't be blank"
      end
    end
  end

  describe 'DELETE /desks/:desk_id/tasks/:id' do
    let!(:status) { create(:status, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/statuses/#{status.id}" }

    it 'deletes the status' do
      expect do
        delete api_path, headers: headers
      end.to change(Status, :count).by(-1)
    end

    it 'returns 204 status' do
      delete api_path, headers: headers

      expect(response).to have_http_status(:no_content)
    end
  end
end
