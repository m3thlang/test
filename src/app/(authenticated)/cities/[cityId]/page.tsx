'use client'

import { Typography, Table, Space, Tag } from 'antd'
import { DeliveryBoxOutlined, EnvironmentOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function CityDeliveriesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const cityId = params.cityId

  const { data: city, isLoading: isCityLoading } = Api.city.findUnique.useQuery(
    {
      where: { id: cityId },
    },
  )

  const { data: trips, isLoading: isTripsLoading } = Api.trip.findMany.useQuery(
    {
      where: {
        OR: [{ originCityId: cityId }, { destinationCityId: cityId }],
      },
      include: {
        user: true,
        originCity: true,
        destinationCity: true,
        orders: {
          include: {
            product: true,
          },
        },
      },
    },
  )

  const columns = [
    {
      title: 'Traveler',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => (
        <a onClick={() => router.push(`/users/${user.id}`)}>{user.name}</a>
      ),
    },
    {
      title: 'Origin',
      dataIndex: 'originCity',
      key: 'originCity',
      render: (city: any) => (
        <Text>
          <EnvironmentOutlined /> {city.name}
        </Text>
      ),
    },
    {
      title: 'Destination',
      dataIndex: 'destinationCity',
      key: 'destinationCity',
      render: (city: any) => (
        <Text>
          <EnvironmentOutlined /> {city.name}
        </Text>
      ),
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departureDate',
      render: (date: string) => dayjs(date).format('MMMM D, YYYY'),
    },
    {
      title: 'Products',
      dataIndex: 'orders',
      key: 'orders',
      render: (orders: any[]) => (
        <Space size={[0, 8]} wrap>
          {orders?.map(order => (
            <Tag key={order.id} color="blue">
              {order.product.name} (x{order.quantity?.toString()})
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <a onClick={() => router.push(`/deliveries/${record.id}`)}>
          View Details
        </a>
      ),
    },
  ]

  if (isCityLoading || isTripsLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>
          <DeliveryBoxOutlined /> Deliveries in {city?.name}
        </Title>
        <Text>
          View all deliveries related to {city?.name}, either as origin or
          destination. Find relevant local products and travel opportunities.
        </Text>
        <Table
          columns={columns}
          dataSource={trips}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </PageLayout>
  )
}
