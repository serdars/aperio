class V1::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: {
        message: "User creation failed!"
      }, status: :bad_request
    end

  end

  def update
    @user = current_user
    if @user.update_attributes(params[:user])
      render json: current_user
    else
      render json: {
        message: "User update failed!"
      }, status: :bad_request
    end
  end

  def current
    render json: current_user
  end

  def timeline
    render json: Action.order(created_at: :desc).limit(20), root: "timeline"
  end

  def search
    @users = User.where("name ~* :query or email ~* :query", query: "^#{params[:query]}.*")
    @suggestions = @users.map do |u|
      {
        id: u.id,
        name: u.name,
        email: u.email
      }
    end

    render json: @suggestions, root: "suggestions"
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
