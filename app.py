from flask import Flask, request, session, jsonify, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3, os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-me-later")
DB = "mentora.db"
ROLES = {"student", "teacher", "parent"}

def db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with db() as conn:
        conn.execute("""CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL)""")

@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")

@app.route("/script.js")
def js():
    return send_from_directory(".", "script.js")

@app.route("/signup", methods=["POST"])
def signup():
    d = request.get_json()
    if d.get("role") not in ROLES or not d.get("email") or not d.get("password"):
        return jsonify(error="Missing or invalid info"), 400
    try:
        with db() as conn:
            conn.execute(
                "INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)",
                (d.get("name", ""), d["email"].lower(),
                 generate_password_hash(d["password"]), d["role"]))
    except sqlite3.IntegrityError:
        return jsonify(error="Email already used"), 409
    return jsonify(ok=True)

@app.route("/login", methods=["POST"])
def login():
    d = request.get_json()
    with db() as conn:
        u = conn.execute("SELECT * FROM users WHERE email=?",
                         (d.get("email", "").lower(),)).fetchone()
    if not u or not check_password_hash(u["password_hash"], d.get("password", "")):
        return jsonify(error="Wrong email or password"), 401
    session["user_id"] = u["id"]
    return jsonify(ok=True, name=u["name"], role=u["role"])

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify(ok=True)

@app.route("/me")
def me():
    if "user_id" not in session:
        return jsonify(error="Not logged in"), 401
    with db() as conn:
        u = conn.execute("SELECT name, role FROM users WHERE id=?",
                         (session["user_id"],)).fetchone()
    return jsonify(name=u["name"], role=u["role"])

init_db()

if __name__ == "__main__":
    app.run(debug=True)