import React, { useState } from 'react'
import ReactGA from 'react-ga';

import Modal from '@material-ui/core/Modal'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import useTheme from '@material-ui/styles/useTheme'
import { useGlobal } from 'reactn'
import styled from 'styled-components'

import ToastNotification from '../toastify/toast'

import axios from '../../config/axios/axios'
import { registerRoute } from '../../config/api-routes';

const ModalContainer = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.theme.breakpoints.values.sm}px;

    @media(max-width:${props => props.theme.breakpoints.values.sm}px) {
        width: 100%;
    }
`

const ButtonContainer = styled(Box)``

const ModalTitle = styled(Typography)``

const FormContainer = styled.form``

const FormButton = styled(Button)`
    :first-child {
        margin-right: 5px;
    }
`

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
    const theme = useTheme()

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
                <ModalContainer
                    theme={theme}
                    p={2}
                    bgcolor="background.level1"
                    boxShadow={2}>
                    <ModalTitle variant="h4">Kayıt ol</ModalTitle>
                    <FormContainer autoComplete="off" onSubmit={event => handleSubmitForm(event)}>
                        <TextField
                            id="email"
                            error={errContainer.email ? true : false}
                            helperText={errContainer.email ? errContainer.email : ""}
                            label="E-mail"
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
                            label="Kullanıcı adı"
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
                            label="Şifre"
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
                            label="Şifre tekrar"
                            value={userInfo.password2}
                            onChange={handleChange('password2')}
                            margin="normal"
                            variant="outlined"
                            type="password"
                            required
                            autoFocus
                            fullWidth />
                        <ButtonContainer mt={2}>
                            <FormButton variant="outlined" type="submit">Kayıt ol</FormButton>
                            <FormButton variant="outlined" onClick={() => setShowModal("login")}>Hesabın var mı?</FormButton>
                        </ButtonContainer>
                    </FormContainer>
                </ModalContainer>
            </Modal>
        </>
    )
}