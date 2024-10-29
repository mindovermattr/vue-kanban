Rails.application.routes.draw do
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
    resources :statuses, except: [:new, :show]
    resources :categories, except: [:new, :show]
    resources :tasks, except: [:new, :show]
    resources :invitations, only: [:create]
    get '/invitations/:token/accept', to: 'invitations#accept', as: 'invitation_accept'
  end
end
