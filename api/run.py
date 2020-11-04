from auth import app


# # app.run(ssl_context='adhoc')
# app.run(host='0.0.0.0', debug=False)
if __name__ == "__main__":
    print("runnin", app['SECRET_KEY'])
    app.run(host='0.0.0.0', debug=False, use_reloader=False)