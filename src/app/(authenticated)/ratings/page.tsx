'use client'

import { Prisma } from '@prisma/client'
import { Typography, Rate, Input, Button, List, Avatar, Space } from 'antd'
import { StarOutlined, UserOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function RatingsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState<string>('')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const { data: orders, isLoading: ordersLoading } =
    Api.order.findMany.useQuery({
      where: { buyerId: user?.id, status: 'COMPLETED' },
      include: { seller: true, product: true },
    })

  const { mutateAsync: createReview } = Api.review.create.useMutation()

  const {
    data: userReviews,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = Api.review.findMany.useQuery({
    where: { reviewerId: user?.id },
    include: { reviewee: true, order: { include: { product: true } } },
  })

  const handleSubmitReview = async () => {
    if (!selectedOrder) {
      enqueueSnackbar('Please select an order to review', { variant: 'error' })
      return
    }

    if (rating === 0) {
      enqueueSnackbar('Please provide a rating', { variant: 'error' })
      return
    }

    try {
      await createReview({
        data: {
          rating,
          comment,
          reviewerId: user?.id,
          revieweeId: orders?.find(o => o.id === selectedOrder)?.sellerId,
          orderId: selectedOrder,
        },
      })
      enqueueSnackbar('Review submitted successfully', { variant: 'success' })
      setRating(0)
      setComment('')
      setSelectedOrder(null)
      refetchReviews()
    } catch (error) {
      enqueueSnackbar('Failed to submit review', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Rate and Review</Title>
        <Paragraph>
          Provide feedback on your experience with other users after completed
          deliveries.
        </Paragraph>

        <div>
          <Title level={4}>Select an order to review:</Title>
          {ordersLoading ? (
            <Text>Loading orders...</Text>
          ) : (
            <List
              dataSource={orders}
              renderItem={order => (
                <List.Item
                  onClick={() => setSelectedOrder(order.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      selectedOrder === order.id ? '#f0f0f0' : 'transparent',
                  }}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={`${order.seller?.name} - ${order.product?.name}`}
                    description={`Order ID: ${order.id}`}
                  />
                </List.Item>
              )}
            />
          )}
        </div>

        <div>
          <Title level={4}>Your Rating:</Title>
          <Rate value={rating} onChange={setRating} />
        </div>

        <div>
          <Title level={4}>Your Comment:</Title>
          <Input.TextArea
            rows={4}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write your review here..."
          />
        </div>

        <Button
          type="primary"
          onClick={handleSubmitReview}
          icon={<StarOutlined />}
        >
          Submit Review
        </Button>

        <Title level={3}>Your Previous Reviews</Title>
        {reviewsLoading ? (
          <Text>Loading reviews...</Text>
        ) : (
          <List
            dataSource={userReviews}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={`Review for ${review.reviewee?.name}`}
                  description={
                    <>
                      <Rate disabled defaultValue={review.rating || 0} />
                      <Paragraph>{review.comment}</Paragraph>
                      <Text type="secondary">
                        Product: {review.order?.product?.name} | Date:{' '}
                        {dayjs(review.dateCreated).format('MMMM D, YYYY')}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Space>
    </PageLayout>
  )
}
