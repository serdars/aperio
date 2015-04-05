class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :organizations, :invitations

  def organizations
    object.groups.map { |g|
      g.organization
    }.uniq.map { |o|
      OrganizationSerializer.new(o, root: nil)
    }
  end

  def invitations
    object.invitations.map { |i|
      InvitationSerializer.new(i, root: nil)
    }
  end
end
