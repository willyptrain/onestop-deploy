import os
import time
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import datetime  


# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True

# extensions
db = SQLAlchemy(app)
auth = HTTPBasicAuth()
REDIRECT_URI="http://localhost:3000"


# @app.before_first_request
# def create_tables():
#     db.create_all()

class Trade(db.Model):
    __tablename__ = 'tradings'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    player_name = db.Column(db.String(32), index=True)
    sport = db.Column(db.String(32), index=True)
    year = db.Column(db.Integer, index=True)
    manufacturer = db.Column(db.String(32), index=True)
    cardNumber =  db.Column(db.String(32), index=True)
    cardSeries = db.Column(db.String(32), index=True)
    comments = db.Column(db.String(32), index=True)
    tradeOrSell = db.Column(db.String(32), index=True)
    time = db.Column(db.Integer, index=True)


    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

class Sale(db.Model):
    __tablename__ = 'sales'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    player_name = db.Column(db.String(32), index=True)
    sport = db.Column(db.String(32), index=True)
    year = db.Column(db.Integer, index=True)
    manufacturer = db.Column(db.String(32), index=True)
    cardNumber =  db.Column(db.String(32), index=True)
    cardSeries = db.Column(db.String(32), index=True)
    comments = db.Column(db.String(32), index=True)
    price = db.Column(db.Integer, index=True)
    tradeOrSell = db.Column(db.String(32), index=True)
    time = db.Column(db.Integer, index=True)


    def add_to_db(self):
        db.session.add(self)
        db.session.commit()


    
    


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expires_in=600):
        return jwt.encode(
            {'id': self.id, 'exp': time.time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256')

    @staticmethod
    def verify_auth_token(token):
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'],
                              algorithms=['HS256'])
        except:
            return
        return User.query.get(data['id'])


@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True

@app.route('/api/users/login', methods=['POST'])
def login():
    username = request.json.get('email')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    
    user = User.query.filter_by(username=username).first()
    if user is not None:
        if(verify_password(user.username, password)):
            access_token = user.generate_auth_token()
            return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':REDIRECT_URI}),201)
        abort(400)
    abort(400)
        
@app.route('/api/listing/create/<token>', methods=['POST'])
def create_listing(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        username = user.username
        sport = request.json.get('sport')
        player_name = request.json.get('player')
        year = request.json.get('year')
        manufacturer = request.json.get('manufacturer')
        cardNumber = request.json.get('cardNumber')
        cardSeries = request.json.get('cardSeries')
        comments = request.json.get('comments')
        tradeOrSell = request.json.get('tradeOrSell')
        price = request.json.get('price')
        time = datetime.datetime.now() 
        if(tradeOrSell == "Trade"):
            trade = Trade(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, time=time)
            db.session.add(trade)
            db.session.commit()
            trade_return = {'username': username, 'id':trade.id,'sport': sport,
                            'player_name': player_name, 'year': year, 'manufacturer': manufacturer,
                            'cardNumber': cardNumber, 'cardSeries': cardSeries, 'comments': comments, 
                            'tradeOrSell': tradeOrSell, 'time': time }
            print(trade_return)
            return (jsonify(trade_return),201)
        elif(tradeOrSell == "Trade"):
            sale = Sale(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, price=price,time=time)
            sale_return = {'username': username, 'id':sale.id,'sport': sport,
                            'player_name': player_name, 'year': year, 'manufacturer': manufacturer,
                            'cardNumber': cardNumber, 'cardSeries': cardSeries, 'comments': comments, 
                            'tradeOrSell': tradeOrSell, 'price':price,'time': time }
            db.session.add(sale)
            db.session.commit()
            print(sale_return)
            return (jsonify(sale_return),201)
        abort(400)  
    abort(400)
    

@app.route('/api/users/<token>')
def get_user_info(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        print(user.id)
        return (jsonify({'id':user.id, 'username': user.username}),201)
    abort(400)

@app.route('/api/users/signup', methods=['POST'])
def new_user():
    username = request.json.get('email')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = user.generate_auth_token()
    g.user = user
    return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':REDIRECT_URI}),201)




@app.route('/api/users/<id>')
def get_user(id):
    print(id)
    user = User.query.get(id)
    if not user:
        abort(400)
    return jsonify({'username': user.username})


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


# @app.route('/api/resource')
# @auth.login_required
# def get_resource():
#     print("yoooo !!!!")
#     return jsonify({'data': 'Hello, %s!' % g.user.username})


if not os.path.exists('db.sqlite'):
    db.create_all()
app.run(debug=True)