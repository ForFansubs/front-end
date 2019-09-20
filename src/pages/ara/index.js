import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga';

import TextField from '@material-ui/core/TextField'
import InfiniteScroll from 'react-infinite-scroll-component'
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import LazyLoad from 'react-lazyload';

import axios from '../../config/axios/axios'
import { getGenresList, getFullSearchList } from '../../config/api-routes'

import { useTheme } from '@material-ui/styles';

import filter from 'lodash-es/filter'
import find from 'lodash-es/find'
import slice from 'lodash-es/slice'

import {
    PageContainer,
    ContentContainer,
    defaultBoxProps,
    PagePlacer,
    PageGenreButton,
    PageGenreList,
    ContentWarning,
    ContentError,
    PageTypeButton,
    AnimeContainer,
    AnimeContainerPlaceholder,
    MangaContainer,
    MangaContainerPlaceholder
} from '../../components/ara/components'

import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning';
import { Typography } from '@material-ui/core';
import CircularProgress from '../../components/progress/index';

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
    const theme = useTheme()

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
                return setHasData(false)
            }

            setFullList(searchList.data)
            setData([...initialData])
            setLoadingData(false)
            setGenreData(genres.data.list)
            setLoadingGenre(false)
        }

        fetchData()
        ReactGA.pageview(window.location.pathname)
    }, [type])

    function handleGetMore() {
        const page = offset + 1

        const newData = [...data, ...slice(fullList, 24 * offset, 24 * page)]

        setData(newData)
        setOffset(page)

        if (fullList.length / 24 < page) {
            console.log("Data bitti")
            return setHasData(false)
        }
    }

    function handleTypeChange(newType) {
        if (type === newType) return
        setIsSearching(true)
        setLoadingData(true)
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
                <LazyLoad
                    height={225}
                    key={d.slug + "anime"}
                    placeholder={
                        <AnimeContainerPlaceholder genresbg={theme.palette.secondary.main} />
                    }>
                    <AnimeContainer genresbg={theme.palette.primary.main} scrollbg={theme.palette.background.level1} data={{ ...d }} />
                </LazyLoad>
            )
        }

        else if (data.length !== 0 && type === "manga") {
            mappedData = data.map(d =>
                <LazyLoad
                    height={187}
                    key={d.slug + d.name + "manga"}
                    placeholder={
                        <MangaContainerPlaceholder genresbg={theme.palette.secondary.main} />
                    }>
                    <MangaContainer genresbg={theme.palette.primary.main} scrollbg={theme.palette.background.level1} data={{ ...d }} />
                </LazyLoad>
            )
        }

        else mappedData = ""
    }

    if (!loadingGenre) {
        if (genreData.length !== 0)
            genreMappedData = genreData.map((g, i) =>
                <PagePlacer item key={"genres" + i}>
                    <PageGenreButton
                        size="small"
                        variant="outlined"
                        onClick={() => handleGenreClick(g)}
                        color={find(searchProps.genres, (value) => g === value) ? "secondary" : "default"}
                        disabled={isSearching}>
                        {g}
                    </PageGenreButton>
                </PagePlacer>
            )


        else genreMappedData = ""
    }

    else {
        return (
            <ContentContainer
                mt={1}
                p={1}
                key={0}
                textAlign="center"
            ><CircularProgress disableShrink color="secondary" /></ContentContainer>
        )
    }

    const title = `PuzzleSubs Anime & Manga Ara Türkçe İzle`
    const desc = `PuzzleSubs Anime ve Manga arama motoru. Türlere göre anime ve manga arayabilir, konularına göz atabilirsiniz.`

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={desc} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={process.env.REACT_APP_SITENAME + "/ara"} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={process.env.REACT_APP_SITENAME + "/512.png"} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={process.env.REACT_APP_SITENAME + "/ara"} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={desc} />
                <meta property="twitter:image" content={process.env.REACT_APP_SITENAME + "/512.png"} />
            </Helmet>
            <PagePlacer container spacing={2}>
                <PagePlacer item xs={12} md={2}>
                    <PageContainer justifyContent="space">
                        <PageTypeButton
                            fullWidth
                            variant="outlined"
                            color={type === "anime" ? "secondary" : "default"}
                            onClick={() => handleTypeChange("anime")}
                            disabled={isSearching}>
                            Anime
                        </PageTypeButton>
                        <PageTypeButton
                            fullWidth
                            variant="outlined"
                            color={type === "manga" ? "secondary" : "default"}
                            onClick={() => handleTypeChange("manga")}
                            disabled={isSearching}>
                            Manga
                        </PageTypeButton>
                    </PageContainer>
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
                        <ContentWarning
                            {...defaultBoxProps}
                            p={1}><InfoIcon />
                            <Typography variant="subtitle2">Üstü mavi çizgili olanlar Blu-ray içeriklerdir.</Typography>
                        </ContentWarning>
                        :
                        ""}
                    <ContentError
                        {...defaultBoxProps}
                        p={1}>
                        <WarningIcon />
                        <Typography variant="subtitle2">Sayfanın performans sorunu vardır. Donma yaşarsanız şimdilik <span role="img" aria-label="shrug-emoji">🤷</span></Typography>
                    </ContentError>
                    <PageContainer mt={1}>
                        {genreMappedData.length !== 0
                            ?
                            <PageGenreList container spacing={1}>
                                {genreMappedData}
                            </PageGenreList>
                            :
                            loadingGenre
                                ?
                                <ContentContainer
                                    mt={1}
                                    p={1}
                                    key={0}
                                    textAlign="center"
                                ><CircularProgress disableShrink color="secondary" /></ContentContainer>
                                :
                                <ContentError
                                    {...defaultBoxProps}
                                    p={1}>
                                    <WarningIcon /><Typography variant="subtitle2">Gösterilecek bir şey bulunamadı.</Typography>
                                </ContentError>
                        }
                    </PageContainer>
                </PagePlacer>
                <PagePlacer item xs={12} md={10}>
                    {mappedData.length !== 0
                        ?
                        <InfiniteScroll
                            style={{ overflow: "inherit" }}
                            dataLength={data.length}
                            next={handleGetMore}
                            hasMore={hasData}
                            scrollThreshold={1}
                            endMessage={<Typography variant="h6" style={{ padding: "8px", textAlign: "center" }}>Liste sonu.</Typography>}
                            loader={<ContentContainer
                                mt={1}
                                p={1}
                                key={0}
                                textAlign="center"
                            ><CircularProgress disableShrink color="secondary" /></ContentContainer>}
                        >
                            <PagePlacer container spacing={2}>
                                {mappedData}
                            </PagePlacer>
                        </InfiniteScroll>
                        :
                        loadingData
                            ?
                            <ContentContainer
                                mt={1}
                                p={1}
                                key={0}
                                textAlign="center"
                            ><CircularProgress disableShrink color="secondary" /></ContentContainer>
                            :
                            <ContentError
                                {...defaultBoxProps}
                                p={1}>
                                <WarningIcon /><Typography variant="subtitle2">Gösterilecek bir şey bulunamadı.</Typography>
                            </ContentError>
                    }
                </PagePlacer>
            </PagePlacer>

        </>
    )
}