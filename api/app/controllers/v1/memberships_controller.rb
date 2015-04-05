class V1::MembershipsController < ApplicationController
  def create
    # TODO:
    # This method currently takes care of a few actions:
    # Join by intention / Add to group / Add to organization
    # We might want to create different based for each of these.
    joinable = if params[:group_id]
      Group.find(params[:group_id])
    else
      Organization.find(params[:organization_id])
    end

    user_id = params[:user_id] || current_user.id
    @membership = Membership.new(user_id: user_id, joinable: joinable)

    if @membership.save
      render json: @membership
    else
      render json: {
        message: "Membership creation failed!"
      }, status: :bad_request
    end
  end
end
