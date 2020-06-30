import datetime

from flask import Flask, render_template, jsonify, request
from flask_bcrypt import Bcrypt
from google.cloud import datastore

datastore_client = datastore.Client()
app = Flask(__name__, template_folder='static/react')
bcrypt = Bcrypt()

def store_time(dt):
    entity = datastore.Entity(key=datastore_client.key('visit'))
    entity.update({
        'timestamp': dt
    })

    datastore_client.put(entity)


def fetch_times(limit):
    query = datastore_client.query(kind='visit')
    query.order = ['-timestamp']

    times = query.fetch(limit=limit)

    return times

# create_user & fetch_users
def create_user(email, username, password):
    entity = datastore.Entity(key=datastore_client.key('user'))
    entity.update({
        'email': email,
        'username': username,
        'password_hash': bcrypt.generate_password_hash(password).decode('utf-8')
    })

    datastore_client.put(entity)
    return entity

def fetch_users(limit):
    query = datastore_client.query(kind='user')
    users = query.fetch(limit=limit)
    return users

@app.route('/create-user', methods=['POST'])
def create_a_user():
    return create_user(request.json['email'], request.json['username'], request.json['password'])

@app.route('/fetch-users')
def show_users():
    users = fetch_users(10)
    array = []
    for user in users:
        array.append({user['email'], user['username'], user['password_hash']})
    return jsonify(array)

@app.route('/time')
def show_time():
    store_time(datetime.datetime.now())
    times = fetch_times(10)
    array = []
    for time in times:
        array.append(time['timestamp'])
    return jsonify(array)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template("index.html")

app.run(debug=True)
