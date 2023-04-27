from Adafruit_IO import MQTTClient
from callbacks import Callbacks
from uart import SerialManager

class Client(MQTTClient):
    def __init__(self, username, key, feed_ids):
        super().__init__(username, key)
        self.ser = SerialManager(self)
        self.burglar_mode = False
        self.callbacks = Callbacks(self, feed_ids, self.ser)
        self.on_connect = self.callbacks.connected
        self.on_disconnect = self.callbacks.disconnected
        self.on_message = self.callbacks.message
        self.on_subscribe = self.callbacks.subscribe
        self.connect()
        self.loop_background()