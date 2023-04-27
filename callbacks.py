import sys, time

class Callbacks:
    def __init__(self, client, feed_ids = None, ser = None):
        self.client = client
        self.ser_manager = ser
        self.feed_ids = feed_ids
        
    def connected(self, client):
        print("Successful connected to Adafruit IO ...\n")
        for x in self.feed_ids[-2:]:
            print(x)
            client.subscribe(x)
        
    def subscribe(self, client , userdata , mid , granted_qos):
        print("Sucessful subscribe" + " ...\n")
        
    def disconnected(self, client):
        print("Disconnected ...\n")
        self.client.connect()
        
        
    def message(self, client , feed_id , payload):
        print("Nhan du lieu: " + payload + " , feed id:" + feed_id)
        if(feed_id == "nutnhan1"):      
            if payload == "0":
                self.ser_manager.writeData(0)
            else:
                self.ser_manager.writeData(1)
        elif(feed_id == "nutnhan2"):
            # if payload == "1":
            #     self.ser_manager.writeData(2)
            # else:
            #     self.ser_manager.writeData(3)
            if payload == "1":
                self.client.burglar_mode = True
            else: 
                self.client.burglar_mode = False
                
    