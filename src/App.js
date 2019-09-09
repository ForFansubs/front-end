import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Wrapper from './components/hoc/wrapper'
import ReactGA from 'react-ga';

import Loading from './components/progress/index'
import InitialLoading from './components/app/pre-screens'

import SSSPage from './pages/sss/index'
import FourOhFourPage from './components/404/404'

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
                <Route path="/ceviriler/anime/:slug/:id" exact render={({ match }) => {
                  if (match.params.id !== "izle") return <Redirect to={`/ceviriler/anime/${match.params.slug}`} />
                }} />
                <Route path="/ceviriler/manga/:slug/:id" exact render={({ match }) => <Redirect to={`/ceviriler/manga/${match.params.slug}`} />} />
                <Route path="/ceviriler/anime/:slug" exact component={AnimePage} />
                <Route path="/ceviriler/manga/:slug" exact component={MangaPage} />
                <Route path="/ara/:type?/:offset?" component={SearchPage} />
                <Route path="/sss" exact component={SSSPage} />
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
