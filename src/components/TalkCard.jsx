import { Card, Text, Badge, Group, Button } from '@mantine/core'
import { IconStar } from '@tabler/icons-react'
import { format } from 'date-fns'
import useFavoriteStore from '../store/favoriteStore'

export default function TalkCard({ talk, speaker, isCurrentTalk }) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore()
  const isFavorite = favorites.includes(talk.id)

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder mb="md" 
          sx={(theme) => ({
            backgroundColor: isCurrentTalk ? theme.colors.blue[0] : 'white'
          })}>
      <Group position="apart" mb="xs">
        <Text weight={500}>{talk.title}</Text>
        <Button
          variant={isFavorite ? "filled" : "light"}
          color="yellow"
          onClick={() => isFavorite ? removeFavorite(talk.id) : addFavorite(talk.id)}
        >
          <IconStar size={16} />
        </Button>
      </Group>

      <Text size="sm" color="dimmed" mb="md">
        {format(new Date(talk.time), 'HH:mm')} - {talk.room}
      </Text>
      
      <Text size="sm" mb="md">
        {speaker.name} - {speaker.title}
      </Text>

      <Badge color="blue" variant="light">
        {talk.track}
      </Badge>
    </Card>
  )
}
