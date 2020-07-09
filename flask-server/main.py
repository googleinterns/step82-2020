import datetime
import jwt
import os

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from google.cloud import datastore

datastore_client = datastore.Client()
app = Flask(__name__, template_folder='static/react')
CORS(app)
bcrypt = Bcrypt()

SECRET_KEY = os.getenv('SECRET_KEY')

# sign-up api
@app.route('/apis/sign-up', methods=['POST'])
def store_user():
    entity = datastore.Entity(key=datastore_client.key('user'))
    entity.update({
        'email': request.json['email'],
        'username': request.json['username'],
        'password_hash': password(request.json['password']),
        'registered_on': datetime.datetime.now()
    })

    datastore_client.put(entity)

def fetch_users(limit):
    query = datastore_client.query(kind='user')
    query.order = ['registered_on']

    users = query.fetch(limit=limit)
    
    return users

@app.route('/fetch-users', methods=['GET'])
def show_users():
    users = fetch_users(10)
    array = []
    for user in users:
        array.append([user['email'], user['username'], user['password_hash'], user['registered_on']])
    return jsonify(array)

# login api
@app.route('/apis/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']
    try: 
        query = datastore_client.query(kind='user').add_filter('username', '=', username)
        query.order = ['username', 'registered_on']
        user = list(query.fetch(limit=1))[0]
        if user and check_password(user['password_hash'], password):
            auth_token=encode_auth_token(username)
            if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode() 
                    }
                    return response_object, 200
        else:
            response_object = {
                'status': 'fail',
                'message': 'Username or password does not match.'
            }
            return response_object, 401

    except Exception as e:
        print(e)
        response_object = {
            'status': 'fail',
            'message': 'Try again'
        }
        return response_object, 500

# logout api
@app.route('/apis/logout', methods=['POST'])
def logout_user():
    user = request.json['user']
    if user:
        auth_token = user.get('Authorization')
    else:
        auth_token = ''
    if auth_token:
        resp = decode_auth_token(auth_token)
        if isinstance(resp, str):
            return save_token(token=auth_token)
        else:
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
    else:
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return response_object, 403

# add token to denylist
def save_token(token):
    try:
        deny_token = datastore.Entity(key=datastore_client.key('denylist_token'))
        deny_token.update({
            'jwt': str(token)
        })
        datastore_client.put(deny_token)

        response_object = {
            'status': 'success',
            'message': 'Successfully logged out.'
        }
        return response_object, 200
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': e
        }
        return response_object, 200

@app.route('/apis/get-curr-user', methods=['GET'])
def check_denylist(request):
    token = request.headers.get('jwt')
    resp = decode_auth_token(token)
    if not isinstance(resp, str):
        response_object = {
            'status': 'fail',
            'message': resp
        }
        return response_object, 401
    token_query = datastore_client.query(kind='denylist_token')
    token_query.add_filter('jwt', '=', str(token))
    is_denied = list(token_query.fetch())
    return is_denied

# password
def password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')        
          
def check_password(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)

# jwt token
def encode_auth_token(username):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow(),
            'sub': username
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm='HS256'
        )
    except Exception as e:
        return e    

def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        payload = jwt.decode(auth_token, SECRET_KEY)
        if check_denylist(auth_token):
            return 'Token denylisted. Please log in again'
        else:
            return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
        
# routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template("index.html")

app.run(debug=True)
