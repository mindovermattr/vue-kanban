# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_10_22_184018) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.string "main_color", null: false
    t.string "accent_color", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "desk_id", null: false
    t.index ["desk_id"], name: "index_categories_on_desk_id"
  end

  create_table "desks", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_desks_on_user_id"
  end

  create_table "statuses", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "desk_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["desk_id", "name"], name: "index_statuses_on_desk_id_and_name", unique: true
    t.index ["desk_id"], name: "index_statuses_on_desk_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name", null: false
    t.text "body", null: false
    t.bigint "category_id", null: false
    t.date "period", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "desk_id", null: false
    t.bigint "status_id", null: false
    t.index ["category_id"], name: "index_tasks_on_category_id"
    t.index ["desk_id"], name: "index_tasks_on_desk_id"
    t.index ["status_id"], name: "index_tasks_on_status_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "categories", "desks"
  add_foreign_key "desks", "users"
  add_foreign_key "statuses", "desks"
  add_foreign_key "tasks", "categories"
  add_foreign_key "tasks", "desks"
  add_foreign_key "tasks", "statuses"
end
