import React, { useState, useEffect } from 'react'
import ReactGA from 'react-ga';
import Metatags from '../../components/helmet/index'

import TextField from '@material-ui/core/TextField'
import InfiniteScroll from 'react-infinite-scroll-component'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import axios from '../../config/axios/axios'
import { getGenresList, getFullSearchList } from '../../config/api-routes'

import filter from 'lodash-es/filter'
import find from 'lodash-es/find'
import slice from 'lodash-es/slice'

import {
    useStyles,
    AnimeContainer,
    MangaContainer,
} from '../../components/ara/components'

import { Typography, Box, Grid, Button } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CircularProgress from '../../components/progress/index'
import { useTranslation } from 'react-i18next';

const searchTextAPI = (data, text) => {
    if (text.length < 3) {
        return {
            data: slice(data, 0, 24),
            hasData: true
        }
    }

    const regex = new RegExp(text, "i")
    return {
        data: filter(data, obj => regex.test(obj.name)),
        hasData: false
    }
}

const searchTextAPIDebounced = AwesomeDebouncePromise(searchTextAPI, 1000);

const searchGenresAPI = async (data, genres) => {
    let tempArray = data

    genres.forEach(g => {
        tempArray = tempArray.filter(d => d.genres.find((dg) => dg === g))
    })

    return tempArray
}

const searchGenresAPIDebounced = AwesomeDebouncePromise(searchGenresAPI, 500);

