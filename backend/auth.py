from flask_restx import Api, Resource,Namespace,fields
from models import User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import (JWTManager, create_access_token, create_refresh_token,
 jwt_required, get_jwt_identity, get_jwt_identity)
from flask import Flask, request, jsonify,make_response



auth_ns=Namespace("auth", description="Namespace for authentication")

#model (serializer)
signup_model=auth_ns.model(
    "SignUp",
    {
      "username":fields.String(),
      "email":fields.String(),
      "password":fields.String()
    }
)

#login_module
login_module=auth_ns.model(
"Login",
  {
    "username":fields.String(),
    "password":fields.String()
  }
)



@auth_ns.route('/signup')
class SignUp(Resource):
  @auth_ns.expect(signup_model)
  def post(self):
    data=request.get_json()

    username=data.get("username")
    email=data.get("email")
    db_username=User.query.filter_by(username=username).first()
    db_usermail=User.query.filter_by(email=email).first()


    if db_username or db_usermail:
      return {"message": f"User with username {username} or email {email} already exists"}, 400

    
    new_user=User(
      username=data.get('username'),
      email=data.get('email'),
      password=generate_password_hash(data.get('password'))
    )
    
    new_user.save()
    return make_response(jsonify({"message": "User created successfully"}), 201)

    
@auth_ns.route('/login')
class Login(Resource):
  @auth_ns.expect(login_module)
  def post(self):
   data=request.get_json()

   username=data.get("username")
   password=data.get("password")

   db_user=User.query.filter_by(username=username).first()

   if db_user and check_password_hash(db_user.password, password):
    access_token=create_access_token(identity=db_user.username)
    refresh_token=create_refresh_token(identity=db_user.username)

    return jsonify({"access_token":access_token, "refresh_token":refresh_token})


@auth_ns.route("/refresh")
class refreshResource(Resource):
  @jwt_required(refresh=True)
  def post(self):

      current_user = get_jwt_identity()

      new_acess_token = create_access_token(identity=current_user)

      return make_response(jsonify({"acess_token":new_acess_token}),200)
