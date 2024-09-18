Rails.application.routes.draw do
  root to: 'tasks#index'
  resource :task
end
