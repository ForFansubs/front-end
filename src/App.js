import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Wrapper from './components/hoc/wrapper'
import ReactGA from 'react-ga';

import SSSPage from './pages/sss/index'
import SearchPage from './pages/ara/index'

const IndexPage = lazy(() => import('./pages/index/index'))
const AnimePage = lazy(() => import('./pages/ceviriler/anime/index'))
const MangaPage = lazy(() => import('./pages/ceviriler/manga/index'))
const EpisodePage = lazy(() => import('./pages/episode/index'))

export default function App() {
  const getOnline = useDispatch('getOnline')
  const checkMobile = useDispatch('checkMobile')
  // eslint-disable-next-line
  const [online, setOnline] = useGlobal('online')
  ReactGA.initialize('UA-82378950-2');
  useEffect(() => {
    getOnline()
    checkMobile(navigator.userAgent || navigator.vendor || window.opera)

  }, [getOnline, checkMobile])

  if (online === true)
    return (
      <>
        <Router>
          <Wrapper>
            <Suspense fallback={<p></p>}>
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
            </Suspense>
          </Wrapper>
        </Router>
      </>
    );

  else if (online === false) return (
    <p>Bağlantı hatası</p>
  )

  else return (
    <p>Yükleniyor</p>
  )
}
