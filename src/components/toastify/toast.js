import React from 'react'

import { toast } from 'react-toastify';
import './toast.css';

import { Box, Typography } from '@material-ui/core'

function Message(props) {
    const { message, overridemessage } = props

    return (
        <Box
            p={2}
            bgcolor="background.level2"
            boxShadow={2}
        >
            <Typography variant="h5">{overridemessage ? overridemessage : message}</Typography>
        </Box>
    )
}

export default function ToastNotification(payload) {
    const { container, message, type } = payload

    const config = {
        position: "bottom-center",
        closeButton: false,
        autoClose: 3000,
        progressClassName: type === "success" ? "success-progressbar" : "error-progressbar"
    }
    toast.dismiss()

    switch (container) {
        case "login-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={closeToast} message="Başarıyla giriş yaptınız!" overridemessage={message} />, config)
        case "login-error":
            return toast.success(({ closeToast }) => <Message type="error" onClick={closeToast} message="İsteğinizi gerçekleştirirken bir sorunla karşılaştık." overridemessage={message} />, config)
        case "register-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={closeToast} message="Başarıyla kayıt oldunuz! Lütfen emailinizi doğrulayın." overridemessage={message} />, config)
        case "register-error":
            return toast.success(({ closeToast }) => <Message type="error" onClick={closeToast} message="Kaydınızı oluştururken bir sorunla karşılaştık." overridemessage={message} />, config)
        case "logout-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={closeToast} message="Başarıyla çıkış yaptınız!" overridemessage={message} />, config)
        default:
            return false
    }
}