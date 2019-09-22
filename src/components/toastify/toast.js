import React from 'react'

import { toast, closeToast } from 'react-toastify';
import './toast.css';

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function Message(props) {
    const { message, overridemessage, onClick } = props

    return (
        <Box
            p={2}
            bgcolor="background.level2"
            boxShadow={2}
            onClick={onClick}
        >
            <Typography variant="h5" color="textPrimary">{overridemessage ? overridemessage : message}</Typography>
        </Box>
    )
}

const reload = () => {
    window.location.href=window.location.href
}

export function payload(container, type, message, autoClose, onClickFunction) {
    return ({
        container,
        type,
        message,
        autoClose,
        onClickFunction
    })
}

export default function ToastNotification(payload) {
    let { container, message, type, autoClose, onClickFunction } = payload

    const config = {
        position: "bottom-center",
        closeButton: false,
        autoClose: autoClose === false ? false : 3000,
        progressClassName: type === "success" ? "success-progressbar" : "error-progressbar"
    }
    toast.dismiss()

    if(onClickFunction) {
        switch (onClickFunction) {
            case "reload":
                onClickFunction = reload
                break;
            default:
                onClickFunction = null
                break;
        }
    }


    switch (container) {
        case "login-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={onClickFunction || closeToast} message="Başarıyla giriş yaptınız!" overridemessage={message} />, config)
        case "login-error":
            return toast.success(({ closeToast }) => <Message type="error" onClick={onClickFunction || closeToast} message="İsteğinizi gerçekleştirirken bir sorunla karşılaştık." overridemessage={message} />, config)
        case "register-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={onClickFunction || closeToast} message="Başarıyla kayıt oldunuz! Lütfen emailinizi doğrulayın." overridemessage={message} />, config)
        case "register-error":
            return toast.success(({ closeToast }) => <Message type="error" onClick={onClickFunction || closeToast} message="Kaydınızı oluştururken bir sorunla karşılaştık." overridemessage={message} />, config)
        case "logout-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={onClickFunction || closeToast} message="Başarıyla çıkış yaptınız!" overridemessage={message} />, config)
        case "notification-success":
            return toast.success(({ closeToast }) => <Message type="success" onClick={onClickFunction || closeToast} overridemessage={message} />, config)
        default:
            return false
    }
}