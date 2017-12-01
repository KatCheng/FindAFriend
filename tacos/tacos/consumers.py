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

    # query histroy
    for c in Chat.objects.filter(recipient__in=Page.objects.filter(members=msg.user)).order_by('timestamp'):
        chatJSON = {}
        chatJSON["sender"] = c.sender.username
        chatJSON["recipient"] = c.recipient.title
        chatJSON["message"] = c.messageContent
        chatJSON["timestamp"] = c.timestamp.isoformat(' ')

    # send histroy to user
    msg.reply_channel.send({"text":json.dumps(chatJSON)})

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
    Group(msg.user.username).add(msg.reply_channel); 

# Connected to websocket.receive
@channel_session_user
def ws_msg(msg):
    # echo to sender
    #msg.reply_channel.send({
    #"text": msg.content['text'],
    #})

    data = json.loads(msg.content['text'])

    # save to database
    c = Chat(sender=User.objects.get(username=data['sender']), recipient=Page.objects.get(title = data['recipient']), messageContent=data['message'])
    c.save()
    
    log.debug("recipient=%s message=%s", data['recipient'], data['message'])
    # send message to the group
    for m in Page.objects.get(title=data['recipient']).members.all(): 
        Group(msg.user.username).send({
        "text": json.dumps(data)     
    })

    
@channel_session_user
def ws_discon(msg):
    Group(msg.user.username).discard(msg.reply_channel)
