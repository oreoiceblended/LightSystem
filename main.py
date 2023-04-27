import time, cv2
from client import Client
from yolo_model import image_detector
class UserInfo:
    feeds = {
        "cambien1" : {"name": "Temperature"}, 
        "cambien2" : {"name": "Light"}, 
        "cambien3" : {"name": "Humidity"},
        "nutnhan1" : None,
        "nutnhan2" : None
    }
    username = "dungvo20csehcmut"
    key = "aio_LwwM414Htj6kEYiYvHkqBbk7Vs0R"
    
def main():
    username, key, feeds = UserInfo.username, UserInfo.key, UserInfo.feeds
    client = Client(username, key, list(feeds.keys()))
    counter_AI = 3
    camera = cv2.VideoCapture(0)
    ser = client.ser
    while not client.is_connected(): pass
    while True:
        ser.readSerial()
        counter_AI = counter_AI - 1
        if counter_AI <= 0:
            counter_AI = 7
            ai_result = image_detector(camera)
            if ai_result[2] and client.burglar_mode:
                ser.writeData(5)
                ai_result[0] = "BURGLAR DETECTED !!!!!!!\n"
            client.publish("ai", ai_result[0])
            client.publish("image", ai_result[1])
        time.sleep(1)
    
if __name__ == "__main__":
    main()


