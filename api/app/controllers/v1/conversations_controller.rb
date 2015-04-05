class V1::ConversationsController < ApplicationController
  def create
    @group = Group.find(conversation_params[:group_id])
    @organization = Organization.find(conversation_params[:organization_id])
    @conversation = Conversation.new(group: @group, organization: @organization,
      title: conversation_params[:title], user: current_user)
    @conversation.save

    @message = Message.new(conversation: @conversation, user: current_user,
      body: conversation_params[:message])

    if @message.save
      render json: @conversation
    else
      render json: {
        message: "Conversation creation failed!"
      }, status: :bad_request
    end
  end

  private
  def conversation_params
    params.require(:conversation).permit(:group_id, :organization_id, :title, :message)
  end
end
