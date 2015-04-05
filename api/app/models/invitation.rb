class Invitation < ActiveRecord::Base
  belongs_to :inviter, class_name: "User", foreign_key: 'inviter_id'
  belongs_to :invitee, class_name: "User", foreign_key: 'invitee_id'
  belongs_to :organization

  enum state: [ :waiting, :declined, :accepted ]

  after_create :log_create

  def accept
    if state == "waiting" && Membership.new(user: invitee, joinable: organization).save()
      self.state = :accepted
      self.save
      true
    else
      false
    end
  end

  def decline
    if state == "waiting"
      self.state = :declined
      self.save
      true
    else
      false
    end
  end

  def log_create
    Action.log(User.current_user, Action::Type::INVITE, self.organization)
  end
end
