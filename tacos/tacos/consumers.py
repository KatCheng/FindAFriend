from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Chat

@channel_session_user_from_http
def ws_con(msg):
    msg.reply_channel.send({
        "accept": True
    })
    if Chat.objects.filter(recipientName="testRecipient") is not None:
        qs = Chat.objects.filter(recipientName="testRecipient")
        t = "<p>"
        for e in qs.iterator():
            t += (e.messageContent + "</p>")
        msg.reply_channel.send({
            "text":t
        })

# Connected to channels.receive
@channel_session_user
def ws_msg(msg):
    msg.reply_channel.send({
        "text": msg.content['text'],
    })
    c = Chat(senderName=msg.user.username, recipientName="testRecipient", messageContent=msg.content['text'])
    c.save()
