import { SchemaObject } from 'neode';
import * as Neode from 'neode'

const UserSchema: SchemaObject = {
    // properties
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
        type:'relationships',
        relationship:'FRIEND_OF',
        direction: 'direction_both' ,
        properties: {
            'since':'datetime',
        },
        target: 'User',
        eager: true // <-- eager load this relationship
    },
    pendingRequest:{
        type:'relationships',
        relationship:'WANNA_BE_FRIEND_WITH',
        direction: 'direction_out' ,
        properties: {
            'since':'datetime',
        },
        target: 'User',
        eager: true
    }
};

export default UserSchema;