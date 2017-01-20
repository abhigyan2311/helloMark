from time import sleep
from picamera import PiCamera

def captureImg():
   camera = PiCamera()
   camera.resolution = (1280, 720)
   camera.start_preview()
   # Camera warm-up time
   sleep(2)
   camera.capture('/home/pi/Work/helloMark/capturedImg.png')
   camera.stop_preview()
   camera.close()
   return
