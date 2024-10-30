class InvitationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_desk!, only: [:create]

  def create
    @invitation = @desk.invitations.new(invitation_params)

    if @invitation.save
      render json: { link: desk_invitation_accept_url(desk_id: @invitation.desk_id, token: @invitation.token) },
             status: :created
    else
      unprocessable_entity(@invitation)
    end
  end

  def accept
    @invitation = Invitation.find_by(token: params[:token])

    if @invitation && @invitation.is_relevant?
      @invitation.desk.users << current_user
      @invitation.use!

      render json: { message: 'You have accepted your invitation!' }, status: :accepted
    else
      render json: { error: 'Token expired!' }, status: :unprocessable_entity
    end
  end

  private

  def set_desk!
    @desk = Desk.find_by(id: params[:desk_id])
  end

  def invitation_params
    params.require(:invitation).permit(:max_uses)
  end
end
