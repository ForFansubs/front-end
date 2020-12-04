import { useContext } from 'react'

import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import FooterItems from '../../config/footer_items'
import LanguageSelector from './language-selector';
import SettingsContext from '../../contexts/settings.context';

const useStyles = makeStyles(theme => ({
    FooterDiv: {
        padding: `${theme.spacing(2)}px`,
    },
    FooterInnerDiv: {
        display: "flex",
        flexWrap: "wrap"
    },
    FooterAuthor: {
        color: theme.palette.grey["A200"],
        marginTop: `${theme.spacing(4)}px`,
        fontSize: "0.975em"
    },
    FooterItem: {
        marginRight: theme.spacing(1),
        color: theme.palette.grey["400"]
    }
}))

export default function Footer() {
    const { t } = useTranslation('components')
    const classes = useStyles()
    const [settings] = useContext(SettingsContext)

    return (
        <>
            <footer>
                <div className={classes.FooterDiv}>
                    <LanguageSelector />
                    <div className={classes.FooterInnerDiv}>
                        {FooterItems.length !== 0 ?
                            FooterItems.map((item, index) => {
                                return (
                                    <a key={item.title} href={item.link} rel="noopener noreferrer" target="_blank" className={classes.FooterItem}>
                                        <Typography variant="h6">
                                            {item.title}
                                        </Typography>
                                    </a>
                                )
                            })
                            :
                            ""
                        }
                    </div>
                    <Typography variant="subtitle1" className={classes.FooterAuthor}>
                        <a href="https://forfansubs.github.io/" rel="noopener noreferrer" target="_blank">
                            ForFansubs v{settings.version}
                            <br />
                            {t('footer.release_name')}: {settings["release-name"]}
                        </a>
                        <br />
                        <a href="https://aybertocarlos.github.io/" rel="noopener noreferrer" target="_blank">
                            aybertocarlos &copy; {(new Date()).getFullYear()}
                        </a>
                    </Typography>
                </div>
            </footer>
        </>
    )
}