import os
import time
from flask import Flask, abort, request, jsonify, g, url_for, render_template
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
from flask_mail import Mail, Message
from .email_settings import mail_server, mail_port, mail_username, mail_password
from .shipping_settings import shipping_address, shipping_zip, shipping_city, shipping_state
from .stripe_config import stripe_publishable, stripe_secret
import stripe





# initialization
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['UPLOAD_URL'] = "https://"+bucket_name+".s3.us-east-2.amazonaws.com/"
app.config['TESTING'] = False
app.config['MAIL_SUPPRESS_SEND'] = False
app.config['MAIL_DEBUG'] = True


app.config['MAIL_SERVER'] = mail_server
app.config['MAIL_PORT'] = mail_port
app.config['MAIL_USERNAME'] = mail_username
app.config['MAIL_PASSWORD'] = mail_password
app.config['MAIL_USE_TLS'] = 1
app.config['launch_url'] = "http://localhost:3000/"
app.config['REDIRECT_URI']="http://localhost:3000/"


#SHIPPING
app.config['SHIP_ADDRESS'] = shipping_address
app.config['SHIP_CITY'] = shipping_city
app.config['SHIP_STATE'] = shipping_state
app.config['SHIP_ZIP'] = shipping_zip


#STRIPE
stripe.api_key = stripe_secret






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



# extensions
db = SQLAlchemy(app)
auth = HTTPBasicAuth()
mail = Mail(app)




wanted_trades = db.Table('wanted_trades',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('trade_id', db.Integer, db.ForeignKey('tradings.id'))    
)

wanted_sales = db.Table('wanted_sales',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('sale_id', db.Integer, db.ForeignKey('sales.id'))    
)

offered_trades = db.Table('offered_trades',
    db.Column('trade_id', db.Integer, db.ForeignKey('tradings.id')),
    db.Column('trade_offer_id', db.Integer, db.ForeignKey('trade_offers.id'))    
)

# sale_orders = db.Table('sale_orders',
#     db.Column('poster_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('buyer_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('sale_order_id', db.Integer, db.ForeignKey('sale_orders.id'))    
# )
# trade_orders = db.Table('trade_orders',
#     db.Column('poster_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('offerer_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('trade_orders', db.Integer, db.ForeignKey('trade_orders.id'))    
# )


class TradeOffer(db.Model):
    __tablename__ = 'trade_offers'
    id = db.Column(db.Integer, primary_key=True)
    offered_card_ids = db.Column(db.PickleType)
    time = db.Column(db.Integer, index=True)
    status = db.Column(db.String(32), index=True) #string: "pending","accepted", "denied"
    # offerer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # trade_id = db.Column(db.Integer, db.ForeignKey('tradings.id'))
    
    original_poster = db.Column(db.PickleType)
    offerer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    offers = db.relationship('Trade', secondary=offered_trades, backref=db.backref('offered_trades', lazy='dynamic'))
    original_trade_id = db.Column(db.Integer, db.ForeignKey('tradings.id'))


    accepted_orders = db.relationship('TradeOrder', backref="original_trade_offer")
    

    def json_rep(self):
        return_dict = {}
        for c in self.__table__.columns:
            if(c.name == "original_trade_id"):
                temp_id = getattr(self, c.name)
                trade = Trade.query.filter_by(id=temp_id).first()
                if(trade is not None):
                    return_dict["original_trade"] = trade.json_rep()

            elif(c.name == "original_poster"):
                return_dict[c.name] = getattr(self, c.name).json_rep()

            elif(c.name == "offered_card_ids"):
                return_dict[c.name] = getattr(self, c.name)
                return_dict["offered_cards"] = []
                for id in getattr(self, c.name):
                    card_lookup = Trade.query.filter_by(id=id).first()
                    if(card_lookup is not None):
                        return_dict["offered_cards"].append(card_lookup.json_rep())
            else:
                return_dict[c.name] = getattr(self, c.name)

        return return_dict



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

    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    wanted_trades = db.relationship('User', secondary=wanted_trades, backref=db.backref('wanted_trades', lazy='dynamic'))
    trade_offers = db.relationship('TradeOffer', backref="original_trade")



    # offers = db.relationship('TradeOffer', backref="offers")



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
    img_paths = db.Column(db.PickleType) #array of strings (file names)
    for_sale = db.Column(db.Boolean, index=True)



    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    wanted_sales = db.relationship('User', secondary=wanted_sales, backref=db.backref('wanted_sales', lazy='dynamic'))



    def add_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json_rep(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}




