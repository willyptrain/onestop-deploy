import os
import time
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import datetime  
from sqlalchemy import func



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

    def json_rep(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

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

    def json_rep(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class WantedCard(db.Model):
    __tablename__ = 'wanted_cards'
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, index=True)
    username = db.Column(db.String(32), index=True)
    type = db.Column(db.String(32), index=True) #trade or sale
    sport = db.Column(db.String(32), index=True) 
    time = db.Column(db.Integer, index=True)

    def __eq__(self, other):
        print(self.json_rep())
        print(other)
        return (self.item_id == other.item_id and
                self.type == other.type)

    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json_rep(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}




class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))
    wantedCards = db.Column(db.PickleType)


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
    user = User.verify_auth_token(username_or_token)
    if not user:
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@app.route('/api/wanted/trades/<sport>/<token>')
def get_wanted_trades(sport, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    if(sport.lower() != "all"):
        user_wanted = list(user.wantedCards)
        trade_wanted = []
        for item in user_wanted:
            print(item)
            if(item.type == "Trade" and item.sport.lower() == sport.lower()):
                item_id = item.item_id
                trade = Trade.query.filter_by(id=item_id).first()
                if(trade is not None):
                    trade_wanted.append(trade.json_rep())
        # trades = Trade.query.filter(Trade.sport.ilike("%"+sport.lower()+"%")).all()
        # if(trades is not None):
        return (jsonify({'trades': trade_wanted}),201)
    else:
        user_wanted = list(user.wantedCards)
        trade_wanted = []
        for item in user_wanted:
            print(item)
            if(item.type == "Trade"):
                item_id = item.item_id
                trade = Trade.query.filter_by(id=item_id).first()
                if(trade is not None):
                    trade_wanted.append(trade.json_rep())
        # trades = Trade.query.filter(Trade.sport.ilike("%"+sport.lower()+"%")).all()
        # if(trades is not None):
        return (jsonify({'trades': trade_wanted}),201)

@app.route('/api/post_wanted/trades/<item_id>/<token>', methods=['POST'])
def post_wanted_trade(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    card_lookup = Trade.query.filter_by(id=item_id).first()
    if(card_lookup is None):
        return (jsonify({"error":"Trade not found!"}), 404)


    wanted = WantedCard(item_id=card_lookup.id, username=card_lookup.username, 
                type=card_lookup.tradeOrSell, sport=card_lookup.sport,
                time=datetime.datetime.now())
    user_wanted = list(user.wantedCards)
    print(user_wanted)
    if(not any((card.item_id == wanted.item_id and card.type == wanted.type) for card in user_wanted)):
        user_wanted.append(wanted)
        user.wantedCards = user_wanted
    else:
        user_wanted.remove(wanted)
        user.wantedCards = user_wanted
    # db.session.add(wanted)
    db.session.commit()
    item_ids = []
    for item in user_wanted:
        if(item.type == "Trade"):
            item_ids.append(item.item_id)
    return jsonify(item_ids, 201)



@app.route('/api/wanted/sales/<sport>/<token>')
def get_wanted_sales(sport, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    if(sport.lower() != "all"):
        user_wanted = list(user.wantedCards)
        sale_wanted = []
        for item in user_wanted:
            print(item)
            if(item.type == "Sell" and item.sport.lower() == sport.lower()):
                item_id = item.item_id
                sale = Sale.query.filter_by(id=item_id).first()
                if(sale is not None):
                    sale_wanted.append(sale.json_rep())
        
        return (jsonify({'sales': sale_wanted}),201)
        
    else:
        user_wanted = list(user.wantedCards)
        sale_wanted = []
        for item in user_wanted:
            print(item)
            if(item.type == "Sell"):
                item_id = item.item_id
                sale = Sale.query.filter_by(id=item_id).first()
                if(sale is not None):
                    sale_wanted.append(sale.json_rep())
        
        return (jsonify({'sales': sale_wanted}),201)

@app.route('/api/post_wanted/sales/<item_id>/<token>', methods=['POST'])
def post_wanted_sale(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    card_lookup = Sale.query.filter_by(id=item_id).first()
    if(card_lookup is None):
        return (jsonify({"error":"Sale not found!"}), 404)

    wanted = WantedCard(item_id=card_lookup.id, username=card_lookup.username, 
                type=card_lookup.tradeOrSell, sport=card_lookup.sport,
                time=datetime.datetime.now())
    user_wanted = list(user.wantedCards)
    print(user_wanted)
    if(not any(card == wanted for card in user_wanted)):
        user_wanted.append(wanted)
        user.wantedCards = user_wanted
    else:
        user_wanted.remove(wanted)
        user.wantedCards = user_wanted
    db.session.commit()
    item_ids = []
    for item in user_wanted:
        if(item.type == "Sell"):
            item_ids.append(item.item_id)
    
    return jsonify(item_ids, 201)





    


@app.route('/api/all_listings/sales/<sport>/<token>', methods=['GET'])
def get_all_sales(sport, token):
    user = User.verify_auth_token(token)
    
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    if(sport.lower() != "all"):
        sales = Sale.query.filter(Sale.sport.ilike("%"+sport.lower()+"%")).all()
        user_wanted = list(user.wantedCards)
        sale_wanted = []
        for item in user_wanted:
            if(item.type == "Sell"):
                sale_wanted.append(item.item_id)
        if(sales is not None):
            return (jsonify({'sales': [sale.json_rep() for sale in sales],
                            'wantedCards': sale_wanted}),201)
        return (jsonify({"error":"Sales not found!"}), 404)
    else:
        sales = Sale.query.all()
        user_wanted = list(user.wantedCards)
        sale_wanted = []
        for item in user_wanted:
            if(item.type == "Sell"):
                sale_wanted.append(item.item_id)
        if(sales is not None):
            return (jsonify({'sales': [sale.json_rep() for sale in sales],
                        'wantedCards': sale_wanted}),201)
        return (jsonify({"error":"Sales not found!"}), 404)

@app.route('/api/all_listings/trades/<sport>/<token>', methods=['GET'])
def get_all_trades(sport, token):
    user = User.verify_auth_token(token)
    
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    if(sport.lower() != "all"):
        trades = Trade.query.filter(Trade.sport.ilike("%"+sport.lower()+"%")).all()
        user_wanted = list(user.wantedCards)
        trade_wanted = []
        for item in user_wanted:
            if(item.type == "Trade"):
                trade_wanted.append(item.item_id)
        if(trades is not None):
            return (jsonify({'trades': [trade.json_rep() for trade in trades],
                                'wantedCards': trade_wanted}),201)
        return (jsonify({"error":"Trades not found!"}), 404)
    else:
        trades = Trade.query.all()
        user_wanted = list(user.wantedCards)
        trade_wanted = []
        for item in user_wanted:
            print(item)
            if(item.type == "Trade"):
                trade_wanted.append(item.item_id)
        if(trades is not None):
            return (jsonify({'trades': [trade.json_rep() for trade in trades],
                            'wantedCards': trade_wanted}),201)
        return (jsonify({"error":"Trades not found!"}), 404)





@app.route('/api/users/listings/trades/<item_id>/<token>', methods=['GET'])
def get_user_trade(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    trade = Trade.query.filter_by(id=item_id,username=user.username).first()
    if(trade is not None):
        trade_return = {'username': trade.username, 'id': trade.id,'sport': trade.sport,
                            'player_name': trade.player_name, 'year': trade.year, 'manufacturer': trade.manufacturer,
                            'cardNumber': trade.cardNumber, 'cardSeries': trade.cardSeries, 'comments': trade.comments, 
                            'tradeOrSell': trade.tradeOrSell, 'time': trade.time }
        return (jsonify(trade_return),201)
    return (jsonify({"error":"No trades found!"}), 404)


@app.route('/api/users/listings/sales/<item_id>/<token>', methods=['GET'])
def get_user_sale(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    sale = Sale.query.filter_by(id=item_id,username=user.username).first()
    if(sale is not None):
        sale_return = {'username': sale.username, 'id': sale.id,'sport': sale.sport,
                            'player_name': sale.player_name, 'year': sale.year, 'manufacturer': sale.manufacturer,
                            'cardNumber': sale.cardNumber, 'cardSeries': sale.cardSeries, 'comments': sale.comments, 
                            'tradeOrSell': sale.tradeOrSell, 'price':sale.price, 'time': sale.time }
        return (jsonify(sale_return),201)
    return (jsonify({"error":"No sales found!"}), 404)







        
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
            return (jsonify(trade_return),201)
        elif(tradeOrSell == "Sell"):
            sale = Sale(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, price=price, time=time)
            db.session.add(sale)
            db.session.commit()
            sale_return = {'username': username, 'id':sale.id,'sport': sport,
                            'player_name': player_name, 'year': year, 'manufacturer': manufacturer,
                            'cardNumber': cardNumber, 'cardSeries': cardSeries, 'comments': comments, 
                            'tradeOrSell': tradeOrSell, 'price':price,'time': time }

            print(sale_return)
            return (jsonify(sale_return),201)
        return (jsonify({"error":"Bad Request, specify Trade or Sale type"}), 400)
    return (jsonify({"error":"User not found!"}), 401)
    
@app.route('/api/users/login', methods=['POST'])
def login():
    username = request.json.get('email')
    password = request.json.get('password')
    if username is None or password is None:
        return (jsonify({"error":"User not found!"}), 401)  
    user = User.query.filter_by(username=username).first()
    if user is not None:
        if(verify_password(user.username, password)):
            access_token = user.generate_auth_token()
            return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':REDIRECT_URI}),201)
        return (jsonify({"error":"Incorrect username or password!"}), 401)
    return (jsonify({"error":"User not found!"}), 401)


@app.route('/api/users/<token>')
def get_user_info(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        print(user.id)
        return (jsonify({'id':user.id, 'username': user.username}),201)
    return (jsonify({"error":"User not found!"}), 401)

@app.route('/api/users/signup', methods=['POST'])
def new_user():
    username = request.json.get('email')
    password = request.json.get('password')
    if username is None or password is None:
        return (jsonify({"error":"User not found!"}), 401)
    if User.query.filter_by(username=username).first() is not None:
        return (jsonify({"error":"User already exists!"}), 409)
    user = User(username=username, wantedCards=[])
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = user.generate_auth_token()
    g.user = user
    print(user.wantedCards)
    return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':REDIRECT_URI}),201)




@app.route('/api/users/<id>')
def get_user(id):
    print(id)
    user = User.query.get(id)
    if not user:
        return (jsonify({"error":"User not found!"}), 401)
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