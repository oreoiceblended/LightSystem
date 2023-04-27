import serial.tools.list_ports
import random
import time
import sys
from Adafruit_IO import MQTTClient


class SerialManager:
    def __init__(self, client):
        self.ser = serial.Serial(port = self.getPort(), baudrate=115200)
        self.client = client
        self.mess = ""

    def getPort(self):
        ports = serial.tools.list_ports.comports()
        N = len(ports)
        commPort = "None"
        for i in range(0, N):
            port = ports[i]
            strPort = str(port)
            if "USB-SERIAL" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        print(commPort)
        return commPort


    def processData(self, data):
        print(data)
        data = data.replace("!", "")
        data = data.replace("#", "")
        splitData = data.split(":")
        print(splitData)
        if splitData[1] == "T":
            self.client.publish("cambien1", splitData[2])
        elif splitData[1] == "L":
            self.client.publish("cambien2", splitData[2])
        elif splitData[1] == "H":
            self.client.publish("cambien3", splitData[2])

    def readSerial(self):
        bytesToRead = self.ser.inWaiting()
        if (bytesToRead > 0):
            self.mess += self.ser.read(bytesToRead).decode("UTF-8")
            while ("#" in self.mess) and ("!" in self.mess):
                start = self.mess.find("!")
                end = self.mess.find("#")
                self.processData(self.mess[start:end + 1])
                if (end == len(self.mess)):
                    self.mess = ""
                else:
                    self.mess = self.mess[end+1:]
                    
    def writeData(self, data):
        self.ser.write(str(data).encode())






