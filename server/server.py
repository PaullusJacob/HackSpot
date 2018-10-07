import random
from flask import Flask
from firebase import firebase

app = Flask(__name__)

firebase = firebase.FirebaseApplication('https://hackspot12.firebaseio.com', None)

@app.route('/', methods=['POST', 'GET'])
def index():
    
    result = firebase.post('/users', {'X_FANCY_HEADER': 'VERY FANCY'})
    return 'hello'
    

@app.route('/add', methods=['POST'])
def addUser():
    return 'add'


if __name__ == '__main__':
    app.run(host='localhost', port=8081, debug=True)