import RPi.GPIO as GPIO


with open('pinNumber.txt') as f:
       a =  int(f.read())

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(a, GPIO.OUT)
GPIO.output(a, False)