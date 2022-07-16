import {Entity,Schema} from "redis-om"

class UserEnitity extends Entity{}
const redisUserSchema = new Schema(UserEnitity,{
    userId:{type:'string'},
    username:{type:'string'},
    email:{type:'string'},
})