#!/usr/bin/python
import sys
import Adafruit_DHT
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import json

pnconfig = PNConfiguration()
pnconfig.subscribe_key = "sub-c-383332aa-dcc0-11e6-b6b1-02ee2ddab7fe"
pnconfig.publish_key = "pub-c-73cca4b9-e219-4f94-90fc-02dd8f018045"
pnconfig.ssl = False
 
pubnub = PubNub(pnconfig)

def publish_callback(result, status):
          print (result)

i=0
a = []
b = []
while True:
    humidity, temperature = Adafruit_DHT.read_retry(11, 4)
    a.append(temperature)
    b.append(humidity)
    print 'Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity)
    i+=1
    if (i>9):
      i=0
      tempMode = max(a, key = a.count)
      humMode = max(b, key = b.count)
      data = {'Temp': tempMode, 'Hum': humMode}
      a = []
      b = []
      with open('temperature.txt', 'w') as outfile:
        json.dump(data, outfile)
      pubnub.publish().channel('Temp').message(data).async(publish_callback)
      
    

