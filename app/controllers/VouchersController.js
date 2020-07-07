const { Voucher } = require('../models/Voucher')
const nodemailer = require('nodemailer');
const makeid = (length, pin) => {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", num = "0123456789", result = '';
    if (pin) {
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    } else {
        result += 'VCD'
        characters += num
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'voucher.task@gmail.com',
        pass: 'VoucherTask1!'
    }
});

module.exports.create = function (req, res) {
    var body = req.body
    const randomString = makeid(10)
    const pin = makeid(5, true)
    body['pin'] = pin
    body['code'] = randomString
    body['status'] = 'active'
    const voucher = new Voucher(body)
    console.log(body)
    const mailOptions = {
        from: 'Voucher Support <voucher.task@gmail.com>',
        to: body.email,
        subject: 'Thank You for Applying',
        html: `<html><body><p> Code:-  ${randomString}</p></body></html>`
    };
    voucher.save()
        .then((voucher) => {
            console.log('2')
            console.log(voucher)
            const { _id, email, pin, code, status } = voucher
            return transporter.sendMail(mailOptions, (erro, info) => {
                if (erro) {
                    console.log('1')
                    res.json({ message: erro.toString() });
                }
                res.json({
                    _id, email, pin, code, status, message: 'Sent Successfully!'
                })
            });
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
}
