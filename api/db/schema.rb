# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150330155318) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.boolean  "read"
    t.integer  "action_type"
    t.integer  "subject_id"
    t.string   "subject_type"
    t.integer  "target_id"
    t.string   "target_type"
    t.integer  "related_to_id"
    t.string   "related_to_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "actions", ["related_to_type", "related_to_id"], name: "index_actions_on_related_to_type_and_related_to_id", using: :btree
  add_index "actions", ["subject_type", "subject_id"], name: "index_actions_on_subject_type_and_subject_id", using: :btree
  add_index "actions", ["target_type", "target_id"], name: "index_actions_on_target_type_and_target_id", using: :btree

  create_table "conversations", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "group_id"
    t.integer  "organization_id"
    t.string   "title"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "conversations", ["group_id"], name: "index_conversations_on_group_id", using: :btree
  add_index "conversations", ["organization_id"], name: "index_conversations_on_organization_id", using: :btree
  add_index "conversations", ["user_id"], name: "index_conversations_on_user_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "name"
    t.string   "motto"
    t.boolean  "private"
    t.integer  "organization_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "groups", ["organization_id"], name: "index_groups_on_organization_id", using: :btree

  create_table "invitations", force: :cascade do |t|
    t.integer  "inviter_id"
    t.integer  "invitee_id"
    t.integer  "organization_id"
    t.integer  "state"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "joinable_id"
    t.string   "joinable_type"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "messages", force: :cascade do |t|
    t.text     "body"
    t.integer  "conversation_id"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "organizations", force: :cascade do |t|
    t.string   "name"
    t.string   "motto"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                           null: false
    t.string   "email",                          null: false
    t.string   "crypted_password",               null: false
    t.string   "password_salt",                  null: false
    t.string   "persistence_token",              null: false
    t.integer  "login_count",        default: 0, null: false
    t.integer  "failed_login_count", default: 0, null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

end
