import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import Wrapper from './components/hoc/wrapper'
import ReactGA from 'react-ga';

import Loading from './components/progress/index'
import InitialLoading from './components/app/pre-screens'

import SSSPage from './pages/sss/index'
import FourOhFourPage from './components/404/404'
import EkipAlimlariPage from './pages/ekip-alimlari/index'
import ExtraPagesList from './pages/extra-pages/index'

const IndexPage = lazy(() => import('./pages/index/index'))
const SearchPage = lazy(() => import('./pages/ara/index'))
const AnimePage = lazy(() => import('./pages/ceviriler/anime/index'))
const MangaPage = lazy(() => import('./pages/ceviriler/manga/index'))
const EpisodePage = lazy(() => import('./pages/episode/index'))
const MangaEpisodePage = lazy(() => import('./pages/manga-episode/index'))
const CompleteRegistrationPage = lazy(() => import('./pages/kayit-tamamla/index'))
const TakvimPage = lazy(() => import('./pages/takvim/index'))

export default function App() {
  const getOnline = useDispatch('getOnline')
  const checkMobile = useDispatch('checkMobile')
  const [settings] = useGlobal('settings')
  const [online] = useGlobal('online')
  ReactGA.initialize(process.env.REACT_APP_GA_USER_ID);
  useEffect(() => {
    getOnline()
    checkMobile(navigator.userAgent || navigator.vendor || window.opera)
  }, [getOnline, checkMobile])

  useEffect(() => {
    document.documentElement.setAttribute('lang', settings.language)
  }, [settings.language])

  if (online === true)
    return (
      <>
        <Router>
          <Wrapper>
            <HelmetProvider>
              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route path="/" exact component={IndexPage} />
                  <Route path="/ceviriler/anime/:slug/izle/:episodeInfo?" exact component={EpisodePage} />
                  <Route path="/ceviriler/anime/:slug" exact component={AnimePage} />
                  <Route path="/ceviriler/manga/:slug/oku/:episode_number?/:page_number?" exact component={MangaEpisodePage} />
                  <Route path="/ceviriler/manga/:slug" exact component={MangaPage} />
                  <Route path="/ara/:type?/:offset?" component={SearchPage} />
                  <Route path="/sss" exact component={SSSPage} />
                  <Route path="/ekip-alimlari" exact component={EkipAlimlariPage} />
                  <Route path="/kullanici/kayit-tamamla/:hash" exact component={CompleteRegistrationPage} />
                  <Route path="/takvim" exact component={TakvimPage} />
                  {ExtraPagesList.length ? ExtraPagesList.map(({ PageUrl, PageComponent }) => (
                    <Route path={PageUrl} exact component={PageComponent} />
                  )) : ""}
                  <Route component={FourOhFourPage} />
                </Switch>
              </Suspense>
            </HelmetProvider>
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
