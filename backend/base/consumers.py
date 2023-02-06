import json
from channels.generic.websocket import WebsocketConsumer

class PokerConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.send(text_data=json.dumps({
            'type':'connection_estttttablished',
            'message':'You are now connected!',
        }))