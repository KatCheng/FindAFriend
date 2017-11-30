from channels.routing import route
from tacos.consumers import ws_msg, ws_con, ws_discon
from django.contrib.auth.models import User
channel_routing = [
    route("websocket.connect", ws_con),
    route("websocket.receive", ws_msg),
    route("websocket.disconnect", ws_discon),
]
