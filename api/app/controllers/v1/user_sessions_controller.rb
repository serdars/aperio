class V1::UserSessionsController < ApplicationController
  before_filter :require_user, :only => :destroy
  before_filter :require_no_user, :only => :create

  def login
    @user_session = UserSession.new(user_session_params)
    if @user_session.save
      render json: @user_session.user
    else
      render json: {
        message: "Login failed!"
      }, status: :forbidden
    end
  end

  def logout
    current_user_session.destroy
    render json: { }, status: :ok
  end

  private
  def user_session_params
    params.require(:user_session).permit(:name, :password)
  end
end
