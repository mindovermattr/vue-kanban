Rails.application.routes.draw do
  root to: 'tasks#index'
  resources :tasks, except: [:new, :show]
end
