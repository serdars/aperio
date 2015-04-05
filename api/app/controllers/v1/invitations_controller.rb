class V1::InvitationsController < ApplicationController
  def create
    @organization = Organization.find(invitation_params[:organization_id])
    @invitee = User.find(invitation_params[:invitee_id])

    @invitation = Invitation.new({
      inviter: current_user,
      invitee: @invitee,
      organization: @organization,
      state: :waiting
    })

    if @invitation.save
      render json: @invitation
    else
      render json: {
        message: "Invitation creation failed!"
      }, status: :bad_request
    end
  end

  def accept
    @invitation = Invitation.find(params[:id])

    if @invitation.accept
      render json: @invitation
    else
      render json: {
        message: "Invitation accept failed!"
      }, status: :bad_request
    end
  end

  def decline
    @invitation = Invitation.find(params[:id])

    if @invitation.decline
      render json: @invitation
    else
      render json: {
        message: "Invitation decline failed!"
      }, status: :bad_request
    end
  end

  private
  def invitation_params
    params.require(:invitation).permit(:invitee_id, :inviter_id, :organization_id)
  end
end
