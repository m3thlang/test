'use client'

import { Prisma } from '@prisma/client'
import { Typography, Card, Rate, List, Avatar, Spin, Row, Col } from 'antd'
import { UserOutlined, StarOutlined, CarOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user: currentUser } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const userId = params.userId

  const { data: user, isLoading } = Api.user.findUnique.useQuery({
    where: { id: userId },
    include: {
      trips: { include: { originCity: true, destinationCity: true } },
      reviewsAsReviewee: { include: { reviewer: true, order: true } },
    },
  })

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  if (!user) {
    enqueueSnackbar('User not found', { variant: 'error' })
    router.push('/home')
    return null
  }

  const averageRating =
    user.reviewsAsReviewee.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    ) / user.reviewsAsReviewee.length

  return (
    <PageLayout layout="narrow">
      <Title level={2}>User Profile</Title>
      <Paragraph>View user details, rating, and past deliveries</Paragraph>

      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8}>
            <Avatar size={100} src={user.pictureUrl} icon={<UserOutlined />} />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={3}>{user.name}</Title>
            <Text>Email: {user.email}</Text>
            <br />
            <Text>
              Member since: {dayjs(user.dateCreated).format('MMMM D, YYYY')}
            </Text>
            <br />
            <Rate disabled defaultValue={averageRating} />
            <Text> ({user.reviewsAsReviewee.length} reviews)</Text>
          </Col>
        </Row>
      </Card>

      <Title level={4} style={{ marginTop: '24px' }}>
        <StarOutlined /> Reviews
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={user.reviewsAsReviewee}
        renderItem={review => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={review.reviewer.pictureUrl}
                  icon={<UserOutlined />}
                />
              }
              title={<Text>{review.reviewer.name}</Text>}
              description={
                <>
                  <Rate disabled defaultValue={review.rating || 0} />
                  <Paragraph>{review.comment}</Paragraph>
                  <Text type="secondary">
                    {dayjs(review.dateCreated).format('MMMM D, YYYY')}
                  </Text>
                </>
              }
            />
          </List.Item>
        )}
      />

      <Title level={4} style={{ marginTop: '24px' }}>
        <CarOutlined /> Past Deliveries
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={user.trips}
        renderItem={trip => (
          <List.Item>
            <List.Item.Meta
              title={
                <Text>
                  {trip.originCity?.name} to {trip.destinationCity?.name}
                </Text>
              }
              description={
                <>
                  <Text>
                    Departure:{' '}
                    {dayjs(trip.departureDate).format('MMMM D, YYYY')}
                  </Text>
                  <br />
                  <Text>
                    Arrival: {dayjs(trip.arrivalDate).format('MMMM D, YYYY')}
                  </Text>
                  <br />
                  <Text>Status: {trip.status}</Text>
                </>
              }
            />
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