class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    email = db.Column(db.String(32), index=True)
    password_hash = db.Column(db.String(64))

    trades = db.relationship('Trade', backref="trader")
    sales = db.relationship('Sale', backref="seller")

    made_offers = db.relationship('TradeOffer', backref="offerer")
    purchased_cards = db.relationship('SaleOrder', backref="buyer")
    # accepted_trade_offers = db.relationship('TradeOffer', backref="offerer")

    # trades_posted = db.relationship('TradeOffer', backref="posted_trades")
    # trades_offered = db.relationship('TradeOffer', backref="offered_trades")


    time = db.Column(db.Integer, index=True)


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def json_rep(self):
        return {
            'username':self.username,
            'email':self.email,
        }

    def hash_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def generate_auth_token(self, expires_in=600*120):
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






class SaleOrder(db.Model):
    __tablename__ = 'sale_orders'
    id = db.Column(db.Integer, primary_key=True)
    # cards_being_sent = db.Column(db.PickleType)
    # card_givers = db.Column(db.PickleType) #person who originally offered card, User object
    # card_buyer = db.Column(db.PickleType) #person who pays for card, User object
    subtotal = db.Column(db.Integer, index=True)
    card_insurance = db.Column(db.Boolean, index=True)
    shipping_info = db.Column(db.PickleType) 
    billing_info = db.Column(db.PickleType)
    time = db.Column(db.Integer, index=True)

    item_ids = db.Column(db.PickleType)
    item_owner_ids = db.Column(db.PickleType)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id')) #REFERENCE WITH 'buyer' param



    def json_rep(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}








class TradeOrder(db.Model):
    __tablename__ = 'trade_orders'
    id = db.Column(db.Integer, primary_key=True)
    #SHOULD JUST CHANGE TO REFERENCE TRADE_ORDER !!!!!!!!
    # posted_card = db.Column(db.PickleType)
    # offered_cards = db.Column(db.PickleType)
    # card_poster = db.Column(db.PickleType) #person who originally offered card, User object
    # card_offerer = db.Column(db.PickleType) #person who offered their cards, User object
    card_insurance = db.Column(db.Boolean, index=True) #should aways be true
    shipping_address = db.Column(db.String, index=True)
    shipping_city = db.Column(db.String, index=True)
    shipping_state = db.Column(db.String, index=True)
    shipping_zip = db.Column(db.String, index=True)
    trade_offer_id = db.Column(db.Integer, db.ForeignKey('trade_offers.id'))
    time = db.Column(db.Integer, index=True)

    # trade_orders = db.relationship('User', secondary=trade_orders, backref=db.backref('trade_orders', lazy='dynamic'))


    def json_rep(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}





    








@app.route('/api/create_sale_order/stripe/<token>', methods=['POST'])
def create_sale_order(token):
    user = User.verify_auth_token(token)
    if(user is not None):

        shipping_info = request.json.get("shipping_info")
        payment_info = request.json.get("paymentMethod")
        needs_insurance = request.json.get("insurance")
        subtotal = request.json.get("subtotal")
        items_ordered = request.json.get("cart")
        item_owner_ids = [User.query.filter_by(username=card['username']).first().id for card in items_ordered]


        # owner_emails = [User.query.filter_by(username=id).first().email for id in item_owner_ids]
        owner_infos = [User.query.filter_by(id=item_id).first().json_rep() for item_id in item_owner_ids]




        item_ids = [card['id'] for card in items_ordered]
        


        order = SaleOrder(subtotal=subtotal, card_insurance=needs_insurance,shipping_info=shipping_info,billing_info=payment_info,
        time=datetime.datetime.now(), item_ids=item_ids, item_owner_ids=item_owner_ids, buyer=user)

        
        db.session.add(order)
        db.session.flush()

        


        for card in items_ordered:
            lookup = Sale.query.filter_by(id=card['id']).first()
            if(lookup):
                lookup.for_sale = False 


            

        db.session.commit()



        with mail.connect() as conn:

            #SENDING CONFIRMATION EMAIL TO BUYER:
            msg = Message("Order Successful!",
                      sender="willpeterson76@gmail.com",
                      recipients=["wcp7cp@virginia.edu"])
            msg.body = "Congrats your order was approved"
            msg.html = render_template('card_purchased_bidder_email.html', user=user, 
            launch_url=(app.config['launch_url']+'confirmation/sale/'+str(order.id)), cards=items_ordered, len=len(items_ordered))
            conn.send(msg)

            #SENDING CONFIRMATION EMAIL TO OWNER OF CARDS:
            for i in range(0, len(items_ordered)):
                msg = Message("Your card was purchased!",
                          sender="willpeterson76@gmail.com",
                          recipients=["wcp7cp@virginia.edu"])
                msg.body = "Congrats your card was purchased"
                msg.html = render_template('card_purchased_owner_email.html', user=owner_infos[i], 
                launch_url=(app.config['launch_url']+'notifications'), card=items_ordered[i], buyer=user)
                conn.send(msg)







        return (jsonify(order.json_rep()), 201)
    return (jsonify({"error":"User not found!"}), 401)
    

















