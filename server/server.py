import random
from flask import Flask
from firebase import firebase
import requests
from bs4 import BeautifulSoup
import json
# import sys
# reload(sys)
# sys.setdefaultencoding('utf8')


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
    mlh_json.write("\n\n\t\"hack" + str(i) + "\":" + "{"+"\n")
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

	#continue with json write
    mlh_json.write("\n\t\t\"name\":"+  "\"" + eventName + "\"" + ",")
    mlh_json.write("\n\t\t\"start\":"+ "\"" + startDate + "\"" + ",")
    mlh_json.write("\n\t\t\"end\":"+   "\"" + endDate   + "\"" + ",")
    mlh_json.write("\n\t\t\"city\":"+  "\"" + city      + "\"" +",")
    mlh_json.write("\n\t\t\"state\":"+ "\"" + state     + "\"")
    mlh_json.write("\n\t\t},")


mlh_json.write
mlh_json.write("\n}")


with open ('mlh.json') as json_data:
    data = json.load(json_data)





app = Flask(__name__)

firebase = firebase.FirebaseApplication('https://hackspot12.firebaseio.com', None)



@app.route('/', methods=['POST', 'GET'])
def index():

    
    
    result = firebase.post('/users', data
    
    
    # {

    #     "hack1":{

    #         "name":"Hack the 6ix 2018",
    #         "start":"2018-08-24",
    #         "end":"2018-08-26",
    #         "city":"Toronto",
    #         "state":"ON"
    #         },

    #     "hack2":{

    #         "name":"HackMTY",
    #         "start":"2018-08-25",
    #         "end":"2018-08-26",
    #         "city":"Monterrey",
    #         "state":"MX"
    #         },

    # }
    
    ) #end of argument
    return 'hello'
    

@app.route('/add', methods=['POST'])
def addUser():
    return 'add'


if __name__ == '__main__':
    app.run(host='localhost', port=8081, debug=True)