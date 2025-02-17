import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users= [
        {
            "id": 1,
            "name": "Priya",
            "email":"priya123@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "riya",
            "email":"riya123@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "ramya",
            "email":"ramya123@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "ramya",
            "email":"ramya@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 5,
            "name": "deepa",
            "email":"deepa123@gmail.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?:'INTERN' |  'ENGINEER' | 'ADMIN'){
        if(role){
            return this.users.filter(users  =>users.role === role)
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(users => users.id === id)        
        return user
    }

    create(createUserDto: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b)=>b.id-a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }
    update(id: number, updatedUserDto: UpdateUserDto){
        this.users = this.users.map(user=>{
            if(user.id===id){
                return{...user,...updatedUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user=> user.id !== id)

        return removedUser
    }
}