@app.route('/api/sale_order_lookup/<id>/<token>')
def sale_order_lookup(id, token):
    user = User.verify_auth_token(token)
    if(user is not None):
        sale_order = SaleOrder.query.filter_by(id=id).first()
        if(sale_order is not None and sale_order.buyer_id == user.id):
            item_ids = sale_order.item_ids
            ordered_items = []
            for id in item_ids:
                sale = Sale.query.filter_by(id=id).first()
                if(sale is not None):
                    ordered_items.append(sale.json_rep())
            return (jsonify({'order_details':sale_order.json_rep(), 'ordered_items':ordered_items}), 201)
        return (jsonify({"error":"No sale order found!"}), 404)
    return (jsonify({"error":"User not found!"}), 401)


















#SHOULD CHANGE FUNCTION NAME AND HAVE SEPARATE, MORE SIMPLE GET_USER FUNC
@app.route('/api/users/<token>')
def get_user_info(token):
    user = User.verify_auth_token(token)
    if(user is not None):

        pending_trades_out = []
        user_pending_sales = []
        for sale in user.sales:
            if(sale.for_sale):
                user_pending_sales.append(sale.json_rep())

        

        pending_trades_in = []
        for trade in user.trades:
            if(trade.trade_offers):
                print(trade.trade_offers[0].json_rep())
                pending_trades_in += [offer.json_rep() for offer in trade.trade_offers]

        pending_trades_out = []
        accepted_trades_out = []
        for offer in user.made_offers:
            if(offer.status == "pending"):
                pending_trades_out.append(offer.json_rep())

            if(offer.status == "accepted"):
                accepted_trades_out.append(offer.json_rep())
        return (jsonify({'id':user.id, 'username': user.username, 'trades':[trade.json_rep() for trade in user.trades], 
        'sales':[sale.json_rep() for sale in user.sales], 'accepted_trades_out':accepted_trades_out,
        'pending_trades_out': pending_trades_out, 'user_pending_sales':user_pending_sales,'purchased_sales': [order.json_rep() for order in user.purchased_cards],
        'pending_trades_in':pending_trades_in}),201)
    return (jsonify({"error":"User not found!"}), 401)



@app.route('/api/get_trade_offer/<trade_offer_id>/<token>', methods=['GET'])
def get_trade_offer(trade_offer_id, token):
    user = User.verify_auth_token(token)
    if(user is not None):
        for offer in user.trades_in:
            if(offer.id == int(trade_offer_id)):
                return (jsonify(offer.json_rep()),201)
        for offer in user.trades_out:
            if(offer.id == int(trade_offer_id)):
                return (jsonify(offer.json_rep()),201)
        return (jsonify({"error":"No trade offer found!"}), 404)
    return (jsonify({"error":"User not found!"}), 401)




@app.route('/api/get_trade_order/<trade_order_id>/<token>', methods=['GET'])
def get_trade_order(trade_order_id, token):
    user = User.verify_auth_token(token)
    if(user is not None):
        order = TradeOrder.query.filter_by(id=trade_order_id).first()
        offer = TradeOffer.query.filter_by(id=order.trade_offer_id).first()
        original_trade = Trade.query.filter_by(id=offer.original_trade_id).first()

        # for order in user.completed_trades:
        #     if(order.id == int(trade_order_id)):
        return (jsonify({"order_info":order.json_rep(), "offer_info":offer.json_rep(), "trade_info":original_trade.json_rep()}),201)

        return (jsonify({"error":"Order not found!"}), 404)
    return (jsonify({"error":"User not found!"}), 401)














