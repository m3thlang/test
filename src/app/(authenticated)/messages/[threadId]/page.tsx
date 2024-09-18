'use client'

import { Prisma } from '@prisma/client'
import { Typography, Input, Button, List, Avatar, Space } from 'antd'
import { SendOutlined, UserOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function MessageThreadPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [newMessage, setNewMessage] = useState('')

  const threadId = params.threadId

  const {
    data: messages,
    isLoading,
    refetch,
  } = Api.message.findMany.useQuery({
    where: {
      OR: [
        { senderId: user?.id, receiverId: threadId },
        { senderId: threadId, receiverId: user?.id },
      ],
    },
    include: { sender: true, receiver: true },
    orderBy: { timestamp: 'asc' },
  })

  const { mutateAsync: sendMessage } = Api.message.create.useMutation()

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    try {
      await sendMessage({
        data: {
          content: newMessage,
          senderId: user?.id,
          receiverId: threadId,
          timestamp: new Date().toISOString(),
        },
      })
      setNewMessage('')
      refetch()
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={2}>Message Thread</Title>
        <Text>Discuss delivery details with the other user</Text>

        <List
          dataSource={messages}
          loading={isLoading}
          renderItem={(
            message: Prisma.MessageGetPayload<{
              include: { sender: true; receiver: true }
            }>,
          ) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={message.sender.name}
                description={
                  <Space direction="vertical">
                    <Text>{message.content}</Text>
                    <Text type="secondary">
                      {dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />

        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onPressEnter={handleSendMessage}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Space.Compact>
      </Space>
    </PageLayout>
  )
}
