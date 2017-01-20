import RPi.GPIO as GPIO
import time
from captureImg import captureImg

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(29, GPIO.IN)         #Read output from PIR motion sensor
GPIO.setup(3, GPIO.OUT)

GPIO.cleanup() 
