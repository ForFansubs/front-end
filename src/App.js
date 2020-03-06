import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Wrapper from './components/hoc/wrapper'
import ReactGA from 'react-ga';

import Loading from './components/progress/index'
import InitialLoading from './components/app/pre-screens'

import SSSPage from './pages/sss/index'
import FourOhFourPage from './components/404/404'
import EkipAlimlariPage from './pages/ekip-alimlari/index'

const IndexPage = lazy(() => import('./pages/index/index'))
const SearchPage = lazy(() => import('./pages/ara/index'))
const AnimePage = lazy(() => import('./pages/ceviriler/anime/index'))
const MangaPage = lazy(() => import('./pages/ceviriler/manga/index'))
const EpisodePage = lazy(() => import('./pages/episode/index'))

export default function App() {
  const getOnline = useDispatch('getOnline')
  const checkMobile = useDispatch('checkMobile')
  const [online] = useGlobal('online')
  ReactGA.initialize(process.env.REACT_APP_GA_USER_ID);
  useEffect(() => {
    getOnline()
    checkMobile(navigator.userAgent || navigator.vendor || window.opera)

  }, [getOnline, checkMobile])

  if (online === true)
    return (
      <>
        <Router>
          <Wrapper>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/ceviriler/anime/:slug/izle/:episodeInfo?" exact component={EpisodePage} />
                <Route path={"/ceviriler/anime/:id/:slug"} exact render={({ match }) => {
                  if (/([0-9])\w+/.test(match.params.id)) return <Redirect to={`/ceviriler/anime/${match.params.slug}`} />
                }} />
                <Route path="/ceviriler/anime/:slug/:id" exact render={({ match }) => {
                  if (match.params.id !== "izle") return <Redirect to={`/ceviriler/anime/${match.params.slug}`} />
                }} />
                <Route path="/ceviriler/anime/:id/:slug/izle/:episodeInfo?" exact render={({ match }) => {
                  return <Redirect to={`/ceviriler/anime/${match.params.slug}/izle/${match.params.episodeInfo.replace(/-([0-9])\w+/, '')}`} />
                }} />
                <Route path="/ceviriler/manga/:slug/:id" exact render={({ match }) => <Redirect to={`/ceviriler/manga/${match.params.slug}`} />} />
                <Route path="/ceviriler/anime/:slug" exact component={AnimePage} />
                <Route path="/ceviriler/manga/:slug" exact component={MangaPage} />
                <Route path="/opg/:type/:slug" exact render={({ match }) => <Redirect to={`/ceviriler/${match.params.type}/${match.params.slug}`} />} />
                <Route path="/ara/:type?/:offset?" component={SearchPage} />
                <Route path="/sss" exact component={SSSPage} />
                <Route path="/ekip-alimlari" exact component={EkipAlimlariPage} />
                <Route component={FourOhFourPage} />
              </Switch>
            </Suspense>

          </Wrapper>
        </Router>
      </>
    );

  else if (online === false) return (
    <InitialLoading error={true} />
  )

  else return (
    <InitialLoading error={false} />
  )
}
