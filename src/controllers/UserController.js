import User from '../models/User'

class UserController{
    async show (req, res){
        const user = await User.findById(req.user)

        if(!user){
            return res.status(401).json({error:"only authenticated user can execute this action"})
            
        }

        return res.json({user:user.show()})

    }



    async store(req, res){
        const {name, email, password} = req.body

        const userExists = await User.findOne({email})

        if(userExists){
            return res.status(401).json({error:"Email already exists"})

        }


        const user = await User.create({
            name, email, password
        })

        return res.json({user:user.show()})
    }

    async update (req, res){
        const {name, email, password} = req.body 
        const user = await User.findById(req.user)

        if(!user){
            return res.status(401).json({error:"only authenticated user can execute this action"})
        }

        if (email && (email != user.email)){
            const userExists = await User.findOne({email})

            if(userExists){
                return res.status(401).json({error:"Email already exists"})
    
            }

        }
        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = password

        await user.save()

        return res.json({user:user.show()})
    }

    async delete (req, res){

        const user = await User.findById(req.user)

         if(!user){
             return res.status(401).json({error:"only authenticated user can execute this action"})
    
        }
        user.deleted = true

        await user.save()

        return res.status(404).send()
    }
}
export default new UserController()
