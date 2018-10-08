import random
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from firebase import firebase
import requests
from bs4 import BeautifulSoup
import json

from googlemaps import googlemaps

# to use for geocoding
gmaps = googlemaps.Client(key="AIzaSyD8W5OzuAhjzrtbQGMpd5UUZpekdOUG5cI")



#------ for getting the json object ------------------


# using the source instead of open
source = requests.get('https://mlh.io/seasons/na-2019/events').text
soup = BeautifulSoup(source, 'lxml')

mlh_json = open("mlh.json", "w")
mlh_json.write(


		#beginning
		"{"


	)


divs = soup.find_all('div', class_='event-wrapper')


i = 0
for div in divs:
    i+=1
    mlh_json.write("\n\n\t\"hack")

    if i < 10:
        mlh_json.write("0" + str(i) + "\":" + "{"+"\n")
    else:
        mlh_json.write(str(i) + "\":" + "{"+"\n")

	eventBox = div.find(itemprop = 'name')
	eventName = str(eventBox.text.strip())
	#eventName


    eventBox = div.find(itemprop = 'name')
    eventName = str(eventBox.text.strip())
    eventStartDate = div.find(itemprop = 'startDate')
    start = str(eventStartDate)
    startDate = start[15:25]
    eventEndDate = div.find(itemprop = 'endDate')
    end = str(eventEndDate)
    endDate = end[15:25]
    addressBox = div.find(itemprop = 'addressLocality')
    if i==19:
        city = "Torreon"
    else:
	    city = str(addressBox.text.strip())
    addressBox = div.find(itemprop = 'addressRegion')
    state = str(addressBox.text.strip())
	#state

    #geocode
    loc = city + state
    geocode_result = gmaps.geocode(loc)
    lat = str(geocode_result[0]["geometry"]["location"]["lat"])
    lng = str(geocode_result[0]["geometry"]["location"]["lng"])


	#continue with json write
    mlh_json.write("\n\t\t\"name\":"+  "\"" + eventName + "\"" + ",")
    mlh_json.write("\n\t\t\"start\":"+ "\"" + startDate + "\"" + ",")
    mlh_json.write("\n\t\t\"end\":"+   "\"" + endDate   + "\"" + ",")
    mlh_json.write("\n\t\t\"lat\":"+   "\"" + lat   + "\"" + ",")
    mlh_json.write("\n\t\t\"lng\":"+   "\"" + lng   + "\"" + ",")
    mlh_json.write("\n\t\t\"city\":"+  "\"" + city      + "\"" +",")
    mlh_json.write("\n\t\t\"state\":"+ "\"" + state     + "\"")
    mlh_json.write("\n\t\t},")


mlh_json.close()


# This fixes the extra commma in the last line
readFile = open("mlh.json")
lines = readFile.readlines()
readFile.close()
w = open("mlh.json","w")
w.writelines([item for item in lines[:-1]])
w.close()



# This finishes writing the remainder of the .json file
mlh_json = open("mlh.json", "a")
mlh_json.write("\t\t}")
mlh_json.write("\n}")
mlh_json.close()


with open ('mlh.json') as json_data:
    data = json.load(json_data)





app = Flask(__name__)
CORS(app)

firebase = firebase.FirebaseApplication('https://hackspot12.firebaseio.com', None)



@app.route('/', methods=['POST', 'GET'])
def index():

    result = firebase.post('/hackathons', data) #end of argument

    for key, value in result.items():
        print key, value

    return value
    


@app.route('/get/', methods=['POST','GET'])
def getHack():
    key = str(index())
    print("YOOOOOOOOOOO")
    print(key)
    result = firebase.get('/hackathons', key) #end of argument
    return jsonify(result)
    

if __name__ == '__main__':
    app.run(host='localhost', port=8081, debug=True)
    