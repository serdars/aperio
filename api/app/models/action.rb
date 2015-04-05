class Action < ActiveRecord::Base
  belongs_to :subject, polymorphic: true
  belongs_to :target, polymorphic: true
  belongs_to :related_to, polymorphic: true

  module Type
    JOIN_APERIO       = 0
    ORG_CREATE        = 1
    GROUP_CREATE      = 2
    GROUP_JOIN        = 3
    ORGANIZATION_JOIN = 4
    INVITE            = 5
  end

  def self.log(subject, action_type, target = nil, related_to = nil)
    Action.new(
      subject: subject, action_type: action_type,
      target: target, related_to: related_to, read: false
    ).save()
  end
end
