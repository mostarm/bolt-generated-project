import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppShell, Header, Title } from '@mantine/core'
import Navigation from './components/Navigation'
import Agenda from './pages/Agenda'

export default function App() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Title order={1}>QED Conference 2023</Title>
        </Header>
      }
      footer={<Navigation />}
    >
      <Routes>
        <Route path="/" element={<Agenda />} />
        {/* Add other routes as needed */}
      </Routes>
    </AppShell>
  )
}
