from channels.routing import route
from tacos.consumers import ws_msg

channel_routing = [
    route("websocket.receive", ws_msg),
]
