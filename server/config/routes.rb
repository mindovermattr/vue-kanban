Rails.application.routes.draw do
  root to: 'tasks#index'
  resources :categories, except: [:new, :show]
  resources :tasks, except: [:new, :show]
end
