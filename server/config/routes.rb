Rails.application.routes.draw do
  mount Rswag::Api::Engine => '/api-docs'
  mount Rswag::Ui::Engine => '/api-docs'
  get '/current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }

  root to: 'desks#index'
  resources :desks, except: [:new, :show] do
    resources :desk_users, only: [:index, :update, :destroy]
    resources :statuses, except: [:new, :show, :edit]
    resources :categories, except: [:new, :show, :edit]
    resources :tasks, except: [:new, :show, :edit]
    resources :invitations, only: [:create]
    get '/invitations/:token/accept', to: 'invitations#accept', as: 'invitation_accept'
  end

  mount ActionCable.server => '/cable'
end
