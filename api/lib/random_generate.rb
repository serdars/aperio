require 'faker'

Action.destroy_all

def gen_random_user
  User.new(name: Faker::Name.name,
           email: Faker::Internet.email,
           password: "1234",
           password_confirmation: "1234").save()
end

def gen_random_org
  o = Organization.new(name: Faker::Company.name, motto: Faker::Lorem.sentence)
  o.save()
  5.times do
    gen_random_group(org: o)
  end
end

def gen_random_join
  Membership.new(user: User.all.sample, group: Group.all.sample).save()
end

def gen_random_group(org: nil)
  org ||= Organization.all.sample

  Group.new(
    name: Faker::Lorem.words(2).join(" "),
    motto: Faker::Lorem.sentence,
    private: [ true, false ].sample,
    organization: org
  ).save()
end

# 5 Users 25 Groups
5.times do
  gen_random_user
  gen_random_org
end

30.times do
  gen_random_join
end
