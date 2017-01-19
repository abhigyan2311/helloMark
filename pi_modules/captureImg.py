from time import sleep
from picamera import PiCamera

def captureImg():
   camera = PiCamera()
   camera.resolution = (1024, 768)
   camera.start_preview()
   # Camera warm-up time
   sleep(2)
   camera.capture('/home/pi/Work/helloMark/capturedImg.jpg')
   camera.stop_preview()
   camera.close()
   return
