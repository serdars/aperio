class ActionSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :action_type, :read,
    :subject, :target, :related_to

  def subject
    if object.subject
      {
        id: object.subject.id,
        type: object.subject_type,
        name: object.subject.name
      }
    else
      nil
    end
  end

  def target
    if object.target
      {
        id: object.target.id,
        type: object.target_type,
        name: object.target.name
      }
    else
      nil
    end
  end

  def related_to
    if object.related_to
      {
        id: object.related_to.id,
        type: object.related_to_type,
        name: object.related_to.name
      }
    else
      nil
    end
  end
end
