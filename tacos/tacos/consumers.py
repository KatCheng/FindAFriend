from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Chat

@channel_session_user_from_http
def ws_con(msg):
    msg.reply_channel.send({"accept": True})

# Connected to channels.receive
@channel_session_user
def ws_msg(msg):
    msg.reply_channel.send({
        "text": msg.user.username + " what?"

    })
