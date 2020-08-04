import os
import time
from flask import Flask, abort, request, jsonify, g, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import datetime  
from sqlalchemy import func
from .settings import access_key_id, secret_access_key, acl, bucket_name, bucket_region
import boto3
import numpy as np


# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['UPLOAD_URL'] = "https://"+bucket_name+".s3.us-east-2.amazonaws.com/"



ALLOWED_EXTENSIONS = {'jpg', 'gif', 'png', 'gif', 'jpeg'}
s3_client = boto3.client('s3',
    region_name=bucket_region,
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key)
s3_resource = boto3.resource('s3',
    region_name=bucket_region,
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key)
image_bucket = s3_resource.Bucket(name=bucket_name)
print(image_bucket)



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
    img_paths = db.Column(db.PickleType) #array of strings (file names)
    for_trade = db.Column(db.Boolean, index=True)
    offers = db.Column(db.PickleType)

    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json_rep(self):
        print(self.id)
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
    img_paths = db.Column(db.PickleType) #array of strings (file names)
    for_sale = db.Column(db.Boolean, index=True)


    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json_rep(self):
        print(self.id)
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
        print(self.id)
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



class TradeOffer(db.Model):
    __tablename__ = 'trade_offers'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, index=True)
    sender_username = db.Column(db.String(32), index=True)
    recipient_id = db.Column(db.Integer, index=True)
    recipient_username = db.Column(db.String(32), index=True)
    wanted_trade_card = db.Column(db.PickleType)
    cards_to_be_traded = db.Column(db.PickleType)
    time = db.Column(db.Integer, index=True)
    status = db.Column(db.String(32), index=True)

    def json_rep(self):
        print(self.id)
        return_dict = {}
        for c in self.__table__.columns:
            print(c.name)
            if(c.name == "cards_to_be_traded"):
                return_dict[c.name] = [trade.json_rep() for trade in getattr(self, c.name)]
            else:
                return_dict[c.name] = getattr(self, c.name)
        return return_dict
    





class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    email = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))
    trades = db.Column(db.PickleType)
    sales = db.Column(db.PickleType)
    wantedCards = db.Column(db.PickleType)
    time = db.Column(db.Integer, index=True)
    trades_in = db.Column(db.PickleType)
    trades_out = db.Column(db.PickleType)

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




@app.route('/api/make_trade_offer/<card_id>/<offer_ids>/<poster_username>/<token>', methods=['GET'])
def make_offer(card_id, offer_ids, poster_username, token):
    user = User.verify_auth_token(token)
    if(user is not None):
        trades = user.trades
        trade_list = []
        offer_id_split = offer_ids.split(",")
        for trade in trades:
            trade_json = trade.json_rep()
            if(str(trade_json['id']) in offer_id_split):
                trade_list.append(trade)

        card = Trade.query.filter_by(id=card_id).first()
        poster_user = User.query.filter_by(username=poster_username).first()
        if(poster_user is not None and card is not None):
            trade_offer = TradeOffer(sender_id=user.id, recipient_id=poster_user.id,
            wanted_trade_card=card.json_rep(), cards_to_be_traded=trade_list,time=datetime.datetime.now(), 
            status="pending", sender_username=user.username, recipient_username=poster_user.username)
            db.session.add(trade_offer)
            db.session.flush()
            poster_trades = list(poster_user.trades_in)
            poster_trades.append(trade_offer)
            poster_user.trades_in = poster_trades
            user_trades = list(user.trades_out)
            user_trades.append(trade_offer)
            user.trades_out = user_trades
            db.session.commit()
            return (jsonify(trade_offer.json_rep()),201)

    return (jsonify({"error":"No trades found!"}), 404)







