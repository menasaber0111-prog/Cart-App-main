 import * as zod from 'zod'
 export const LoginSchema = zod.object({
    email : zod.string().nonempty('email is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Invalid email '),
    password : zod.string().nonempty('Password is required')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/ , 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' ),
  }) 
   