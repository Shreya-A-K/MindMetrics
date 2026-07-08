from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = "sessions.json"


# -------------------------------
# Serve Frontend Pages
# -------------------------------

@app.route('/')
def home():
    return render_template("index.html")


@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")


# -------------------------------
# Save Session Data
# -------------------------------

@app.route('/save-session', methods=['POST'])
def save_session():
    data = request.get_json()

    # Add timestamp
    data["timestamp"] = datetime.now().isoformat()

    # Ensure file exists
    if not os.path.exists(DATA_FILE):
        open(DATA_FILE, "w").close()

    # Append session as a new line
    with open(DATA_FILE, "a") as f:
        f.write(json.dumps(data) + "\n")

    return jsonify({"message": "Session saved successfully"}), 200


# -------------------------------
# Get All Sessions
# -------------------------------

@app.route("/get-sessions", methods=["GET"])
def get_sessions():
    sessions = []

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            for line in f:
                try:
                    sessions.append(json.loads(line))
                except json.JSONDecodeError:
                    continue  # skip bad lines safely

    return jsonify(sessions), 200


# -------------------------------
# Optional: Clear Data (for testing)
# -------------------------------

@app.route("/clear-sessions", methods=["POST"])
def clear_sessions():
    open(DATA_FILE, "w").close()
    return jsonify({"message": "All sessions cleared"}), 200


# -------------------------------
# Run App
# -------------------------------

if __name__ == '__main__':
    app.run(debug=True)