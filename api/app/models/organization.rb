class Organization < ActiveRecord::Base
  has_many :groups
  has_many :memberships, as: :joinable
  has_many :invitations
  has_many :conversations

  after_create :log_create
  after_create :create_default_groups

  has_many :users, through: :memberships, as: :joinable

  def is_member(user = User.current_user)
    self.users.include?(user)
  end

  def is_admin(user = User.current_user)
    # First created group is the admin group.
    self.groups.first.users.include?(user)
  end

  private
  def create_default_groups
    Membership.new(user: User.current_user, joinable: self).save()

    admin_group = Group.new({
      name: "Admins",
      motto: "Adminstrators",
      private: true,
      organization: self
    })
    admin_group.save()

    Membership.new(user: User.current_user, joinable: admin_group).save()
  end

  def log_create
    Action.log(User.current_user, Action::Type::ORG_CREATE, self)
  end
end
