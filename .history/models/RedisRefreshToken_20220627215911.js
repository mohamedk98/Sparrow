import {Entity,Schema} from "redis-om"

class UserData extends Entity{}
const redisUserSchema = new Schema({
    userId:{type:'string'}
})