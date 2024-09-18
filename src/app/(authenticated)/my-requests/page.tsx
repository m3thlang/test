'use client'

import { Prisma } from '@prisma/client'
import { Typography, List, Button, Space, Spin, Modal } from 'antd'
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function MyRequestsPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const {
    data: orders,
    isLoading,
    refetch,
  } = Api.order.findMany.useQuery({
    where: { buyerId: user?.id },
    include: { product: true, trip: { include: { destinationCity: true } } },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: cancelOrder } = Api.order.update.useMutation()

  const handleCancelOrder = (orderId: string) => {
    confirm({
      title: 'Are you sure you want to cancel this request?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await cancelOrder({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
          })
          enqueueSnackbar('Request cancelled successfully', {
            variant: 'success',
          })
          refetch()
        } catch (error) {
          enqueueSnackbar('Failed to cancel request', { variant: 'error' })
        }
      },
    })
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>My Delivery Requests</Title>
        <Text>
          Track the status of products you're expecting and manage your
          requests.
        </Text>

        {isLoading ? (
          <Spin size="large" />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={orders}
            renderItem={(
              order: Prisma.OrderGetPayload<{
                include: {
                  product: true
                  trip: { include: { destinationCity: true } }
                }
              }>,
            ) => (
              <List.Item
                key={order.id}
                actions={[
                  order.status !== 'CANCELLED' && (
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleCancelOrder(order.id)}
                      danger
                    >
                      Cancel Request
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  title={
                    <a onClick={() => router.push(`/deliveries/${order.id}`)}>
                      {order.product?.name}
                    </a>
                  }
                  description={`Quantity: ${order.quantity?.toString()} - Price: $${order.price?.toString()}`}
                />
                <Space direction="vertical">
                  <Text>Status: {order.status}</Text>
                  <Text>Destination: {order.trip?.destinationCity?.name}</Text>
                  <Text>
                    Expected Arrival:{' '}
                    {order.trip?.arrivalDate
                      ? dayjs(order.trip.arrivalDate).format('MMMM D, YYYY')
                      : 'Not specified'}
                  </Text>
                  <Text>
                    Order Date:{' '}
                    {dayjs(order.dateCreated).format('MMMM D, YYYY')}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
