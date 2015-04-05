class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name, :motto, :groups, :is_member, :is_admin, :invitations, :conversations

  def groups
    object.groups.map { |g|
      GroupSerializer.new(g, root: nil)
    }
  end

  def invitations
    object.invitations.map { |i|
      InvitationSerializer.new(i, root: nil)
    }
  end

  def conversations
    object.conversations.map { |i|
      ConversationSerializer.new(i, root: nil)
    }
  end
end
