class V1::GroupsController < ApplicationController
  def create
    @group = Group.new(group_params.merge({private: false}))

    if @group.save
      render json: {
        organization_id: @group.organization.id,
        group: GroupSerializer.new(@group, root: nil)
      }
    else
      render json: {
        message: "Group creation failed!"
      }, status: :bad_request
    end
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      render json: {
        organization_id: @group.organization.id,
        group: GroupSerializer.new(@group, root: nil)
      }
    else
      render json: {
        message: "Group update failed!"
      }, status: :bad_request
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, :motto, :organization_id, :private)
  end

end
