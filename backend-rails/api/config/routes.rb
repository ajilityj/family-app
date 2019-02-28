Rails.application.routes.draw do
  post 'authenticate', to: 'authentication#authenticate'
  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]
  mount ActionCable.server => '/cable'
end
