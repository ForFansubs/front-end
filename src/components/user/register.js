import React, { useState } from 'react'
import { useGlobal } from 'reactn'

import { Modal, Box, Button, Typography, TextField, makeStyles } from '@material-ui/core'

import ToastNotification from '../toastify/toast'

import axios from '../../config/axios/axios'
import { registerRoute } from '../../config/api-routes';
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    ModalContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: theme.breakpoints.values.sm,

        [theme.breakpoints.down("sm")]: {
            width: "100%"
        }
    },
    FormButton: {
        '&:first-child': {
            marginRight: theme.spacing(1)
        }
    }
}))

const UserModel = {
    username: "",
    password: "",
    password2: "",
    email: ""
}

const errContainerModel = {
    err: "",
    username: "",
    password: ""
}

export default function RegisterModal() {
    const { t } = useTranslation(['components', 'common'])
    const classes = useStyles()

    const [showModal, setShowModal] = useGlobal('showModal')
    const [userInfo, setUserInfo] = useState(UserModel)
    const [errContainer, setErrContainer] = useState(errContainerModel)

    const handleChange = type => event => {
        setUserInfo({ ...userInfo, [type]: event.target.value })
        setErrContainer(errContainerModel)
    }

    const handleSubmitForm = (event) => {
        event.preventDefault()

        const userData = {
            name: userInfo.username,
            password: userInfo.password,
            password2: userInfo.password2,
            email: userInfo.email
        }

        axios.post(registerRoute, userData)
            .then(res => {
                const payload = {
                    container: "register-success",
                    type: "success",
                    message: ""
                }
                ToastNotification(payload)
                setShowModal("")
                setUserInfo(UserModel)
                setErrContainer(errContainerModel)
            })
            .catch(err => {
                const errors = err.response.data ? err.response.data : ""
                const payload = {
                    container: "login-error",
                    type: "error",
                    message: ""
                }
                ToastNotification(payload)
                setErrContainer({ ...errContainer, ...errors })
            })
    }

    function handleClose() {
        setShowModal("")
    }

    return (
        <>
            <Modal
                open={showModal === "register" ? true : false}
                onClose={handleClose}
                aria-labelledby="login-modal"
                aria-describedby="login-modal"
                disableAutoFocus
            >
                <Box
                    p={2}
                    bgcolor="background.level1"
                    boxShadow={2}
                    className={classes.ModalContainer}>
                    <Typography variant="h4">Kayıt ol</Typography>
                    <form autoComplete="off" onSubmit={event => handleSubmitForm(event)}>
                        <TextField
                            id="email"
                            error={errContainer.email ? true : false}
                            helperText={errContainer.email ? errContainer.email : ""}
                            label={t('common:ns.email')}
                            value={userInfo.email}
                            onChange={handleChange('email')}
                            margin="normal"
                            variant="outlined"
                            required
                            autoFocus
                            fullWidth />
                        <TextField
                            id="username"
                            error={errContainer.username ? true : false}
                            helperText={errContainer.username ? errContainer.username : ""}
                            label={t('common:ns.username')}
                            value={userInfo.username}
                            onChange={handleChange('username')}
                            margin="normal"
                            variant="outlined"
                            required
                            autoFocus
                            fullWidth />
                        <TextField
                            id="password"
                            error={errContainer.password ? true : false}
                            helperText={errContainer.password ? errContainer.password : ""}
                            label={t('common:ns.password')}
                            value={userInfo.password}
                            onChange={handleChange('password')}
                            margin="normal"
                            variant="outlined"
                            type="password"
                            required
                            autoFocus
                            fullWidth />
                        <TextField
                            id="password2"
                            error={errContainer.password2 ? true : false}
                            helperText={errContainer.password2 ? errContainer.password2 : ""}
                            label={t('common:ns.password_again')}
                            value={userInfo.password2}
                            onChange={handleChange('password2')}
                            margin="normal"
                            variant="outlined"
                            type="password"
                            required
                            autoFocus
                            fullWidth />
                        <Box mt={2}>
                            <Button variant="outlined" className={classes.FormButton} type="submit">{t('common:ns.register')}</Button>
                            <Button variant="outlined" className={classes.FormButton} onClick={() => setShowModal("login")}>{t('common:ns.have_account')}</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}