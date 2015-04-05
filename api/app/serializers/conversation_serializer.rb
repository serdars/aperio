class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :messages, :group

  def group
    {
      id: object.group.id,
      name: object.group.name
    }
  end

  def messages
    object.messages.map do |m|
      {
        id: m.id,
        body: m.body,
        user: {
          id: m.user.id,
          name: m.user.name
        },
        updated_at: m.updated_at
      }
    end
  end
end
