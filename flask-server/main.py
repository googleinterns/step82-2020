import datetime
import jwt
import os

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from google.cloud import datastore
from datetime import timezone

datastore_client = datastore.Client()
app = Flask(__name__, template_folder='static/react')
CORS(app)
bcrypt = Bcrypt()

SECRET_KEY = os.getenv('SECRET_KEY')

# sign-up api
@app.route('/apis/sign-up', methods=['POST'])
def store_user():
    email = request.json['email']
    username = request.json['username']

    email_result = list(datastore_client.query(kind='user').add_filter('email', '=', email).fetch(limit=1))
    username_result = list(datastore_client.query(kind='user').add_filter('username', '=', username).fetch(limit=1))

    if email_result and username_result:
        response_object = {
            'status': 'fail',
            'message': 'Both username and email are already registered.'
        }
        return response_object, 401
    elif email_result:
        response_object = {
            'status': 'fail',
            'message': 'Email already has a registered account.'
        }
        return response_object, 401
    elif username_result:
        response_object = {
            'status': 'fail',
            'message': 'Username is already registered.'
        }
        return response_object, 401
    else:
        entity = datastore.Entity(key=datastore_client.key('user'))
        entity.update({
            'email': email,
            'username': username,
            'password_hash': password(request.json['password']),
            'registered_on': datetime.datetime.now(timezone.utc),
            'deleted': False
        })

        datastore_client.put(entity)

        response_object = {
            'status': 'success',
            'message': 'Successfully signed up.'
        }
        return response_object, 200

@app.route('/apis/fetch-users', methods=['GET'])
def fetch_users():
    resp_token = decode_auth_token(request.headers.get('Authorization'))
    if is_valid_instance(resp_token):
        query = datastore_client.query(kind='user').add_filter('deleted', '=', False)
        users = list(query.fetch())
        array = []
        for user in users:
            if user.id != resp_token:
                array.append({
                    'id': user.id,
                    'username': user['username']
                })
        return jsonify(array), 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to fetch users.'
        }
        return response_object, 401

# login api
@app.route('/apis/login', methods=['POST'])
def login_user():
    username = request.json['username']
    password = request.json['password']
    remember = request.json['remember']
    try: 
        user = list(datastore_client.query(kind='user').add_filter('username', '=', username).fetch(limit=1))[0]
        if user and check_password(user['password_hash'], password):
            auth_token=encode_auth_token(user.id, remember)
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
            'message': 'Try to login again.'
        }
        return response_object, 500

# password
def password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')        

def check_password(password_hash, password):
    return bcrypt.check_password_hash(password_hash, password)

# logout api
@app.route('/apis/logout', methods=['POST'])
def logout_user():
    auth_token = request.json['Authorization']
    if auth_token:
        resp_token = decode_auth_token(auth_token)
        if is_valid_instance(resp_token):
            return save_token(token=auth_token)
        else:
            response_object = {
                'status': 'fail',
                'message': resp_token
            }
            return response_object, 401
    else:
        response_object = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return response_object, 403

# get current user api
@app.route('/apis/get-curr-user', methods=['GET'])
def get_curr_user():
    token = request.headers.get('Authorization')    
    resp_token = decode_auth_token(token)
    if not is_valid_instance(resp_token):
        response_object = {
            'status': 'fail',
            'message': resp_token
        }
        return response_object, 401
    
    response_object = {
            'status': 'success',
            'message': resp_token,
            'Authorization': token
    }
    return response_object, 200

# jwt token
def encode_auth_token(user_id, remember):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        if remember:
            exp = datetime.datetime.now(timezone.utc) + datetime.timedelta(days=7, seconds=5)
        else: 
            exp = datetime.datetime.now(timezone.utc) + datetime.timedelta(days=1, seconds=5)
        payload = {
            'exp': exp,
            'iat': datetime.datetime.now(timezone.utc),
            'sub': user_id
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
            return 'Token denylisted. Please log in again.'
        else:
            return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'

def is_valid_instance(resp_token):
    if resp_token == "Token denylisted. Please log in again." or resp_token == "Signature expired. Please log in again." or resp_token == "Invalid token. Please log in again.":
        return False
    return True

# denylist
def save_token(token):
    try:
        deny_token = datastore.Entity(key=datastore_client.key('denylist_token'))
        deny_token.update({
            'jwt': token
        })
        datastore_client.put(deny_token)

        response_object = {
            'status': 'success',
            'message': 'Successfully logged out.'
        }
        return response_object, 200
    except Exception as e:
        print(e)
        response_object = {
            'status': 'fail',
            'message': 'Successfully logout out w/ error.'
        }
        return response_object, 200

def check_denylist(token):
    token_query = list(datastore_client.query(kind='denylist_token').add_filter('jwt', '=', token).fetch())
    if token_query:
        return True
    else:
        return False        

# add bookmark api
@app.route('/apis/add-bookmark', methods=['POST'])
def add_bookmark():
    resp_token = decode_auth_token(request.json['Authorization'])

    if is_valid_instance(resp_token):
        entity = datastore.Entity(key=datastore_client.key('bookmark'))
        entity.update({
            'link': request.json['link'],
            'title': request.json['title'],
            'description': request.json['description'],
            'deleted': False,
            'created': datetime.datetime.now(timezone.utc),
            'creator': int(resp_token)
        })
        datastore_client.put(entity)

        for clink in request.json['clink']:
            map_entity = datastore.Entity(key=datastore_client.key('bookmark_clink_map'));
            map_entity.update({
                'clink_id': int(clink),
                'bookmark_id': int(entity.id)
            })
            datastore_client.put(map_entity)

        response_object = {
            'link': request.json['link'],
            'title': request.json['title'],
            'description': request.json['description'],
            'id': entity.id
        }
        return response_object, 200
    else: 
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to add bookmark.'
        }
        return response_object, 401

