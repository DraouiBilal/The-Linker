import { SchemaObject } from 'neode';

const UserSchema: SchemaObject = {
    id:{
        type: 'uuid',
        primary: true,
        required: true,
    },
    lastname: {
        type: 'string',
        required: true,
    },
    firstname: {
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        unique: true,
        required: true,
    },
    email:{
        type: 'string',
        unique: true,
        required: true,
    },
    password:{
        type: 'string',
        required: true,
    },
    avatar: {
        type: 'string',
    },
    isFirstAuth: {
        type: 'boolean',
        default: true,
    },
    
    // relationship
    friendOf:{
        type:'relationship',
        relationship:'FRIEND_OF',
        direction: 'direction_both' ,
        properties: {
            'since':'datetime',
        },
        target: 'User',
        eager: true // <-- eager load this relationship
    },

    sentFriendRequestTo:{
        type:'relationship',
        relationship:'SENT_FRIEND_REQUEST_TO',
        direction: 'direction_out' ,
        properties: {
            'since':'datetime',
        },
        target: 'User',
        eager: true // <-- eager load this relationship
    }

};

export default UserSchema;