@app.route('/api/listing/create/<token>', methods=['POST'])
def create_listing(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        # print(request.get_data())
        username = user.username
        sport = request.form.get('sport')
        player_name = request.form.get('player_name')
        year = request.form.get('year')
        manufacturer = request.form.get('manufacturer')
        cardNumber = request.form.get('cardNumber')
        cardSeries = request.form.get('cardSeries')
        comments = request.form.get('comments')
        tradeOrSell = request.form.get('tradeOrSell')
        price = request.form.get('price')
        images = request.files
        img_paths = []
        for file in images:
            img = images[file]
            if(img and allowed_file(img.filename)):
                filename = secure_filename(img.filename)
                image_bucket.Object(filename).put(Body=img)
                img_paths.append(app.config['UPLOAD_URL']+filename)

        if(tradeOrSell == "Trade"):
            trade = Trade(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, img_paths=img_paths, time=datetime.datetime.now(),
                        for_trade=True, offers=[])
            # print(trade.json_rep())
            db.session.add(trade)
            # print(trade.json_rep())
            db.session.flush()
            # print(trade.json_rep())
            print(trade.id)
            user_trades = list(user.trades)
            user_trades.append(trade)
            user.trades = user_trades
            db.session.commit()
            return (jsonify(trade.json_rep()),201)
        elif(tradeOrSell == "Sell"):
            sale = Sale(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, price=price, img_paths=img_paths, time=datetime.datetime.now(),
                        for_sale=True)
            db.session.add(sale)
            db.session.flush()
            user_sales = list(user.sales)
            user_sales.append(sale)
            user.sales = user_sales
            db.session.commit()

            return (jsonify(sale.json_rep()),201)
        return (jsonify({"error":"Bad Request, specify Trade or Sale type"}), 400)
    return (jsonify({"error":"User not found!"}), 401)



@app.route('/api/search/<keyword>/<token>')
def search(keyword, token):
    trade_results = Trade.query.filter(Trade.player_name.ilike("%"+keyword.lower()+"%")).all()
    sale_results = Sale.query.filter(Sale.player_name.ilike("%"+keyword.lower()+"%")).all()
    np_trades = np.array([trade.json_rep() for trade in trade_results])
    np_sales = np.array([sale.json_rep() for sale in sale_results])
    if(np_trades.shape[0] == 0):
        return (jsonify({"results":[sale.json_rep() for sale in sale_results]}), 201)
    if(np_sales.shape[0] == 0):
        return (jsonify({"results":[trade.json_rep() for trade in trade_results]}), 201)
    all_results = np.empty((np_trades.size + np_sales.size,), dtype=np_trades.dtype)
    all_results[0::2] = np_trades
    all_results[1::2] = np_sales
    print(all_results)
    return (jsonify({"results":list(all_results)}), 201)




@app.route('/api/trade_lookup/<id>/<token>')
def get_trade_by_id(id, token):
    trade = Trade.query.filter_by(id=id).first()
    if(trade is not None):
        return (jsonify(trade.json_rep()),201)
    return (jsonify({"error": "Trade not found"}),404)

@app.route('/api/sale_lookup/<id>/<token>')
def get_sale_by_id(id, token):
    sale = Sale.query.filter_by(id=id).first()
    if(sale is not None):
        return (jsonify(sale.json_rep()),201)
    return (jsonify({"error": "Sale not found"}),404)







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
                type=card_lookup.tradeOrSell, sport=card_lookup.sport, time=datetime.datetime.now())
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
                type=card_lookup.tradeOrSell, sport=card_lookup.sport, time=datetime.datetime.now() )
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
        return (jsonify(trade.json_rep()),201)
    return (jsonify({"error":"No trades found!"}), 404)


@app.route('/api/users/listings/sales/<item_id>/<token>', methods=['GET'])
def get_user_sale(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    sale = Sale.query.filter_by(id=item_id,username=user.username).first()
    if(sale is not None):
        return (jsonify(sale.json_rep()),201)
    return (jsonify({"error":"No sales found!"}), 404)



@app.route('/api/my_listings/trades/<token>', methods=['GET'])
def get_my_trades(token):
    user = User.verify_auth_token(token)
    print(user)
    print(user.trades)
    if(user is not None):
        print([trade.json_rep() for trade in user.trades])
        return (jsonify({'trades':[trade.json_rep() for trade in user.trades]}),201)
    return (jsonify({"error":"No trades found!"}), 404)




@app.route('/api/my_listings/sales/<token>', methods=['GET'])
def get_my_sales(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        return (jsonify({'sales':[sale.json_rep() for sale in user.sales]}),201)
    return (jsonify({"error":"No trades found!"}), 404)

def allowed_file(filename):
    print(filename.rsplit('.', 1)[1].lower())
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS







    
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
        return (jsonify({'id':user.id, 'username': user.username, 'trades_in':[offer.json_rep() for offer in user.trades_in], \
                                'trades_out': [offer.json_rep() for offer in user.trades_out]}),201)
    return (jsonify({"error":"User not found!"}), 401)

@app.route('/api/users/signup', methods=['POST'])
def new_user():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    if username is None or password is None:
        return (jsonify({"error":"User not found!"}), 401)
    if User.query.filter_by(username=username).first() is not None:
        return (jsonify({"error":"User already exists!"}), 409)
    user = User(username=username, email=email,wantedCards=[], trades=[], sales=[], trades_out=[], trades_in=[])
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