class V1::OrganizationsController < ApplicationController
  def create
    @organization = Organization.new(organization_params)

    if @organization.save
      render json: @organization
    else
      render json: {
        message: "Organization creation failed!"
      }, status: :bad_request
    end
  end

  def update
    @organization = Organization.find(params[:id])

    if @organization.update(organization_params)
      render json: @organization
    else
      render json: {
        message: "Organization update failed!"
      }, status: :bad_request
    end
  end

  def show
    @organization = Organization.find(params[:id])

    render json: @organization
  end

  def timeline
    @organization = Organization.find(params[:id])
    t = Action.arel_table

    @timeline = Action.where((t[:target_type].eq("Organization").and(t[:target_id].eq(@organization.id))).
      or(t[:related_to_type].eq("Organization").and(t[:related_to_id].eq(@organization.id)))).
      order(created_at: :desc).limit(20)

    render json: @timeline, root: "timeline"
  end

  private
  def organization_params
    params.require(:organization).permit(:name, :motto)
  end
end
