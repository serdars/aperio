class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :motto, :private, :is_member, :member_count

  def member_count
    object.users.count
  end
end
