# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'Categories', type: :request do
  let(:user) { create(:user) }
  let(:desk) { create(:desk, user: user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'GET /desks/:desk_id/categories' do
    let!(:categories) { create_list(:category, 3, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/categories" }

    before { get api_path, headers: headers }

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of categories' do
      expect(json).not_to be_empty
      expect(json.size).to eq 3
    end

    it 'returns all public fields of categories' do
      %w[id name main_color accent_color].each do |attr|
        expect(json.first[attr]).to eq categories.first.send(attr).as_json
      end
    end
  end

  describe 'POST /desks/:desk_id/categories' do
    let(:api_path) { "/desks/#{desk.id}/categories" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, category: attributes_for(:category, desk_id: desk) } }

      it 'creates a new category' do
        expect do
          post api_path, params: valid_params, headers: headers
        end.to change(Category, :count).by(1)
      end

      it 'returns 201 status' do
        post api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, category: attributes_for(:category, :invalid) } }

      it 'does not create a task' do
        expect do
          post api_path, params: invalid_params, headers: headers
        end.not_to change(Category, :count)
      end

      it 'returns 422 status' do
        post api_path, params: invalid_params, headers: headers

        expect(response).to have_http_status(422)
      end

      it 'returns error messages' do
        post api_path, params: invalid_params, headers: headers

        expect(json['errors']).to include "Name can't be blank"
      end
    end
  end

  describe 'PUT /desks/:desk_id/categories/:id' do
    let(:category) { create(:category, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/categories/#{category.id}" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, category: { name: 'Updated Name' } } }

      it 'updates the category' do
        put api_path, params: valid_params, headers: headers

        expect(category.reload.name).to eq 'Updated Name'
      end

      it 'returns 200 status' do
        put api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, category: { name: '' } } }

      it 'does not update the category' do
        put api_path, params: invalid_params, headers: headers

        expect(category.reload.name).not_to eq ''
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

  describe 'DELETE /desks/:desk_id/categories/:id' do
    let!(:category) { create(:category, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/categories/#{category.id}" }
    let!(:invalid_path) { "/desks/#{desk.id}/categories/#{category.id + 999}" }

    context 'when the category presence' do
      it 'deletes the task' do
        expect do
          delete api_path, headers: headers
        end.to change(Category, :count).by(-1)
      end

      it 'returns 204 status' do
        delete api_path, headers: headers
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the category does not exist' do
      it 'does not delete any record' do
        expect { delete invalid_path, headers: headers }.not_to change(Category, :count)
      end

      it 'returns 422 status' do
        delete invalid_path, headers: headers
        expect(response).to have_http_status(:unprocessable_content)
      end

      it 'returns an error message' do
        delete invalid_path, headers: headers
        expect(json['errors']).to eq('Некорректный id')
      end
    end
  end
end