@app.route('/api/accept_trade_offer/<trade_offer_id>/<token>', methods=['GET'])
def accept_offer(trade_offer_id, token):
    user = User.verify_auth_token(token)
    trade_offer = TradeOffer.query.filter_by(id=trade_offer_id).first()
    if(user is not None and trade_offer is not None):
        trade_offer.status = "accepted"
        trade_order = TradeOrder(original_trade_offer=trade_offer, card_insurance=True, shipping_address=app.config['SHIP_ADDRESS'],
        shipping_state=app.config['SHIP_STATE'], shipping_zip=app.config['SHIP_ZIP'],
        shipping_city=app.config['SHIP_CITY'], time=datetime.datetime.now())
        db.session.add(trade_order)
        db.session.commit()



        with mail.connect() as conn:
            msg = Message("Trade Approved!",
                      sender="willpeterson76@gmail.com",
                      recipients=["wcp7cp@virginia.edu"])
            msg.body = "Congrats your order was approved"
            msg.html = render_template('order_accepted.html', user=user, launch_url=app.config['launch_url'])
            conn.send(msg)

        return (jsonify(trade_order.json_rep()), 201)
    return (jsonify({"error":"No trade offer found!"}), 404)

@app.route('/api/deny_trade_offer/<trade_offer_id>/<token>', methods=['GET'])
def deny_offer(trade_offer_id, token):
    user = User.verify_auth_token(token)
    trade_offer = TradeOffer.query.filter_by(id=trade_offer_id).first()

    if(user is not None and trade_offer is not None):
        # trade_offer.status = "denied"
        # poster_user = User.query.filter_by(id=trade_offer.recipient_id, username=trade_offer.recipient_username).first()
        # poster_trades = list(poster_user.trades_in)
        # for i, offer in enumerate(poster_trades):
        #     if (offer.id == trade_offer.id):
        #         poster_trades.pop(i)

        # poster_user.trades_in = poster_trades
        # user_trades = list(user.trades_out)
        # for i, offer in enumerate(user_trades):
        #     if (offer.id == trade_offer.id):
        #         user_trades.pop(i)
        # user.trades_out = user_trades

        db.session.delete(trade_offer)
        db.session.commit()
        return get_user_info(token)
    return (jsonify({"error":"No trade offer found!"}), 404)







@app.route('/api/make_trade_offer/<card_id>/<offer_ids>/<poster_username>/<token>', methods=['GET'])
def make_offer(card_id, offer_ids, poster_username, token):
    user = User.verify_auth_token(token)
    if(user is not None):
        trades = user.trades
        original_trade = Trade.query.filter_by(id=card_id).first()
        poster_user = User.query.filter_by(username=poster_username).first()
        if(poster_user is not None and original_trade is not None):


            trade_offer = TradeOffer(offered_card_ids=offer_ids,time=datetime.datetime.now(), status="pending", offerer=user, 
            original_poster=poster_user, original_trade=original_trade)
            db.session.add(trade_offer)
            db.session.flush()





            if(trade_offer not in original_trade.offered_trades.all()):
                original_trade.offered_trades.append(trade_offer)
            else:
                original_trade.offered_trades.remove(trade_offer)


            
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
                        for_trade=True, trader=user)
            db.session.add(trade)
            db.session.commit()
            return (jsonify(trade.json_rep()),201)
        elif(tradeOrSell == "Sell"):
            sale = Sale(username=username, sport=sport,player_name=player_name,
                        year=year, manufacturer=manufacturer, cardNumber=cardNumber, cardSeries=cardSeries,
                        comments=comments, tradeOrSell=tradeOrSell, price=price, img_paths=img_paths, seller=user,time=datetime.datetime.now(),
                        for_sale=True)
            db.session.add(sale)
            db.session.commit()

            return (jsonify(sale.json_rep()),201)
        return (jsonify({"error":"Bad Request, specify Trade or Sale type"}), 400)
    return (jsonify({"error":"User not found!"}), 401)



@app.route('/api/search/<keyword>/<token>')
def search(keyword, token):
    trade_results = Trade.query.filter(Trade.player_name.ilike("%"+keyword.lower()+"%")).all()
    sale_results = Sale.query.filter(Sale.player_name.ilike("%"+keyword.lower()+"%")).all()
    all_results = trade_results + sale_results

    return (jsonify({"results":[result.json_rep() for result in all_results]}), 201)




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


    return (jsonify({'trades': [trade.json_rep() for trade in user.wanted_trades]}),201)

