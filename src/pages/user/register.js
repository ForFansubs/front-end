import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { indexPage, loginPage } from "../../config/front-routes";
import postDataToAPI from "../../helpers/postDataToAPI";
import { useSnackbar } from "notistack";

import { VscLock } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md";

import useStyles from "./register.styles";
import { useState } from "react";
import { loginRoute, registerRoute } from "../../config/api-routes";
import { Typography } from "@material-ui/core";
import Loading from "../../components/progress";
import { useTranslation } from "react-i18next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Alert } from "@material-ui/lab";

export default function LoginPage(props) {
    const { t } = useTranslation("pages");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        repeat_password: "",
    });
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerError, setRegisterError] = useState({});

    function _handleInputChange(event) {
        setUserData((state) => ({
            ...state,
            [event.target.id]: event.target.value,
        }));
    }

    async function _handleSubmit(event) {
        event.preventDefault();
        setRegisterError({});
        setRegisterLoading(true);
        const token = await executeRecaptcha("register_page");
        postDataToAPI({
            route: registerRoute,
            data: { ...userData, recaptcha_response: token },
        })
            .then((res) => {
                if (res.status === 200) {
                    setRegisterLoading(false);
                    enqueueSnackbar(t("user.register.success"), {
                        variant: "success",
                    });
                    props.history.push(loginPage);
                }
            })
            .catch((err) => {
                console.log(err?.response?.data);
                setRegisterError(err?.response?.data?.err);
                setRegisterLoading(false);
            });
    }

    return (
        <Grid container component='main' className={classes.MainContainer}>
            <Grid item xs={false} sm={4} md={7} className={classes.Image} />
            <Grid item xs={12} sm={8} md={5} className={classes.RightContainer}>
                <div className={classes.RightContainerInner}>
                    <div className={classes.BackButtonContainer}>
                        <Link to={indexPage}>
                            <MdArrowBack size={24} />
                        </Link>
                    </div>
                    <Avatar className={classes.Avatar}>
                        <VscLock />
                    </Avatar>
                    <Typography variant='h3' component='h1'>
                        {process.env.REACT_APP_SITE_NAME}{" "}
                        {t("user.register.title")}
                    </Typography>
                    <form
                        className={classes.FormContainer}
                        noValidate
                        onSubmit={_handleSubmit}
                    >
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='username'
                            label={t("user.common.inputs.username")}
                            helperText={
                                registerError.username
                                    ? registerError.username
                                    : ""
                            }
                            error={registerError.username ? true : false}
                            name='username'
                            autoComplete='username'
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.username}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label={t("user.common.inputs.email")}
                            helperText={
                                registerError.email ? registerError.email : ""
                            }
                            error={registerError.email ? true : false}
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.email}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label={t("user.common.inputs.password")}
                            helperText={
                                registerError.password
                                    ? registerError.password
                                    : ""
                            }
                            error={registerError.password ? true : false}
                            type='password'
                            id='password'
                            autoComplete='password'
                            onChange={_handleInputChange}
                            value={userData.password}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='repeat_password'
                            label={t("user.common.inputs.repeat_password")}
                            helperText={
                                registerError.repeat_password
                                    ? registerError.repeat_password
                                    : ""
                            }
                            error={registerError.password ? true : false}
                            type='password'
                            id='repeat_password'
                            autoComplete='password'
                            onChange={_handleInputChange}
                            value={userData.repeat_password}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.SubmitButton}
                            disabled={registerLoading ? true : undefined}
                        >
                            {registerLoading ? (
                                <Loading size={24} />
                            ) : (
                                t("user.register.title")
                            )}
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link to={loginPage} variant='body2'>
                                    {t("user.register.buttons.have_account")}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Alert severity='info' className={classes.GoogleTerms}>
                        This site is protected by reCAPTCHA and the Google{" "}
                        <a href='https://policies.google.com/privacy'>
                            Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href='https://policies.google.com/terms'>
                            Terms of Service
                        </a>{" "}
                        apply.
                    </Alert>
                </div>
            </Grid>
        </Grid>
    );
}
