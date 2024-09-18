'use client'

import { Prisma } from '@prisma/client'
import { Typography, List, Input, Button, Space, Avatar } from 'antd'
import { SendOutlined, MessageOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function MessagesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [messageContent, setMessageContent] = useState('')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const {
    data: messages,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = Api.message.findMany.useQuery({
    where: {
      OR: [{ senderId: user?.id }, { receiverId: user?.id }],
    },
    include: {
      sender: true,
      receiver: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
  })

  const { mutateAsync: sendMessage } = Api.message.create.useMutation()

  const handleSendMessage = async () => {
    if (!selectedUser || !messageContent.trim()) {
      enqueueSnackbar('Please select a user and enter a message', {
        variant: 'error',
      })
      return
    }

    try {
      await sendMessage({
        data: {
          content: messageContent,
          timestamp: new Date().toISOString(),
          sender: { connect: { id: user?.id } },
          receiver: { connect: { id: selectedUser } },
        },
      })
      setMessageContent('')
      refetchMessages()
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const uniqueUsers = messages?.reduce((acc: Set<string>, message) => {
    if (message.senderId !== user?.id) acc.add(message.senderId)
    if (message.receiverId !== user?.id) acc.add(message.receiverId)
    return acc
  }, new Set<string>())

  const filteredMessages = messages?.filter(
    message =>
      message.senderId === selectedUser || message.receiverId === selectedUser,
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Messages</Title>
      <Text>Communicate with other users about delivery details</Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: 20 }}
      >
        <List
          dataSource={Array.from(uniqueUsers || [])}
          renderItem={userId => {
            const userMessage = messages?.find(
              m => m.senderId === userId || m.receiverId === userId,
            )
            const otherUser =
              userMessage?.senderId === user?.id
                ? userMessage.receiver
                : userMessage?.sender
            return (
              <List.Item
                onClick={() => setSelectedUser(userId)}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedUser === userId ? '#f0f0f0' : 'transparent',
                }}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<MessageOutlined />} />}
                  title={otherUser?.name || 'Unknown User'}
                  description={`Last message: ${dayjs(userMessage?.timestamp).format('YYYY-MM-DD HH:mm')}`}
                />
              </List.Item>
            )
          }}
        />

        {selectedUser && (
          <>
            <List
              dataSource={filteredMessages}
              renderItem={message => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar>
                        {message.senderId === user?.id
                          ? 'You'
                          : message.sender?.name?.[0]}
                      </Avatar>
                    }
                    title={
                      message.senderId === user?.id
                        ? 'You'
                        : message.sender?.name
                    }
                    description={message.content}
                  />
                  <Text>
                    {dayjs(message.timestamp).format('YYYY-MM-DD HH:mm')}
                  </Text>
                </List.Item>
              )}
            />

            <Space.Compact style={{ width: '100%' }}>
              <Input
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
                placeholder="Type your message here"
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
          </>
        )}
      </Space>
    </PageLayout>
  )
}
