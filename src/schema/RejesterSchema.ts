
 import * as zod from 'zod'
 export const Schema = zod.object({
    name : zod.string().nonempty('Name is required')
    .min(3 , 'Name min 3 char ').max(15 , 'Name max 15 char'),
    email : zod.string().nonempty('email is required')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Invalid email '),
    password : zod.string().nonempty('Password is required')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{6,}$/ , 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' ),
    rePassword : zod.string().nonempty('rePassword is required'),
    phone : zod.string().nonempty('Phone is required').regex(/^01[0125][0-9]{8}$/ , "Invalide phone number")

  }) .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"]
  })
   