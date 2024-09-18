'use client'

import { Typography, Card, Descriptions, Button, Space, Spin } from 'antd'
import {
  ShoppingCartOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  TruckOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function DeliveryDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const deliveryId = params.deliveryId

  const { data: trip, isLoading } = Api.trip.findUnique.useQuery({
    where: { id: deliveryId },
    include: {
      user: true,
      originCity: true,
      destinationCity: true,
      orders: { include: { product: true } },
    },
  })

  const { mutateAsync: createOrder } = Api.order.create.useMutation()

  const handleRequestDelivery = async () => {
    if (!user) {
      enqueueSnackbar('Please log in to request a delivery', {
        variant: 'error',
      })
      return
    }

    try {
      await createOrder({
        data: {
          buyerId: user.id,
          sellerId: trip.userId,
          productId: trip.orders[0].productId,
          tripId: trip.id,
          status: 'PENDING',
          quantity: 1,
          price: 0, // You might want to set a price or get it from the product
        },
      })
      enqueueSnackbar('Delivery request sent successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to request delivery', { variant: 'error' })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!trip) {
    return (
      <PageLayout layout="narrow">
        <Title level={2}>Delivery not found</Title>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Delivery Details</Title>
        <Card>
          <Descriptions title="Trip Information" bordered>
            <Descriptions.Item label="Product">
              <ShoppingCartOutlined /> {trip.orders[0]?.product?.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Departure">
              <CalendarOutlined />{' '}
              {dayjs(trip.departureDate).format('MMMM D, YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Arrival">
              <CalendarOutlined />{' '}
              {dayjs(trip.arrivalDate).format('MMMM D, YYYY')}
            </Descriptions.Item>
            <Descriptions.Item label="Origin">
              <EnvironmentOutlined /> {trip.originCity?.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Destination">
              <EnvironmentOutlined /> {trip.destinationCity?.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Carrier">
              <TruckOutlined /> {trip.user?.name || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{trip.status}</Descriptions.Item>
          </Descriptions>
        </Card>
        <Card>
          <Space direction="vertical" size="middle">
            <Text>Interested in this delivery?</Text>
            <Button type="primary" onClick={handleRequestDelivery}>
              Request Delivery
            </Button>
          </Space>
        </Card>
      </Space>
    </PageLayout>
  )
}