# add clink api
@app.route('/apis/add-clink', methods=['POST'])
def add_clink():
    resp_token = decode_auth_token(request.json['Authorization'])

    if is_valid_instance(resp_token):
        title = request.json['title']
        if title == 'All':
            response_object = {
                'status': 'fail',
                'message': 'Cannot create a clink called \"All\". Failed to add clink.'
            }
            return response_object, 401
        elif title == 'User Page':
            response_object = {
                'status': 'fail',
                'message': 'Cannot create a clink called \"User Page\". Failed to add clink.'
            }
            return response_object, 401

        private = request.json['privacy']
        
        clink_entity = datastore.Entity(key=datastore_client.key('clink'))
        clink_entity.update({
            'title': title,
            'deleted': False,
            'private': private,
            'created': datetime.datetime.now(timezone.utc)
        })  
        datastore_client.put(clink_entity)

        write_entity = datastore.Entity(key=datastore_client.key('user_write_map'))
        read_entity = datastore.Entity(key=datastore_client.key('user_read_map'))

        mapping = {
            'clink_id': int(clink_entity.id),
            'user_id': int(resp_token)
        }
            
        write_entity.update(mapping)
        read_entity.update(mapping)
        datastore_client.put(write_entity)
        datastore_client.put(read_entity)

        response_object = {
            'title': title,
            'private': private,
            'id': clink_entity.id
        }
        return response_object, 200  
    else:
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to add clink.'
        }
        return response_object, 401

@app.route('/apis/fetch-clinks', methods=['GET'])
def fetch_clinks():
    resp_token = decode_auth_token(request.headers.get('Authorization'))

    if is_valid_instance(resp_token):
        clink_ids = list(datastore_client.query(kind='user_read_map').add_filter('user_id', '=', int(resp_token)).fetch())
        all_query = datastore_client.query(kind='clink').add_filter('deleted', '=', False)
        all_query.order = ['created']
        all_list = list(all_query.fetch())
        to_return = []    
        for clink in all_list:
            for id in clink_ids:
                if id['clink_id'] == clink.id:
                    response_object = {
                        'title': clink['title'],
                        'id': clink.id,
                        'private': clink['private'] 
                    }
                    to_return.append(response_object)
                    break
        return jsonify(to_return), 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to fetch clinks.'
        }
        return response_object, 401

@app.route('/apis/fetch-write-clinks', methods=['GET'])
def fetch_write_clinks():
    resp_token = decode_auth_token(request.headers.get('Authorization'))

    if is_valid_instance(resp_token):
        clink_ids = list(datastore_client.query(kind='user_write_map').add_filter('user_id', '=', int(resp_token)).fetch())
        all_query = datastore_client.query(kind='clink').add_filter('deleted', '=', False)
        all_query.order = ['created']
        all_list = list(all_query.fetch())
        to_return = []    

        for clink in all_list:
            for id in clink_ids:
                if id['clink_id'] == clink.id:
                    response_object = {
                        'title': clink['title'],
                        'id': clink.id 
                    }
                    to_return.append(response_object)
                    break
        return jsonify(to_return), 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to fetch clinks.'
        }
        return response_object, 401

@app.route('/apis/fetch-bookmarks/<string:clink_id>', methods=['GET'])
def fetch_bookmarks(clink_id):
    resp_token = decode_auth_token(request.headers.get('Authorization'))
    
    if is_valid_instance(resp_token):
        bookmark_query = datastore_client.query(kind='bookmark').add_filter('creator', '=', int(resp_token)).add_filter('deleted', '=', False)
        bookmark_query.order = ['created']
        all_list = list(bookmark_query.fetch())
        if clink_id == 'All':
            to_return = []
            for bookmark in all_list:
                response_object = {
                    'title': bookmark['title'],
                    'description': bookmark['description'],
                    'link': bookmark['link'],
                    'id': bookmark.id
                }
                to_return.append(response_object)              
            return jsonify(to_return), 200
        else:
            bookmark_ids = list(datastore_client.query(kind='bookmark_clink_map').add_filter('clink_id', '=', int(clink_id)).fetch())
            to_return = []    

            for bookmark in all_list:
                for id in bookmark_ids:
                    if id['bookmark_id'] == bookmark.id:
                        response_object = {
                            'title': bookmark['title'],
                            'description': bookmark['description'],
                            'link': bookmark['link'],
                            'id': id['bookmark_id']
                        }
                        to_return.append(response_object)
            return jsonify(to_return), 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'Invalid JWT. Failed to fetch clinks.'
        }
        return response_object, 401

# routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template("index.html")

app.run(debug=True)