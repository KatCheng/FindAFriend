from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Chat
import json
import logging

log = logging.getLogger(__name__)

@channel_session_user_from_http
def ws_con(msg):
    # accept the socket 
    msg.reply_channel.send({
        "accept": True
    })

    # history
    #if Chat.objects.filter(recipientName="Alice") is not None:
    #    qs = Chat.objects.filter(recipientName="Alice")
    #    t = "<p>"
    #    for e in qs.iterator():
    #        t += (e.messageContent + "</p>")
    #    msg.reply_channel.send({
    #        "text":t
    #    })
    
    # add to the chat group
    Group(msg.user.username).add(msg.reply_channel); 

# Connected to websocket.receive
@channel_session_user
def ws_msg(msg):
    # echo to sender
#    msg.reply_channel.send({
#        "text": msg.content['text'],
#    })

    data = json.loads(msg['text'])
    data['sender'] = msg.user.username
    
    # save to database
    c = Chat(senderName=msg.user.username, recipientName=data['recipientName'], messageContent=data['messageContent'])
    c.save()
    
    log.debug("recipientName=%s message=%s", data['recipientName'], data['messageContent'])
    # 
    Group(msg.user.username).send({
        "text": json.dumps(data),     
    })
    
@channel_session_user
def ws_discon(msg):
    Group(msg.user.username).discard(msg.reply_channel)
