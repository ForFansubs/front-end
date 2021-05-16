import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

// Import country flags
import countryFlagTR from "flag-icon-css/flags/4x3/tr.svg";
import countryFlagEN from "flag-icon-css/flags/4x3/us.svg";
import SettingsContext from "../../contexts/settings.context";
import i18next from "i18next";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    formControl: {
        width: "100%",
    },
    MenuItem: {
        display: "flex",
        alignItems: "center",
        "& img": {
            marginRight: theme.spacing(1),
        },
    },
    LanguageButton: {
        marginBottom: theme.spacing(2),
    },
    selectMenu: {
        display: "flex",
        alignItems: "center",
        "& img": {
            marginRight: theme.spacing(1),
        },
    },
    dialogTitleRoot: {
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px 0`,
    },
    actionsSpacing: {
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    },
}));

export default function LanguageSelector() {
    const { t } = useTranslation(["components", "common"]);
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useContext(SettingsContext);

    const handleChange = (event) => {
        i18next.changeLanguage(event.target.value || "eng", (err) => {
            if (err) return console.log(err);
            setSettings((state) => ({
                ...state,
                language: event.target.value || "eng",
            }));
            setOpen(true);
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                onClick={handleClickOpen}
                className={classes.LanguageButton}
            >
                {t("footer.change_language")}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
                    {t("footer.select_the_language_you_wish_to_use")}
                </DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='language_selector'>
                                {t("common:ns.language")}
                            </InputLabel>
                            <Select
                                fullWidth
                                value={settings.language}
                                onChange={handleChange}
                                classes={{ selectMenu: classes.selectMenu }}
                                input={<Input id='language_selector' />}
                            >
                                <MenuItem
                                    value={"tr"}
                                    className={classes.MenuItem}
                                >
                                    <img src={countryFlagTR} height='21px' />{" "}
                                    Türkçe
                                </MenuItem>
                                <MenuItem
                                    value={"en"}
                                    className={classes.MenuItem}
                                >
                                    <img src={countryFlagEN} height='21px' />{" "}
                                    English
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions classes={{ spacing: classes.actionsSpacing }}>
                    <Button variant='outlined' onClick={handleClose}>
                        {t("common:ns.cancel")}
                    </Button>
                    <Button variant='outlined' onClick={handleClose}>
                        {t("common:ns.change")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
