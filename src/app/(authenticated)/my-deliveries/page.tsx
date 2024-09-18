'use client'

import { Prisma } from '@prisma/client'
import {
  Typography,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function MyDeliveriesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<Prisma.TripGetPayload<{
    include: { originCity: true; destinationCity: true }
  }> | null>(null)

  const {
    data: trips,
    isLoading,
    refetch,
  } = Api.trip.findMany.useQuery({
    where: { userId: user?.id },
    include: { originCity: true, destinationCity: true },
  })

  const { mutateAsync: updateTrip } = Api.trip.update.useMutation()
  const { mutateAsync: deleteTrip } = Api.trip.delete.useMutation()

  const handleEdit = (
    trip: Prisma.TripGetPayload<{
      include: { originCity: true; destinationCity: true }
    }>,
  ) => {
    setSelectedTrip(trip)
    setEditModalVisible(true)
  }

  const handleUpdate = async (values: any) => {
    if (!selectedTrip) return
    try {
      await updateTrip({
        where: { id: selectedTrip.id },
        data: {
          departureDate: values.departureDate.toISOString(),
          arrivalDate: values.arrivalDate.toISOString(),
          status: values.status,
        },
      })
      enqueueSnackbar('Delivery offer updated successfully', {
        variant: 'success',
      })
      setEditModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update delivery offer', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTrip({ where: { id } })
      enqueueSnackbar('Delivery offer cancelled successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to cancel delivery offer', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Origin',
      dataIndex: ['originCity', 'name'],
      key: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: ['destinationCity', 'name'],
      key: 'destination',
    },
    {
      title: 'Departure Date',
      dataIndex: 'departureDate',
      key: 'departureDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Arrival Date',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (
        _: any,
        record: Prisma.TripGetPayload<{
          include: { originCity: true; destinationCity: true }
        }>,
      ) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Delivery Offers</Title>
      <Text>
        Manage your delivery commitments and keep your information up to date.
      </Text>

      <Table
        dataSource={trips}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        style={{ marginTop: '20px' }}
      />

      <Modal
        title="Edit Delivery Offer"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        {selectedTrip && (
          <Form
            initialValues={{
              departureDate: dayjs(selectedTrip.departureDate),
              arrivalDate: dayjs(selectedTrip.arrivalDate),
              status: selectedTrip.status,
            }}
            onFinish={handleUpdate}
          >
            <Form.Item
              name="departureDate"
              label="Departure Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="arrivalDate"
              label="Arrival Date"
              rules={[{ required: true }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="IN_PROGRESS">In Progress</Select.Option>
                <Select.Option value="COMPLETED">Completed</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </PageLayout>
  )
}
