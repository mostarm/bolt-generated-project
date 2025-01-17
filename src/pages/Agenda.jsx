import React, { useState } from 'react'
import { Container, Switch, Text } from '@mantine/core'
import { talks, speakers } from '../data/conferenceData'
import TalkCard from '../components/TalkCard'
import useFavoriteStore from '../store/favoriteStore'

export default function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false)
  const { favorites } = useFavoriteStore()
  
  const currentTime = new Date()
  const filteredTalks = showFavorites 
    ? talks.filter(talk => favorites.includes(talk.id))
    : talks

  return (
    <Container>
      <Switch
        label="Show favorites only"
        checked={showFavorites}
        onChange={(event) => setShowFavorites(event.currentTarget.checked)}
        mb="md"
      />

      {filteredTalks.map(talk => (
        <TalkCard
          key={talk.id}
          talk={talk}
          speaker={speakers.find(s => s.id === talk.speakerId)}
          isCurrentTalk={new Date(talk.time) <= currentTime && 
            new Date(talk.time).getTime() + talk.duration * 60000 > currentTime.getTime()}
        />
      ))}
    </Container>
  )
}
