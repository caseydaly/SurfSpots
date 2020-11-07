from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import yaml
import numpy as np
import json

with open('db_info.yaml') as file:
    db_info = yaml.load(file, Loader=yaml.FullLoader)
    mydb = mysql.connector.connect(
        host=db_info['host'],
        user=db_info['user'],
        password=db_info['password'],
        database=db_info['database']
    )

app = Flask(__name__)
CORS(app)

@app.route('/api/spots', methods=['GET'])
def get_spots():
    cursor = mydb.cursor()
    cursor.execute("select Location, Latitude, Longitude from Spots;")
    spots = []
    for (Location, Latitude, Longitude) in cursor:
        spot = {
            "name": str(Location),
            "lat": float(Latitude),
            "lon": float(Longitude)
        }
        spots.append(spot)
    return jsonify(spots)

def closest_node(node, nodes):
    nodes = np.asarray(nodes)
    deltas = nodes - node
    dist_2 = np.einsum('ij,ij->i', deltas, deltas)
    return np.argmin(dist_2)

@app.route('/api/closest', methods=['GET'])
def get_closest_spot():
    lat_str = request.args.get("lat")
    lon_str = request.args.get("lon")
    if not lat_str or not lon_str:
        return "Bad request", 400
    try:
        lat = float(lat_str)
        lon = float(lon_str)
    except ValueError:
        return "Bad request", 400
    loc = (lat, lon)
    spots = json.loads(get_spots().data)
    d = {}
    l = []
    for spot in spots:
        d[(spot["lat"], spot["lon"])] = spot["name"]
        l.append((spot["lat"], spot["lon"]))
    print(l)
    closest = closest_node(loc, l)
    return d[l[closest]]
    




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
