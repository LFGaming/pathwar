/* eslint-disable import/first */
import React from "react"
import { Router, Location } from "@reach/router"
import loadable from '@loadable/component'
import DashboardPage from "./DashboardPage"
import LogoutPage from "./LogoutPage";
import TournamentPage from "./TournamentPage";
import AllTournamentsPage from "./AllTournamentsPage";
import ChallengeDetailsPage from "./ChallengeDetailsPage";
import SiteWrapper from "../components/SiteWrapper";
const ProtectedRoute = loadable(() => import('../components/ProtectedRoute'))

import "tabler-react/dist/Tabler.css";


const App = () => (
    <div>
      <SiteWrapper />
      <Location>
        {({ location }) => (
          <Router location={location}>
            <ProtectedRoute path="/app/dashboard" component={DashboardPage} />
            <ProtectedRoute path="/app/tournament" component={TournamentPage} />
            <ProtectedRoute path="/app/all-tournaments" component={AllTournamentsPage} />
            <ProtectedRoute path="/app/challenge/:challengeId" component={ChallengeDetailsPage} />
            <LogoutPage path="/app/logout" component={LogoutPage} />
          </Router>
        )}
      </Location>
    </div>
)

export default App
