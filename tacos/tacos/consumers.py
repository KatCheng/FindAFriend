from channels import Channel, Group
from channels.sessions import channel_session, enforce_ordering
from channels.auth import channel_session_user, channel_session_user_from_http
from findafriend.models import Page, Chat
from django.contrib.auth.models import User
import json


@channel_session_user_from_http
def ws_con(msg):
    # accept the socket 
    msg.reply_channel.send({
        "accept": True
    })

    # add to the chat group
    Group("chat").add(msg.reply_channel); 

# Connected to websocket.receive
@channel_session_user
def ws_msg(msg):
    data = json.loads(msg.content['text'])

    # history calling from request
    if(data['isRequest'] == 'True'):
        if(Chat.objects.filter(recipient__in=Page.objects.filter(title=data['recipient'])))is not None:
            # query histroy
            print(data['isRequest'])
            for c in Chat.objects.filter(recipient__in=Page.objects.filter(title=data['recipient'])).order_by('timestamp'):
                chatJSON = {}
                chatJSON["sender"] = c.sender.username
                chatJSON["recipient"] = c.recipient.title
                chatJSON["message"] = c.messageContent
                chatJSON["timestamp"] = c.timestamp.isoformat(' ')
                # send histroy to user
                msg.reply_channel.send({"text":json.dumps(chatJSON)})
    else: 
        # save to database
        c = Chat(sender=User.objects.get(username=data['sender']), recipient=Page.objects.get(title = data['recipient']), messageContent=data['message'])
        c.save()
    
        # send message to the group
        Group("chat").send({
        "text": json.dumps(data)     
        })

@channel_session_user
def ws_discon(msg):
    Group("chat").discard(msg.reply_channel)
