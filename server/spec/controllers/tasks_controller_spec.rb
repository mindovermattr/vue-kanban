# spec/requests/desks_controller_spec.rb

require 'rails_helper'

describe 'Tasks', type: :request do
  let(:user) { create(:user) }
  let(:desk) { create(:desk, user: user) }
  let(:headers) { { 'ACCEPT' => 'application/json', Authorization: "Bearer #{generate_jwt_token(user)}" } }

  describe 'GET /desks/:desk_id/tasks' do
    let!(:tasks) { create_list(:task, 3, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/tasks" }

    before { get api_path, headers: headers }

    it 'returns 200 status' do
      expect(response).to have_http_status(:ok)
    end

    it 'returns a list of tasks' do
      expect(json).not_to be_empty
      expect(json.size).to eq 3
    end

    it 'returns all public fields of tasks' do
      %w[id name body category status_id period].each do |attr|
        expect(json.first[attr]).to eq tasks.first.send(attr).as_json
      end
    end
  end

  describe 'POST /desks/:desk_id/tasks' do
    let(:api_path) { "/desks/#{desk.id}/tasks" }

    context 'with valid params' do
      let(:category) { create(:category, desk: desk) }
      let(:status) { create(:status, desk: desk) }
      let(:valid_params) { { desk_id: desk,
                             task: attributes_for(:task, category_id: category.id, status_id: status.id) } }

      it 'creates a new task' do
        expect do
          post api_path, params: valid_params, headers: headers
        end.to change(Task, :count).by(1)
      end

      it 'returns 201 status' do
        post api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, task: attributes_for(:task, :invalid) } }

      it 'does not create a task' do
        expect do
          post api_path, params: invalid_params, headers: headers
        end.not_to change(Task, :count)
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

  describe 'PUT /desks/:desk_id/tasks/:id' do
    let(:task) { create(:task, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/tasks/#{task.id}" }

    context 'with valid params' do
      let(:valid_params) { { desk_id: desk, task: { name: 'Updated Name' } } }

      it 'updates the task' do
        put api_path, params: valid_params, headers: headers

        expect(task.reload.name).to eq 'Updated Name'
      end

      it 'returns 200 status' do
        put api_path, params: valid_params, headers: headers

        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid params' do
      let(:invalid_params) { { desk_id: desk, task: { name: '' } } }

      it 'does not update the task' do
        put api_path, params: invalid_params, headers: headers

        expect(task.reload.name).not_to eq ''
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
    let!(:task) { create(:task, desk: desk) }
    let(:api_path) { "/desks/#{desk.id}/tasks/#{task.id}" }
    let(:invalid_path) { "/desks/#{desk.id}/tasks/#{task.id + 999}" }

    context 'when the task presence' do
      it 'deletes the task' do
        expect do
          delete api_path, headers: headers
        end.to change(Task, :count).by(-1)
      end

      it 'returns 204 status' do
        delete api_path, headers: headers
        expect(response).to have_http_status(:no_content)
      end
    end

    context 'when the task does not exist' do
      it 'does not delete any record' do
        expect { delete invalid_path, headers: headers }.not_to change(Task, :count)
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
