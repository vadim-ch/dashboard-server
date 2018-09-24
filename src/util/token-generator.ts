import * as jwt from 'jsonwebtoken';
import {SESSION_SECRET} from "./secret";

// export const JwtOptions = {
//     expiresIn: 30
// };

export const JwtOptions = {
    algorithm: 'HS256',
    // keyid: '1',
    noTimestamp: false,
    expiresIn: '2m',
    notBefore: '2s'
};

export class TokenGenerator {
    private secretOrPrivateKey: string;
    private secretOrPublicKey;
    private options;

    constructor(secretOrPrivateKey, secretOrPublicKey, options) {
        this.secretOrPrivateKey = secretOrPrivateKey;
        this.secretOrPublicKey = secretOrPublicKey;
        this.options = options; //algorithm + keyid + noTimestamp + expiresIn + notBefore
    }

    public sign(payload, signOptions?: object) {
        const jwtSignOptions = {
            ...signOptions,
            ...this.options
        };
        return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    }

    public refresh(token, refreshOptions?: object) {
        // const payload = jwt.verify(token, this.secretOrPublicKey, refreshOptions.verify);
        // delete payload.iat;
        // delete payload.exp;
        // delete payload.nbf;
        // delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
        // const jwtSignOptions = Object.assign({}, this.options, {jwtid: refreshOptions.jwtid});
        // // The first signing converted all needed options into claims, they are already in the payload
        // return jwt.sign(payload, this.secretOrPrivateKey, jwtSignOptions);
    }
}

export const tokenGenerator = new TokenGenerator(
    SESSION_SECRET,
    SESSION_SECRET,
    JwtOptions
);