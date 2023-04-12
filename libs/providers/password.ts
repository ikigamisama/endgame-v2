import bcrypt from 'bcryptjs'

export function generatePassword(){
    let pass = '',
        str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

     for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}


export function hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}