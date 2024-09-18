'use client'

import { Typography, Form, Input, DatePicker, Button, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function CreateDeliveryPage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const [cities, setCities] = useState<{ id: string; name: string }[]>([])

  const { data: citiesData, isLoading: citiesLoading } =
    Api.city.findMany.useQuery({
      select: { id: true, name: true },
    })

  const { mutateAsync: createTrip } = Api.trip.create.useMutation()

  const onFinish = async (values: any) => {
    try {
      if (!user) {
        enqueueSnackbar('You must be logged in to create a delivery', {
          variant: 'error',
        })
        return
      }

      const tripData = {
        departureDate: dayjs(values.travelDate).toISOString(),
        userId: user.id,
        originCityId: values.originCity,
        destinationCityId: values.destinationCity,
        status: 'PENDING',
      }

      const createdTrip = await createTrip({ data: tripData })

      enqueueSnackbar('Delivery listing created successfully', {
        variant: 'success',
      })
      router.push(`/deliveries/${createdTrip.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create delivery listing', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create a New Delivery Listing</Title>
      <Paragraph>
        Offer your services by creating a new delivery listing. Specify the
        product, origin city, destination city, and travel date.
      </Paragraph>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="product"
          label="Product"
          rules={[{ required: true, message: 'Please enter the product' }]}
        >
          <Input placeholder="Enter the product you can deliver" />
        </Form.Item>

        <Form.Item
          name="originCity"
          label="Origin City"
          rules={[{ required: true, message: 'Please select the origin city' }]}
        >
          <Select
            placeholder="Select origin city"
            loading={citiesLoading}
            options={citiesData?.map(city => ({
              value: city.id,
              label: city.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="destinationCity"
          label="Destination City"
          rules={[
            { required: true, message: 'Please select the destination city' },
          ]}
        >
          <Select
            placeholder="Select destination city"
            loading={citiesLoading}
            options={citiesData?.map(city => ({
              value: city.id,
              label: city.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="travelDate"
          label="Travel Date"
          rules={[{ required: true, message: 'Please select the travel date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
            Create Delivery Listing
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
