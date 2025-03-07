const Evento = require("../../models/Evento");
const Notification = require("../../models/Notification.js");
const User = require("../../models/User.js")
const NotificationAssCreateService = require("../../services/NotificationAssServices/NotificationAssCreateService.js")

const notificationAssCreateController = async (req, res) => {
    try {

        const id_evento = req.body.id_evento;

        const id_user = req.body.id_user;

        const data = req.body.data;

        const userIsValid = await User.findByPk(id_user);

        if (!userIsValid) {
            return res.status(404).json({
                code: 404,
                error: "Usuário não foi encotrado.",
                message: "Erro no NotificationAssCreateController",
                sucess: false
            })
        }

        const eventoIsValid = await Evento.findByPk(id_evento);

        if (!eventoIsValid) {
            return res.status(404).json({
                code: 404,
                error: "Evento não é válido ou está indisponível.",
                message: "Erro no NotificationAssCreateController",
                sucess: false
            })
        }

        const NotificationAss = await NotificationAssCreateService.create(id_evento, id_user, data);

        if (NotificationAss.code !== 200) {
            return res.status(NotificationAss.code).json({ NotificationAss })
        }


        return res.status(200).json({
            code: 200,
            NotificationAss,
            message: "Feito com sucesso!"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            error: {
                details: [
                    {
                        controller: "NotificationAssCreateController",
                        message: "Erro interno",
                    },
                ],
            },
            message: "Erro no NotificationAssCreateController",
            success: false,
        });

    }
}

module.exports = notificationAssCreateController;