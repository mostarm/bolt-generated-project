import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Agenda from './pages/Agenda'
import Speakers from './pages/Speakers'
import Sponsors from './pages/Sponsors'
import Notifications from './pages/Notifications'
import More from './pages/More'
import TalkDetails from './pages/TalkDetails'
import SpeakerDetails from './pages/SpeakerDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Agenda />} />
        <Route path="speakers" element={<Speakers />} />
        <Route path="sponsors" element={<Sponsors />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="more" element={<More />} />
        <Route path="talk/:id" element={<TalkDetails />} />
        <Route path="speaker/:id" element={<SpeakerDetails />} />
      </Route>
    </Routes>
  )
}

export default App
