Rails.application.routes.draw do
  devise_for :users
  root to: 'tasks#index'
  resources :categories, except: [:new, :show]
  resources :tasks, except: [:new, :show]
end
