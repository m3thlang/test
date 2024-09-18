'use client'

import { Prisma } from '@prisma/client'
import { useState } from 'react'
import { Typography, Input, Button, List, Card, Space, Modal, Form } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  const {
    data: trips,
    isLoading,
    refetch,
  } = Api.trip.findMany.useQuery({
    include: {
      user: true,
      originCity: true,
      destinationCity: true,
    },
  })

  const { mutateAsync: createTrip } = Api.trip.create.useMutation()

  const filteredTrips = trips?.filter(
    trip =>
      trip.originCity?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destinationCity?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleCreateDelivery = () => {
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      await createTrip({
        data: {
          departureDate: values.departureDate,
          arrivalDate: values.arrivalDate,
          status: 'PENDING',
          user: { connect: { id: user?.id } },
          originCity: { connect: { id: values.originCityId } },
          destinationCity: { connect: { id: values.destinationCityId } },
        },
      })
      enqueueSnackbar('Delivery created successfully', { variant: 'success' })
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to create delivery', { variant: 'error' })
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Available Deliveries</Title>
        <Text>
          Find products you're interested in or create a new delivery listing.
        </Text>

        <Space>
          <Input
            placeholder="Search for products or cities"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateDelivery}
          >
            Create Delivery
          </Button>
        </Space>

        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={filteredTrips}
          loading={isLoading}
          renderItem={trip => (
            <List.Item>
              <Card
                title={`${trip.originCity?.name} to ${trip.destinationCity?.name}`}
                extra={
                  <Button onClick={() => router.push(`/deliveries/${trip.id}`)}>
                    View Details
                  </Button>
                }
              >
                <p>
                  Departure: {dayjs(trip.departureDate).format('MMMM D, YYYY')}
                </p>
                <p>Arrival: {dayjs(trip.arrivalDate).format('MMMM D, YYYY')}</p>
                <p>Status: {trip.status}</p>
                <p>Posted by: {trip.user?.name}</p>
              </Card>
            </List.Item>
          )}
        />
      </Space>

      <Modal
        title="Create New Delivery"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="originCityId"
            label="Origin City"
            rules={[
              { required: true, message: 'Please select the origin city' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="destinationCityId"
            label="Destination City"
            rules={[
              { required: true, message: 'Please select the destination city' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[
              { required: true, message: 'Please select the departure date' },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="arrivalDate"
            label="Arrival Date"
            rules={[
              { required: true, message: 'Please select the arrival date' },
            ]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
