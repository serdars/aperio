class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :invitee, :state, :inviter, :organization

  def organization
    {
      id: object.organization.id,
      name: object.organization.name
    }
  end

  def inviter
    {
      id: object.inviter.id,
      name: object.inviter.name
    }
  end

  def invitee
    {
      id: object.invitee.id,
      name: object.invitee.name
    }
  end
end
