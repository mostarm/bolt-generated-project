import { Tabs } from '@mantine/core'
import { IconCalendar, IconUsers, IconStar, IconBuildingStore, IconDotsCircleHorizontal } from '@tabler/icons-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Tabs value={location.pathname} onTabChange={(value) => navigate(value)}>
      <Tabs.List grow>
        <Tabs.Tab value="/" icon={<IconCalendar size={14} />}>Agenda</Tabs.Tab>
        <Tabs.Tab value="/speakers" icon={<IconUsers size={14} />}>Speakers</Tabs.Tab>
        <Tabs.Tab value="/sponsors" icon={<IconBuildingStore size={14} />}>Sponsors</Tabs.Tab>
        <Tabs.Tab value="/more" icon={<IconDotsCircleHorizontal size={14} />}>More</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}
