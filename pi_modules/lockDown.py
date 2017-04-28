import RPi.GPIO as GPIO
import time
from Naked.toolshed.shell import execute_js


with open('pi_modules/locked.txt') as f:
       a =  int(f.read())

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(38, GPIO.IN)         #Read output from PIR motion sensor
GPIO.setup(32, GPIO.OUT)
count=0         #LED output pin
while a==1:
       i=GPIO.input(38)
       if i==0:                 #When output from motion sensor is LOW
             print "No intruders",i
             GPIO.output(32, 0)
             count=0
             time.sleep(0.1)
       elif i==1:               #When output from motion sensor is HIGH
             print "Intruder detected",i
             GPIO.output(32, 1)  #Turn ON LED
             count+=1
             time.sleep(0.1)
             if count==10:
                 print "Intruder Alarm!"
                 count=0
                 success = execute_js('sendNotif.js')
                         
