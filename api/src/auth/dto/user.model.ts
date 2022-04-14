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
        default: false,
    },
};

export default UserSchema;