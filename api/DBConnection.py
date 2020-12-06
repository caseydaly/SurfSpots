import mysql.connector
import yaml
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
if '/Users/caseydaly' in dir_path:
    db_info_path = 'db_info.yaml'
else:
    db_info_path = '/var/www/SurfSpots/api/db_info.yaml'

with open(db_info_path) as file:
    db_info = yaml.load(file, Loader=yaml.FullLoader)

class DBConnection:

    def __init__(self):
        self.mydb = mysql.connector.connect(
            host=db_info['host'],
            user=db_info['user'],
            password=db_info['password'],
            database=db_info['database']
        )
        
    def __enter__(self):
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        # close db connection
        self.mydb.close()

    def cursor(self):
        if not self.mydb.is_connected():
            self.mydb.reconnect(attempts=3, delay=5)
            return self.mydb.cursor()
        else:
            return self.mydb.cursor()

    def commit(self):
        self.mydb.commit()