export default function SearchPage(props) {
    const classes = useStyles()
    const { t } = useTranslation(['pages', 'components', 'common', 'genres']);

    const [offset, setOffset] = useState(1)
    const [data, setData] = useState([])
    const [fullList, setFullList] = useState([])
    const [genreData, setGenreData] = useState([])
    const [searchProps, setSearchProps] = useState({
        text: "",
        date: "",
        genres: []
    })
    const [type, setType] = useState(props.match.params.type ? props.match.params.type : "anime")
    const [hasData, setHasData] = useState(true)
    const [loadingData, setLoadingData] = useState(true)
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [isSearching, setIsSearching] = useState(false)

    let mappedData = "", genreMappedData = ""

    useEffect(() => {
        const fetchData = async () => {
            const searchList = await axios.get(getFullSearchList(type))
            const genres = await axios.get(getGenresList)
            const initialData = slice(searchList.data, 0, 24)

            if (searchList.data.length === 0 || searchList.status !== 200) {
                setLoadingData(false)
                setGenreData(genres.data.list)
                return setLoadingGenre(false)
            }

            if (searchList.data.length < 24) setHasData(false)
            setFullList(searchList.data)
            setData([...initialData])
            setLoadingData(false)
            setGenreData(genres.data.list)
            setLoadingGenre(false)
        }

        fetchData()
        ReactGA.pageview(window.location.pathname)
    }, [type])

    function resetOffset() {
        setOffset(1)
    }

    function handleGetMore() {
        const page = offset + 1

        const newData = [...data, ...slice(fullList, 24 * offset, 24 * page)]

        setData(newData)
        setOffset(page)

        if (fullList.length / 24 < page) {
            return setHasData(false)
        }
    }

    function handleTypeChange(newType) {
        if (type === newType) return
        setIsSearching(true)
        setLoadingData(true)
        resetOffset()
        setType(newType)
        setSearchProps({
            text: "",
            date: "",
            genres: []
        })

        const fetchData = async () => {
            const searchList = await axios.get(getFullSearchList(newType))
            const initialData = slice(searchList.data, 0, 24)

            if (searchList.data.length === 0 || searchList.status !== 200) {

                setFullList(searchList.data)
                setData([...initialData])
                setIsSearching(false)
                setLoadingData(false)
                return setHasData(false)
            }

            setFullList(searchList.data)
            setData([...initialData])
            setIsSearching(false)
            setLoadingData(false)
            return setHasData(true)
        }

        fetchData()
    }

    const handleChange = name => async event => {
        setLoadingData(true)
        resetOffset()
        setSearchProps({ ...searchProps, genres: [], [name]: event.target.value })
        setHasData(false)
        const result = await searchTextAPIDebounced(fullList, event.target.value)
        setData(result.data)
        setHasData(result.hasData)
        setLoadingData(false)
    }

    const handleGenreClick = async (value) => {
        setIsSearching(true)
        setLoadingData(true)
        resetOffset()

        let newData
        const genres = searchProps.genres
        if (find(genres, (v) => v === value) !== undefined) {
            newData = genres.filter(v => v !== value)
            setSearchProps({ ...searchProps, text: "", genres: newData })

            if (newData.length !== 0) {
                setHasData(false)
                const result = await searchGenresAPIDebounced(fullList, newData)

                setData(result)
                setIsSearching(false)
                setLoadingData(false)
            }

            else {
                setData(slice(fullList, 0, 24))
                setOffset(1)
                setHasData(true)
                setIsSearching(false)
                return setLoadingData(false)
            }
        }
        else {
            newData = [...genres, value]
            setSearchProps({ ...searchProps, text: "", genres: newData })
            setHasData(false)
            const result = await searchGenresAPIDebounced(fullList, newData)

            setData(result)
            setIsSearching(false)
            setLoadingData(false)
        }
    }

    if (!loadingData) {
        if (data.length !== 0 && type === "anime") {
            mappedData = data.map(d =>
                <AnimeContainer key={d.slug} t={t} data={{ ...d }} />
            )
        }

        else if (data.length !== 0 && type === "manga") {
            mappedData = data.map(d =>
                <MangaContainer key={d.slug} t={t} data={{ ...d }} />
            )
        }

        else mappedData = ""
    }

    if (!loadingGenre) {
        if (genreData.length !== 0)
            genreMappedData = genreData.map((g, i) =>
                <Grid item key={"genres" + i}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleGenreClick(g)}
                        color={find(searchProps.genres, (value) => g === value) ? "primary" : "default"}
                        disabled={isSearching}>
                        {g}
                    </Button>
                </Grid>
            )


        else genreMappedData = ""
    }

    else {
        return (
            <Box
                mt={1}
                p={1}
                key={0}
                textAlign="center"
            >
                <CircularProgress disableShrink color="secondary" />
            </Box>
        )
    }

    return (
        <>
            <Metatags
                title={t('search.metadata.title', { site_name: process.env.REACT_APP_SITENAME })}
                desc={t('search.metadata.description', { site_name: process.env.REACT_APP_SITENAME })}
                url="/ara"
                type="website" />
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <Box justifyContent="space">
                        <Button
                            fullWidth
                            className={classes.PageTypeButton}
                            variant="outlined"
                            color={type === "anime" ? "primary" : "default"}
                            onClick={() => handleTypeChange("anime")}
                            disabled={isSearching}>
                            {t('common:ns.anime')}
                        </Button>
                        <Button
                            fullWidth
                            className={classes.PageTypeButton}
                            variant="outlined"
                            color={type === "manga" ? "primary" : "default"}
                            onClick={() => handleTypeChange("manga")}
                            disabled={isSearching}>
                            {t('common:ns.manga')}
                        </Button>
                    </Box>
                    <form autoComplete="off">
                        <TextField
                            disabled={isSearching}
                            id="search-box"
                            label="İsimle arayın"
                            value={searchProps.text}
                            onChange={handleChange('text')}
                            margin="dense"
                            fullWidth
                            variant="filled"
                        />
                    </form>
                    {type === "anime"
                        ?
                        <Box className={`${classes.ContentWarning} ${classes.DefaultBox}`} p={1} mb={1} boxShadow={1}>
                            <InfoIcon />
                            <Typography variant="subtitle2">
                                {t('search.warnings.blu_ray_notification')}
                            </Typography>
                        </Box>
                        :
                        ""}
                    <Box
                        className={`${classes.ContentError} ${classes.DefaultBox}`} p={1} boxShadow={1}>
                        <WarningIcon />
                        <Typography variant="subtitle2">
                            {t('search.warnings.performance_problem')}
                        </Typography>
                    </Box>
                    <Box mt={1}>
                        {genreMappedData.length !== 0
                            ?
                            <Grid container spacing={1}>
                                {genreMappedData}
                            </Grid>
                            :
                            loadingGenre // lgtm [js/trivial-conditional]
                                ?
                                <Box
                                    mt={1}
                                    p={1}
                                    key={0}
                                    textAlign="center"
                                ><CircularProgress disableShrink color="primary" /></Box>
                                :
                                <Box p={1} className={`${classes.ContentWarning}`} boxShadow={6}>
                                    <WarningIcon />
                                    <Typography variant="subtitle2">
                                        {t('search.warnings.not_found')}
                                    </Typography>
                                </Box>
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={10}>
                    {mappedData.length !== 0
                        ?
                        <InfiniteScroll
                            style={{ overflow: "inherit" }}
                            dataLength={data.length}
                            scrollableTarget="scroll-node"
                            next={handleGetMore}
                            hasMore={hasData}
                            scrollThreshold={1}
                            endMessage={<Typography variant="h6" style={{ padding: "8px", textAlign: "center" }}>{t('search.warnings.end_of_list')}</Typography>}
                            loader={<Box
                                mt={1}
                                p={1}
                                key={0}
                                textAlign="center"
                            ><CircularProgress disableShrink color="primary" /></Box>}
                        >
                            <Grid container spacing={2}>
                                {mappedData}
                            </Grid>
                        </InfiniteScroll>
                        :
                        loadingData
                            ?
                            <Box mt={1} p={1} key={0} textAlign="center">
                                <CircularProgress disableShrink color="primary" />
                            </Box>
                            :
                            <Box p={1} className={`${classes.ContentError} ${classes.DefaultBox}`} boxShadow={6}>
                                <WarningIcon />
                                <Typography variant="subtitle2">
                                    {t('search.warnings.not_found')}
                                </Typography>
                            </Box>
                    }
                </Grid>
            </Grid>
        </>
    )
}