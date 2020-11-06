from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()

class Spots(Resource):
    def get(self):
        pass

class Closest(Resource):
    def get(self):
        pass

class Home(Resource):
    def get(self):
        pass


api.add_resource(Home, '/')

api.add_resource(Spots, '/api/spots')

api.add_resource(Closest, '/api/closest')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
