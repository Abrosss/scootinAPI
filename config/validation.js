const Joi = require('joi');

const registerValidation =(data, confirm_password) =>{
    const schema = Joi.object({
        email:Joi.string().min(6).email(),
        password:Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
            "any.only" : "Password must match"
          }),
    }).with('password', 'confirm_password');
    return schema.validate(data, confirm_password);
  
}

const loginValidation =(data) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
    return schema.validate(data);
  
}
const PasswordValidation =(data) =>{
    const schema = Joi.object({
        password:Joi.string().min(6)
    })
    return schema.validate(data);
  
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.PasswordValidation = PasswordValidation