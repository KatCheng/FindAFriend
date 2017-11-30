from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Page, Chat
from django.contrib.auth.models import User
import json
import logging

log = logging.getLogger(__name__)

@channel_session_user_from_http
def ws_con(msg):
    # accept the socket 
    msg.reply_channel.send({
        "accept": True
    })

    # display
#    if Chat.objects.filter(recipient=u) is not None:
 #       qs = Chat.objects.filter(recipient=data['recipient'])
  #      t = "<p>"
   #     for e in qs.iterator():
    #        t += (e.messageContent + "</p>")
     #   msg.reply_channel.send({
      #      "text":t
       # })
    
    # add to the chat group
    Group("chat").add(msg.reply_channel); 

# Connected to websocket.receive
@channel_session_user
def ws_msg(msg):
    # echo to sender
    msg.reply_channel.send({
        "text": msg.content['text'],
    })

    data = json.loads(msg.content['text'])

    # save to database
    c = Chat(sender=User.objects.get(username=data['sender']), recipient=Page.objects.get(title = data['recipient']), messageContent=data['message'])
    c.save()
    
    log.debug("recipient=%s message=%s", data['recipient'], data['message'])
    # 
    Group("chat").send({
        "text": json.dumps(data),     
    })

    
@channel_session_user
def ws_discon(msg):
    Group("chat").discard(msg.reply_channel)
