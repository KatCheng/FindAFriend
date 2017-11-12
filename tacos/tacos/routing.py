from channels.routing import route
from tacos.consumers import ws_msg, ws_con

channel_routing = [
    route("websocket.connect", ws_con),
    route("websocket.receive", ws_msg),
]
