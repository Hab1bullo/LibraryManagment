import { compare } from "bcrypt";
import { deleteOneVarchar, getOneVarchar, insertMany, putmany } from "../services/universal.service.js";
import { userRegister } from "../services/user.service.js";
import { sendOtptoEmail } from "../utils/email.js";
import { accessTokenGenerator, refreshTokenGenerator, tokenVerifyRefresh } from "../utils/jwt.js";
import { otpvalid, userLoginValid, userValidation } from "../validation/user.valid.js";



export const postUser = async (req, res) => {
    try {

        userValidation(req.body);

        const { uuid, emailres, user } = await userRegister(req.body)

        if (user) {
            return res.status(400).send({
                message: user
            });
        };

        return res.status(201).send({
            message: "User successfully registered",
            uuid: uuid,
            otpSend: emailres
        });

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
};


export const verifyOtp = async (req, res) => {
    try {
        const { uuid, otp } = req.body;
        otpvalid(req.body);

        const userotp = await getOneVarchar('userotps', 'uuid', uuid);

        if (!userotp.length) {
            return res.status().send({
                message: "Otp not found"
            });
        }

        if (userotp[0].otp == otp) {
            await putmany('users', ['status'], ['active'], 'uuid', uuid);
            await deleteOneVarchar('userotps', 'uuid', uuid);
            return res.status(200).send({
                message: "Otp verifyed"
            });
        };

        return res.status(400).send({
            message: "Invalid otp"
        });


    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
}


export const login = async (req, res) => {
    try {
        userLoginValid(req.body);
        const { email, password } = req.body;
        const user = await getOneVarchar('users', 'email', email);

        if (!user.length) {
            return res.status(400).send({
                message: "Email or password is incorrect"
            });
        }

        const passCheck = await compare(password, user[0].password);
        if (!passCheck) {
            return res.status(400).send({
                message: "Email or password is incorrect"
            });
        };

        const payload = {
            email: user[0].email,
            username: user[0].username
        }
        const access = accessTokenGenerator(payload);
        const refresh = refreshTokenGenerator(payload);

        await insertMany('refreshtoken', ['uuid', 'email', 'token'], [user[0].uuid, user[0].email, refresh]);

        return res.status(200).send({
            accessToken: access,
            refreshToken: refresh
        });

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}


export const getMe = async (req, res) => {
    try {

        const { email, username } = req.user;

        const user = await getOneVarchar('users', 'email', email);
        delete user[0].password;
        return res.status(200).send({
            message: "Ok",
            data: user[0]
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}

export const logout = async (req, res) => {
    try {

        const { email, username } = req.user;

        await deleteOneVarchar('refreshtoken', 'email', email);
        await putmany('users', ['status'], ['inactive'], 'email', email);

        return res.status(200).send({
            message: "Logout",
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}

export const refreshtoken = async (req, res) => {
    try {

        const { refreshToken } = req.body;
        console.log(refreshToken);

        const tokenInfo = tokenVerifyRefresh(refreshToken);

        const user = await getOneVarchar('users', 'email', tokenInfo.email);

        if (!user.length) {
            return res.status(200).send({
                message: "User not found",
            });
        }

        const payload = {
            email: user[0].email,
            username: user[0].username
        }
        const access = accessTokenGenerator(payload);
        const refresh = refreshTokenGenerator(payload);


        await putmany('refreshtoken', ['token'], [refresh], 'email', user[0].email);

        return res.status(200).send({
            accessToken: access,
            refreshToken: refresh
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    }
}