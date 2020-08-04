import React, { useState } from 'react'
import { useGlobal, useDispatch } from 'reactn'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        width: "100%"
    }
}));

export default function LanguageSelector() {
    const { t } = useTranslation(['components', 'common'])
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [settings] = useGlobal('settings')
    const setSettings = useDispatch('setSettings')

    const handleChange = (event) => {
        console.log(event.target.value)

        setSettings("language", event.target.value || 'eng')
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen}>{t('footer.change_language')}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('footer.select_the_language_you_wish_to_use')}</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="language_selector">{t('common:ns.language')}</InputLabel>
                            <Select
                                fullWidth
                                value={settings.language}
                                onChange={handleChange}
                                input={<Input id="language_selector" />}
                            >
                                <MenuItem value={"tr"}>Türkçe</MenuItem>
                                <MenuItem value={"en"}>English</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('common:ns.cancel')}
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        {t('common:ns.change')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}