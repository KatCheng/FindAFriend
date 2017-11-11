from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Chat

# Connected to channels.receive
@channel_session
def ws_msg(msg):
    msg.reply_channel.send({
        "text": Chat.objects.get(senderName="He").__str__()
    })
