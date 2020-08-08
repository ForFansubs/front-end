import React, { useState } from 'react'
import { useDispatch, useGlobal } from 'reactn'

import { Modal, Box, Button, Typography, TextField, makeStyles } from '@material-ui/core'

import ToastNotification from '../toastify/toast'

import axios from '../../config/axios/axios'
import { loginRoute } from '../../config/api-routes';
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
    name: "",
    password: ""
}

const errContainerModel = {
    err: "",
    name: "",
    password: ""
}

export default function LoginModal() {
    const { t } = useTranslation(['components', 'common'])
    const classes = useStyles()

    const setUser = useDispatch('loginHandler')
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
            name: userInfo.name,
            password: userInfo.password
        }

        axios.post(loginRoute, userData)
            .then(res => {
                setUser(res.data)
                setShowModal("")
                setUserInfo(UserModel)
                setErrContainer(errContainerModel)
            })
            .catch(err => {
                console.log(err)
                const errors = err.response ? err.response.data : ""
                const payload = {
                    container: "login-error",
                    type: "error",
                    message: err.response.status === 429 ? err.response.data : ""
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
                open={showModal === "login" ? true : false}
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
                    <Typography variant="h4">Giriş yap</Typography>
                    <form autoComplete="off" onSubmit={event => handleSubmitForm(event)}>
                        <TextField
                            id="username"
                            error={errContainer.name ? true : false}
                            helperText={errContainer.name ? errContainer.name : ""}
                            label={t('common:ns.username')}
                            value={userInfo.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            variant="outlined"
                            required
                            autoFocus
                            fullWidth />
                        <TextField
                            id="password"
                            label={t('common:ns.password')}
                            value={userInfo.password}
                            helperText={errContainer.password ? errContainer.password : ""}
                            onChange={handleChange('password')}
                            margin="normal"
                            variant="outlined"
                            type="password"
                            required
                            autoFocus
                            fullWidth />
                        <Box mt={2}>
                            <Button variant="outlined" type="submit" className={classes.FormButton}>{t('common:ns.login')}</Button>
                            <Button variant="outlined" onClick={() => setShowModal("register")} className={classes.FormButton}>{t('common:ns.dont_have_account')}</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}