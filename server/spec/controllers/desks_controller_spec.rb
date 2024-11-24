# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'Desks', type: :request do
  let(:user) { create(:user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'GET /desks' do
    let!(:desks) { create_list(:desk, 2, user: user) }
    let(:api_path) { '/desks' }

    before do
      sign_in(user)
      get api_path, headers: headers
    end

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of desks' do
      json = JSON.parse(response.body)
      expect(json.size).to eq 2
    end

    it 'returns all public fields of desks' do
      %w[id name tasks statuses categories].each do |attr|
        expect(json.first[attr]).to eq desks.first.send(attr).as_json
      end
    end
  end

  describe 'POST /desks' do
    let(:user) { create(:user) }
    let(:api_path) { '/desks' }

    before { sign_in(user) }

    context 'with valid params' do
      let(:valid_params) { { desk: attributes_for(:desk) } }

      it 'creates a new desk' do
        expect do
          post api_path, params: valid_params, headers: headers
        end.to change(Desk, :count).by(1)
      end

      it 'returns 201 status' do
        post api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk: { name: '' } } }

      it 'does not create a desk' do
        expect do
          post api_path, params: invalid_params, headers: headers
        end.not_to change(Desk, :count)
      end

      it 'returns 422 status' do
        post api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(422)
      end

      it 'returns error messages' do
        post api_path, params: invalid_params, headers: headers

        json = JSON.parse(response.body)
        expect(json['errors']).to include "Name can't be blank"
      end
    end
  end

  describe 'PATCH /desks/:id' do
    let(:user) { create(:user) }
    let(:desk) { create(:desk, user: user) }
    let(:api_path) { "/desks/#{desk.id}" }

    before { sign_in(user) }

    context 'with valid params' do
      let(:valid_params) { { desk: { name: 'Updated Name' } } }

      it 'updates the desk' do
        put api_path, params: valid_params, headers: headers

        expect(desk.reload.name).to eq 'Updated Name'
      end

      it 'returns 201 status' do
        put api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk: { name: '' } } }

      it 'does not update the desk' do
        put api_path, params: invalid_params, headers: headers

        expect(desk.reload.name).not_to eq ''
      end

      it 'returns 422 status' do
        put api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(:bad_request)
      end

      it 'returns error messages' do
        put api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include "Некорректный запрос!"
      end
    end
  end

  describe 'DELETE /desks/:id' do
    let(:user) { create(:user) }
    let!(:desk) { create(:desk, user: user) }
    let(:api_path) { "/desks/#{desk.id}" }

    before { sign_in(user) }

    it 'deletes the desk' do
      expect do
        delete api_path, headers: headers
      end.to change(Desk, :count).by(-1)
    end

    it 'returns 204 status' do
      delete api_path, headers: headers

      expect(response).to have_http_status(:no_content)
    end
  end
end
