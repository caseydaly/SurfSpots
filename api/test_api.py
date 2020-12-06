import os

import pytest

from api import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_all_spots_get(client):
    response = client.get('/api/spots')
    assert response.status_code == 200
    json_result = response.json
    assert len(json_result) > 1

def test_all_spots_post_failure(client):
    response = client.post('/api/spots', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405

def test_all_spots_put_failure(client):
    response = client.put('/api/spots', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405

#choose a lat and lon between two spots (but slightly closer to one), and see that correct spot was chosen
def test_closest_spot_from_midpoint(client):
    the_wall_location = (57.06600189208984, -135.39300537109375)
    cannon_beach_location = (59.49499893188477, -139.78700256347656)
    halfway = (58.299318, -137.51461)
    slightly_south = (halfway[0] - .000001, halfway[1])
    response = client.get('/api/closest?lat=' + str(slightly_south[0]) +'&lon=' + str(slightly_south[1]))
    spot = response.json
    assert spot['name'] == 'The Wall'

#choose a lat and lon in the middle of the ocean between two points and verify closest spot was chosen
def test_closest_spot_from_long_distance(client):
    pass

def test_closest_spot_bad_data(client):
    response = client.get('/api/closest?lat=NotANumber&lon=123.4235')
    assert response.status_code == 400
    assert response.data == b"'lat' and 'lon' fields must be of type float"

def test_closest_spot_with_ints(client):
    response = client.get('/api/closest?lat=121&lon=123')
    spot = response.json
    assert response.status_code == 200
    assert "name" in spot and "lat" in spot and "lon" in spot

def test_closest_spot_no_data(client):
    response = client.get('/api/closest')
    assert response.status_code == 400
    assert response.data == b"Must include 'lat' and 'lon' url args in request"


def test_closest_spot_just_lat(client):
    response = client.get('/api/closest?lat=123.123')
    assert response.status_code == 400
    assert response.data == b"Must include 'lat' and 'lon' url args in request"

def test_closest_spot_just_lon(client):
    response = client.get('/api/closest?lon=123.123')
    assert response.status_code == 400
    assert response.data == b"Must include 'lat' and 'lon' url args in request"

def test_closest_spot_post_failure(client):
    response = client.post('/api/closest', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405

def test_closest_spot_put_failure(client):
    response = client.post('/api/closest', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405

def test_get_coords(client):
    response = client.get('/api/coords?location=Sharpes Beach')
    assert response.status_code == 200
    assert response.json[0] == -28.83300018310547 and response.json[1] == 153.60600280761720

#multiple spots in the db have this name
def test_get_coords_multiple_names(client):
    response = client.get('/api/coords?location=The Wall')
    assert response.status_code == 200
    assert response.json[0] == 28.55100059509277 and response.json[1] == -114.15000152587890

#attempt to perform sql injection
def test_get_coords_sql_injections(client):
    response = client.get("/api/coords?location=Salmon Creek; select * from Spots where Name='Skallelv';")
    assert response.status_code == 200
    json_data = response.json
    assert json_data[0] == None and json_data[1] == None

def test_get_coords_location_inexistant(client):
    response = client.get("/api/coords?location=This Doesn't Exist")
    assert response.status_code == 200
    json_data = response.json
    assert json_data[0] == None and json_data[1] == None

def test_get_coords_post_faliure(client):
    response = client.post('/api/coords', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405

def test_get_coords_put_failure(client):
    response = client.post('/api/coords', data=dict(
        field_one="field_one",
        field_two="field_two"
    ))
    assert response.status_code == 405






