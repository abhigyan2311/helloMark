import RPi.GPIO as GPIO
import time
from picamera import PiCamera
from Naked.toolshed.shell import execute_js

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(29, GPIO.IN)         #Read output from PIR motion sensor
GPIO.setup(3, GPIO.OUT)
count=0         #LED output pin
while True:
       i=GPIO.input(29)
       if i==0:                 #When output from motion sensor is LOW
             print "No intruders",i
             GPIO.output(3, 0)
             count=0
             time.sleep(0.1)
       elif i==1:               #When output from motion sensor is HIGH
             print "Intruder detected",i
             GPIO.output(3, 1)  #Turn ON LED
             count+=1
             time.sleep(0.1)
       if count==20:
             print "Smile please!"
             camera = PiCamera()
             camera.resolution = (640, 480)
             camera.start_preview()
             time.sleep(1)
             camera.capture('../piCam/capturedImg.jpg')
             camera.stop_preview()
             camera.close()
             count=0
             time.sleep(2)
             success = execute_js('../imgTransfer.js')