@app.route('/api/post_wanted/trades/<item_id>/<token>', methods=['POST'])
def post_wanted_trade(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    card_lookup = Trade.query.filter_by(id=item_id).first()
    if(card_lookup is None):
        return (jsonify({"error":"Trade not found!"}), 404)


    if(card_lookup not in user.wanted_trades.all()):
        user.wanted_trades.append(card_lookup)
    else:
        user.wanted_trades.remove(card_lookup)


    return jsonify([trade.id for trade in user.wanted_trades], 201)



@app.route('/api/wanted/sales/<sport>/<token>')
def get_wanted_sales(sport, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)

    return (jsonify({'sales': [sale.json_rep() for sale in user.wanted_sales]}),201)


@app.route('/api/post_wanted/sales/<item_id>/<token>', methods=['POST'])
def post_wanted_sale(item_id, token):
    user = User.verify_auth_token(token)
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    card_lookup = Sale.query.filter_by(id=item_id).first()
    if(card_lookup is None):
        return (jsonify({"error":"Sale not found!"}), 404)
    
    if(card_lookup not in user.wanted_sales.all()):
        user.wanted_sales.append(card_lookup)
    else:
        user.wanted_sales.remove(card_lookup)
    
    return jsonify([sale.id for sale in user.wanted_sales], 201)






    


@app.route('/api/all_listings/sales/<sport>/<token>', methods=['GET'])
def get_all_sales(sport, token):
    user = User.verify_auth_token(token)
    
    if(user is None):
        return (jsonify({"error":"User not found!"}), 401)
    if(sport.lower() != "all"):
        sales = Sale.query.filter(Sale.for_sale==True, Sale.sport.ilike("%"+sport.lower()+"%")).all()
        user_wanted = list(user.wanted_sales)
        sale_wanted = []
        for item in user_wanted:
            if(item.tradeOrSell == "Sell"):
                sale_wanted.append(item.id)
        if(sales is not None):
            return (jsonify({'sales': [sale.json_rep() for sale in sales],
                            'wantedCards': sale_wanted}),201)
        return (jsonify({"error":"Sales not found!"}), 404)
    else:
        sales = Sale.query.filter_by(for_sale=True).all()
        user_wanted = list(user.wanted_sales)
        sale_wanted = []
        for item in user_wanted:
            if(item.tradeOrSell == "Sell"):
                sale_wanted.append(item.id)
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
        user_wanted = list(user.wanted_trades)
        trade_wanted = []
        for item in user_wanted:
            if(item.sport.lower() == sport.lower()):
                trade_wanted.append(item.id)
        if(trades is not None):
            return (jsonify({'trades': [trade.json_rep() for trade in trades],
                                'wantedCards': trade_wanted}),201)
        return (jsonify({"error":"Trades not found!"}), 404)
    else:
        trades = Trade.query.all()
        user_wanted = list(user.wanted_trades)
        trade_wanted = []
        for item in user_wanted:
            trade_wanted.append(item.id)
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
    if(user is not None):
        return (jsonify({'trades':[trade.json_rep() for trade in user.trades]}),201)
    return (jsonify({"error":"No trades found!"}), 404)




@app.route('/api/my_listings/sales/<token>', methods=['GET'])
def get_my_sales(token):
    user = User.verify_auth_token(token)
    if(user is not None):
        return (jsonify({'sales':[sale.json_rep() for sale in user.sales]}),201)
    return (jsonify({"error":"No trades found!"}), 404)

def allowed_file(filename):
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
            return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':app.config['REDIRECT_URI']}),201)
        return (jsonify({"error":"Incorrect username or password!"}), 401)
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
    user = User(username=username, email=email, time=datetime.datetime.now())
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = user.generate_auth_token()
    g.user = user
    return (jsonify({"access_token": access_token.decode('ascii'), 'redirectUrl':app.config['REDIRECT_URI']}),201)




@app.route('/api/users/<id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        return (jsonify({"error":"User not found!"}), 401)
    return jsonify({'username': user.username})


@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})



if not os.path.exists('db.sqlite'):
    print("CREATED_DB")
    db.create_all()
app.run(debug=True)